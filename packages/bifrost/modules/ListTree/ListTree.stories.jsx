/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Dropdown from '../Dropdown';
import DropdownTriggerWIcon from '../DropdownTriggerWIcon';
import { MdFolderSpecial } from '../Icon';
import ListTreeNode from '../ListTreeNode';
import ListTreeNodeContents from '../ListTreeNodeContents';
import TruncateText from '../TruncateText';

import ListTree from './index';

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
              <Dropdown
                wrapperClassName="flex"
                trigger={<DropdownTriggerWIcon />}
                options={[
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
                ]}
              />
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
              <Dropdown
                wrapperClassName="flex"
                trigger={<DropdownTriggerWIcon />}
                options={[
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
                ]}
              />
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
  const [focused, setFocused] = useState();

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
                wrapperClassName="flex"
                trigger={<DropdownTriggerWIcon />}
                options={[
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
                ]}
                onOpenChange={(isOpen) =>
                  setFocused(isOpen ? item.name : undefined)
                }
              />
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

const FocusedNodeTree = FocusedNodeNestedTreeTemplate.bind({});

export default defaultConfig;
export { ControlledTree, FocusedNodeTree, UncontrolledTree };
