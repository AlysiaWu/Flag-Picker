import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends Component {

  static propTypes = {
      flags: PropTypes.array,
      clearFlags: PropTypes.func,
  }

  clearFlags = () => {
    this.flagItems = [];
    this.props.clearFlags();
  }


  componentDidUpdate(prevProps) {
    const { flags } = this.props;
    const { flags: prevFlags } = prevProps;
    if (flags !== prevFlags) {
      this.updateResultLists(); 
    }
    
  }

  updateResultLists = () => {
    this.flagItems = (this.props.flags || []).map((flagObj, index) => {
      return (<div className="flag" key={index}>{flagObj.flag}</div>);
    });
    this.btn = (this.flagItems.length ? <button onClick={this.clearFlags}>Clear Flags</button> : null);
  }

  render() {
    this.updateResultLists();
    return (
      <div className="flags-chosen">
        <div><h1>Selected flags</h1>
        {this.flagItems}
        </div>
        {this.btn}
      </div>
    );
  }
}
