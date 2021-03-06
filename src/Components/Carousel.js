import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {TrendingCoins} from '../Config/api'
import {CryptoState} from '../CryptoContext'
import './Banner.css';

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {

    const [treding , setTrending] = useState([])
    const {currency,symbol} = CryptoState()



    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data);
    }

    console.log(treding)


    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency]);


    const items =treding.map((coin)=>{

        let profit = coin.price_change_percentage_24h >=0;

        return (
            <Link className="caruselItem" to={`/coins/${coin.id}`}>
                <img
                   src={coin?.image}
                   alt={coin.name}
                   height='50'
                   style={{marginBottom:'10px',paddingTop:'15px',marginTop:'20px',justifyContent: 'center'}}/>
                <span>
                    {coin?.symbol}
                <span style={{color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight:500}}>
                    {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
                </span>
                <span style={{fontSize:'22',fontWeight:'500'}}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(6))}
                </span>
            </Link>
        )
    })

    const responsive = {
        //when we are at the base of the screen its going to items 2
        0:{
            items : 2,
        },
        512:{
            items:4,
        },
    }



  return (
    <div className="Carousel">
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay />
    </div>
  )
}

export default Carousel