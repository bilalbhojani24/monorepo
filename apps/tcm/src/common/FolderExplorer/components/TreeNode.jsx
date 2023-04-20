import React, { useState } from 'react';
import { AutomationFolderIcon } from '@browserstack/bifrost';
import LoaderIcon from 'assets/svg/loader.svg';
import {
  TMDropdown,
  TMListTreeNode,
  TMTruncateText
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const TreeNode = ({
  item,
  focused,
  selectedNodesId,
  onFolderClick,
  onFolderOpen,
  setFocused,
  actionsEnabled,
  actionOptions,
  onActionClick
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <TMListTreeNode
        // nodeLabelClassName={
        //   disabledFolders?.includes(parseInt(item?.id, 10))
        //     ? 'opacity-25 pointer-events-none'
        //     : ''
        // }
        leadingIcon={
          isLoading && !item.contents ? (
            <div className="flex h-5 w-5 items-center justify-center">
              <img
                src={LoaderIcon}
                alt=""
                className="text-base-400 h-4 w-4 animate-spin"
              />
            </div>
          ) : (
            item?.is_automation && (
              <AutomationFolderIcon className="h-full w-full" />
            )
          )
        }
        isFocused={focused === item.name}
        label={
          <TMTruncateText
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500
            }}
          >
            {item.name}
          </TMTruncateText>
        }
        description={`(${item?.cases_count || 0})`}
        hideArrowIcon={!item?.sub_folders_count || false}
        isNodeSelected={selectedNodesId.includes(parseInt(item?.id, 10))}
        onNodeClick={() => onFolderClick(item)}
        onNodeOpen={() => {
          setIsLoading(!item.isOpened);
          onFolderOpen(item);
        }}
        trailingVisualElement={
          <>
            {actionsEnabled && actionOptions.length && (
              <TMDropdown
                onClick={(selectedOption) =>
                  onActionClick({ selectedOption, folder: item })
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
    </>
  );
};

TreeNode.propTypes = {
  item: PropTypes.objectOf({}),
  onFolderOpen: PropTypes.func,
  setFocused: PropTypes.func,
  focused: PropTypes.bool,
  actionsEnabled: PropTypes.bool,
  onFolderClick: PropTypes.func,
  onActionClick: PropTypes.func,
  selectedNodesId: PropTypes.arrayOf(PropTypes.number),
  actionOptions: PropTypes.arrayOf(PropTypes.object)
  // disabledFolders: PropTypes.arrayOf(PropTypes.number)
};

TreeNode.defaultProps = {
  item: {},
  onFolderOpen: () => {},
  onActionClick: () => {},
  focused: false,
  actionsEnabled: false,
  onFolderClick: () => {},
  setFocused: () => {},
  actionOptions: [],
  selectedNodesId: []
  // disabledFolders: []
};

export default TreeNode;
