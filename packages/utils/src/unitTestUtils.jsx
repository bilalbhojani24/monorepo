import React from 'react';
import { merge } from 'lodash';
import { shallow } from 'enzyme';

export function setGlobal(...param) {
  Object.defineProperties({}, global, merge(global, ...param));
}

export const shallowRenderer = (Component, props = {}) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

export function getByTestID(component, attr) {
  return component.find(`[data-testid='${attr}']`);
}
