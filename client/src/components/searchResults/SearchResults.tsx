import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layouts/spinner/Spinner';
import PropTypes from 'prop-types';
import SearchItem from './SearchItem';
import { getSearchMatch } from '../../actions/ticker';
import { useLocation } from 'react-router-dom'


const SearchResults = ({getSearchMatch, searchList: { searchList, loading } }: any) => {
  let location = useLocation();
  useEffect(() => {
    getSearchMatch(location.pathname.split('/')[2]);
  }, []);
  return (loading) ? (<Spinner/>) :  (
    <Fragment>
      <h1>Matched Results: </h1>
      <div className='row'>
        <div className='col-12'>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope='col'>Symbol</th>
                <th scope='col'>Name</th>
                <th scope='col'>Type</th>
                <th scope='col'>Relevance</th>
              </tr>
            </thead>
            <tbody>
              {
                searchList.length > 0 ? searchList.map((entry: any) => (<SearchItem key={entry["1. symbol"]} entry={entry} />)) :(<div>No results found!</div>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

SearchResults.propTypes = {
  getSearchMatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  searchList: state.ticker,
});

export default connect(mapStateToProps, {getSearchMatch})(SearchResults);
