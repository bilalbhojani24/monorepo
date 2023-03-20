import React from 'react';
import { Button, MdDragIndicator } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function CardHeader({ title }) {
  return (
    <div className="flex justify-between px-6 pt-3">
      <p className="text-lg font-semibold">{title}</p>
      <Button
        colors="white"
        onClick={() => {}}
        icon={<MdDragIndicator />}
        isIconOnlyButton
        size="small"
        wrapperClassName="border-none to-test-trend__dragHandler invisible group-hover:visible"
      />
    </div>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired
};
