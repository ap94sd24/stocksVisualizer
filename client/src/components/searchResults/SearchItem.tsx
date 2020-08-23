import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchItem = ({ entry }: any) => {
  return (
    <tr>
      <th scope='col'>{entry['1. symbol']} </th>
  <th><Link to={`/stock/${entry['1. symbol']}`}>{entry['2. name']}</Link></th>
      <th>{entry['3. type']}</th>
      <th>{entry['9. matchScore'] * 100 + '%'}</th>
    </tr>
  );
};

SearchItem.propTypes = {
  entry: PropTypes.array.isRequired,
};

export default SearchItem;
