import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTickerSummary, getYesterdayTimeSeries } from '../../actions/ticker';
import TickerGraph from '../tickerGraph/TickerGraph';
import { TickerSummary } from '../../default/ticker';
import './Stock.scss';

const Stock = ({ getTickerSummary, summary: { summary }, match }: any) => {
  /*useEffect(() => {
    getStockInfoTimeSeries(match.params.type, match.params.symbol);
  }, [match.params.type, match.params.symbol]); */

  const [summaryData, setSummary] = useState(TickerSummary);
  const twoHoursInterval = 1000 * 60 * 60 * 2;

  const cacheRequest = () => {
    if (sessionStorage.getItem('ticker_summary') === null) {
      if (summary !== null) {
        sessionStorage.setItem('ticker_summary', JSON.stringify(summary));
        setSummary(summary);
      } else {
        getTickerSummary(match.params.symbol);
      }
    } else {
      let listString: any =
        sessionStorage.getItem('ticker_summary') === null
          ? ''
          : sessionStorage.getItem('ticker_summary');
      summary = JSON.parse(listString);
      if (summary.price.symbol !== match.params.symbol) {
        getTickerSummary(match.params.symbol);
        sessionStorage.removeItem('ticker_summary');
      } else {
        setSummary(summary);
      }
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      getTickerSummary(match.params.symbol);
    }, twoHoursInterval);
    return () => clearInterval(interval);
  }, [match.params.symbol]);

  useEffect(() => {
    cacheRequest();
  }, [match.params.symbol, summary]);

  const headerData = summaryData?.price;
  const marketChange: number = headerData?.regularMarketChange.raw;
  const changePercent: number = headerData?.regularMarketChangePercent.raw;

  const formatTime = (timestamp: number) => {
    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let min = '0' + date.getMinutes();
    let sec = '0' + date.getSeconds();
    let formatted =
      hours + ':' + min.substr(-2) + ':' + sec.substr(-2) + ' Local Time';
    return formatted;
  };
  return (
    <Fragment>
      <h1>
        {headerData?.shortName} {'('} {match.params.symbol} {')'} <br />{' '}
        <p className='asOfText'>
          As of: {formatTime(headerData?.regularMarketTime)}{' '}
        </p>
      </h1>
      <div className='row'>
        <div className='col-12'>
          <span className='marketPrice'>
            {headerData?.regularMarketPrice.raw}
          </span>
          <span
            className={marketChange > 0 ? 'marketChange' : 'negativeChange'}
          >
            {headerData?.regularMarketChange.raw}
          </span>
          <span
            className={changePercent > 0 ? 'marketChange' : 'negativeChange'}
          >
            {'('} {headerData?.regularMarketChangePercent.raw} {'%)'}
          </span>
        </div>
        <div className='col-12 mt-2'>
          <TickerGraph match={match} />
        </div>
        <div className='col-12 mt-3'>
          <h5>Stats</h5>
          <div className='row'>
            <div className='col-6'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Open</th>
                    <th>{headerData?.regularMarketOpen.raw}</th>
                  </tr>
                  <tr>
                    <th>High</th>
                    <th>{headerData?.regularMarketDayHigh.raw}</th>
                  </tr>
                  <tr>
                    <th>Low</th>
                    <th>{headerData?.regularMarketDayLow.raw} </th>
                  </tr>
                  <tr>
                    <th>52 Week High</th>
                    <th> {summaryData?.summaryDetail.fiftyTwoWeekHigh.fmt}</th>
                  </tr>
                  <tr>
                    <th>52 Week Low</th>
                    <th>{summaryData?.summaryDetail.fiftyTwoWeekLow.fmt}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-6'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Volume</th>
                    <th>{summaryData?.price.regularMarketVolume.fmt}</th>
                  </tr>
                  <tr>
                    <th>Average Volume</th>
                    <th>{summaryData?.summaryDetail.averageVolume.fmt}</th>
                  </tr>
                  <tr>
                    <th>Market Cap.</th>
                    <th>{headerData?.marketCap.fmt}</th>
                  </tr>
                  <tr>
                    <th>Div/Yield</th>
                    <th>
                      {Object.keys(summaryData.summaryDetail.dividendYield)
                        .length > 0
                        ? summaryData?.summaryDetail.dividendYield.fmt
                        : '-'}
                    </th>
                  </tr>
                  <tr>
                    <th>Previous Close</th>
                      <th>{headerData?.regularMarketPreviousClose.raw}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Stock.propTypes = {
  getTickerSummary: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  summary: state.ticker,
});

export default connect(mapStateToProps, {
  getTickerSummary,
})(Stock);
