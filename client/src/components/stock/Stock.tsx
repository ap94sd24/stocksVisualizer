import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTickerSummary } from '../../actions/ticker';
import { TickerSummary } from '../../default/ticker';
import Spinner from '../layouts/spinner/Spinner';
import './Stock.scss';
import TickerGraphManager from '../tickerGraph/TickerGraphManager';
import { roundMoney, formatPercent } from '../../utils/utils';

const Stock = ({
  getTickerSummary,
  summary: { summary, loading },
  match,
}: any) => {
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

  const formatTime = (timestamp: number): string => {
    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let min = '0' + date.getMinutes();
    let sec = '0' + date.getSeconds();
    let formatted =
      hours + ':' + min.substr(-2) + ':' + sec.substr(-2) + ' Local Time';
    return formatted;
  };

  return summaryData.price.shortName === '' ? (
    <Spinner />
  ) : (
    <div className="wrapper ml-3">
      <h1>
        {headerData?.shortName} {'('} {match.params.symbol} {')'} <br />{' '}
        <p className='asOfText'>
          As of: {formatTime(headerData?.regularMarketTime)}{' '}
        </p>
      </h1>
      <div className='row'>
        <div className='col-12 ml-2'>
          <span className='marketPrice'>
            {headerData?.regularMarketPrice.raw}
          </span>
          <span
            className={marketChange > 0 ? 'marketChange' : 'negativeChange'}
          >
            {marketChange > 0 ? '+' : ''}
            {roundMoney(headerData?.regularMarketChange.raw)}
          </span>
          <span
            className={changePercent > 0 ? 'marketChange' : 'negativeChange'}
          >
            {'('} {formatPercent(headerData?.regularMarketChangePercent.raw)}{' '}
            {'%)'}
          </span>
        </div>
        <div className='col-12 mt-2'>
          <TickerGraphManager match={match.params.symbol} />
        </div>
        <div className='col-12'>
          <h5>Stats</h5>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Open</td>
                    <td>{headerData?.regularMarketOpen.raw}</td>
                  </tr>
                  <tr>
                    <td>High</td>
                    <td>{headerData?.regularMarketDayHigh.raw}</td>
                  </tr>
                  <tr>
                    <td>Low</td>
                    <td>{headerData?.regularMarketDayLow.raw} </td>
                  </tr>
                  <tr>
                    <td>52 Week High</td>
                    <td> {summaryData?.summaryDetail.fiftyTwoWeekHigh.fmt}</td>
                  </tr>
                  <tr>
                    <td>52 Week Low</td>
                    <td>{summaryData?.summaryDetail.fiftyTwoWeekLow.fmt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-12 col-md-6'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Volume</td>
                    <td>{summaryData?.price.regularMarketVolume.fmt}</td>
                  </tr>
                  <tr>
                    <td>Average Volume</td>
                    <td>{summaryData?.summaryDetail.averageVolume.fmt}</td>
                  </tr>
                  <tr>
                    <td>Market Cap.</td>
                    <td>{headerData?.marketCap.fmt}</td>
                  </tr>
                  <tr>
                    <td>Div/Yield</td>
                    <td>
                      {Object.keys(summaryData.summaryDetail.dividendYield)
                        .length > 0
                        ? summaryData?.summaryDetail.dividendYield.fmt
                        : '-'}
                    </td>
                  </tr>
                  <tr>
                    <td>Previous Close</td>
                    <td>{headerData?.regularMarketPreviousClose.raw}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
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
