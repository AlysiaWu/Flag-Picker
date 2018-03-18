import React, { Component } from 'react';
import {Checkbox} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import Continents from './continents.json';

import 'react-bootstrap-typeahead/css/Typeahead.css';


export default class SearchBox extends Component {

  static propTypes = {
    searchType: PropTypes.string,
    options: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    reset: PropTypes.bool,
  };

   state = {
    highlightOnlyResult: true,
    selectHintOnEnter: true,
    align: 'justify',
    hint: {
        continent: {
            header: 'Step 1',
            info: 'Select a continent',
            },
        countries: {
            header: 'Step 2',
            info: 'Now, select a country',
        }
    }
  };


  componentDidUpdate(prevProps) {
    const { reset } = this.props;
    const { reset: preReset } = prevProps;
    if (reset && !preReset) {
        this.typeahead.getInstance().clear();
    }
  }

    updateResultLists () {
        this.listDom = this.props.searchType === 'continent' ? (this.props.results || []).map((s, index) => {
            return (<div key={index}>{s.continent}</div>);
        }) : (this.props.results || []).map((s, index) => {
           return (<div key={index}>{s.name}</div>);
        })
        console.log('this.listDom', this.listDom);

    }

    _onChange = (selected) => {
        this.props.onSelect(selected);
    }

    render() {
        const {
          hint,
        } = this.state;

    const test = this.props.options;
    const searchBox = this.props.searchType === 'continent' ? 
        <Typeahead
            highlightOnlyResult
            selectHintOnEnter
            onChange={this.props.onSelect}
            labelKey={(option) => `${option.continent}`}
            options={Continents}
            renderMenuItemChildren={(option, props, idx) => (
                <div>
                  {option.continent}
                </div>
              )}
            /> 
        : <Typeahead
            multiple
            selectHintOnEnter
            highlightOnlyResult
            ref={(typeahead) => this.typeahead = typeahead}
            onChange={this._onChange}
            labelKey={(option) => `${option.name}`}
            options={this.props.options || []}
            renderMenuItemChildren={(option, props, idx) => (
                <div>
                <Checkbox
                    checked={this[option.key]}
                    key={idx}
                    name={option.name}>
                    {option.name}
                  </Checkbox>
                </div>
              )}
        />

    return (
      <div className="search-box">
        <h1>{hint[`${this.props.searchType}`].header}</h1>
        <p>{hint[`${this.props.searchType}`].info}</p>
        {searchBox}
      </div>
    );
  }
}
