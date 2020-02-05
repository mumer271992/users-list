import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import List from './ListHOC';
import { users } from '../../../mockedData';

const mockStore = configureStore();

function mountSetup() {
  const store = mockStore({
    users: {
      list: users
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <List />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}
describe('Users List component test', () => {
  let enzymeWrapper;
  beforeEach(() => {
    enzymeWrapper = mountSetup();
  });

  it('should mount successfully', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });

  it('should render all list items', () => {
    const usersWrapper = enzymeWrapper.find('[data-test="users-list-item"]');
    expect(usersWrapper.length).toEqual(10);
  });

  it('should render page handlers', () => {
    const prevBtnWrapper = enzymeWrapper.find('[data-test="prev-btn"]');
    const nextBtnWrapper = enzymeWrapper.find('[data-test="next-btn"]');
    expect(prevBtnWrapper.length).toEqual(1);
    expect(nextBtnWrapper.length).toEqual(1);
  });

  it('previous button should be disabled on strt', () => {
    const prevBtnWrapper = enzymeWrapper.find('[data-test="prev-btn"]');
    expect(prevBtnWrapper.props().disabled).toEqual(true);
  });

  it('previous button should become enable on next page', () => {
    const nextBtnWrapper = enzymeWrapper.find('[data-test="next-btn"]');
    nextBtnWrapper.simulate('click');
    expect(
      enzymeWrapper.find('[data-test="prev-btn"]').props().disabled
    ).toEqual(false);
  });

  it('previous button should become enable on next page and disabled back on prev buuttonn click', () => {
    const nextBtnWrapper = enzymeWrapper.find('[data-test="next-btn"]');
    nextBtnWrapper.simulate('click');
    expect(
      enzymeWrapper.find('[data-test="prev-btn"]').props().disabled
    ).toEqual(false);
    const prevBtnWrapper = enzymeWrapper.find('[data-test="prev-btn"]');
    prevBtnWrapper.simulate('click');
    expect(
      enzymeWrapper.find('[data-test="prev-btn"]').props().disabled
    ).toEqual(true);
  });
});
