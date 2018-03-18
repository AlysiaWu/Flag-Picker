import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import SearchBox from './SearchBox';
import Continents from './continents.json';

describe('Search Box Component', () => {

    let mountedSearchBox;
    const getInput = (wrapper) => {
      return wrapper.find('.rbt-input-main');
    }

    beforeEach(() => {
      const results = [{
        continent: 'test1',
        countries: [{name: 'test2'}],
      }]
      const doneChange = jest.fn();
      const props = {
          searchType: 'continent',
          options: Continents,
          onSelect: doneChange,
          results,
        };
      
      mountedSearchBox = mount(
        <SearchBox {...props} />
      );  
    });

    it('renders without crashing', () => {
      expect(mountedSearchBox.props().searchType).toBe('continent');
      expect(mountedSearchBox.props().options.length).toBe(5);
      expect(mountedSearchBox.props().results.length).toBe(1);
      expect(mountedSearchBox.find('input')).toBeDefined();
      mountedSearchBox.find('.rbt-input-wrapper').simulate('click');
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      const doneChange = jest.fn();
      const results = [
        {
                "name": "UK",
                "flag": "🇬🇧"
            },
            {
                "name": "France",
                "flag": "🇫🇷"
            },
            {
                "name": "Italy",
                "flag": "🇮🇹"
            }
        
      ];

      ReactDOM.render(<SearchBox 
            searchType='countries'
            options={Continents}
            onSelect={doneChange}
            results={results}/>, div);

      ReactDOM.unmountComponentAtNode(div);
    });

})



