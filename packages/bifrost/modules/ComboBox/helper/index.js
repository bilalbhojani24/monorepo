export const findLastActionItemHelper = (receivedValue, ourValue) => {
  const lastSelected = receivedValue.find((item) => !ourValue.includes(item));
  const lastDeselected = ourValue.find((item) => !receivedValue.includes(item));

  return lastSelected || lastDeselected;
};
