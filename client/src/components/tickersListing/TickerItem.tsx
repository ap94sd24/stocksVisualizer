import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TickerItem = ({
  ticker: {
    symbol,
    longName,
    regularMarketPrice,
    regularMarketChange,
    regularMarketChangePercent,
  },
}: any) => {
  //const type = 'daily';
  const tickerInfo: any = {
    symbol: symbol,
    name: longName,
    price: regularMarketPrice,
    change: regularMarketChange,
    changePercent: regularMarketChangePercent,
  };
  return (
    <tr>
      <th scope='col'>{symbol}</th>
      <th>
        {' '}
        <Link
          to={{
            pathname: `/stock/${symbol}`,
            state: {ticker: tickerInfo},
          }}
          className='itemLink'
        >
          {' '}
          {longName}{' '}
        </Link>
      </th>
      <th>{regularMarketPrice}</th>
      <th>{regularMarketChangePercent}</th>
      <th>{regularMarketChange}</th>
    </tr>
  );
};

TickerItem.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default TickerItem;
