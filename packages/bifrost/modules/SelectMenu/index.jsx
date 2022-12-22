import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CHECK_POSITION } from './const/selectMenuConstants';
import './styles.scss';

const OPTIONS = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' }
];

const SelectMenu = (props) => {
  const { label, options, onChange, defaultSelected, checkPosition } = props;
  const [selected, setSelected] = useState(defaultSelected);

  const handleChange = (e) => {
    setSelected(e);
    onChange(e);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        {
                          'text-white bg-indigo-600': active,
                          'text-gray-900': !active,
                          'py-2 pl-3 pr-9': checkPosition === CHECK_POSITION[1],
                          'py-2 pl-8 pr-4': checkPosition === CHECK_POSITION[0]
                        },
                        'relative cursor-default select-none '
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            {
                              'font-semibold': selected,
                              'font-normal': !selected
                            },
                            'block truncate'
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              {
                                'text-white': active,
                                'text-indigo-600': !active,
                                'right-0 pr-4': checkPosition === CHECK_POSITION[1],
                                'left-0 pl-1.5': checkPosition === CHECK_POSITION[0]
                              },
                              'absolute inset-y-0 flex items-center'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

SelectMenu.propTypes = {
  checkPosition: PropTypes.oneOf(CHECK_POSITION),
  defaultSelected: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func
};
SelectMenu.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  defaultSelected: OPTIONS[3],
  label: 'Assigned to',
  options: OPTIONS,
  onChange: () => {}
};

export default SelectMenu;
