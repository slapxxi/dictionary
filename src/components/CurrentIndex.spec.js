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
