import React from 'react';
import { mount } from 'enzyme';

import UsersList from './UsersList';

const mockedUsersList = [
  {
    id: 382,
    last_name: 'LastyLast',
    first_name: '1985-55-88000000',
    status: 'locked',
    created_at: '2017-09-07T03:34:28.614Z',
    updated_at: '2020-02-03T15:49:03.690Z',
    url: 'http://js-assessment-backend.herokuapp.com/users/382.json'
  },
  {
    id: 515,
    last_name: 'Last10',
    first_name: 'Name10',
    status: 'active',
    created_at: '2018-04-28T14:32:23.750Z',
    updated_at: '2020-01-16T17:33:38.751Z',
    url: 'http://js-assessment-backend.herokuapp.com/users/515.json'
  },
  {
    id: 374,
    last_name: 'Mall',
    first_name: 'Pall',
    status: 'active',
    created_at: '2017-09-07T03:16:03.492Z',
    updated_at: '2020-01-25T13:12:59.759Z',
    url: 'http://js-assessment-backend.herokuapp.com/users/374.json'
  }
];

describe('Users List component test', () => {
  let enzymeWrapper;
  beforeEach(() => {
    enzymeWrapper = mount(<UsersList list={mockedUsersList} />);
  });

  it('should mount successfully', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });
  it('should render all list items', () => {
    const usersWrapper = enzymeWrapper.find('[data-test="users-list-item"]');
    expect(usersWrapper.length).toEqual(mockedUsersList.length);
  });
});
