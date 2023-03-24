const itemWithoutChildren = {
  id: Math.random() * 10,
  type: 'TEST',
  children: []
};

const itemWithChildren = {
  id: Math.random() * 10,
  type: 'ROOT',
  children: [itemWithoutChildren, itemWithoutChildren]
};

const nestedItem = {
  id: Math.random() * 10,
  type: 'ROOT',
  children: [itemWithChildren, itemWithChildren]
};

const doubleNesting = {
  id: Math.random() * 10,
  type: 'ROOT',
  children: [nestedItem, nestedItem]
};

export const testHierarchy = [
  {
    id: Math.random() * 10,
    type: 'ROOT',
    children: [doubleNesting, nestedItem, itemWithChildren, itemWithoutChildren]
  },
  {
    id: Math.random() * 10,
    type: 'ROOT',
    children: [doubleNesting, nestedItem, itemWithChildren, itemWithoutChildren]
  }
];

//   itemWithChildren(itemWithChildren(itemWithChildren(itemWithoutChildren))),
//   itemWithChildren(itemWithoutChildren),
//   itemWithChildren(itemWithoutChildren),
//   itemWithChildren(itemWithChildren(itemWithChildren(itemWithoutChildren))),
//   itemWithChildren(itemWithChildren(itemWithChildren(itemWithoutChildren)))
