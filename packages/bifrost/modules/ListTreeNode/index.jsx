import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { ChevronDownIcon, ChevronRightIcon, MdFolder } from '../Icon';

import './styles.scss';

const ListTreeNode = ({
  hideArrowIcon,
  label,
  description,
  nodeLabelClassName,
  onTrailingIconClick,
  onNodeClick,
  onNodeOpen,
  isNodeSelected,
  trailingVisualElement
}) => (
  <div
    className={twClassNames(
      'hover:bg-base-100 focus:border-info-600  group flex flex-1 items-center justify-between rounded border border-transparent p-1.5',
      {
        'bg-info-50': isNodeSelected
      }
    )}
    tabIndex="0"
    role="button"
    onClick={() => {
      onNodeClick?.();
    }}
    onKeyPress={() => {}}
  >
    <div className="flex items-center">
      <Disclosure.Button as={Fragment}>
        {({ open }) => (
          <div
            className={classNames('mr-1 w-5 select-none', {
              'invisible ': hideArrowIcon
            })}
            role="presentation"
            onClick={(event) => {
              onNodeOpen?.();
              event.stopPropagation();
            }}
          >
            {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </div>
        )}
      </Disclosure.Button>

      <div className="text-info-400 mr-1 w-5 select-none">
        <MdFolder className="max-h-4" />
      </div>

      <div
        className={twClassNames(
          'text-base-700 mr-2 text-xs leading-5 truncate',
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
        className="hidden group-hover:flex"
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
  hideArrowIcon: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  nodeLabelClassName: PropTypes.string,
  onTrailingIconClick: PropTypes.func,
  onNodeClick: PropTypes.func,
  onNodeOpen: PropTypes.func,
  isNodeSelected: PropTypes.bool,
  trailingVisualElement: PropTypes.node
};

ListTreeNode.defaultProps = {
  hideArrowIcon: false,
  label: 'Folder Name',
  description: '(762)',
  nodeLabelClassName: '',
  onTrailingIconClick: () => {},
  onNodeClick: () => {},
  onNodeOpen: () => {},
  isNodeSelected: false,
  trailingVisualElement: null
};

export default ListTreeNode;
