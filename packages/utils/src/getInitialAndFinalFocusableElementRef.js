const getInitialAndFinalFocusableElementRef = (element) => {
  // TODO: handle input disable condition and also not of -1 condition
  const querySelectorToTargetFocusableElements =
    "input, button:not(:disabled), [role='button'], [role='link'], [role='checkbox'], [tabindex='0'], a:not([disabled]), select, textarea";
  const focusableElements = [...element.querySelectorAll(querySelectorToTargetFocusableElements)];
  return focusableElements.length
    ? [{ current: focusableElements.shift() }, { current: focusableElements.pop() }]
    : [null];
};

export default getInitialAndFinalFocusableElementRef;
