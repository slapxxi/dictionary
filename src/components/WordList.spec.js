import React from 'react';
import { shallow, mount } from 'enzyme';
import WordList from './WordList';

const words = [{ word: 'active' }, { word: 'passive' }];

it('renders', () => {
  // body...
});

it('renders focused word', () => {
  const component = mount(<WordList words={words} />);
  expect(component.text()).toEqual('active');
});

it('sets default index', () => {
  const component = shallow(<WordList words={words} />);
  expect(component.state()).toEqual({ index: 0 });
});

it('accepts index to start with', () => {
  const component = mount(<WordList words={words} index={1} />);
  expect(component.state()).toEqual({ index: 1 });
  expect(component.text()).toEqual('passive');
});

it('renders nothing when empty', () => {
  const component = shallow(<WordList words={[]} />);
  expect(component.html()).toBeNull();
});

it('throws when index is out of range', () => {
  expect(() => {
    shallow(<WordList words={words} index={3} />);
  }).toThrow('Words contain 2 items but provided index 3');
});
