import React, { Component, PropTypes } from 'react';
import SelectBox from './SelectBox';
import { xor, filter } from 'lodash';
import { Button, Header, Item } from './components';
import './Combobox.scss';

export default class Combobox extends Component {

  static propTypes = {
    className: PropTypes.string,
    rightList: PropTypes.array,
    leftList: PropTypes.array,
    multi: PropTypes.bool,
    headerRender: PropTypes.func,
    buttonRender: PropTypes.func,
    itemRender: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    multi: false
  };

  state = {
    leftList: [],
    rightList: [],
    selectedItemsIds: []
  }

  componentWillMount() {
    this.initState(this.props);
  }

  componentWillReceiveProps(next) {
    this.initState(next);
  }

  onItemSelect = (event, item) => {
    if (this.props.multi) {
      this.setState({
        selectedItemsIds: xor(this.state.selectedItemsIds, [item._$id])
      });
    } else {
      this.setState({
        selectedItemsIds: [item._$id]
      });
    }
  }

  onAddButtonClick = () => {
    const { leftList, rightList, selectedItemsIds } = this.state;
    this.setState({
      leftList: filter(leftList, e => !selectedItemsIds.includes(e._$id)),
      rightList: [...filter(leftList, e => selectedItemsIds.includes(e._$id)), ...rightList],
      selectedItemsIds: []
    });
  }

  onRemoveButtonClick = () => {
    const { leftList, rightList, selectedItemsIds } = this.state;
    this.setState({
      rightList: filter(rightList, e => !selectedItemsIds.includes(e._$id)),
      leftList: [...filter(rightList, e => selectedItemsIds.includes(e._$id)), ...leftList],
      selectedItemsIds: []
    });
  }

  onAddAllButtonClick = () => {
    const { leftList, rightList } = this.state;

    this.setState({
      rightList: [...leftList, ...rightList],
      leftList: [],
      selectedItemsIds: []
    });
  }

  onRemoveAllButtonClick = () => {
    const { leftList, rightList } = this.state;

    this.setState({
      leftList: [...rightList, ...leftList],
      rightList: [],
      selectedItemsIds: []
    });
  }

  initState() {
    this.setState({
      leftList: this.mark(this.props.leftList, 'l'),
      rightList: this.mark(this.props.rightList, 'r')
    });
  }

  mark(array, pref) {
    return array.map((e, i) => ({ ...e, _$id: `${pref}_${i}` }));
  }

  render() {
    const { className, headerRender, buttonRender, itemRender } = this.props;
    const { leftList, rightList, selectedItemsIds } = this.state;

    return (
      <div className={`combo-box ${className}`}>
        <SelectBox
          headerRender={headerRender}
          itemRender={itemRender}
          className="leftBox"
          selected={selectedItemsIds}
          items={leftList}
          onItemSelect={this.onItemSelect}
        />

        <div className="actionGroup">
          <Button
            name="add >"
            type="addOne"
            leftList={leftList}
            rightList={rightList}
            selected={selectedItemsIds}
            onClick={this.onAddButtonClick}
          />
          {/*<div className="button">
            <button onClick={this.onAddButtonClick}>add {'>'}</button>
          </div>*/}
          <div className="button">
            <button onClick={this.onAddAllButtonClick}>add all {'>>'}</button>
          </div>
          <div className="button">
            <button onClick={this.onRemoveButtonClick}>remove {'<'}</button>
          </div>
          <div className="button">
            <button onClick={this.onRemoveAllButtonClick}>remove all {'<<'}</button>
          </div>
        </div>

        <SelectBox
          headerRender={headerRender || Header}
          itemRender={itemRender || Item}
          className="rightBox"
          selected={selectedItemsIds}
          items={rightList}
          onItemSelect={this.onItemSelect}
        />
      </div>
    );
  }
}
