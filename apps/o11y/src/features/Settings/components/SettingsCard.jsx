import React from 'react';
import PropTypes from 'prop-types';

export default function SettingsCard({ children }) {
  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="border-base-200 max-h-full max-w-[896px] flex-1 overflow-auto rounded-lg border bg-white shadow">
      {children}
    </div>
  );
}
SettingsCard.propTypes = {
  children: PropTypes.node.isRequired
};
