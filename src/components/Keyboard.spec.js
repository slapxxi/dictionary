import React from 'react';
import { mount } from 'enzyme';
import Keyboard from './Keyboard';

beforeEach(() => {
  document.addEventListener = jest.fn();
  document.removeEventListener = jest.fn();
});

it('attaches event listener to document', () => {
  mount(
    <div>
      <Keyboard onPress={() => null} />
    </div>,
  );
  expect(document.addEventListener.mock.calls.length).toEqual(1);
  expect(document.removeEventListener.mock.calls.length).toEqual(0);
});

it('removes event listener from document', () => {
  const component = mount(
    <div>
      <Keyboard onPress={() => null} />
    </div>,
  );
  component.unmount();
  expect(document.addEventListener.mock.calls.length).toEqual(1);
  expect(document.removeEventListener.mock.calls.length).toEqual(1);
});
