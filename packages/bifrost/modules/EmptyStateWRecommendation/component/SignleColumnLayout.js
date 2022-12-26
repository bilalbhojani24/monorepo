import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../Button';

const SignleColumnLayout = ({ item, handleClick }) => {
  return (
    <li className="flex items-center justify-between space-x-3 py-4">
      <div className="flex min-w-0 flex-1 items-center space-x-3">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={item.image} alt="" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
          <p className="truncate text-sm font-medium text-gray-500">{item.description}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Button
          variant="white"
          buttonType="rounded-button"
          onClick={(e) => {
            handleClick(e, item.handleButtonClick, item);
          }}
        >
          <PlusIcon className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-900">
            {item.buttonText} <span className="sr-only">{item.item}</span>
          </span>
        </Button>
      </div>
    </li>
  );
};

export default SignleColumnLayout;
