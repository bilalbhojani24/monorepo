import React, { useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { func, string } from '../../shared/proptypesConstants';
import Badge from '../Badge';
import Button from '../Button';
import {
  ChevronUpDownIcon,
  ExclamationCircleIcon,
  MdCancel,
  QuestionMarkCircleIcon
} from '../Icon';
import Loader from '../Loader';

const ComboboxBadgeTrigger = ({
  onInputValueChange,
  placeholder,
  onBadgeClose
}) => {
  const buttonRef = useRef();
  const comboInputRef = useRef();

  const {
    isMulti,
    setWidth,
    errorText,
    isLoading,
    open,
    disabled,
    currentSelectedValues,
    setCurrentSelectedValues,
    query,
    setQuery
  } = useContext(ComboboxContextData);

  useEffect(() => {
    if (open) setWidth(buttonRef.current?.offsetWidth);
  }, [setWidth, open]);

  useEffect(() => {
    const handleBackspace = (event) => {
      if (
        event.keyCode === 8 &&
        query.length <= 0 &&
        currentSelectedValues.length
      ) {
        const newArray = [...currentSelectedValues];
        newArray.pop();
        setCurrentSelectedValues(newArray);
      }
    };

    window.addEventListener('keydown', handleBackspace);

    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [query, currentSelectedValues, setCurrentSelectedValues]);

  const keepDrawerOpen = (e) => {
    if (open) {
      e.preventDefault();
      comboInputRef.current.focus();
    }
  };

  return (
    <Popover.Trigger ref={buttonRef} asChild>
      <div
        className={twClassNames(
          'border-base-300 focus-within:border-brand-500 focus-within:ring-brand-500 relative flex items-center border px-1 focus-within:outline-none focus-within:ring-1 py-2',
          {
            'pr-14': isMulti,
            'pr-12': errorText,
            'border-danger-600': errorText,
            'cursor-not-allowed border-base-200 bg-base-50 text-base-500':
              disabled
          }
        )}
      >
        <div>
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </div>
        <div className="relative flex flex-1 space-x-2">
          {currentSelectedValues?.map((i) => (
            <Badge
              wrapperClassName="z-10"
              text={i.label}
              hasRemoveButton
              modifier={errorText.length ? 'error' : 'base'}
              onClose={() => {
                if (open) {
                  comboInputRef.current.focus();
                }
                onBadgeClose(i);
              }}
            />
          ))}

          <Combobox.Input
            placeholder={isLoading ? null : placeholder}
            className={twClassNames(
              'focus:ring-0 focus-outline-0 focus-border-none bg-white border-0 sm:text-sm flex-1 p-0'
            )}
            onChange={(e) => {
              setQuery(e.target.value);
              onInputValueChange(e);
            }}
            ref={comboInputRef}
            readOnly={isLoading}
            value={query}
            autoComplete="off"
          />
        </div>

        <div className="mr-5 flex space-x-2">
          {currentSelectedValues.length > 0 && (
            <Button variant="minimal" wrapperClassName="z-10">
              <MdCancel className="h-5 w-5" />
            </Button>
          )}
          {isLoading && (
            <span className="text-base-500 flex items-center rounded-r-md focus:outline-none">
              <Loader wrapperStyle="text-base-200 fill-base-400 " />
            </span>
          )}
          {errorText && (
            <span className="flex items-center rounded-r-md focus:outline-none">
              <ExclamationCircleIcon
                className="text-danger-500 h-5 w-5"
                aria-hidden="true"
              />
            </span>
          )}
        </div>
        <Combobox.Button
          className="absolute inset-y-0 left-0 flex w-full items-center justify-end rounded-r-md focus:outline-none"
          onClick={(e) => {
            keepDrawerOpen(e);
          }}
        >
          <ChevronUpDownIcon
            className="text-base-400 h-5 w-5"
            aria-hidden="true"
          />
        </Combobox.Button>
      </div>
    </Popover.Trigger>
  );
};

ComboboxBadgeTrigger.propTypes = {
  onBadgeClose: func,
  onInputValueChange: func,
  placeholder: string
};

ComboboxBadgeTrigger.defaultProps = {
  onBadgeClose: null,
  onInputValueChange: null,
  placeholder: ''
};

export default ComboboxBadgeTrigger;
