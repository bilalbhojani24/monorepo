import React from 'react';
import PropTypes from 'prop-types';

export default function SettingsCard({ children }) {
  return (
    <div className="border-base-200 max-h-full flex-1 overflow-auto rounded-lg border bg-white shadow">
      {children}
    </div>
  );
}
SettingsCard.propTypes = {
  children: PropTypes.node.isRequired
};
