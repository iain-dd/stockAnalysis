import "./App.css";
import React, { useState } from "react";
import ChartBar from "./components/ChartBar";
import ChartLine from "./components/ChartLine";
import Overview from "./components/Overview";
import dateFormat from "dateformat";
import CompanyName from "./components/CompanyName";

function App() {
  const [dividendDate, setdividendDate] = useState(null);
  const [dividendAmount, setdividendAmount] = useState(null);
  const [company, setcompany] = useState(null);
  const [stock, setStock] = useState(null);
  const [prices, setprices] = useState(null);
  const [pricesDate, setpricesDate] = useState(null);
  const [cfDate, setcfDate] = useState(null);
  const [netIncome, setnetIncome] = useState(null);
  const [freeCashFlow, setfreeCashFlow] = useState(null);
  const [statistics, setstatistics] = useState(null);
  const [logo, setlogo] = useState(null);
  const [symbol, setsymbol] = useState(null);

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
          cashFlowDate.push(
            dateFormat(data.cash_flow[i].fiscal_date, "mediumDate")
          );
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
        console.log(data);
        const price = [];
        const priceDate = [];
        for (let i = 0; i < data.values.length; i++) {
          priceDate.push(dateFormat(data.values[i].datetime, "mediumDate"));
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
          divDate.push(
            dateFormat(data.dividends[i].payment_date, "mediumDate")
          );
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
      `https://api.twelvedata.com/statistics?symbol=${stock}&apikey=${apiKey}&source=docs`
    )
      .then((response) => response.json())
      .then((data) => {
        setcompany(data.meta.name);
        setsymbol(data.meta.symbol);
        setstatistics(data.statistics);
        console.log(data);
      })
      .catch(() => {
        console.log("error");
      });
    fetch(
      `https://api.twelvedata.com/logo?symbol=${stock}&apikey=${apiKey}&source=docs`
    )
      .then((response) => response.json())
      .then((data) => {
        setlogo(data.url);
        console.log(logo);
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div className="App">
      <title>test</title>
      <h1>Stock Analysis</h1>
      <section className="controls">
        <input type="text" placeholder="AAPL" onChange={handleChange} />
      </section>
      <button onClick={getStock}> Find Stock</button>

      <CompanyName logo={logo} company={company} symbol={symbol} />

      <Overview statistics={statistics} />
      <table calss="center">
        <tr>
          <th>Dividend</th>
          <th>Net Income</th>
          <th>Free Cashflow</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>
            <ChartBar
              xaxis={dividendDate}
              yaxis={dividendAmount}
              title="dividend"
            />
          </td>
          <td>
            {" "}
            <ChartBar xaxis={cfDate} yaxis={netIncome} title="test1" />
          </td>
          <td>
            {" "}
            <ChartBar xaxis={cfDate} yaxis={freeCashFlow} title="test2" />
          </td>
          <td>
            {" "}
            <ChartLine xaxis={pricesDate} yaxis={prices} title="Price" />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
