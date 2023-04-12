import React from 'react';
import { singleItemPropType } from 'features/TestList/constants';
import PropTypes from 'prop-types';

import RenderRootItem from './RenderRootItem';

const RenderChildren = ({ data }) => <RenderRootItem data={data} />;
export default React.memo(RenderChildren);

RenderChildren.propTypes = {
  data: PropTypes.shape(singleItemPropType).isRequired
};
