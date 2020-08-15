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
      setSummary(summary);
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
  return (
    <Fragment>
      <h1>
        {headerData?.shortName} {'('} {match.params.symbol} {')'}
      </h1>
      <div className='row'>
        <div className='col-12 mt-2'>
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
