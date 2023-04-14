/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Checkbox from '../Checkbox';
import Dropdown from '../Dropdown';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
import { EllipsisVerticalIcon, MdFolderSpecial } from '../Icon';
import ListTreeNode from '../ListTreeNode';
import ListTreeNodeContents from '../ListTreeNodeContents';
import TruncateText from '../TruncateText';

import listTeeCheckboxData from './sampleData/listTreeCheckbox';
import ListTree from './index';

const options = [
  {
    id: '1',
    body: 'Edit'
  },
  {
    id: '2',
    body: 'Duplicate',
    divider: false
  },
  {
    id: '3',
    body: 'Archive',
    divider: true
  }
];
const defaultConfig = {
  title: 'Application/Components/ListTree',
  component: ListTree,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ListTree from '@browserstack/bifrost'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=24-324&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: <></>
    },
    isTreeOpen: {
      option: { type: 'boolean' },
      defaultValue: false,
      description:
        'this is to be used only when tree hide/show is to be controlled by the products business logic'
    },
    indentationLevel: {
      option: { type: 'number' },
      defaultValue: 1
    }
  },
  controls: {}
};

const listTreeDemoDataSet = [
  {
    name: 'file A',
    contents: [
      {
        name: (
          <TruncateText wrapperClassName="line-clamp-1">
            file A-1 Really long file name case. Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged.
          </TruncateText>
        ),
        contents: null
      },
      {
        name: 'file A-2',
        contents: [
          {
            name: 'file A-2-a',
            contents: null
          }
        ]
      }
    ]
  },
  {
    name: 'file 2',
    contents: [
      {
        name: 'file 2a',
        contents: null
      },
      {
        name: 'file 2b',
        contents: [
          {
            name: 'file 2b1',
            contents: null
          }
        ]
      }
    ]
  }
];

// eslint-disable-next-line no-unused-vars
const findNodeinTree = (keyName, tree) => {
  // you might need this, :-*

  for (let i = 0; i < tree.length; i += 1) {
    if (tree[i].keyName === keyName) {
      return tree[i];
    }
    if (tree[i].contents) {
      // eslint-disable-next-line no-unused-vars
      findNodeinTree(tree[i].contents, keyName);
    }
  }
  return null;
};

/**
 * This is just an example runner function that renders,a tree,
 * recursively, using our DS components, using the given dummy dataset,
 * it uses DFS by default, feel free to re-use this in your product implementation
 */
const ConrolledNestedTree = ({ data, indent = 1 }) => {
  const [selectedNodeMap, setSelectedNodeMap] = useState({});

  /**
   * use a map for keeping your treenodes under parent control,
   * Remember: for controlled treenodes or pre-opened treenodes,
   * following props must be compulsorily provided:
   * ListTree => isTreeOpen
   * ListTreeNode => onNodeOpen
   * ListTreeContents => isTreeOpen
   */
  const [openNodeMap, setOpenNodeMap] = useState({
    'file 2': true,
    'file 2b': true,
    'file A': true
  });

  return (
    <>
      {data.map((item, index) => (
        <ListTree
          key={item.name}
          indentationLevel={indent}
          isTreeOpen={openNodeMap[item.name]}
        >
          <ListTreeNode
            label={item.name}
            description={`(level=${indent})`}
            isNodeSelected={selectedNodeMap[item.name]}
            onNodeClick={() => {
              if (selectedNodeMap[item.name] !== undefined) {
                selectedNodeMap[item.name] = !selectedNodeMap[item.name];
              } else {
                selectedNodeMap[item.name] = true;
              }
              setSelectedNodeMap({ ...selectedNodeMap });
            }}
            onNodeOpen={() => {
              if (openNodeMap[item.name] !== undefined) {
                openNodeMap[item.name] = !openNodeMap[item.name];
              } else {
                openNodeMap[item.name] = true;
              }
              setOpenNodeMap({ ...openNodeMap });
            }}
            leadingIcon={
              index % 2 === 0 && <MdFolderSpecial className="h-full w-full" />
            }
            trailingVisualElement={
              <Dropdown>
                <DropdownTrigger wrapperClassName="p-0 border-0 shadow-transparent">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </DropdownTrigger>
                <DropdownOptionGroup>
                  {options.map((op) => (
                    <DropdownOptionItem option={op} />
                  ))}
                </DropdownOptionGroup>
              </Dropdown>
            }
          />
          {!!item?.contents && (
            <ListTreeNodeContents isTreeOpen={openNodeMap[item.name]}>
              <ConrolledNestedTree data={item.contents} indent={1 + indent} />
            </ListTreeNodeContents>
          )}
        </ListTree>
      ))}
    </>
  );
};

const ControlledNestedTreeWithCheckbox = ({
  data,
  onCheckboxChange,
  indent = 1
}) => {
  const [openNodeMap, setOpenNodeMap] = useState({
    'file 2': true,
    'file 2b': true,
    'file A': true
  });

  return (
    <>
      {data?.map((item) => (
        <ListTree
          key={item.name}
          indentationLevel={indent}
          isTreeOpen={openNodeMap[item.name]}
        >
          <ListTreeNode
            hideIcon
            label={
              <Checkbox
                inputClassName="w-3 h-3"
                data={{
                  label: (
                    <>
                      <MdFolderSpecial className="text-info-400 mr-2 inline-block h-5 w-5 shrink-0 select-none" />
                      <span className="text-base-700 mr-2 text-xs leading-5">
                        {item.uuid} - {item.name}
                      </span>
                    </>
                  ),
                  value: item.uuid
                }}
                border={false}
                indeterminate={item.isIndeterminate}
                checked={item.isChecked}
                onChange={(e) => {
                  onCheckboxChange(e, item.uuid);
                }}
                wrapperClassName="py-0"
              />
            }
            description={`(level=${indent})`}
            onNodeOpen={() => {
              if (openNodeMap[item.name] !== undefined) {
                openNodeMap[item.name] = !openNodeMap[item.name];
              } else {
                openNodeMap[item.name] = true;
              }
              setOpenNodeMap({ ...openNodeMap });
            }}
            isNodeSelected={false}
            isFocused={false}
            leadingIcon={<></>}
          />
          {!!item?.contents && (
            <ListTreeNodeContents isTreeOpen={openNodeMap[item.name]}>
              <ControlledNestedTreeWithCheckbox
                onCheckboxChange={onCheckboxChange}
                data={item.contents}
                indent={1 + indent}
              />
            </ListTreeNodeContents>
          )}
        </ListTree>
      ))}
    </>
  );
};

const ControlledCheckboxNestedTreeTemplate = () => {
  const [listOfItems, setListOfItems] = useState(listTeeCheckboxData);
  const markAllChildren = (childrenItems, targetAction) => {
    let newChildren = [];
    childrenItems.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.isChecked = targetAction;
      // eslint-disable-next-line no-param-reassign
      el.isIndeterminate = false;
      if (el?.contents?.length > 0) {
        newChildren = newChildren.concat(el.contents);
      }
    });
    return newChildren;
  };
  // eslint-disable-next-line sonarjs/cognitive-complexity
  const onCheckboxChange = (e, targetIndexes) => {
    const indexes = targetIndexes.split('-');
    const newItems = JSON.parse(JSON.stringify(listOfItems));
    // adjust (check/uncheck) current clicked item
    const targetItem = [];
    // list of items impacted like child, parent, grandparent
    indexes.forEach((el, idx) => {
      if (idx === 0) {
        targetItem.push(newItems[el]);
      } else {
        targetItem.unshift(targetItem[0].contents[el]);
      }
    });
    targetItem[0].isChecked = e.target.checked;
    targetItem[0].isIndeterminate = false;
    // adjust children of current clicked item
    let childrenItems = targetItem[0]?.contents || [];
    let hasMoreChildren = childrenItems?.length;
    while (hasMoreChildren) {
      const childs = markAllChildren(childrenItems, e.target.checked);
      if (childs.length === 0) {
        hasMoreChildren = false;
      }
      childrenItems = childs;
    }
    // adjust parents of current clicked items
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < targetItem.length; i++) {
      let areAllTrue = true;
      let areAllFalse = true;
      let isAnyChildInderminate = false;
      targetItem[i].contents.forEach((contentItem) => {
        if (contentItem.isIndeterminate === true) {
          isAnyChildInderminate = true;
        }
        if (contentItem.isChecked === true) {
          areAllFalse = false;
        } else if (contentItem.isChecked === false) {
          areAllTrue = false;
        }
      });
      if (targetItem[i].contents.length !== 0) {
        if (isAnyChildInderminate) {
          targetItem[i].isIndeterminate = true;
          targetItem[i].isChecked = true;
        } else if (areAllTrue) {
          targetItem[i].isChecked = true;
          targetItem[i].isIndeterminate = false;
        } else if (areAllFalse) {
          targetItem[i].isChecked = false;
          targetItem[i].isIndeterminate = false;
        } else if (!areAllFalse && !areAllTrue) {
          targetItem[i].isChecked = true;
          targetItem[i].isIndeterminate = true;
        }
      }
    }
    setListOfItems(newItems);
  };
  return (
    <>
      <ControlledNestedTreeWithCheckbox
        data={listOfItems}
        onCheckboxChange={onCheckboxChange}
      />
    </>
  );
};

const UnconrolledNestedTree = ({ data, indent = 1 }) => {
  const [selectedNodeMap, setSelectedNodeMap] = useState({});

  return (
    <>
      {data.map((item) => (
        <ListTree key={item.name} indentationLevel={indent}>
          <ListTreeNode
            label={item.name}
            description={`(level=${indent})`}
            isNodeSelected={selectedNodeMap[item.name]}
            onNodeClick={() => {
              if (selectedNodeMap[item.name] !== undefined) {
                selectedNodeMap[item.name] = !selectedNodeMap[item.name];
              } else {
                selectedNodeMap[item.name] = true;
              }
              setSelectedNodeMap({ ...selectedNodeMap });
            }}
            trailingVisualElement={
              <Dropdown>
                <DropdownTrigger wrapperClassName="p-0 border-0 shadow-transparent">
                  Options
                </DropdownTrigger>
                <DropdownOptionGroup>
                  {options.map((op) => (
                    <DropdownOptionItem option={op} />
                  ))}
                </DropdownOptionGroup>
              </Dropdown>
            }
          />
          {!!item?.contents && (
            <ListTreeNodeContents>
              <UnconrolledNestedTree data={item.contents} indent={1 + indent} />
            </ListTreeNodeContents>
          )}
        </ListTree>
      ))}
    </>
  );
};

const FocusedNodeNestedTree = ({ data, indent = 1 }) => {
  const [selectedNodeMap, setSelectedNodeMap] = useState({});
  const [focused, setFocused] = useState(null);

  const [openNodeMap, setOpenNodeMap] = useState({
    'file 2': true,
    'file 2b': true,
    'file A': true
  });

  return (
    <>
      {data.map((item) => (
        <ListTree
          key={item.name}
          indentationLevel={indent}
          isTreeOpen={openNodeMap[item.name]}
        >
          <ListTreeNode
            isFocused={focused === item.name}
            label={item.name}
            description={`(level=${indent})`}
            isNodeSelected={selectedNodeMap[item.name]}
            onNodeClick={() => {
              if (selectedNodeMap[item.name] !== undefined) {
                selectedNodeMap[item.name] = !selectedNodeMap[item.name];
              } else {
                selectedNodeMap[item.name] = true;
              }
              setSelectedNodeMap({ ...selectedNodeMap });
            }}
            onNodeOpen={() => {
              if (openNodeMap[item.name] !== undefined) {
                openNodeMap[item.name] = !openNodeMap[item.name];
              } else {
                openNodeMap[item.name] = true;
              }
              setOpenNodeMap({ ...openNodeMap });
            }}
            trailingVisualElement={
              <Dropdown
                onOpenChange={(isOpen) => {
                  setFocused(isOpen ? item.name : null);
                }}
              >
                <DropdownTrigger wrapperClassName="p-0 border-0 shadow-transparent">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </DropdownTrigger>
                <DropdownOptionGroup>
                  {options.map((op) => (
                    <DropdownOptionItem option={op} />
                  ))}
                </DropdownOptionGroup>
              </Dropdown>
            }
          />
          {!!item?.contents && (
            <ListTreeNodeContents isTreeOpen={openNodeMap[item.name]}>
              <FocusedNodeNestedTree data={item.contents} indent={1 + indent} />
            </ListTreeNodeContents>
          )}
        </ListTree>
      ))}
    </>
  );
};

const ControlledTreeTemplate = () => (
  <ConrolledNestedTree data={listTreeDemoDataSet} />
);

const UncontrolledTreeTemplate = () => (
  <UnconrolledNestedTree data={listTreeDemoDataSet} />
);

const FocusedNodeNestedTreeTemplate = () => (
  <FocusedNodeNestedTree data={listTreeDemoDataSet} />
);

const ControlledTree = ControlledTreeTemplate.bind({});

const UncontrolledTree = UncontrolledTreeTemplate.bind({});

const ControlledCheckboxNestedTreeExample =
  ControlledCheckboxNestedTreeTemplate.bind({});

const FocusedNodeTree = FocusedNodeNestedTreeTemplate.bind({});

export default defaultConfig;
export {
  ControlledCheckboxNestedTreeExample,
  ControlledTree,
  FocusedNodeTree,
  UncontrolledTree
};
