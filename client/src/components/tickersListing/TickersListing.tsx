import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TickersListing.scss';
import TickerItem from './TickerItem';
import { getTickers, getPollingTickers } from '../../actions/ticker';

interface Props {
  getTickers: () => void;
  getPollingTickers: () => void;
  ticker: {tickers: any[]};
}

const TickersListing: React.SFC<Props> = (props: Props) => {
  const twoHoursInterval = 1000 * 60 * 60 * 2;
  const tickers: any[] = props?.ticker.tickers;
  useEffect(() => {
    props.getTickers();
    let interval = setInterval(() => {
      props.getPollingTickers();
    }, twoHoursInterval);
    return () => clearInterval(interval);
  }, [getTickers]);
  return (
    <Fragment>
      {
        <Fragment>
          <h1 className='large text-primary'>Top Trending Tickers</h1>
          <p className='lead'>
            <i className='far fa-flag'> Find tickers to follow </i>
          </p>
          <div className='tickers'>
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Symbol</th>
                  <th scope='col'>Full Name</th>
                  <th scope='col'>Price (in USD)</th>
                  <th scope='col'>% Change</th>
                  <th scope='col'>Market Change</th>
                </tr>
              </thead>
              <tbody>
                {tickers.map((ticker: any) => (
                  <TickerItem key={ticker.symbol} ticker={ticker} />
                ))}
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
  getPollingTickers: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  ticker: state.ticker,
});

export default connect(mapStateToProps, { getTickers, getPollingTickers })(
  TickersListing
);
