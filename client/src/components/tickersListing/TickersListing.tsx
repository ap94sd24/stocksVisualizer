import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TickersListing.scss';
import TickerItem from './TickerItem';
import { getTickers } from '../../actions/ticker';

const TickersListing = ({ getTickers, ticker: { tickers } }: any) => {
  useEffect(() => {
    getTickers();
  }, [getTickers]);

  console.log('tickers: ' + JSON.stringify(tickers.finance, null, 2));
  return (
    <Fragment>
      {
        <Fragment>
          <h1 className='large text-primary'>Top Trending Tickers</h1>
          <p className='lead'>
            <i className='far fa-flag'> Find tickers to follow</i>
          </p>
          <div className='tickers'>
            <table className="table">
              <thead>
              <th scope="col">Symbol</th>
              <th scope="col">Full Name</th>
              <th scope="col">Price (in USD)</th>
              <th scope="col">% Change</th>
              <th scope='col'>Market Change</th>
              </thead>
              <tbody>
              {(tickers?.finance?.result[0].quotes.map((ticker: any) => (<TickerItem ticker={ticker}/>)))}
              </tbody>
            </table>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

TickersListing.propTypes = {
  getTickers: PropTypes.func.isRequired,
  ticker: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  ticker: state.ticker,
});

export default connect(mapStateToProps, { getTickers })(TickersListing);
