import React, { forwardRef, Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

import { ChevronDownIcon, ChevronRightIcon, MdFolder } from '../Icon';

import ListTreeNodeWrapper from './components/ListTreeNodeWrapper';

import './styles.scss';

const ListTreeNode = forwardRef(
  (
    {
      isFocused,
      hideArrowIcon,
      label,
      focusUUID,
      description,
      nodeLabelClassName,
      onTrailingIconClick,
      leadingIcon,
      onNodeClick,
      onNodeOpen,
      isNodeSelected,
      trailingVisualElement,
      isNodeSelectable,
      showIcon,
      ariaLabel,
      focusIDPrefix
    },
    ref
  ) => (
    <div
      role="treeitem"
      tabIndex={focusUUID === '0' && !isNodeSelectable ? 0 : -1}
      className="group"
      aria-label={ariaLabel}
      data-focus-id={focusIDPrefix + focusUUID}
      data-has-children={!hideArrowIcon}
    >
      <ListTreeNodeWrapper
        isNodeSelectable={isNodeSelectable}
        isNodeSelected={isNodeSelected}
        onNodeClick={onNodeClick}
        isFocused={isFocused}
        ref={ref}
        wrapperClassName={twClassNames(
          'hover:bg-base-100 focus:bg-base-100 focus:border-info-600 flex flex-1 items-center justify-between rounded border border-transparent p-1.5',
          {
            'bg-info-50': isNodeSelected,
            'bg-base-100': isFocused
          }
        )}
      >
        <div className="flex w-full grow items-center">
          <Disclosure.Button as={Fragment} role="button" aria-label={label}>
            {({ open }) => (
              <div
                className={twClassNames('mr-1 w-5 select-none', {
                  'invisible ': hideArrowIcon
                })}
                role="presentation"
                onClick={(event) => {
                  onNodeOpen?.();
                  event.stopPropagation();
                }}
              >
                {open ? (
                  <ChevronDownIcon className="w-5" />
                ) : (
                  <ChevronRightIcon className="w-5" />
                )}
              </div>
            )}
          </Disclosure.Button>

          {showIcon && (
            <div className="text-info-400 mr-2 h-5 w-5 shrink-0 select-none">
              {leadingIcon || <MdFolder className="h-full w-full" />}
            </div>
          )}

          <div
            className={twClassNames(
              'text-base-700 mr-2 text-xs leading-5 relative',
              nodeLabelClassName,
              {
                'font-medium': isNodeSelected
              }
            )}
          >
            {label}
          </div>

          <div
            role="presentation"
            className={twClassNames(
              'invisible group-hover:visible group-focus:visible group-focus-within:invisbile opacity-0 flex group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100',
              {
                visible: isFocused
              }
            )}
            onClick={(e) => {
              e.stopPropagation();
              onTrailingIconClick?.();
            }}
          >
            {trailingVisualElement}
          </div>
        </div>

        <div
          className={twClassNames(
            'text-base-600 text-xs leading-5 truncate max-w-[55px] flex-shrink-0',
            {
              'font-medium': isNodeSelected
            }
          )}
        >
          {description}
        </div>
      </ListTreeNodeWrapper>
    </div>
  )
);

ListTreeNode.propTypes = {
  isFocused: PropTypes.bool,
  hideArrowIcon: PropTypes.bool,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  nodeLabelClassName: PropTypes.string,
  onTrailingIconClick: PropTypes.func,
  onNodeClick: PropTypes.func,
  onNodeOpen: PropTypes.func,
  isNodeSelected: PropTypes.bool,
  trailingVisualElement: PropTypes.node,
  leadingIcon: PropTypes.node,
  showIcon: PropTypes.bool,
  isNodeSelectable: PropTypes.bool,
  ariaLabel: PropTypes.string,
  focusUUID: PropTypes.string,
  focusIDPrefix: PropTypes.string
};

ListTreeNode.defaultProps = {
  isFocused: false,
  hideArrowIcon: false,
  description: '',
  nodeLabelClassName: '',
  onTrailingIconClick: () => {},
  onNodeClick: () => {},
  onNodeOpen: () => {},
  isNodeSelected: false,
  trailingVisualElement: null,
  leadingIcon: null,
  showIcon: true,
  isNodeSelectable: true,
  ariaLabel: '',
  focusUUID: undefined,
  focusIDPrefix: ''
};

export default ListTreeNode;
