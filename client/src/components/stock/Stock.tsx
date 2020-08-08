import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTickerSummary } from '../../actions/ticker';
import './Stock.scss';

const Stock = ({ getTickerSummary, summary: { summary }, match }: any) => {
  /*useEffect(() => {
    getStockInfoTimeSeries(match.params.type, match.params.symbol);
  }, [match.params.type, match.params.symbol]); */

  useEffect(() => {
    getTickerSummary(match.params.symbol);
  }, [match.params.symbol]);

  const headerData = summary?.price;
  const marketChange: number = headerData?.regularMarketChange.raw;
  const changePercent: number = headerData?.regularMarketChangePercent.raw;


  return (
    <Fragment>
      <h1>
        {headerData?.shortName}. {'('} {match.params.symbol} {')'}
      </h1>
      <div className='row'>
        <div className='col-12 mt-3'>
          <span className='marketPrice'>{headerData?.regularMarketPrice.raw}</span>
          <span className={marketChange > 0 ? 'marketChange' : 'negativeChange'}>
            {headerData?.regularMarketChange.raw}
          </span>
          <span  className={changePercent > 0 ? 'marketChange' : 'negativeChange'}>
            {'('} {headerData?.regularMarketChangePercent.raw} {'%)'}
          </span>
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
