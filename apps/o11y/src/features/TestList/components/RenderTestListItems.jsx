import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import PropTypes from 'prop-types';

import RenderTestItem from './RenderTestItem';

function RenderTestListItems({ data }) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  if (data.length > 10) {
    return (
      <div className="relative">
        <Virtuoso
          style={{ height: 375 }}
          data={data}
          atBottomStateChange={(state) => setIsAtBottom(state)}
          itemContent={(_, item) => <RenderTestItem item={item} />}
        />
        {!isAtBottom && (
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/[0.1] py-2" />
        )}
      </div>
    );
  }
  return data?.map((item) => (
    <RenderTestItem key={`${data.id}-test`} item={item} />
  ));
}

RenderTestListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default React.memo(RenderTestListItems);
