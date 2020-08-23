import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

interface TickerProps {
  ticker: {
    symbol: string;
    longName: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
  }
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
    <tr>
      <th scope='col'>{tickerInfo.symbol}</th>
      <th>
        {' '}
        <Link
          to={{
            pathname: `/stock/${tickerInfo.symbol}`,
            state: {ticker: tickerInfo},
          }}
          className='itemLink'
        >
          {' '}
          {tickerInfo.name}{' '}
        </Link>
      </th>
      <th>{tickerInfo.price}</th>
      <th>{tickerInfo.change}</th>
      <th>{tickerInfo.changePercent}</th>
    </tr>
  );
};

TickerItem.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default TickerItem;
