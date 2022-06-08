import axios from 'axios';
import {
  createTheme,
  ThemeProvider,
  Container,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import {Pagination} from '@material-ui/lab'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import {numberWithCommas} from './Carousel'
import '../App.css';

const Coinstable = () => {
  const history = useHistory();

  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState('');
  const [page,setpage] = useState(1)

  const { currency,symbol } = CryptoState();

  
  const fetchCoins = async () => {
      setloading(true);
      const { data } = await axios.get(CoinList(currency));
      console.log(data)
      setcoins(data);
      setloading(false);
    };
    
    
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      type: 'dark'
    }
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className="coinstableContainer">
        <h1 className="cointableh1">Cryptocurrency Prices by Market Cap </h1>
        <TextField
          id="outlined-basic"
          label="Search For a Crypto Curency.."
          variant="outlined"
          style={{ width: '17rem', paddingBottom: '1rem' }}
          onChange={(e) => setsearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: 1000,
                        fontFamily: 'Montserrat'
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((row) => {
                  const profit = row.price_change_percentage_24 > 0;
                  return (
                    <TableRow
                      onClick={() => history.push(`/coins/${row.id}`)}
                      className="TableRow"
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: 'flex', gap: 15 }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          style={{ height: '33px', marginBottom: 10 }}
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span
                            style={{
                              texttransform: 'uppercase',
                              fontsize: '15px'
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: 'darkgrey' }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                            {symbol} {" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell align="right" style={{color:row.price_change_24h>0? "rgb(14,203,129)":"red",fontWeight: '500'}}>
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString())} <span style={{color: 'gold'}}>M</span>

                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination 
        style={{padding:'20px',width:'100%',display: 'flex',justifyContent: 'center'}}
            count = {(handleSearch()?.length/10).toFixed(0)}
            onChange={(_,value)=>{
              setpage(value);
              window.scroll(0,450) 
            }}/>
            
      </Container>
    </ThemeProvider>
  );
};

export default Coinstable;
