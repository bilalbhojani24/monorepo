import React, { useState } from 'react';
import {
  TMDropdown,
  TMListTree,
  TMListTreeNode,
  TMListTreeNodeContents,
  TMTruncateText
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
          <TMListTreeNode
            isFocused={focused === item.name}
            label={
              <TMTruncateText hidetooltipTriggerIcon>
                {item.name}
              </TMTruncateText>
            }
            description=""
            hideArrowIcon={!item?.sub_folders_count || false}
            // nodeLabelClassName="max-w-xs"
            isNodeSelected={selectedNodesId.includes(parseInt(item?.id, 10))}
            onNodeClick={() => onFolderClick(item)}
            onNodeOpen={() => onFolderOpen(item)}
            trailingVisualElement={
              <>
                {actionsEnabled && actionOptions.length && (
                  <TMDropdown
                    onClick={(e, selectedOption) =>
                      onActionClick({ e, selectedOption, folder: item })
                    }
                    triggerVariant="meatball-button"
                    options={actionOptions}
                    onOpenChange={(isOpen) =>
                      setFocused(isOpen ? item.name : undefined)
                    }
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
