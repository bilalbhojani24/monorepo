import React, { useState } from 'react';
import { TMListTree, TMListTreeNodeContents } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

const ConrolledNestedTree = ({
  foldersArray,
  indent,
  onFolderOpen,
  onFolderClick,
  actionsEnabled,
  actionOptions,
  onActionClick,
  selectedNodesId
  // disabledFolders
}) => {
  const [focused, setFocused] = useState();
  /**
   * use a map for keeping your treenodes under parent control,
   * Remember: for controlled treenodes or pre-opened treenodes,
   * following props must be compulsorily provided:
   * ListTree => isTreeOpen
   * ListTreeNode => onNodeOpen
   * ListTreeContents => isTreeOpen
   */
  return (
    <>
      {foldersArray.map((item) => (
        <TMListTree
          key={item.id}
          indentationLevel={indent}
          isTreeOpen={item.isOpened}
        >
          <TreeNode
            item={item}
            focused={focused}
            selectedNodesId={selectedNodesId}
            onFolderClick={onFolderClick}
            onFolderOpen={onFolderOpen}
            setFocused={setFocused}
            actionsEnabled={actionsEnabled}
            actionOptions={actionOptions}
            onActionClick={onActionClick}
          />
          {!!item?.contents && (
            // !disabledFolders?.includes(parseInt(item?.id, 10)) &&
            <TMListTreeNodeContents isTreeOpen={item.isOpened}>
              <ConrolledNestedTree
                foldersArray={item.contents}
                indent={1 + indent}
                actionsEnabled={actionsEnabled}
                onFolderOpen={onFolderOpen}
                onFolderClick={onFolderClick}
                onActionClick={onActionClick}
                actionOptions={actionOptions}
                selectedNodesId={selectedNodesId}
                // disabledFolders={disabledFolders}
              />
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
  actionsEnabled: PropTypes.bool,
  onFolderOpen: PropTypes.func,
  onActionClick: PropTypes.func,
  onFolderClick: PropTypes.func,
  actionOptions: PropTypes.arrayOf(PropTypes.object),
  selectedNodesId: PropTypes.arrayOf(PropTypes.number)
  // disabledFolders: PropTypes.arrayOf(PropTypes.number)
};

ConrolledNestedTree.defaultProps = {
  foldersArray: [],
  indent: 1,
  actionsEnabled: false,
  onFolderOpen: () => {},
  onActionClick: () => {},
  onFolderClick: () => {},
  actionOptions: [],
  selectedNodesId: []
  // disabledFolders: []
};

export default ConrolledNestedTree;
