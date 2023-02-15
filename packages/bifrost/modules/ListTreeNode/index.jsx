import React, { Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

import { ChevronDownIcon, ChevronRightIcon, MdFolder } from '../Icon';

import './styles.scss';

const ListTreeNode = ({
  isFocused,
  hideArrowIcon,
  label,
  description,
  nodeLabelClassName,
  onTrailingIconClick,
  leadingIcon,
  onNodeClick,
  onNodeOpen,
  isNodeSelected,
  trailingVisualElement
}) => (
  <div
    className={twClassNames(
      'hover:bg-base-100 focus:bg-base-100 focus:border-info-600  group flex flex-1 items-center justify-between rounded border border-transparent p-1.5',
      {
        'bg-info-50': isNodeSelected,
        'bg-base-100': isFocused
      }
    )}
    tabIndex="0"
    role="button"
    onClick={() => {
      onNodeClick?.();
    }}
    onKeyPress={() => {}}
  >
    <div className="flex w-4 grow items-center">
      <Disclosure.Button as={Fragment}>
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

      <div className="text-info-400 mr-2 h-5 w-5 shrink-0 select-none">
        {leadingIcon || <MdFolder className="h-full w-full" />}
      </div>

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
        className={twClassNames('hidden group-hover:flex group-focus:flex', {
          flex: isFocused
        })}
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
        'text-base-600 text-xs leading-5 truncate max-w-[55px]',
        {
          'font-medium': isNodeSelected
        }
      )}
    >
      {description}
    </div>
  </div>
);

ListTreeNode.propTypes = {
  isFocused: PropTypes.bool,
  hideArrowIcon: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  nodeLabelClassName: PropTypes.string,
  onTrailingIconClick: PropTypes.func,
  onNodeClick: PropTypes.func,
  onNodeOpen: PropTypes.func,
  isNodeSelected: PropTypes.bool,
  trailingVisualElement: PropTypes.node,
  leadingIcon: PropTypes.node
};

ListTreeNode.defaultProps = {
  isFocused: false,
  hideArrowIcon: false,
  label: 'Folder Name',
  description: '(762)',
  nodeLabelClassName: '',
  onTrailingIconClick: () => {},
  onNodeClick: () => {},
  onNodeOpen: () => {},
  isNodeSelected: false,
  trailingVisualElement: null,
  leadingIcon: null
};

export default ListTreeNode;
