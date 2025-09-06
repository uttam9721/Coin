import React, { createContext, useEffect, useState } from "react";
export const CoinContext = createContext();
const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

      console.log("Fetching from:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Fetched coins:", data);

      if (Array.isArray(data)) {
        setAllCoin(data);
      } else {
        console.error("Unexpected response:", data);
        setAllCoin([]);
      }
    } catch (err) {
      console.error("Error fetching coins:", err);
      setAllCoin([]);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
