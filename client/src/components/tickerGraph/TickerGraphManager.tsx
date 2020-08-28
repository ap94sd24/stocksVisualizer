import React, { Fragment, useState } from 'react';
import TickerGraph from './TickerGraph';

interface Props {
  match: string;
}
const TickerGraphManager = (props: Props) => {
  const [intervalVal, setInterval] = useState('30min');
  return (
    <Fragment>
      <div className='col-12'>
        <div className='tab-content' id='pills-tabContent'>
          <div
            className='tab-pane fade show active'
            id='pills-daily'
            role='tabpanel'
            aria-labelledby='pills-daily-tab'
          >
            <TickerGraph match={props.match} interval={intervalVal} />
          </div>
          <div
            className='tab-pane fade'
            id='pills-weekly'
            role='tabpanel'
            aria-labelledby='pills-weekly-tab'
          >
            <TickerGraph match={props.match} interval={intervalVal} />
          </div>
          <div
            className='tab-pane fade'
            id='pills-monthly'
            role='tabpanel'
            aria-labelledby='pills-monthly-tab'
          >
            ...
          </div>
          <div
            className='tab-pane fade'
            id='pills-halfyear'
            role='tabpanel'
            aria-labelledby='pills-halfyear-tab'
          >
            shit
          </div>
          <div
            className='tab-pane fade'
            id='pills-yearly'
            role='tabpanel'
            aria-labelledby='pills-yearly-tab'
          >
            shit
          </div>
        </div>
        <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link active'
              id='pills-daily-tab'
              data-toggle='pill'
              href='#pills-daily'
              onClick={() => setInterval('30min')}
              role='tab'
              aria-controls='pills-daily'
              aria-selected='true'
            >
              1D
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link'
              id='pills-weekly-tab'
              onClick={() => setInterval('60min')}
              data-toggle='pill'
              href='#pills-weekly'
              role='tab'
              aria-controls='pills-weekly'
              aria-selected='false'
            >
              1W
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link'
              id='pills-monthly-tab'
              data-toggle='pill'
              href='#pills-monthly'
              role='tab'
              aria-controls='pills-monthly'
              aria-selected='false'
            >
              1M
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link'
              id='pills-halfyear-tab'
              data-toggle='pill'
              href='#pills-halfyear'
              role='tab'
              aria-controls='pills-halfyear'
              aria-selected='false'
            >
              6M
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link'
              id='pills-yearly-tab'
              data-toggle='pill'
              href='#pills-yearly'
              role='tab'
              aria-controls='pills-yearly'
              aria-selected='false'
            >
              1Y
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link'
              id='pills-all-tab'
              data-toggle='pill'
              href='#pills-all'
              role='tab'
              aria-controls='pills-all'
              aria-selected='false'
            >
              All
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default TickerGraphManager;
