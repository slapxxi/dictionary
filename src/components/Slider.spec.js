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
  expect(component).toMatchSnapshot();
});

it('renders nothing if data is empty', () => {
  const component = shallow(<Slider data={[]} />);
  expect(component).toMatchSnapshot();
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
    timeout(() => render.mock.calls.length, 800),
  ).resolves.toBeGreaterThan(18);
});

function timeout(fn, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });
}
