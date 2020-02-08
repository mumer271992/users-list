/*
  TEST PLAN

  ✔ Should mount successfully
  ✔ Should render all list items
  ✔ should call edit handler on clicking edit button
  ✔ should call update status handler on clicking update status button
*/

import React from 'react';
import { mount } from 'enzyme';

import UsersList from './UsersList';
import { users } from '../../mockedData';

const mockEditHandler = jest.fn();
const mockUpdateStatusHandler = jest.fn();

describe('Users List component test', () => {
  let enzymeWrapper;
  beforeEach(() => {
    enzymeWrapper = mount(
      <UsersList
        list={users}
        updateStatus={mockUpdateStatusHandler}
        onEdit={mockEditHandler}
      />
    );
  });

  it('should mount successfully', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });
  it('should render all list items', () => {
    const usersWrapper = enzymeWrapper.find('[data-test="users-list-item"]');
    expect(usersWrapper.length).toEqual(users.length);
  });
  it('should call edit handler on clicking edit button', () => {
    const editBtn = enzymeWrapper.find('[data-test="edit-btn"]').at(0);
    if (editBtn) {
      editBtn.simulate('click');
    }
    expect(mockEditHandler).toHaveBeenCalled();
  });
  it('should call update status handler on clicking update status button', () => {
    const updateStatusBtn = enzymeWrapper
      .find('[data-test="status-update-btn"]')
      .at(0);
    if (updateStatusBtn) {
      updateStatusBtn.simulate('click');
    }
    expect(mockUpdateStatusHandler).toHaveBeenCalled();
  });
});
