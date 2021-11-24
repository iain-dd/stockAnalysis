import React from "react";
import dateFormat from "dateformat";

const Overview = ({ statistics }) => {
  if (statistics == null) return null;
  else {
    return (
      <table class="center">
        <tr>
          <td valign="top">
            <th colSpan="2">Value</th>
            <tr>
              <td align="left">Market Cap: $</td>
              <td align="right">
                {(
                  statistics.valuations_metrics.market_capitalization /
                  1000000000
                ).toFixed()}
                B
              </td>
            </tr>
            <tr>
              <td align="left">Forward PE:</td>
              <td align="right">
                {statistics.valuations_metrics.forward_pe.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td align="left">Trailing PE: </td>
              <td align="right">
                {statistics.valuations_metrics.trailing_pe.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td align="left"> Price to Sales: </td>
              <td align="right">
                {statistics.valuations_metrics.price_to_sales_ttm.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td align="left">Price to Book: </td>
              <td align="right">
                {statistics.valuations_metrics.price_to_book_mrq.toFixed(2)}
              </td>
            </tr>
          </td>
          <td valign="top">
            <th colSpan="2">Margins</th>
            <tr>
              <td align="left">Operating Margins: </td>
              <td align="right">
                {(statistics.financials.operating_margin * 100).toFixed()}%
              </td>
            </tr>
            <tr>
              <td align="left"> Profit Margins: </td>
              <td align="right">
                {(statistics.financials.profit_margin * 100).toFixed()}%
              </td>
            </tr>
          </td>
          <td valign="top">
            <th colSpan="2">Growth</th>
            <tr>
              <td align="left">Quaterly Earnings (YOY): </td>
              <td align="right">
                {(
                  statistics.financials.income_statement
                    .quarterly_earnings_growth_yoy * 100
                ).toFixed()}
                %
              </td>
            </tr>
            <tr>
              <td align="left"> Quaterly Revenue (YOY): </td>
              <td align="right">
                {(
                  statistics.financials.income_statement
                    .quarterly_revenue_growth * 100
                ).toFixed()}
                %
              </td>
            </tr>
          </td>
          <td valign="top">
            <th colSpan="2">Balance</th>
            <tr>
              <td align="left"> Quaterly Earnings (YOY): </td>
              <td align="right">
                {(
                  statistics.financials.income_statement
                    .quarterly_earnings_growth_yoy * 100
                ).toFixed()}
                %
              </td>
            </tr>
            <tr>
              <td align="left">Quaterly Revenue (YOY): </td>
              <td align="right">
                {(
                  statistics.financials.income_statement
                    .quarterly_revenue_growth * 100
                ).toFixed()}
                %
              </td>
            </tr>
          </td>
          <td valign="top">
            <th colSpan="2">Dividend</th>
            <tr>
              <td align="left">Dividend Yield: </td>
              <td align="right">
                {(
                  statistics.dividends_and_splits
                    .forward_annual_dividend_yield * 100
                ).toFixed(2)}
                %{" "}
              </td>
            </tr>
            <tr>
              <td align="left">Payout Ratio: </td>
              <td align="right">
                {(statistics.dividends_and_splits.payout_ratio * 100).toFixed()}
                %
              </td>
            </tr>
            <tr>
              <td align="left"> Ex-Div Date: </td>
              <td align="right">
                {dateFormat(
                  statistics.dividends_and_splits.ex_dividend_date,
                  "mediumDate"
                )}
              </td>
            </tr>
            <tr>
              <td align="left"> Payout Date: </td>
              <td align="right">
                {dateFormat(
                  statistics.dividends_and_splits.dividend_date,
                  "mediumDate"
                )}
              </td>
            </tr>
          </td>
        </tr>
      </table>
    );
  }
};

export default Overview;
