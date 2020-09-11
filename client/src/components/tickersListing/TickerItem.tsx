import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Files imports
import { roundMoney, formatPercent } from '../../utils/utils';
import './TickersListing.scoped.scss';

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
      <tr>
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
        <td>{roundMoney(tickerInfo.change)}</td>
        <td>{roundMoney(tickerInfo.changePercent)}</td>
      </tr>
    </Fragment>
  );
};

TickerItem.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default TickerItem;
