import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import {
  singleItemPropType,
  TESTLIST_TYPES
} from 'features/TestList/constants';
import PropTypes from 'prop-types';

import RenderRootItem from './RenderRootItem';
import RenderTestItem from './RenderTestItem';

const RenderAppropriateChild = ({ innerItem, index }) => {
  if (
    innerItem.type === TESTLIST_TYPES.ROOT ||
    innerItem.type === TESTLIST_TYPES.DESCRIBE
  )
    return <RenderRootItem key={innerItem.id} item={innerItem} />;
  if (innerItem.type === TESTLIST_TYPES.TEST)
    return (
      <RenderTestItem
        key={innerItem.id}
        item={innerItem}
        isLastItem={innerItem.children.length - 1 === index}
      />
    );
  return null;
};

const RenderChildrens = ({ listOfItems }) =>
  listOfItems.children?.length > 10 ? (
    <Virtuoso
      data={listOfItems.children}
      itemContent={(index, data) => (
        <RenderAppropriateChild index={index} innerItem={data} />
      )}
    />
  ) : (
    listOfItems.children?.map((data, index) => (
      <RenderAppropriateChild
        key={`${data.id}-parent`}
        index={index}
        innerItem={data}
      />
    ))
  );

export default RenderChildrens;

RenderAppropriateChild.propTypes = {
  innerItem: PropTypes.shape(singleItemPropType).isRequired,
  index: PropTypes.number.isRequired
};
RenderAppropriateChild.defaultProps = {};

RenderChildrens.propTypes = {
  listOfItems: PropTypes.shape(singleItemPropType).isRequired
};
RenderChildrens.defaultProps = {};
