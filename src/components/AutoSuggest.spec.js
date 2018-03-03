import React from 'react';
import { shallow } from 'enzyme';
import AutoSuggest from './AutoSuggest';

const data = [{ text: 'test' }];

it('renders suggestions', () => {
  const component = shallow(<AutoSuggest data={data} query="test" />);
  expect(component).toMatchSnapshot();
});

it('renders nothing if data is empty', () => {
  const component = shallow(<AutoSuggest data={[]} query="test" />);
  expect(component).toMatchSnapshot();
});

it('renders nothing if data not provided', () => {
  const component = shallow(<AutoSuggest query="query" />);
  expect(component).toMatchSnapshot();
});

it('renders nothing if query not provided', () => {
  const component = shallow(<AutoSuggest data={[]} />);
  expect(component).toMatchSnapshot();
});
