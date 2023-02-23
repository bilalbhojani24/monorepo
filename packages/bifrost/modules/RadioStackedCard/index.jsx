import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

import { RADIO_STACKED_CARD_PLACEMENT } from './const/radioStackedCardConstants';

import './styles.scss';

const RadioStackedCard = (props) => {
  const { placement = 'vertical', data, onChange, name } = props;
  const [selected, setSelected] = useState(data[0]);

  return (
    <RadioGroup
      value={selected}
      onChange={(selectedRadioItem) => {
        setSelected(selectedRadioItem);
        if (onChange) onChange(selectedRadioItem);
      }}
    >
      <RadioGroup.Label className="sr-only">{name}</RadioGroup.Label>
      <div
        className={twClassNames('mt-4 ', {
          'grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4':
            placement === RADIO_STACKED_CARD_PLACEMENT.horizontal,
          'space-y-4': placement === RADIO_STACKED_CARD_PLACEMENT.vertical
        })}
      >
        {data.map((item) => (
          <RadioGroup.Option
            disabled={item.disabled || false}
            key={item.id}
            value={item}
            className={({ checked, active }) =>
              twClassNames(
                checked ? 'border-transparent' : 'border-base-300',
                active ? 'border-brand-500 ring-2 ring-brand-500' : '',
                'relative cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                placement === RADIO_STACKED_CARD_PLACEMENT.horizontal
                  ? 'flex border p-4'
                  : 'block border px-6 py-4 sm:flex sm:justify-between'
              )
            }
          >
            {({ active, checked, disabled }) => (
              <>
                <span
                  className={twClassNames('flex flex-1', {
                    'opacity-25 cursor-not-allowed': disabled
                  })}
                >
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="text-base-900 block text-sm font-medium"
                    >
                      {item.label}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="text-base-500 mt-1 flex items-center text-sm"
                    >
                      {item.description}
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className={twClassNames(
                        'mt-6 text-sm font-medium text-base-900',
                        {
                          hidden:
                            placement === RADIO_STACKED_CARD_PLACEMENT.vertical
                        }
                      )}
                    >
                      {item.text}
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className={twClassNames('text-sm font-medium text-base-900', {
                    hidden:
                      placement === RADIO_STACKED_CARD_PLACEMENT.horizontal
                  })}
                >
                  {item.text}
                </RadioGroup.Description>
                {placement === RADIO_STACKED_CARD_PLACEMENT.horizontal ? (
                  <CheckCircleIcon
                    className={twClassNames(
                      !checked ? 'invisible' : '',
                      'h-5 w-5 text-brand-600'
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={twClassNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-brand-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

RadioStackedCard.propTypes = {
  placement: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.string
    })
  ),
  onChange: PropTypes.func,
  name: PropTypes.string
};
RadioStackedCard.defaultProps = {
  placement: 'horizontal',
  data: [],
  onChange: () => {},
  name: 'Radio group'
};

export default RadioStackedCard;
