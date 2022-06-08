import {React,useState,useEffect} from 'react'
import {CryptoState} from '../CryptoContext'
import axios from 'axios'
import {HistoricalChart} from '../Config/api'
import {ThemeProvider,createTheme} from '@material-ui/core'
import '../App.css';


const CoinInfo = ({coin}) => {
  

  const [historicalData, sethistoricalData] = useState();
  const [days, setDays] = useState(1);

   const {currency}=CryptoState()

   const fetchHistoricalData =async () =>{
     const {data} =await axios.get(HistoricalChart(coin.id,days,currency))

     sethistoricalData(data.prices)
   }

   useEffect(() => {
    fetchHistoricalData();

   },[currency,days])

   const darkTheme = createTheme({
    palette : {
        primary : {
            main:'#fff'
        },
        type : "dark"
    }
});


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="CoinInfocontiner"></div>

    </ThemeProvider>
  )
}

export default CoinInfo