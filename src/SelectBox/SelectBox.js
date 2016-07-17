import React, { Component, PropTypes } from 'react';
import { Item, Header } from '../components';
import './SelectBox.scss';

export default class SelectBox extends Component {

  static propTypes = {
    className: PropTypes.string.isRequired,
    name: PropTypes.string,
    items: PropTypes.array,
    selected: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    headerRender: PropTypes.func,
    itemRender: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    name: 'Select list'
  };

  headerRender = () => {
    const { name, selected, items, headerRender } = this.props;
    const params = { name, selected, items };
    return headerRender ? headerRender(params) : <Header {...params} />;
  }

  itemRender = (item, i) => {
    const { selected, onItemSelect, itemRender } = this.props;
    const className = `item ${selected.includes(item._$id) ? 'active' : ''}`;
    const params = {
      onClick: event => onItemSelect(event, item, i),
      key: item._$id,
      className,
      item,
    };

    return itemRender ? itemRender(params) : <Item {...params} />;
  }

  render() {
    const { items, className } = this.props;

    return (
      <div className={`select-box ${className}`}>
        <div className="header">{this.headerRender()}</div>
        <div className="content-wrap">
          <div className="content">
            {items.map((item, i) => this.itemRender(item, i))}
          </div>
        </div>
      </div>
    );
  }
}
