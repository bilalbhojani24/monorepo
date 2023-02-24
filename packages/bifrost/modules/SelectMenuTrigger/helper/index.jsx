import React from 'react';

export const renderSingleOptions = (opts, placeholder) => {
  if (opts?.value && opts?.label)
    return (
      <div className="flex items-center truncate">
        {opts?.image && (
          <img
            className="mr-2 h-6 w-6 shrink-0 rounded-full"
            src={opts.image}
            alt={opts.label}
          />
        )}
        {opts?.label}
      </div>
    );
  return placeholder;
};

export const renderMultiOptions = (opts, placeholder) => {
  if (opts.length)
    return opts?.map((val, index) => (
      <span className="mr-2 inline">
        {val.label} {index < opts.length - 1 ? ',' : null}
      </span>
    ));
  return placeholder;
};
