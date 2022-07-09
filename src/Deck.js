import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';
import './Deck.css'
import { v4 as uuidv4 } from 'uuid';

class Deck extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            cards: [],
            id: "",
            isLoading: false
        }
        this.generateCard = this.generateCard.bind(this);
    }
    componentDidMount()
    {
        axios(`https://deckofcardsapi.com/api/deck/new/shuffle`).then(res =>
        {
            this.setState({ id: res.data.deck_id })
        })

    }
    async generateCard(duration)
    {
        if (!this.state.isLoading)
        {
            this.setState({ isLoading: true })
            let card = await axios(`https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`)
            setTimeout(() =>
            {
                this.setState(st => ({ cards: [...st.cards, card.data.cards[0].image], isLoading: false }))
            }, duration * 1000);
        }
    }
    render()
    {
        const { isLoading, cards } = this.state;
        return (
            <div className='Deck'>
                <h1 className='Text'>♠️CARD DEALER♠️</h1>
                <h5 className='Text'>♠️A LITTLE DEMO MADE WITH REACT♠️</h5>
                <p className='Text'>{cards.length} card{cards.length === 1 ? "" : "s"} {isLoading ? "1 waiting" : ""}</p>
                {
                    isLoading
                        ? <button className='Btn Load'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></button>
                        : <button className='Btn' onClick={this.generateCard.bind(this, 1)}>Add</button>
                }

                <div className='Container'>
                    {
                        isLoading
                            ?
                            <div className="loader"></div>
                            :
                            cards.map(i =>
                            {
                                return <div key={uuidv4()} className='pos'><Card img={i} /></div>
                            })
                    }
                </div>

            </div>
        )
    }
}
export default Deck;