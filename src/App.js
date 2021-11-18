import "./App.css";
import React, { useState } from "react";
import ChartBar from "./components/ChartBar";
import ChartLine from "./components/ChartLine";
import Overview from "./components/Overview";

function App() {
  const [dividendDate, setdividendDate] = useState(null);
  const [dividendAmount, setdividendAmount] = useState(null);
  const [currency, setcurrency] = useState(null);
  const [company, setcompany] = useState(null);
  const [stock, setStock] = useState(null);
  const [prices, setprices] = useState(null);
  const [pricesDate, setpricesDate] = useState(null);
  const [cfDate, setcfDate] = useState(null);
  const [netIncome, setnetIncome] = useState(null);
  const [freeCashFlow, setfreeCashFlow] = useState(null);

  var apiKey = "demo";
  //var apiKey = "482a4485230f4ddb917f5137fe4a0fab";

  function handleChange(e) {
    setStock(e.target.value);
  }

  function getStock() {
    fetch(
      `https://api.twelvedata.com/cash_flow?symbol=${stock}&apikey=${apiKey}&source=docs&period=quarterly&start_date=2010-01-01`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const cashFlowDate = [];
        const getnetIncome = [];
        const getfreeCashFlow = [];
        for (let i = 0; i < data.cash_flow.length; i++) {
          getfreeCashFlow.push(data.cash_flow[i].free_cash_flow);
          getnetIncome.push(data.cash_flow[i].operating_activities.net_income);
          cashFlowDate.push(data.cash_flow[i].fiscal_date);
        }
        cashFlowDate.reverse();
        getnetIncome.reverse();
        getfreeCashFlow.reverse();
        setcfDate(cashFlowDate);
        setnetIncome(getnetIncome);
        setfreeCashFlow(getfreeCashFlow);
      });

    fetch(
      `https://api.twelvedata.com/time_series?symbol=${stock}&interval=1week&outputsize=52&apikey=${apiKey}&source=docs`
    )
      .then((response) => response.json())
      .then((data) => {
        setcurrency(data.meta.currency);

        console.log(data);
        const price = [];
        const priceDate = [];
        for (let i = 0; i < data.values.length; i++) {
          priceDate.push(data.values[i].datetime);
          price.push(data.values[i].close);
        }
        priceDate.reverse();
        price.reverse();
        setpricesDate(priceDate);
        setprices(price);
      })
      .catch(() => {
        console.log("error");
        setpricesDate(null);
        setprices(null);
      });

    fetch(
      `https://api.twelvedata.com/dividends?symbol=${stock}&range=5y&apikey=${apiKey}&source=docs`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const divAmount = [];
        const divDate = [];
        for (let i = 0; i < data.dividends.length; i++) {
          divDate.push(data.dividends[i].payment_date);
          divAmount.push(data.dividends[i].amount);
        }
        divDate.reverse();
        divAmount.reverse();
        setdividendAmount(divAmount);
        setdividendDate(divDate);
      })
      .catch(() => {
        console.log("error");
        setdividendAmount(null);
        setdividendDate(null);
      });

    fetch(
      `https://api.twelvedata.com/profile?symbol=${stock}&apikey=${apiKey}&source=docs`
    )
      .then((response) => response.json())
      .then((data1) => {
        setcompany(data1.name);
        console.log(data1);
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div className="App">
      <h1>Stock Overview</h1>
      <h1>{company}</h1>
      <h1>{currency}</h1>
      <section className="controls">
        <input type="text" placeholder="AAPL" onChange={handleChange} />
      </section>
      <button onClick={getStock}> Find Stock</button>
      <Overview />
      <ChartBar xaxis={dividendDate} yaxis={dividendAmount} title="dividend" />
      <ChartBar xaxis={cfDate} yaxis={netIncome} title="test1" />
      <ChartBar xaxis={cfDate} yaxis={freeCashFlow} title="test2" />
      <ChartLine xaxis={pricesDate} yaxis={prices} />
    </div>
  );
}

export default App;
