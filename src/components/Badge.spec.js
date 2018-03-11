import React from 'react';
import { render } from 'enzyme';
import { Badge } from './Badge';

it('renders', () => {
  const component = render(<Badge>10</Badge>);
  expect(component).toMatchSnapshot();
});
