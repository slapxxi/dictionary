import React from 'react';
import { mount } from 'enzyme';
import { Words } from './Words';

const words = [
  { word: 'example', thesaurus: [], examples: [] },
  { word: 'example', thesaurus: [], examples: [] },
];

it('renders', () => {
  const container = mount(<Words words={words} />);
  expect(container.state('expanded')).toEqual(false);
});

it('accepts index', () => {
  const container = mount(<Words words={words} index={1} />);
  expect(container.prop('index')).toEqual(1);
});

it('triggers onChangeIndex when changing index', () => {
  const change = jest.fn();
  const container = mount(
    <Words words={words} index={0} onChangeIndex={change} />,
  );
  container.instance().nextWord();
  expect(change).toBeCalledWith(1);
});

it('will not change index when out of range', () => {
  const change = jest.fn();
  const container = mount(
    <Words words={words} index={1} onChangeIndex={change} />,
  );
  container.instance().nextWord();
  expect(change).not.toBeCalled();
});

it('will not trigger onChangeIndex when expanded', () => {
  const change = jest.fn();
  const container = mount(
    <Words words={words} index={0} onChangeIndex={change} />,
  );
  container.instance().showDetails();
  container.instance().nextWord();
  expect(change).not.toBeCalled();
});
