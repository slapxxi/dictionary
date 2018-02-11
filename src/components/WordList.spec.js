import React from 'react';
import { shallow, mount } from 'enzyme';
import WordList from './WordList';

const words = [
  { word: 'active', examples: [], thesaurus: [] },
  { word: 'passive', examples: [], thesaurus: [] },
];

describe('given words prop', () => {
  let component;

  beforeEach(() => {
    component = mount(<WordList words={words} />);
  });

  it('renders word', () => {
    const activeWord = component.find('h1#word');
    expect(activeWord.text()).toEqual('active');
  });

  it('sets default index', () => {
    expect(component.state('index')).toEqual(0);
  });

  it('renders nothing when empty', () => {
    const component = shallow(<WordList words={[]} />);
    expect(component.html()).toBeNull();
  });
});

describe('given index prop', () => {
  it('starts with the specified index', () => {
    const component = mount(<WordList words={words} index={1} />);
    const activeWord = component.find('h1#word');
    expect(activeWord.text()).toEqual('passive');
    expect(component.state('index')).toEqual(1);
  });

  it('throws if index is out of range', () => {
    expect(() => {
      shallow(<WordList words={words} index={3} />);
    }).toThrow('Words contain 2 items but provided index 3');
  });
});
