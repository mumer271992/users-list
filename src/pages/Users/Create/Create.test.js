/*
  TEST PLAN

  ✔ Should mount successfully
  ✔ Should render all form items
  ✔ Should fill form and check its values
  ✔ Submit button should remain disable untill values are filled
  ✔ Submit button should be enabled after values are filled
  ✔ Submit form after filling
*/

import React from 'react';
import { mount } from 'enzyme';

import Create from './Create';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    userId: ''
  })
}));

const mockedCreate = jest.fn();
const mockedUpdate = jest.fn();

function mountSetup() {
  const wrapper = mount(<Create create={mockedCreate} update={mockedUpdate} />);
  return wrapper;
}

function fillForm(wrapper) {
  const user = {
    first_name: 'Muhammad',
    last_name: 'Umer'
  };
  wrapper
    .find('[data-test="first_name"]')
    .at(0)
    .simulate('change', {
      target: {
        name: 'first_name',
        value: user.first_name
      }
    });
  wrapper
    .find('[data-test="last_name"]')
    .at(0)
    .simulate('change', {
      target: {
        name: 'last_name',
        value: user.last_name
      }
    });
}

describe('Create or edit user page', () => {
  let enzymeWrapper;
  beforeEach(() => {
    enzymeWrapper = mountSetup();
  });

  it('should mount successfully', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });

  it('should render all form items', () => {
    const firstName = enzymeWrapper.find('[data-test="first_name"]');
    const lastName = enzymeWrapper.find('[data-test="last_name"]');
    const actionBtn = enzymeWrapper.find('[data-test="action-btn"]');
    expect(firstName.length).toEqual(1);
    expect(lastName.length).toEqual(1);
    expect(actionBtn.length).toEqual(1);
  });

  it('should fill form and check its values', () => {
    fillForm(enzymeWrapper);
    expect(
      enzymeWrapper
        .find('[data-test="first_name"]')
        .at(0)
        .props().value
    ).toEqual('Muhammad');
    expect(
      enzymeWrapper
        .find('[data-test="last_name"]')
        .at(0)
        .props().value
    ).toEqual('Umer');
  });
  it('submit button should remain disable untill values are filled', () => {
    expect(
      enzymeWrapper
        .find('[data-test="action-btn"]')
        .at(0)
        .props().disabled
    ).toEqual(true);
  });
  it('submit button should be enabled after values are filled', () => {
    fillForm(enzymeWrapper);
    expect(
      enzymeWrapper
        .find('[data-test="action-btn"]')
        .at(0)
        .props().disabled
    ).toEqual(false);
  });
  it('submit form after filling', () => {
    fillForm(enzymeWrapper);
    enzymeWrapper
      .find('[data-test="action-btn"]')
      .at(0)
      .simulate('submit');
    expect(mockedCreate).toHaveBeenCalled();
  });
});
