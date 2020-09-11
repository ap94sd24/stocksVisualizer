import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchResults.scoped.scss';

interface ItemProp {
  entry: any;
}

const SearchItem = (prop: ItemProp) => {
  const entry = prop.entry;
  return (
    <tr>
      <td scope='col'>{entry['1. symbol']} </td>
      <td>
        <Link to={`/stock/${entry['1. symbol']}`}>{entry['2. name']}</Link>
      </td>
      <td>{entry['3. type']}</td>
      <td>{entry['9. matchScore'] * 100 + '%'}</td>
    </tr>
  );
};

SearchItem.propTypes = {
  entry: PropTypes.array.isRequired,
};

export default SearchItem;
