import React from 'react';
import { shallow, render } from 'enzyme';
import Search from './Search';

it('renders', () => {
  const component = render(<Search value="test" />);
  expect(component).toMatchSnapshot();
});

it('triggers onChange when modified', () => {
  const change = jest.fn();
  const component = shallow(<Search onChange={change} />);
  component
    .find('[data-test="input"]')
    .simulate('change', { currentTarget: { value: 'test' } });
  expect(change).toBeCalledWith('test');
});
