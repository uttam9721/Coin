import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Coin.css";
import { CoinContext } from "../../context/CoinContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Coin = () => {
  const { id } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const fetchCoinData = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;
      const response = await fetch(url);
      const data = await response.json();
      const coin = data.find((c) => c.id === id);
      setCoinData(coin || null);
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=7`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      

      const formattedData = data.prices.map((item) => ({
        time: new Date(item[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: item[1],
      }));

      setHistoricalData(formattedData);
    } catch (err) {
      console.error("Error fetching historical data:", err);
    }
  };

  useEffect(() => {
    if (currency?.name) {
      fetchCoinData();
      fetchHistoricalData();
    }
  }, [currency, id]);

  return (
    <div className="coin">
      {coinData ? (
        <>
          <h1>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </h1>
          <div className="coin-name">
            <img src={coinData.image} alt={coinData.name} />
            <h2>{coinData.name}</h2>
            <p>
              Price: {coinData.current_price} {currency.symbol}
            </p>
            <p>Market Cap: {coinData.market_cap.toLocaleString()}</p>
            <p
              className={`price-change ${
                coinData.price_change_percentage_24h >= 0
                  ? "positive"
                  : "negative"
              }`}
            >
              24h Change: {coinData.price_change_percentage_24h}%
            </p>
          </div>

          <h2 className="chart-title">Last 7 Days Price</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00b894"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Coin;
