import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { RadioGroup } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

const RadioTable = (props) => {
  const { options, onChange, withDescription } = props;
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (e) => {
    setSelected(e);
    onChange(e);
  };

  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <RadioGroup.Label className="sr-only"> Pricing plans </RadioGroup.Label>
      <div className="relative -space-y-px rounded-md bg-white">
        {options.map((option, optionIdx) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({ checked }) =>
              twClassNames(
                {
                  'rounded-tl-md rounded-tr-md': optionIdx === 0,
                  'rounded-bl-md rounded-br-md':
                    optionIdx === options.length - 1,
                  'bg-brand-50 border-brand-200 z-10': checked,
                  'border-base-200': !checked
                },
                'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center text-sm">
                  <span
                    className={twClassNames(
                      {
                        'bg-brand-600 border-transparent': checked,
                        'bg-white border-base-300': !checked,
                        'ring-2 ring-offset-2 ring-brand-500': active
                      },
                      'h-4 w-4 rounded-full border flex items-center justify-center'
                    )}
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <RadioGroup.Label
                    as="span"
                    className={twClassNames(
                      {
                        'text-brand-900': checked,
                        'text-base-900': !checked
                      },
                      'ml-3 font-medium'
                    )}
                  >
                    {option.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={twClassNames(
                      checked ? 'text-brand-700' : 'text-base-500',
                      'block text-sm ml-2'
                    )}
                  >
                    {option.description}
                  </RadioGroup.Description>
                </span>
                {!withDescription && (
                  <>
                    <RadioGroup.Description
                      as="span"
                      className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                    >
                      <span
                        className={twClassNames(
                          {
                            'text-brand-900': checked,
                            'text-base-900': !checked
                          },
                          'font-medium'
                        )}
                      >
                        ${option.firstColVal}
                      </span>
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className={twClassNames(
                        {
                          'text-brand-700': checked,
                          'text-base-500': !checked
                        },
                        'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                      )}
                    >
                      {option.secondColVal}
                    </RadioGroup.Description>
                  </>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

RadioTable.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      firsColVal: PropTypes.string,
      secondColVal: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func,
  withDescription: PropTypes.bool
};
RadioTable.defaultProps = {
  options: [
    {
      name: 'Startup',
      description: 'It is the description 1',
      firstColVal: '$29 / mo ($290 / yr)',
      secondColVal: 'Up to 5 active job postings'
    },
    {
      name: 'Business',
      description: 'It is the description 2',
      firstColVal: '$99 / mo ($990 / yr)',
      secondColVal: 'Up to 25 active job postings'
    },
    {
      name: 'Enterprise',
      description: 'It is the description 3',
      firstColVal: '$249 / mo ($2490 / yr)',
      secondColVal: 'Unlimited active job postings'
    }
  ],
  onChange: () => {},
  withDescription: false
};

export default RadioTable;
