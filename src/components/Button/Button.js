import React, { PropTypes } from 'react';
import { selectedFilter } from '../../utils';

const Button = ({ name, type, selected, leftList, rightList, onClick }) => {
  const list = type.includes('add') ? leftList : rightList;
  const isSelected = selectedFilter(selected, list);

  return (
    <div className={`button ${isSelected ? 'disable' : ''}`}>
      <button onClick={onClick}>{name}</button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['addOne', 'addAll', 'removeOne', 'removeAll']),
  leftList: PropTypes.array.isRequired,
  rightList: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired
};

export default Button;
