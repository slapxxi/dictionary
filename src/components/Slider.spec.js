import React from 'react';
import { render } from 'enzyme';
import Slider from './Slider';

const slides = [
  { text: 'first' },
  { text: 'second' },
  { text: 'third' },
];

it('renders slides', () => {
  const component = render(
    <Slider
      data={slides}
      index={0}
      renderSlide={({ item }) => <div>{item.text}</div>}
    />,
  );
  expect(component).toMatchSnapshot();
});

it('renders nothing if data is empty', () => {
  const component = render(<Slider data={[]} />);
  expect(component).toMatchSnapshot();
});
