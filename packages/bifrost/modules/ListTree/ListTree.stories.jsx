import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import listTreeCheckboxHelper from '../../utils/listTreeCheckbox';
import Dropdown from '../Dropdown';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
import { EllipsisVerticalIcon, MdFolderSpecial } from '../Icon';
import InputField from '../InputField';
import ControlledNestedTreeWithCheckbox from '../ListTreeCheckbox/BaseExampleComponent.stories';
import ListTreeNode from '../ListTreeNode';
import ListTreeNodeContents from '../ListTreeNodeContents';
import TruncateText from '../TruncateText';

import ListTree from './index';

const {
  getSearchResultsCustomBSFTraversal,
  getSelectedListTreeItems,
  updateTargetNodes
} = listTreeCheckboxHelper;

const sampleListTreeCheckboxData = [
  {
    uuid: '0',
    name: 'file 1',
    isChecked: false,
    isIndeterminate: false,
    contents: [
      {
        uuid: '0-0',
        name: 'file 1a',
        isChecked: false,
        isIndeterminate: false,
        contents: null
      },
      {
        uuid: '0-1',
        name: 'file 1b',
        isChecked: false,
        isIndeterminate: false,
        contents: [
          {
            uuid: '0-1-0',
            name: 'file 1b1',
            isChecked: false,
            isIndeterminate: false,
            contents: null
          }
        ]
      }
    ]
  },
  {
    uuid: '1',
    name: 'file 2',
    isChecked: false,
    isIndeterminate: false,
    contents: [
      {
        uuid: '1-0',
        name: 'file 2a',
        isChecked: false,
        isIndeterminate: false,
        contents: null
      },
      {
        uuid: '1-1',
        name: 'file 2 john',
        isChecked: false,
        isIndeterminate: false,
        contents: [
          {
            uuid: '1-1-0',
            name: 'file 2b1',
            isChecked: false,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-0-0',
                name: 'file 2b1a john',
                isChecked: false,
                isIndeterminate: false,
                contents: [
                  {
                    uuid: '1-1-0-0-0',
                    name: 'file 2b1a1',
                    isChecked: false,
                    isIndeterminate: false
                  }
                ]
              }
            ]
          },
          {
            uuid: '1-1-1',
            name: 'file 2b2',
            isChecked: false,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-1-0',
                name: 'file 2b2a',
                isChecked: false,
                isIndeterminate: false,
                contents: [
                  {
                    uuid: '1-1-1-0-0',
                    name: 'file 2b2a1',
                    isChecked: false,
                    isIndeterminate: false
                  }
                ]
              }
            ]
          },
          {
            uuid: '1-1-2',
            name: 'file 2b3',
            isChecked: false,
            isIndeterminate: false,
            contents: [
              {
                uuid: '1-1-2-0',
                name: 'file 2b3a',
                isChecked: false,
                isIndeterminate: false,
                contents: []
              },
              {
                uuid: '1-1-2-1',
                name: 'file 2b3b',
                isChecked: false,
                isIndeterminate: false,
                contents: []
              },
              {
                uuid: '1-1-2-2',
                name: 'file 2b3c',
                isChecked: false,
                isIndeterminate: false,
                contents: []
              }
            ]
          }
        ]
      },
      {
        uuid: '1-2',
        name: 'file 2c',
        isChecked: false,
        isIndeterminate: false,
        contents: null
      }
    ]
  },
  {
    uuid: '2',
    name: 'file 3 john',
    isChecked: false,
    isIndeterminate: false,
    contents: []
  }
];

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

// const findNodeinTree = (keyName, tree) => {
//   // you might need this, :-*

//   for (let i = 0; i < tree.length; i += 1) {
//     if (tree[i].keyName === keyName) {
//       return tree[i];
//     }
//     if (tree[i].contents) {
//       findNodeinTree(tree[i].contents, keyName);
//     }
//   }
//   return null;
// };

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
                    <DropdownOptionItem key={op.id} option={op} />
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

const SearchableSelectableListTree = () => {
  const [listOfItems, setListOfItems] = useState(sampleListTreeCheckboxData);
  const [selectedValue, setSelectedValue] = useState({});
  const [searchValue, setSearchValue] = useState(''); // Debounce this state for optimal performance
  const [filteredUUIDs, setFilteredUUIDs] = useState({
    searchedUUIDs: {},
    filteredUUIDsWithHierarchy: {}
  });
  const [openNodeMap, setOpenNodeMap] = useState({
    0: true,
    1: true
  });
  const onSearchChange = (e) => {
    const newSearchValue = e.target.value;
    let newFilterUUUIDValue;
    const searchLogicCallback = (item) =>
      item.name.toLowerCase().includes(newSearchValue.toLowerCase());
    if (newSearchValue.includes(searchValue) && searchValue.length > 0) {
      newFilterUUUIDValue = getSearchResultsCustomBSFTraversal(
        listOfItems,
        searchLogicCallback,
        Object.values(filteredUUIDs.searchedUUIDs)
      );
    } else {
      newFilterUUUIDValue = getSearchResultsCustomBSFTraversal(
        listOfItems,
        searchLogicCallback
      );
    }
    const newOpenNodeMap = {};
    Object.keys(newFilterUUUIDValue.filteredUUIDsWithHierarchy).forEach(
      (uuid) => {
        newOpenNodeMap[uuid] = true;
      }
    );
    setOpenNodeMap((prev) => ({ ...prev, ...newOpenNodeMap }));
    setFilteredUUIDs(newFilterUUUIDValue);
    setSearchValue(newSearchValue);
  };
  const onCheckboxChange = (isChecked, targetIndexes) => {
    const { newItems, targetItem } = updateTargetNodes(
      isChecked,
      targetIndexes,
      listOfItems
    );
    const { selectedValuesAdjusted } = getSelectedListTreeItems(
      selectedValue,
      targetItem,
      isChecked
    );
    setSelectedValue(selectedValuesAdjusted);
    setListOfItems(newItems);
  };

  return (
    <>
      <InputField
        label={`${Object.values(selectedValue).length} Items Selected:`}
        wrapperClassName="min-w-[300px] cursor-pointer"
        addOnBeforeInlineWrapperClassName="max-w-[300px] line-clamp-1"
        addOnBeforeInline={
          <TruncateText
            tooltipTriggerIcon={
              <span className="flex font-medium">
                ({Object.keys(selectedValue)?.length})
              </span>
            }
          >
            {Object.values(selectedValue)
              ?.map((el) => el.name)
              ?.join(', ')}
          </TruncateText>
        }
        style={{ width: 0, paddingLeft: 0 }}
        disabled
      />
      <p className="mt-3 mb-4">
        <InputField label="Search Items here" onChange={onSearchChange} />
      </p>
      {Object.keys(filteredUUIDs.filteredUUIDsWithHierarchy).length === 0 &&
      searchValue.length ? (
        <p className="text-sm">No items matching search results</p>
      ) : (
        <ControlledNestedTreeWithCheckbox
          openNodeMap={openNodeMap}
          setOpenNodeMap={setOpenNodeMap}
          data={listOfItems}
          searchValue={searchValue}
          filteredUUIDs={filteredUUIDs}
          isParentSearched={false}
          allowFilter={searchValue.length}
          onCheckboxChange={onCheckboxChange}
        />
      )}
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
                    <DropdownOptionItem key={op.id} option={op} />
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
                    <DropdownOptionItem key={op.id} option={op} />
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

const SearchableSelectableListTreeTemplate = () => (
  <SearchableSelectableListTree />
);

const ControlledTree = ControlledTreeTemplate.bind({});

const UncontrolledTree = UncontrolledTreeTemplate.bind({});

const SearchableSelectableListTreeTemplateExample =
  SearchableSelectableListTreeTemplate.bind({});

const FocusedNodeTree = FocusedNodeNestedTreeTemplate.bind({});

export default defaultConfig;
export {
  ControlledTree,
  FocusedNodeTree,
  SearchableSelectableListTreeTemplateExample,
  UncontrolledTree
};

const propTypeDefault = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  indent: PropTypes.number.isRequired
};
ConrolledNestedTree.propTypes = propTypeDefault;
UnconrolledNestedTree.propTypes = propTypeDefault;
FocusedNodeNestedTree.propTypes = propTypeDefault;
