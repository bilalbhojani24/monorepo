import React, { useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../../Button';
import { MdClose, MdSearch, MdSubdirectoryArrowLeft } from '../../Icon';

const SearchField = React.forwardRef(
  ({ isSearchOpen, setIsSearchOpen }, ref) => {
    const trapRef = useRef();
    const [searchValue, setSearchValue] = useState('');

    const onSubmitSearch = () => {
      if (searchValue) {
        window.location.href = `https://www.browserstack.com/search?query=${searchValue}&type=all`;
      }
    };

    useEffect(() => {
      const trapNode = trapRef.current;
      const focusableEls = trapNode.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];

      const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus();
              event.preventDefault();
            }
          } else if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            event.preventDefault();
          }
        }
      };

      trapNode.addEventListener('keydown', handleKeyDown);

      return () => {
        trapNode.removeEventListener('keydown', handleKeyDown);
      };
    }, [searchValue]);

    return (
      <div
        ref={trapRef}
        className={twClassNames(
          `relative flex h-full flex-col overflow-auto bg-white shadow-xl w-screen inset-0`
        )}
      >
        <div
          className={twClassNames(
            'flex flex-col justify-center items-center h-16 bg-base-50 w-full'
          )}
        >
          <div
            className={twClassNames(
              'relative rounded-md shadow-sm w-11/12 lg:w-[940px]'
            )}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MdSearch className="text-base-500 h-5 w-5" />
            </div>
            <input
              type="text"
              className={twClassNames(
                'block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm pl-10 pr-10'
              )}
              placeholder="Search across browserstack.com"
              value={searchValue}
              ref={ref}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSubmitSearch();
                if (e.key === 'Escape') setIsSearchOpen(!isSearchOpen);
              }}
            />
            <div
              className={twClassNames(
                'absolute inset-y-0 right-0 flex items-center pr-3 gap-2'
              )}
            >
              {searchValue && (
                <>
                  <Button
                    variant="minimal"
                    colors="white"
                    isIconOnlyButton
                    icon={<MdClose className="text-base-500 h-5 w-5" />}
                    onClick={() => setSearchValue('')}
                    wrapperClassName="p-0"
                  />
                  <Button
                    colors="white"
                    size="extra-small"
                    iconPlacement="end"
                    icon={
                      <MdSubdirectoryArrowLeft className="text-base-500 h-4 w-4" />
                    }
                    wrapperClassName="py-1"
                    onClick={onSubmitSearch}
                  >
                    Press
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SearchField.propTypes = {
  isSearchOpen: PropTypes.bool.isRequired,
  setIsSearchOpen: PropTypes.func.isRequired
};

export default SearchField;
