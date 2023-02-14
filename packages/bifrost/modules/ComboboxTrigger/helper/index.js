export const renderSingleOptions = (opts) => {
  if (opts) return opts?.label;
  return null;
};

export const renderMultiOptions = (opts) => {
  if (opts.length) return opts?.map((p) => p.label).join(', ');
  return null;
};
