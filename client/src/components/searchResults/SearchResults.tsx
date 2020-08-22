import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SearchItem from './SearchItem';

const SearchResults = ({ searchList: { searchList } }: any) => {
  return (
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

const mapStateToProps = (state: any) => ({
  searchList: state.ticker,
});

export default connect(mapStateToProps)(SearchResults);
