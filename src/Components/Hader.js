import { Container,Select,Toolbar,MenuItem,createTheme,ThemeProvider } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { AppBar } from '@mui/material'
import {CryptoState} from '../CryptoContext'
import './hader.css';
import React from 'react'

 const Hader = () => {

    const history =useHistory();

    const {currency,setcurrency} = CryptoState()

    
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
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <h1 onClick={()=> history.push("/")} variant='h6' className='title'>Crypto House</h1>
                <Select
                 variant="outlined" 
                style={{width: 100,
                height:40,marginRight:19,backgroundColor:'#14161a'}}
                value={currency}
                onChange={(e) => setcurrency(e.target.value)}>
                     <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'ILS'}>ILS</MenuItem> 
                </Select>
            </Toolbar>
        </Container> 

    </AppBar>
    </ThemeProvider>
  )
}

export default Hader