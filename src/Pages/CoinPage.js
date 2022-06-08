import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import axios from 'axios';
import '../App.css';
import CoinInfo from '../Components/CoinInfo';
import { CryptoState } from '../CryptoContext';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Carousel';
import { LinearProgress } from '@material-ui/core';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  };

  console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, []);

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

  return (
    <div className="CoinPageContiver">
      <div className="sidebarCoin">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height={'200'}
          style={{ marginBottom: 20 }}
        />

        <h3 className="coinpageheading">{coin?.name}</h3>
        <p variant="subtitle" className="description">
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
        </p>
      </div>
      <div className="marketData">
        <span style={{ display: 'flex' }}>
        <p>
          <h5 className="coinpageheading">Rank : {coin?.market_cap_rank}</h5>
        </p>
        </span>
        <span style={{ display: 'flex' }}>
        <p>
          <h5 className="coinpageheading">
            Current Price :{symbol}{' '}
            {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </h5>
        </p>
        </span>
        <span style={{ display: 'flex' }}>
        <p>
          <h5 className="coinpageheading">Market Cap : {symbol}{' '}
            {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}</h5>
        </p>
        </span>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
