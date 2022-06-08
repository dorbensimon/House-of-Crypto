import React from 'react'
import './Banner.css';
import {Container} from '@material-ui/core';
import Carousel from './Carousel';


const Banner = () => {
  return (
    <div className="banner">
        <Container className="bannerContainer">
            <h1 className="tagline">
                Crypto House
            </h1>
            <p className="subtitle">
                Get All The info Regarding Your Favorite Crypto Currency
            </p>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner