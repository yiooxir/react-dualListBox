import React, { PropTypes } from 'react';

const Header = ({ name }) => (<div>{name}</div>);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};

export default Header;
