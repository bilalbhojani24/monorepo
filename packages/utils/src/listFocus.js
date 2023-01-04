export const nextItem = (list, item, blockerElement = 'DIV') => {
  // when moving from bottom to top
  if (item === null && list?.firstChild?.nodeName === blockerElement) {
    return nextItem(list, list.firstChild.firstChild);
  }

  if (item === null) {
    return list?.firstChild;
  }
  // div after li
  if (item?.nextElementSibling && item?.nextElementSibling?.nodeName === blockerElement) {
    return nextItem(list, item.nextElementSibling.firstChild);
  }

  // li & div after div
  if (item?.nextElementSibling === null && item?.parentNode?.nextElementSibling) {
    if (item?.parentNode?.nextElementSibling?.nodeName === 'LI') {
      return nextItem(list, item.parentNode);
    }
    return nextItem(list, item?.parentNode?.nextElementSibling?.firstChild);
  }

  // takes to the next element
  if (item && item?.nextElementSibling) {
    return item.nextElementSibling;
  }

  // last element of list
  return nextItem(list, null);
};

export const previousItem = (list, item, blockerElement = 'DIV') => {
  // first li last div || first div last div
  if (
    list.lastChild.lastChild !== item &&
    ((item.previousElementSibling === null && list.lastChild.nodeName === blockerElement) ||
      (list.firstChild.children[1] === item && list.lastChild.nodeName === blockerElement))
  ) {
    return list.lastChild.lastChild;
  }

  // first div last li
  if (list.firstChild.children[1] === item && list.lastChild.nodeName === 'LI') {
    return list?.lastChild;
  }

  // div before div
  if (
    item.parentNode.nodeName === blockerElement &&
    item.parentNode.previousElementSibling?.nodeName === blockerElement &&
    item.previousElementSibling === item.parentNode.firstChild
  ) {
    return item.parentNode.previousElementSibling.lastChild;
  }

  // li before div
  if (
    item.previousElementSibling &&
    item.parentNode.nodeName === blockerElement &&
    item.parentNode?.previousElementSibling &&
    item.previousElementSibling === item.parentNode.firstChild
  ) {
    return previousItem(list, item.parentNode);
  }

  // div before li
  if (item.previousElementSibling && item.previousElementSibling.nodeName === blockerElement) {
    return item.previousElementSibling.lastChild;
  }

  // li before li
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }

  return list?.lastChild;
};

export const moveFocus = (list, currentFocus, traversalFunction) => {
  let nextFocus = traversalFunction(list, currentFocus);

  while (nextFocus) {
    if (!nextFocus.hasAttribute('tabindex') || nextFocus.hasAttribute('disabled')) {
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};
