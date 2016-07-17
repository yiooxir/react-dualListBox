import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import Combobox from '../dist';
import { keyBy, values } from 'lodash';
import './App.scss';

const initialList = Array(10).fill('').map((e, i) => ({ id: i, label: `Demo Item ${i}` }));

const Header = ({ name, items, selected }) => (
  <div>{name} ({selected.length} of {items.length})</div>
);

export default class App extends Component {

  state = {
    /* normalize Array from [{id: ..}, ...] to {id: {...}, ...} */
    leftList: keyBy(initialList, 'id'),
    rightList: {}
  }

  onNewClick = () => {
    this.setState({
      rightList: Array(10).fill('').map((e, i) => ({ id: i, label: `New Item ${i}` })),
      leftList: [...initialList]
    });
  }

  render() {
    const { leftList, rightList } = this.state;

    return (
      <div className="demo">
        <button onClick={this.onNewClick}>new</button>
        <Combobox
          leftList={values(leftList)}
          rightList={values(rightList)}
          headerRender={Header}
        />
      </div>
    );
  }
}

const content = document.getElementById('content');
ReactDom.render(<App/>, content);
