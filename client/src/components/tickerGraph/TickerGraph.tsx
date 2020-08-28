import React, { useEffect, Fragment, useState } from 'react';
import { getYesterdayTimeSeries } from '../../actions/ticker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

 

const TickerGraph = ({
  getYesterdayTimeSeries,
  intraday: { intraday },
  match,
  interval,
}: any) => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: intraday?.labels,
      datasets: [
        {
          label: 'Price Change in USD',
          data: intraday?.values,
          backgroundColor: ['rgba(75,192,192, 0.6)'],
          borderWidth: 2,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, [intraday]);

  useEffect(() => {
    getYesterdayTimeSeries(match, interval);
  }, [match, interval]);

  const title = (interval: any) => {
    if (interval === '60min') {
      return 'Weekly Price Change';
    } else {
      return 'Intraday Change (As of Prior Market Day)';
    }
  }
  console.log('interval: ' + interval);
  return (
    <Fragment>
      <div className='row'>
        <div className='col-12'>
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: {
                text: title(interval),
                display: true,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display: true,
                      autoSkip: true,
                      maxTicksLimit: 6,
                      beginAtZero: false,
                    },
                    gridLines: {
                      display: false,
                    },
                    scaleLabel: {
                      display: false,
                      labelString: 'Prices (USD)',
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      display: true,
                      autoSkip: true,
                      maxTicksLimit: 7,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                tooltips: {
                  enabled: false,
                },
              },
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

TickerGraph.propTypes = {
  getYesterdayTimeSeries: PropTypes.func.isRequired,
  intraday: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  intraday: state.ticker,
});

export default connect(mapStateToProps, { getYesterdayTimeSeries })(
  TickerGraph
);
