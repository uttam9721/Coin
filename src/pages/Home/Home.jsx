import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input, setInput] = useState("")

  const inputHandler = (e) => {
    setInput(e.target.value)
  }

  const searchHandler = (e) => {
    e.preventDefault()
    const coins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    )
    setDisplayCoin(coins)
  }

  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign in to
          explore more about cryptos.
        </p>

        <form onChange={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="search crypto.."
          />
          <button className='btn' type='submit'> Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {displayCoin.slice(0, 50).map((item, idx) => {
          return (
            <Link to={`/coin/${item.id}`} className='table-layout' key={idx}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>

              <p>{currency.symbol}{item.current_price}</p>
              <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p>{item.market_cap}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home;
