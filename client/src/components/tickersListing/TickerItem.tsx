import React from 'react';
import PropTypes from 'prop-types';

const TickerItem = ({
  ticker: {
    symbol,
    longName,
    regularMarketPrice,
    regularMarketChange,
    regularMarketChangePercent,
  },
}: any) => {
  return (
    <tr>
      <th scope='col'>{symbol}</th>
      <th>{longName}</th>
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
