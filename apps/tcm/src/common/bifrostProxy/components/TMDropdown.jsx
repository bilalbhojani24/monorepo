/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Dropdown } from '@browserstack/bifrost';
import { MoreVertOutlinedIcon } from 'assets/icons';
import PropTypes from 'prop-types';

const TMDropdown = (props) => {
  const { trigger, triggerVariant } = props;
  const [internalTrigger, setTrigger] = useState(trigger);

  useEffect(() => {
    if (triggerVariant === 'meatball-button') {
      setTrigger(
        <div className="bg-base-100 text-base-400 hover:text-base-600 focus:ring-brand-500 focus:ring-offset-base-100 flex items-baseline rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2">
          <span className="sr-only">Open options</span>
          <MoreVertOutlinedIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      );
    }
  }, [triggerVariant]);

  return <Dropdown {...props} trigger={internalTrigger} />;
};

TMDropdown.propTypes = {
  triggerVariant: PropTypes.string,
  trigger: PropTypes.node
};

TMDropdown.defaultProps = {
  triggerVariant: '',
  trigger: 'Dropdowns'
};

export default TMDropdown;
