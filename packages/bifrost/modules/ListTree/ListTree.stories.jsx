import React, { useCallback, useState } from 'react';
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
import ListTreeRootWrapper from '../ListTreeRootWrapper';
import TruncateText from '../TruncateText';

import ListTree from './index';

const {
  getTargetHierarchyByIndex,
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
    uuid: '0',
    contents: [
      {
        name: (
          <TruncateText
            wrapperClassName="line-clamp-1"
            headerTooltipProps={{
              triggerAriaLabel: 'label'
            }}
          >
            file A-1 Really long file name case. Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged.
          </TruncateText>
        ),
        uuid: '0-0',
        contents: []
      },
      {
        name: 'file A-2',
        uuid: '0-1',
        contents: [
          {
            name: 'file A-2-a',
            uuid: '0-1-0',
            contents: []
          }
        ]
      }
    ]
  },
  {
    name: 'file 2',
    uuid: '1',
    contents: [
      {
        name: 'file 2a',
        uuid: '1-0',
        contents: []
      },
      {
        name: 'file 2b',
        uuid: '1-1',
        contents: [
          {
            name: 'file 2b1',
            uuid: '1-1-0',
            contents: []
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
const ControlledNestedTreeBase = ({
  data,
  openNodeMap,
  setOpenNodeMap,
  selectedNodeMap,
  setSelectedNodeMap,
  setFocused,
  indent = 1,
  focused = '',
  focusIDPrefix
}) =>
  data.map((item, index) => (
    <ListTree
      key={item.uuid}
      indentationLevel={indent}
      isTreeOpen={openNodeMap[item.uuid]}
    >
      <ListTreeNode
        isFocused={focused ? focused === item.uuid : false}
        label={item.name}
        focusUUID={item.uuid}
        ariaLabel={item.uuid}
        description={`(level=${indent})`}
        isNodeSelected={selectedNodeMap[item.uuid]}
        focusIDPrefix={focusIDPrefix}
        onNodeClick={() => {
          const newSelectedNodeMap = { ...selectedNodeMap };
          if (newSelectedNodeMap[item.uuid] !== undefined) {
            newSelectedNodeMap[item.uuid] = !newSelectedNodeMap[item.uuid];
          } else {
            newSelectedNodeMap[item.uuid] = true;
          }
          setSelectedNodeMap(newSelectedNodeMap);
        }}
        onNodeOpen={() => {
          const newOpenNodeMap = { ...openNodeMap };
          if (newOpenNodeMap[item.uuid] !== undefined) {
            newOpenNodeMap[item.uuid] = !newOpenNodeMap[item.uuid];
          } else {
            newOpenNodeMap[item.uuid] = true;
          }
          setOpenNodeMap(newOpenNodeMap);
        }}
        hideArrowIcon={!item.contents?.length}
        leadingIcon={
          index % 2 === 0 && <MdFolderSpecial className="h-full w-full" />
        }
        trailingVisualElement={
          <Dropdown
            onOpenChange={(isOpen) => {
              setFocused?.(isOpen ? item.name : null);
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
        <ListTreeNodeContents isTreeOpen={openNodeMap[item.uuid]}>
          <ControlledNestedTreeBase
            openNodeMap={openNodeMap}
            setOpenNodeMap={setOpenNodeMap}
            selectedNodeMap={selectedNodeMap}
            setSelectedNodeMap={setSelectedNodeMap}
            data={item.contents}
            focused={focused}
            setFocused={setFocused}
            indent={1 + indent}
            focusIDPrefix={focusIDPrefix}
          />
        </ListTreeNodeContents>
      )}
    </ListTree>
  ));

const ControlledNestedTree = ({ data }) => {
  const [selectedNodeMap, setSelectedNodeMap] = useState({});
  const [listOfItems] = useState(data);
  /**
   * use a map for keeping your treenodes under parent control,
   * Remember: for controlled treenodes or pre-opened treenodes,
   * following props must be compulsorily provided:
   * ListTree => isTreeOpen
   * ListTreeNode => onNodeOpen
   * ListTreeContents => isTreeOpen
   */
  const focusIDPrefix = 'controlled-';
  const [openNodeMap, setOpenNodeMap] = useState({
    0: true,
    1: true
  });
  const onKeyPressSelect = useCallback(
    (itemIndexes) => {
      setSelectedNodeMap((prev) => {
        const newItems = { ...prev };
        newItems[itemIndexes] = true;
        return newItems;
      });
    },
    [setSelectedNodeMap]
  );
  return (
    <ListTreeRootWrapper
      data={listOfItems}
      openNodeMap={openNodeMap}
      setOpenNodeMap={setOpenNodeMap}
      onSelectCallback={onKeyPressSelect}
      focusIDPrefix={focusIDPrefix}
    >
      <ControlledNestedTreeBase
        indent={1}
        data={listOfItems}
        openNodeMap={openNodeMap}
        setOpenNodeMap={setOpenNodeMap}
        selectedNodeMap={selectedNodeMap}
        setSelectedNodeMap={setSelectedNodeMap}
        focusIDPrefix={focusIDPrefix}
      />
    </ListTreeRootWrapper>
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
  const onCheckboxChange = useCallback(
    (isChecked, targetIndexes) => {
      const { newItems, targetItem } = updateTargetNodes(
        isChecked,
        targetIndexes,
        JSON.parse(JSON.stringify(listOfItems)) // pass a deep copy of the object preferably loadsh deep copy
      );
      const { selectedValuesAdjusted } = getSelectedListTreeItems(
        selectedValue,
        targetItem,
        isChecked
      );
      setSelectedValue(selectedValuesAdjusted);
      setListOfItems(newItems);
    },
    [listOfItems, selectedValue]
  );
  const onKeyPressSelect = useCallback(
    (itemIndexes) => {
      const targetItemHierarchy = getTargetHierarchyByIndex(
        listOfItems,
        itemIndexes
      );
      onCheckboxChange(!targetItemHierarchy[0].isChecked, itemIndexes);
    },
    [listOfItems, onCheckboxChange]
  );
  const focusIDPrefix = 'checkbox-list-';

  return (
    <>
      <InputField
        role="presentation"
        id="selectedbar"
        label={`${Object.values(selectedValue).length} Items Selected:`}
        wrapperClassName="min-w-[300px] cursor-pointer"
        addOnBeforeInlineWrapperClassName="max-w-[300px]"
        addOnBeforeInline={
          <TruncateText
            tooltipTriggerIcon={
              <span className="absolute left-0 top-0 text-xs font-medium ">
                ({Object.keys(selectedValue)?.length})
              </span>
            }
            headerTooltipProps={{
              triggerAriaLabel: 'label'
            }}
          >
            {Object.values(selectedValue)
              ?.map((el) => el.name)
              ?.join(', ')}
          </TruncateText>
        }
        style={{ width: 0, paddingLeft: 0 }}
        disabled
      />
      <p className="mb-4 mt-3">
        <InputField
          id="searchbar"
          role="presentation"
          label="Search Items here"
          onChange={onSearchChange}
        />
      </p>
      {Object.keys(filteredUUIDs.filteredUUIDsWithHierarchy).length === 0 &&
      searchValue.length ? (
        <p className="text-sm">No items matching search results</p>
      ) : (
        <ListTreeRootWrapper
          data={listOfItems}
          openNodeMap={openNodeMap}
          setOpenNodeMap={setOpenNodeMap}
          filteredUUIDs={filteredUUIDs}
          onSelectCallback={onKeyPressSelect}
          focusIDPrefix={focusIDPrefix}
        >
          <ControlledNestedTreeWithCheckbox
            openNodeMap={openNodeMap}
            setOpenNodeMap={setOpenNodeMap}
            data={listOfItems}
            searchValue={searchValue}
            filteredUUIDs={filteredUUIDs}
            isParentSearched={false}
            allowFilter={searchValue.length}
            onCheckboxChange={onCheckboxChange}
            focusIDPrefix={focusIDPrefix}
          />
        </ListTreeRootWrapper>
      )}
    </>
  );
};

const UnconrolledNestedTree = ({ data, indent = 1 }) => {
  const [selectedNodeMap, setSelectedNodeMap] = useState({});

  return data.map((item) => (
    <ListTree key={item.name} indentationLevel={indent}>
      <ListTreeNode
        label={item.name}
        ariaLabel={item.name}
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
  ));
};

const FocusedNodeNestedTree = ({ data }) => {
  const [selectedNodeMap, setSelectedNodeMap] = useState({});
  const [listOfItems] = useState(data);
  const [focused, setFocused] = useState(null);
  /**
   * use a map for keeping your treenodes under parent control,
   * Remember: for controlled treenodes or pre-opened treenodes,
   * following props must be compulsorily provided:
   * ListTree => isTreeOpen
   * ListTreeNode => onNodeOpen
   * ListTreeContents => isTreeOpen
   */
  const [openNodeMap, setOpenNodeMap] = useState({
    0: true,
    1: true
  });
  const focusIDPrefix = 'focused-list-';
  const onKeyPressSelect = useCallback(
    (itemIndexes) => {
      setSelectedNodeMap((prev) => {
        const newItems = { ...prev };
        newItems[itemIndexes] = true;
        return newItems;
      });
    },
    [setSelectedNodeMap]
  );
  return (
    <ListTreeRootWrapper
      data={listOfItems}
      openNodeMap={openNodeMap}
      setOpenNodeMap={setOpenNodeMap}
      onSelectCallback={onKeyPressSelect}
      focusIDPrefix={focusIDPrefix}
    >
      <ControlledNestedTreeBase
        indent={1}
        data={listOfItems}
        openNodeMap={openNodeMap}
        setOpenNodeMap={setOpenNodeMap}
        selectedNodeMap={selectedNodeMap}
        setSelectedNodeMap={setSelectedNodeMap}
        focused={focused}
        setFocused={setFocused}
        focusIDPrefix={focusIDPrefix}
      />
    </ListTreeRootWrapper>
  );
};

const ControlledTreeTemplate = () => (
  <ControlledNestedTree data={listTreeDemoDataSet} />
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
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
ControlledNestedTree.propTypes = propTypeDefault;
UnconrolledNestedTree.propTypes = propTypeDefault;
FocusedNodeNestedTree.propTypes = propTypeDefault;
