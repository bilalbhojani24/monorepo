import React, { useContext, useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import PropTypes from 'prop-types';

import { TestListContext } from '../context/TestListContext';

import RenderTestItem from './RenderTestItem';

function RenderTestListItems({ data, parentId }) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const virtuosoRef = useRef(null);
  const { scrollIndexMapping, updateScrollIndexMapping } =
    useContext(TestListContext);

  const handleUpdateRange = (position) => {
    updateScrollIndexMapping({ id: parentId, start: position });
  };
  useEffect(() => {
    if (virtuosoRef.current && scrollIndexMapping?.[parentId]?.start) {
      setTimeout(() => {
        virtuosoRef.current.scrollTo({
          top: scrollIndexMapping[parentId]?.start,
          behavior: 'auto'
        });
      }, 100);
    }
  }, [data?.length, parentId, scrollIndexMapping]);

  if (data.length > 20) {
    return (
      <div className="relative">
        <Virtuoso
          ref={virtuosoRef}
          style={{ height: 375 }}
          data={data}
          atBottomStateChange={(state) => setIsAtBottom(state)}
          itemContent={(_, item) => <RenderTestItem item={item} />}
          onScroll={(e) => handleUpdateRange(e.target.scrollTop)}
        />
        {!isAtBottom && (
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/[0.1] py-2" />
        )}
      </div>
    );
  }
  console.log(data);
  return data?.map((item) => (
    <RenderTestItem key={`${item.id}-test`} item={item} />
  ));
}

RenderTestListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  parentId: PropTypes.string.isRequired
};

export default React.memo(RenderTestListItems);
