import React,{createContext,useState,useEffect} from 'react'
import { useContext } from 'react'

const Crypto = createContext()

const CryptoContext  = ({children}) => {
    const [currency,setcurrency] = useState("USD")
    const [symbol,setsymbol] = useState("$")

    useEffect (()=>{
      if(currency ==="ILS") setsymbol("₪");
      else if(currency ==="USD") setsymbol("$");
       
    },[currency])
  return (
    <Crypto.Provider value={{currency,symbol,setcurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () =>{
  return useContext(Crypto)
}
