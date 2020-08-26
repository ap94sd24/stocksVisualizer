import React, { useState, useEffect } from 'react';
import { getSearchMatch } from '../../../../actions/ticker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Search.scss';


const Search = ({ getSearchMatch, searchList: { searchList } }: any) => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    if (search !== '') {
      getSearchMatch(debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (searchList.length > 0) {
      setResults(searchList);
    }
  }, [searchList]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      history.push( `/search/${search}`);
    }
  };
  return (
    <div className='wrapper'>
      <i className='fas fa-search searchIcon'> </i>
      <input
        type='text'
        className='search'
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search...'
      />
    </div>
  );
};

Search.propTypes = {
  getSearchMatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  searchList: state.ticker,
});

export default connect(mapStateToProps, { getSearchMatch })(Search);
