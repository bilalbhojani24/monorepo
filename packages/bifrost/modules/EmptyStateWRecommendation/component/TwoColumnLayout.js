import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../Button';

const TwoColumnLayout = ({ item, handleClick }) => {
  return (
    <li>
      <Button
        buttonType="rounded-button"
        variant="white"
        wrapperClassName="group flex w-full items-center justify-between space-x-3 shadow-sm text-left"
        onClick={(e) => {
          handleClick(e, item.handleButtonClick, item);
        }}
      >
        <span className="flex min-w-0 flex-1 items-center space-x-3">
          <span className="block flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={item.image} alt="" />
          </span>
          <span className="block min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-gray-900">{item.title}</span>
            <span className="block truncate text-sm font-medium text-gray-500">{item.description}</span>
          </span>
        </span>
        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
          <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
        </span>
      </Button>
    </li>
  );
};

export default TwoColumnLayout;
