import React, { useEffect, Fragment, useState } from 'react';
import { getYesterdayTimeSeries } from '../../actions/ticker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

interface TickerGraphProps {
  getYesterdayTimeSeries: () => void;
  intraday: { intraday: any};
  match: {params: { symbol: string}}
}

const TickerGraph = ({
  getYesterdayTimeSeries,
  intraday: { intraday },
  match,
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
    getYesterdayTimeSeries(match.params.symbol);
  }, [match.params.symbol]);
  return (
    <Fragment>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: {
              text: 'Intraday Performance (As of Prior Day)',
              display: true,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: false,
                  },
                  gridLines: {
                    display: false,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Prices (USD)',
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
              tooltips: {
                enabled: false
              },
            },
          }}
        />
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
