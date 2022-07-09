import React, { Component } from 'react'
import './Card.css'

class Card extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            rotation: Math.floor(Math.random() * 90)
        }
    }
    render() 
    {
        const img = this.props.img;
        return (
            <img className='Card' style={{ transform: `rotate(${this.state.rotation}deg)` }} src={img} />
        )
    }
}
export default Card;