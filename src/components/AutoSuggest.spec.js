import _ from 'lodash';
import React from 'react';
import { render } from 'enzyme';
import { suggest } from '../lib';
import AutoSuggest from './AutoSuggest';

const data = [{ word: 'test' }];

jest.mock('../lib', () => ({
  suggest: jest.fn((...params) => {
    expect(params).toHaveLength(3);
    return [{ id: 0, word: 'abide' }, { id: 1, word: 'abysmal' }];
  }),
}));

beforeEach(() => {
  suggest.mockClear();
});

it('renders suggestions', () => {
  const component = render(
    <AutoSuggest
      query="test"
      data={data}
      render={_.property('word')}
    />,
  );
  expect(component).toMatchSnapshot();
});

it('invokes suggest to determine suggestions', () => {
  render(
    <AutoSuggest
      query="test"
      data={[{ word: 'test' }]}
      render={_.property('word')}
    />,
  );
  expect(suggest).toBeCalled();
});

it('does not render item when render returns undefined', () => {
  const component = render(
    <AutoSuggest
      query="test"
      data={[{ word: 'test' }]}
      render={() => null}
    />,
  );
  expect(component).toMatchSnapshot();
});

it('renders nothing if data is empty', () => {
  const component = render(<AutoSuggest data={[]} query="test" />);
  expect(component).toMatchSnapshot();
});

it('renders nothing if data not provided', () => {
  const component = render(<AutoSuggest query="query" />);
  expect(component).toMatchSnapshot();
});

it('renders nothing if query not provided', () => {
  const component = render(<AutoSuggest data={[]} />);
  expect(component).toMatchSnapshot();
});
