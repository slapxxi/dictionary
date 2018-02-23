import React from 'react';
import { shallow, mount } from 'enzyme';
import Slider from './Slider';

const slides = [
  { text: 'first' },
  { text: 'second' },
  { text: 'third' },
];

it('renders slides', () => {
  const component = shallow(
    <Slider
      data={slides}
      index={0}
      renderSlide={({ item }) => (
        <div className="slide">{item.text}</div>
      )}
    />,
  );
  expect(component.find('.slide').length).toEqual(3);
});

it('renders nothing if data is empty', () => {
  const component = shallow(<Slider data={[]} />);
  expect(component.html()).toBeNull();
});

it('animates transitions when receiving props', () => {
  const render = jest.fn();
  const component = mount(
    <Slider
      data={slides}
      index={0}
      renderSlide={({ style, index }) => index === 1 && render(style)}
    />,
  );
  component.setProps({ index: 1 });
  return expect(
    timeout(() => render.mock.calls[4][0].opacity, 500),
  ).resolves.toEqual(0.15287036419925532);
});

function timeout(fn, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });
}
