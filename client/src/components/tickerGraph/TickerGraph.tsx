import React, { useEffect, Fragment } from 'react';
import { getYesterdayTimeSeries } from '../../actions/ticker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TickerGraph = ({
  getYesterdayTimeSeries,
  intraday: { intraday },
  match,
}: any) => {
  useEffect(() => {
    getYesterdayTimeSeries(match.params.symbol);
  }, [match.params.symbol]);
  //console.log('Intraday: ' + JSON.stringify(intraday, null, 2));
  return (
    <Fragment></Fragment>
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
