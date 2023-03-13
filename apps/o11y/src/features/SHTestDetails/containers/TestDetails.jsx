import React from 'react';
import { useSelector } from 'react-redux';
import { O11ySlideover } from 'common/bifrostProxy';

import { getIsSnPDetailsVisible } from '../slices/selectors';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const TestDetails = () => {
  const isVisible = useSelector(getIsSnPDetailsVisible);

  return (
    <O11ySlideover show={isVisible} backgroundOverlay={false} size="4xl">
      <SlideOverHeader />
      <SlideOverBody />
    </O11ySlideover>
  );
};

TestDetails.propTypes = {};

export default TestDetails;
