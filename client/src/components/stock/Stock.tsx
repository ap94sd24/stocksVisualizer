import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStockInfoTimeSeries, getCompanyInfo } from '../../actions/ticker';

const Stock = ({
  getStockInfoTimeSeries,
  ticker: { ticker, company },
  match,
}: any) => {
  useEffect(() => {
    getStockInfoTimeSeries(match.params.type, match.params.symbol);
  }, [getStockInfoTimeSeries, match.params.type, match.params.symbol]);
  console.log('Ticker: ' + JSON.stringify(ticker, null, 2));
  //console.log('TICKER IS: ' + JSON.stringify(Object.values(ticker)[1], null, 2));
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6 mb-4'>TEST1</div>
          <div className='col-sm-12 col-md-6'>TEST2</div>
        </div>
      </div>
    </Fragment>
  );
};

Stock.propTypes = {
  getStockInfoTimeSeries: PropTypes.func.isRequired,
  getCompanyInfo: PropTypes.func.isRequired,
  ticker: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  ticker: state.ticker,
  company: state.company,
});

export default connect(mapStateToProps, {
  getStockInfoTimeSeries,
  getCompanyInfo,
})(Stock);
