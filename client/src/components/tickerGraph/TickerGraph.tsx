import React, { useEffect, Fragment, useState } from 'react';
import {
  getYesterdayTimeSeries,
  getStockInfoTimeSeries,
} from '../../actions/ticker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { useWindowDimensions } from '../../utils/utils';

const TickerGraph = ({
  getYesterdayTimeSeries,
  getStockInfoTimeSeries,
  intraday: { intraday },
  tickerChart: { tickerChart },
  match,
  interval,
}: any) => {
  const { height, width } = useWindowDimensions();
  const [chartData, setChartData] = useState({});
  const oneDayInterval = 1000 * 60 * 60 * 24;

  const dataValues = () => {
    if (interval === '30min' || interval === '60min') {
      return intraday?.values;
    } else {
      return tickerChart?.values;
    }
  };

  const dataLabels = () => {
    if (interval === '30min' || interval === '60min') {
      return intraday?.labels;
    } else {
      return tickerChart?.labels;
    }
  };

  const chart = () => {
    setChartData({
      labels: dataLabels(),
      datasets: [
        {
          label: 'Price Change in USD',
          data: dataValues(),
          backgroundColor: ['rgba(75,192,192, 0.6)'],
          borderWidth: 2,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, [intraday, tickerChart]);

  useEffect(() => {
    let updateFreq = setInterval(() => {
      getYesterdayTimeSeries(match, interval);
      getStockInfoTimeSeries(interval, match);
    }, oneDayInterval);
    return () => clearInterval(updateFreq);
  }, [match]);

  useEffect(() => {
    if (interval === '30min' || interval === '60min') {
      getYesterdayTimeSeries(match, interval);
    } else {
      // monthly, yearly, all data
      getStockInfoTimeSeries(interval, match);
    }
    //console.log('Call');
  }, [match, interval]);

  const title = (interval: string) => {
    switch (interval) {
      case '30min':
        return 'Intraday Change (As of Prior Market Day)';
      case '60min':
        return 'Weekly Price Change';
      case 'month':
        return 'Price Change for the Month';
      case 'year':
        return 'Price Change for the Year';
      case 'all':
        return 'All Historical Price Change';
      default:
        return 'No Chart found!';
    }
  };
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
                      display: width <= 480 ? false : true,
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: false,
                    },
                    gridLines: {
                      display: false,
                    }
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      display: width <= 480 ? false : true,
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
  tickerChart: state.ticker,
});

export default connect(mapStateToProps, {
  getYesterdayTimeSeries,
  getStockInfoTimeSeries,
})(TickerGraph);
