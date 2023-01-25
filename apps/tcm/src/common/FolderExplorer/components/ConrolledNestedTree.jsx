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
  actionsEnabled
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
          isNodeSelected={item.isSelected}
          onNodeClick={() => onFolderClick(item)}
          onNodeOpen={() => onFolderOpen(item)}
          trailingVisualElement={
            <>
              {actionsEnabled ? (
                <TMDropdown
                  triggerVariant="meatball-button"
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
              ) : (
                ''
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
  onFolderClick: PropTypes.func
};

ConrolledNestedTree.defaultProps = {
  foldersArray: [],
  indent: 1,
  actionsEnabled: false,
  onFolderOpen: () => {},
  onFolderClick: () => {}
};

export default ConrolledNestedTree;
