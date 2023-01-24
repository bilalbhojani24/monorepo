import React, { useState } from 'react';
import {
  TMDropdown,
  TMListTree,
  TMListTreeNode,
  TMListTreeNodeContents,
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const ConrolledNestedTree = ({ foldersArray, indent }) => {
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
    'file A': true,
  });

  return (
    <>
      {foldersArray.map((item) => (
        <TMListTree
          key={item.name}
          indentationLevel={indent}
          isTreeOpen={openNodeMap[item.name]}
        >
          <TMListTreeNode
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
              <TMDropdown
                triggerVariant="meatball-button"
                options={[
                  {
                    id: '1',
                    body: 'Edit',
                  },
                  {
                    id: '2',
                    body: 'Duplicate',
                    divider: false,
                  },
                  {
                    id: '3',
                    body: 'Archive',
                    divider: true,
                  },
                ]}
              />
            }
          />
          {!!item?.contents && (
            <TMListTreeNodeContents isTreeOpen={openNodeMap[item.name]}>
              <ConrolledNestedTree data={item.contents} indent={1 + indent} />
            </TMListTreeNodeContents>
          )}
        </TMListTree>
      ))}
    </>
  );
};

ConrolledNestedTree.propTypes = {
  foldersArray: PropTypes.arrayOf(PropTypes.object),
  indent: PropTypes.number,
};

ConrolledNestedTree.defaultProps = {
  foldersArray: [],
  indent: 1,
};

export default ConrolledNestedTree;
