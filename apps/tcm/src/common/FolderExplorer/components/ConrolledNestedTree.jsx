import React from 'react';
import {
  TMDropdown,
  TMListTree,
  TMListTreeNode,
  TMListTreeNodeContents
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const ConrolledNestedTree = ({
  foldersArray,
  indent,
  onFolderOpen,
  onFolderClick,
  actionsEnabled,
  actionOptions,
  onActionClick,
  selectedNodesId
}) => (
  /**
   * use a map for keeping your treenodes under parent control,
   * Remember: for controlled treenodes or pre-opened treenodes,
   * following props must be compulsorily provided:
   * ListTree => isTreeOpen
   * ListTreeNode => onNodeOpen
   * ListTreeContents => isTreeOpen
   */

  <>
    {foldersArray.map((item) => (
      <TMListTree
        key={item.id}
        indentationLevel={indent}
        isTreeOpen={item.isOpened}
      >
        <TMListTreeNode
          label={item.name}
          description=""
          // nodeLabelClassName="max-w-xs"
          isNodeSelected={selectedNodesId.includes(`${item?.id}`)}
          onNodeClick={() => onFolderClick(item)}
          onNodeOpen={() => onFolderOpen(item)}
          trailingVisualElement={
            <>
              {actionsEnabled && actionOptions.length && (
                <TMDropdown
                  onClick={(e) => onActionClick({ e, folder: item })}
                  triggerVariant="meatball-button"
                  options={actionOptions}
                />
              )}
            </>
          }
        />
        {!!item?.contents && (
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
            />
          </TMListTreeNodeContents>
        )}
      </TMListTree>
    ))}
  </>
);

ConrolledNestedTree.propTypes = {
  foldersArray: PropTypes.arrayOf(PropTypes.object),
  indent: PropTypes.number,
  actionsEnabled: PropTypes.bool,
  onFolderOpen: PropTypes.func,
  onActionClick: PropTypes.func,
  onFolderClick: PropTypes.func,
  actionOptions: PropTypes.arrayOf(PropTypes.object),
  selectedNodesId: PropTypes.arrayOf(PropTypes.number)
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
};

export default ConrolledNestedTree;
