import React from 'react';
import { shallow } from 'enzyme';
import { CurrentIndex } from './CurrentIndex';

it('renders', () => {
  const component = shallow(<CurrentIndex index={0} total={20} />);
  expect(component).toMatchSnapshot();
});

it('accepts style', () => {
  const component = shallow(
    <CurrentIndex index={10} total={20} style={{ flex: 1 }} />,
  );
  expect(component).toMatchSnapshot();
});

describe('given input is active', () => {
  let component;
  let input;
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();
    component = shallow(
      <CurrentIndex index={3} total={10} onChange={onChange} />,
    );
    component.find('.current-index > button').simulate('click');
    input = component.find('.current-index_input');
  });

  describe('when loses focus', () => {
    it('invokes onChange callback', () => {
      input.simulate('blur', { currentTarget: { value: '10' } });
      expect(onChange).toBeCalledWith(10);
    });

    it('does not invoke callback when changed to text', () => {
      input.simulate('blur', { currentTarget: { value: 'test' } });
      expect(onChange).not.toBeCalled();
    });

    it('does not invoke callback when changed to same value', () => {
      input.simulate('blur', { currentTarget: { value: '4' } });
      expect(onChange).not.toBeCalled();
    });

    it('passes value clamped to upper limit', () => {
      input.simulate('blur', { currentTarget: { value: '20' } });
      expect(onChange).toBeCalledWith(10);
    });

    it('passes value clamped to lower limit', () => {
      input.simulate('blur', { currentTarget: { value: '-10' } });
      expect(onChange).toBeCalledWith(1);
    });
  });
});
