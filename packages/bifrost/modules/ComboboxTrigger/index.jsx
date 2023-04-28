import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import { func, node, string } from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { ExclamationCircleIcon } from '../Icon';
import Loader from '../Loader';

import TriggerButton from './component/TriggerButton';
import { renderMultiOptions, renderSingleOptions } from './helper';

const ComboboxTrigger = ({ onInputValueChange, placeholder, leadingIcon }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const buttonRef = useRef();
  const onInputValueChangeRef = useLatestRef(onInputValueChange);

  const {
    isMulti,
    setWidth,
    errorText,
    isLoading,
    isLoadingRight,
    loadingText,
    open,
    disabled,
    query,
    setQuery,
    currentSelectedValues,
    comboInputRef
  } = useContext(ComboboxContextData);

  useEffect(() => {
    if (open) {
      setWidth(buttonRef.current?.offsetWidth);
      comboInputRef.current.focus();
    }
    if (!open) {
      onInputValueChangeRef.current?.('');
    }
  }, [setWidth, open, onInputValueChangeRef, comboInputRef]);

  return (
    <Popover.Trigger ref={buttonRef} asChild>
      <Combobox.Button
        as="div"
        className={twClassNames(
          'cursor-pointer border-base-300  relative flex items-center border px-2 py-1.5 rounded-md relative',
          {
            'focus-within:border-brand-500 focus-within:ring-1 focus-within:outline-none focus-within:ring-brand-500':
              !disabled,
            'pr-7': isMulti,
            'border-danger-600': errorText,
            'cursor-not-allowed border-base-200 bg-base-50 text-base-500':
              disabled,
            'border-base-200 bg-base-50 text-base-500 pr-8': isLoading
          }
        )}
        onClick={(e) => {
          if (open) {
            e.preventDefault();
            comboInputRef.current.focus();
          }
        }}
      >
        {leadingIcon && <div className="pr-2">{leadingIcon}</div>}
        {isLoading && (
          <div className="flex items-center space-x-2 pr-2">
            <Loader wrapperClassName="text-base-200 fill-base-400 h-5 w-5" />
            <span>{loadingText}</span>
          </div>
        )}
        {!isMulti &&
          !open &&
          currentSelectedValues?.image &&
          !isLoading &&
          !isLoadingRight && (
            <img
              src={currentSelectedValues.image}
              alt={currentSelectedValues.label}
              className="mr-2 h-5 w-5 shrink-0 rounded-full"
            />
          )}
        <Combobox.Input
          key={open || isLoading}
          placeholder={isLoading ? null : placeholder}
          className={twClassNames(
            'cursor-pointer flex-1 focus:ring-0 focus-outline-0 focus-border-none bg-white border-0 flex-1 p-0 text-ellipsis pr-7',
            {
              'bg-base-50 cursor-not-allowed': disabled || isLoading,
              'pr-0': isTruncated
            }
          )}
          onChange={(e) => {
            const val = e.target.value.trim();
            setQuery(val);
            onInputValueChange?.(val);
          }}
          displayValue={(dv) => {
            if (open || isLoading) return query;
            return isMulti && Array.isArray(dv)
              ? renderMultiOptions(dv)
              : renderSingleOptions(dv);
          }}
          ref={comboInputRef}
          readOnly={isLoading}
          autoComplete="off"
        />
        {(isLoadingRight || errorText || isTruncated) && (
          <div className="mr-5 flex items-center space-x-2 pr-1">
            {isMulti && isTruncated && !open ? (
              <span className="mr-1 font-bold">{`(${currentSelectedValues.length})`}</span>
            ) : null}
            {isLoadingRight && (
              <span className="text-base-500 flex items-center space-x-2 rounded-r-md focus:outline-none">
                <Loader wrapperClassName="text-base-200 fill-base-400 h-5 w-5" />
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
        )}
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center justify-end rounded-r-md px-2 focus:outline-none">
          <TriggerButton setIsTruncated={setIsTruncated} />
        </Combobox.Button>
      </Combobox.Button>
    </Popover.Trigger>
  );
};

ComboboxTrigger.propTypes = {
  leadingIcon: node,
  onInputValueChange: func,
  placeholder: string
};
ComboboxTrigger.defaultProps = {
  leadingIcon: null,
  onInputValueChange: null,
  placeholder: ''
};

export default ComboboxTrigger;
