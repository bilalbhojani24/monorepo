import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureMockStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux';

export default function getStore(initState = {}) {
  // immutableCheck false will disable ImmutableStateInvariantMiddleware
  const middlewares = getDefaultMiddleware({ serializableCheck: false, immutableCheck: false });
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initState);

  return store;
}

export function mockStoreImport(store, mockStore) {
  jest.spyOn(store, 'dispatch').mockImplementation(mockStore.dispatch);
  jest.spyOn(store, 'getState').mockImplementation(mockStore.getState);
  jest.spyOn(store, 'getActions').mockImplementation(mockStore.getActions);
}

export function setStoreWithReactRedux(initialState = {}, store = null) {
  const mockStore = getStore(initialState);
  useSelector.mockImplementation((selector) => selector(mockStore.getState()));
  useDispatch.mockImplementation(() => mockStore.dispatch);
  if (store) {
    mockStoreImport(store, mockStore);
  }
  return mockStore;
}
