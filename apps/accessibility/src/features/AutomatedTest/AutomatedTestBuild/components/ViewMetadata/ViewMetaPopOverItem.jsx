import React from 'react';
import PropTypes from 'prop-types';

function ViewMetaPopOverItem({ title, text }) {
  return (
    <div className="flex flex-col py-1 first:pt-0 last:pb-0">
      <p className="text-base-500 text-sm">{title}</p>
      <div className="flex items-center justify-between gap-4 pb-0.5">
        <p className="truncate text-sm">{text}</p>
      </div>
    </div>
  );
}

ViewMetaPopOverItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ViewMetaPopOverItem;
