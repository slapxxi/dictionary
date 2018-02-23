import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

it('renders', () => {
  const component = shallow(<Search value="test" />);
  expect(component.find('[data-name="input"]').length).toEqual(1);
});

it('is controlled', () => {
  const component = shallow(<Search value="test" />);
  expect(component.find('[data-name="input"]').prop('value')).toEqual(
    'test',
  );
});

it('triggers onChange when modified', () => {
  const change = jest.fn();
  const component = shallow(<Search onChange={change} />);
  component
    .find('[data-name="input"]')
    .simulate('change', { currentTarget: { value: 'test' } });
  expect(change).toBeCalledWith('test');
});
