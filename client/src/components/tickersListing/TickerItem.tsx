import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TickersListingsStyle from './TickersListing.module.scss';

interface TickerProps {
  ticker: {
    symbol: string;
    longName: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
  };
}

const TickerItem: React.SFC<any> = (props: TickerProps) => {
  const tickerInfo: any = {
    symbol: props.ticker.symbol,
    name: props.ticker.longName,
    price: props.ticker.regularMarketPrice,
    change: props.ticker.regularMarketChange,
    changePercent: props.ticker.regularMarketChangePercent,
  };
  return (
    <Fragment>
      <tr className={TickersListingsStyle.tr}>
        <td scope='col'>{tickerInfo.symbol}</td>
        <td>
          {' '}
          <Link
            to={{
              pathname: `/stock/${tickerInfo.symbol}`,
              state: { ticker: tickerInfo },
            }}
            className='itemLink'
          >
            {' '}
            {tickerInfo.name}{' '}
          </Link>
        </td>
        <td>{tickerInfo.price}</td>
        <td>{tickerInfo.change}</td>
        <td>{tickerInfo.changePercent}</td>
      </tr>
    </Fragment>
  );
};

TickerItem.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default TickerItem;
