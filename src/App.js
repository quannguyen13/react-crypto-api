import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import './Coin.css'
import './Responsive.css'
import Coin from './Coin';

const BASE_URL = process.env.REACT_APP_PROJECT_URL;

function App() {
  // console.log(BASE_URL);
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
useEffect(() => {
  axios.get(BASE_URL)
  .then(res => {
    setCoins(res.data)
    console.log(res.data);
  })
  .catch(error => console.log(error))
},[])


  const handleChange = e => {
    setSearch(e.target.value)
  }



  const filterCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )



  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search A Currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
      {filterCoins.map(coin => {
        return <Coin 
        key={coin.id}  
        name={coin.name} 
        image={coin.image}  
        volume={coin.market_cap}
        price={coin.current_price}
        symbol={coin.symbol}
        priceChange={coin.price_change_percentage_24h}
        marketcap={coin.market_cap}
        
        />
        
      })}
    </div>
  );
}

export default App;
