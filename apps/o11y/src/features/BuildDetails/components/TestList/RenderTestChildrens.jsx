/* eslint-disable react/prop-types */
import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { TESTLIST_TYPES } from 'features/BuildDetails/constants';

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
      <RenderAppropriateChild key={data.id} index={index} innerItem={data} />
    ))
  );

export default RenderChildrens;
