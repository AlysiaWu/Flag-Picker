import React, { Component } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import SearchBox from './SearchBox';
import Flags from './Flags';
import Continents from './continents.json';

import './App.css';

export default class App extends Component {
  state = {
    selectedCountries: [],
    selectedCountinent: [],
  };

  availableCountries = [];
  reset = false;

  onSelectContinent = (selected) => {
    if (selected.length) {
      this.setState({selectedCountinent: selected});
      this.availableCountries = selected[0].countries || [];
    }

  };

  onSelectCountry = (selectedCountries) => {
    const newState = [...selectedCountries];
    this.setState({
      selectedCountries: newState,
    });
  };

  clearFlags = () => {
    this.setState({selectedCountries: []});
    this.reset = true;
    setTimeout(() => {
      this.reset = false;
    }, 300);
  }

  render() {

    return (
      <div className="App">
        <div className='bg'></div> 
        <header className="App-header">
          <h1 className="App-title">Flag Picker</h1>
          <h4 className="App-title">This app will help you to learn flags around the world in 3 steps</h4>
        </header>
        <div className="App-intro">
          <div className='section'>
            <SearchBox 
              searchType='continent'
              options={Continents}
              onSelect={this.onSelectContinent}
              />
              {this.state.selectedCountinent && this.state.selectedCountinent.length ? <div>You selected: {this.state.selectedCountinent[0].continent}</div> : null}
          </div>
          {this.state.selectedCountinent.length ? 
            <div className='section'>
              <SearchBox
                reset={this.reset}
                searchType='countries'
                options={this.availableCountries}
                onSelect={this.onSelectCountry}/>
            </div> : null
            }
          { this.state.selectedCountries.length ? 
            <div className='section'>
            <Flags 
              className='section' 
              flags={this.state.selectedCountries} 
              clearFlags={this.clearFlags}/>
          </div> : null}
        </div>
      </div>
    );
  }
}

