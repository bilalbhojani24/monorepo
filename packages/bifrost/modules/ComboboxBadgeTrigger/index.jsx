import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import {
  arrayOf,
  func,
  node,
  number,
  oneOfType,
  shape,
  string
} from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';
import Badge from '../Badge';
import Button from '../Button';
import { ChevronUpDownIcon, ExclamationCircleIcon, MdCancel } from '../Icon';
import Loader from '../Loader';

const ComboboxBadgeTrigger = ({
  onInputValueChange,
  placeholder,
  onBadgeClose,
  currentSelected,
  onClearAll,
  leadingIcon
}) => {
  const buttonRef = useRef();
  const comboInputRef = useRef();
  const divRef = useRef();

  const {
    setWidth,
    errorText,
    isLoading,
    open,
    disabled,
    query,
    setQuery,
    isLoadingRight
  } = useContext(ComboboxContextData);

  useEffect(() => {
    if (open) setWidth(buttonRef.current?.offsetWidth);
  }, [setWidth, open]);

  const keepDrawerOpen = (e) => {
    if (open) {
      e.preventDefault();
      comboInputRef.current.focus();
    }
  };

  const getWidth = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font =
      '14px Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji';
    const { width } = ctx.measureText(query);
    divRef.current.style.width = `${width}px`;
  }, [query]);

  useEffect(() => {
    getWidth();
  }, [query, getWidth]);

  return (
    <Popover.Trigger ref={buttonRef} asChild>
      <Combobox.Button
        as="section"
        className={twClassNames(
          'appearance-none cursor-pointer border-base-300 relative flex items-center border px-2 py-1.5 rounded-md text-sm leading-6 bg-white',
          {
            'focus-within:border-brand-500 focus-within:ring-1 focus-within:outline-none focus-within:ring-brand-500':
              !disabled,
            'pr-2 focus-within:border-danger-300 focus-within:ring-danger-300':
              errorText,
            'border-danger-300': errorText,
            'cursor-not-allowed border-base-200 bg-base-50 text-base-500':
              disabled
          }
        )}
        onClick={(e) => {
          keepDrawerOpen(e);
        }}
      >
        {leadingIcon && <div className="pr-2">{leadingIcon}</div>}

        <div className="relative flex flex-1 flex-wrap gap-2 overflow-hidden">
          {currentSelected?.map((i) => (
            <Badge
              key={i.value}
              wrapperClassName="z-10 break-all"
              text={i.label}
              hasRemoveButton
              modifier={i?.isError ? 'error' : 'base'}
              onClose={() => {
                if (open) {
                  comboInputRef.current.focus();
                }
                onBadgeClose(i);
              }}
              disabled={disabled}
            />
          ))}

          <div
            className={twClassNames('max-w-full', {
              'flex-1': currentSelected.length <= 0
            })}
            style={{
              minWidth: '2px'
            }}
            ref={divRef}
          >
            <Combobox.Input
              {...(currentSelected.length <= 0 && {
                placeholder: isLoading ? null : placeholder
              })}
              className={twClassNames(
                'cursor-pointer focus:ring-0 focus-outline-0 focus-border-none border-0 sm:text-sm p-0 w-full text-sm',
                {
                  'border-base-200 bg-base-50 text-base-500': disabled
                }
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
        </div>

        <div className="mr-5 flex space-x-2">
          {currentSelected?.length > 0 && (
            <Button
              variant="minimal"
              wrapperClassName="z-10"
              onClick={() => {
                if (onClearAll) onClearAll();
              }}
              colors="white"
              disabled={disabled}
            >
              <MdCancel className="text-base-400 h-5 w-5" />
            </Button>
          )}
          {isLoadingRight && (
            <span className="text-base-500 flex items-center rounded-r-md focus:outline-none">
              <Loader wrapperClassName="text-base-200 fill-base-400 " />
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
        <Combobox.Button className="absolute inset-y-0 right-1 flex items-center justify-end rounded-r-md focus:outline-none">
          <ChevronUpDownIcon
            className="text-base-400 h-5 w-5"
            aria-hidden="true"
          />
        </Combobox.Button>
      </Combobox.Button>
    </Popover.Trigger>
  );
};

ComboboxBadgeTrigger.propTypes = {
  currentSelected: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string
    })
  ),
  onBadgeClose: func,
  onClearAll: func,
  onInputValueChange: func,
  leadingIcon: node,
  placeholder: string
};

ComboboxBadgeTrigger.defaultProps = {
  currentSelected: [],
  onBadgeClose: null,
  onClearAll: null,
  onInputValueChange: null,
  leadingIcon: null,
  placeholder: ''
};

export default ComboboxBadgeTrigger;
