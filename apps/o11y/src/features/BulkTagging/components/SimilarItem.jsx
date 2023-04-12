import React from 'react';
import { MdOpenInNew } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yCheckbox, O11yHyperlink } from 'common/bifrostProxy';
import TestListStackTrace from 'features/TestList/components/TestListStackTrace';
import PropTypes from 'prop-types';
import { getBuildPath } from 'utils/routeUtils';

function SimilarItem({ data, checked, handleSelect, showCheckBox, border }) {
  return (
    <div
      className={twClassNames('group flex w-full', {
        'border-base-200 border-b py-4 pr-4': border
      })}
    >
      {showCheckBox ? (
        <O11yCheckbox
          border={false}
          wrapperClassName="w-full"
          description="block"
          checked={checked}
          data={{
            description: (
              <TestListStackTrace
                wrapperClassName="ml-0"
                details={{
                  retries: [
                    {
                      logs: {
                        TEST_FAILURE: data.stackTrace
                      }
                    }
                  ]
                }}
              />
            ),
            label: data.name,
            value: data.id
          }}
          onChange={(e) => {
            handleSelect(e, data.id);
          }}
        />
      ) : (
        <div className="w-full">
          <p className="text-sm font-medium leading-5">{data.name}</p>
          <TestListStackTrace
            wrapperClassName="ml-0"
            details={{
              retries: [
                {
                  logs: {
                    TEST_FAILURE: data.stackTrace
                  }
                }
              ]
            }}
          />
        </div>
      )}
      <div className="hidden group-hover:inline-block">
        <O11yHyperlink
          href={`${getBuildPath(
            data.projectNormalisedName,
            data.buildNormalisedName,
            data.buildNumber
          )}?tab=tests&details=${data?.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdOpenInNew className="text-base-900 hover:text-brand-600 h-4 w-4" />
        </O11yHyperlink>
      </div>
    </div>
  );
}

SimilarItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  checked: PropTypes.bool,
  handleSelect: PropTypes.func,
  showCheckBox: PropTypes.bool,
  border: PropTypes.bool
};

SimilarItem.defaultProps = {
  handleSelect: () => {},
  checked: false,
  showCheckBox: true,
  border: true
};

export default SimilarItem;
