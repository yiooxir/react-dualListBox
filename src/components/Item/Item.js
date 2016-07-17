import React, { PropTypes } from 'react';

const Item = ({ item, ...rest }) => (
  <div {...rest} >
    {item.label || ''}
  </div>
);

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
