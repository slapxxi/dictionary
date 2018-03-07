import React from 'react';
import { render } from 'enzyme';
import { suggest } from '../lib';
import AutoSuggest from './AutoSuggest';

const data = [{ word: 'test' }];

jest.mock('../lib', () => ({
  suggest: jest
    .fn()
    .mockImplementation(() => [
      { id: 0, word: 'abide' },
      { id: 1, word: 'abysmal' },
    ]),
}));

beforeEach(() => {
  suggest.mockClear();
});

it('renders suggestions', () => {
  const component = render(<AutoSuggest data={data} query="test" />);
  expect(component).toMatchSnapshot();
});

it('invokes suggest correctly', () => {
  render(<AutoSuggest data={[{ word: 'test' }]} query="test" />);
  expect(suggest.mock.calls[0][0]).toEqual('test');
  expect(suggest.mock.calls[0][1]).toEqual([{ word: 'test' }]);
  expect(suggest.mock.calls[0][2]).toBeDefined();
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
