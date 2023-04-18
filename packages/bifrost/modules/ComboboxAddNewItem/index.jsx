import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import { bool, string } from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';

const ComboboxAddNewItem = ({
  suffix,
  showQuery,
  prefix,
  wrapperClassName
}) => {
  const [width, setWidth] = useState({
    prefixWidth: '',
    suffixWidth: '',
    contentWidth: ''
  });
  const [truncated, setTruncated] = useState(false);
  const { query } = useContext(ComboboxContextData);
  const containerRef = useRef();
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const uniqueId = useId();

  const content = !showQuery ? '' : query;

  useEffect(() => {
    if (showQuery)
      setWidth((w) => ({
        ...w,
        prefixWidth: firstRef.current.offsetWidth,
        suffixWidth: thirdRef.current.offsetWidth
      }));
  }, [showQuery]);

  useEffect(() => {
    if (showQuery) {
      const maxWidth =
        containerRef.current.offsetWidth -
        width.prefixWidth +
        width.suffixWidth;

      setWidth((w) => ({
        ...w,
        contentWidth: maxWidth
      }));
    }
  }, [query, width.prefixWidth, width.suffixWidth, showQuery]);

  useEffect(() => {
    if (showQuery && secondRef && secondRef.current)
      setTruncated(
        secondRef.current.scrollWidth > secondRef.current.clientWidth
      );
  }, [secondRef, query, showQuery]);

  return (
    <Combobox.Option
      value={{
        value: `${uniqueId}-${query}`,
        label: query,
        isNew: true
      }}
      className={({ active }) =>
        twClassNames(
          'group relative cursor-pointer select-none py-2 pl-3 pr-9 text-brand-600 border-t-2 border-base-200 flex items-center',
          {
            'bg-brand-600 text-white': active
          },
          wrapperClassName
        )
      }
      ref={containerRef}
    >
      <p
        ref={firstRef}
        {...(width.prefixWidth && {
          style: {
            width: width.prefixWidth + 5
          }
        })}
        className="pr-1"
      >
        {prefix}
      </p>
      {showQuery && (
        <>
          &#39;
          {truncated && <span>...</span>}
          <p
            ref={secondRef}
            className="flex flex-row-reverse truncate"
            style={{ maxWidth: width.contentWidth }}
          >
            {content}
          </p>
          &#39;
        </>
      )}
      <p
        ref={thirdRef}
        {...(width.suffixWidth && {
          style: {
            minWidth: width.suffixWidth + 5
          }
        })}
        className="pl-1"
      >
        {suffix}
      </p>
    </Combobox.Option>
  );
};

ComboboxAddNewItem.propTypes = {
  suffix: string,
  showQuery: bool,
  prefix: string.isRequired,
  wrapperClassName: string
};
ComboboxAddNewItem.defaultProps = {
  showQuery: false,
  suffix: '',
  wrapperClassName: ''
};

export default ComboboxAddNewItem;
