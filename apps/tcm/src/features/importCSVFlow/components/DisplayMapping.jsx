import React from 'react';
import { MdCheckCircle } from '@browserstack/bifrost';
import {
  TMAlerts,
  TMBadge,
  TMButton,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const DisplayMapping = ({
  fieldMappings,
  onEditMapping,
  nameToDisplayMapper
}) => (
  <div>
    <div className="my-4">
      <TMAlerts
        show
        description={`Ta Da! We have mapped all ${
          Object.keys(fieldMappings).length
        } fields from CSV to Test Management fields automatically.`}
        linkText={null}
        modifier="success"
        alertIcon={<MdCheckCircle className="text-success-600 h-5 w-5" />}
      />
    </div>
    <div className="flex flex-wrap">
      {Object.entries(fieldMappings).map(([key, values]) => (
        <div className="mb-4 basis-1/2">
          <TMBadge
            wrapperClassName="hover:bg-base-100"
            size="large"
            text={
              <span>
                {key} &rarr; &nbsp;
                {!nameToDisplayMapper[values] && (
                  <TMTooltip
                    size="xs"
                    placementSide="top"
                    theme="dark"
                    content={
                      <>
                        <TMTooltipBody>
                          <p className="text-sm">
                            This is a unique CSV column that doesn’t match with
                            any of our fields. This is automatically mapped to
                            be created as a new Custom Field. You can edit
                            mapping if needed.
                          </p>
                        </TMTooltipBody>
                      </>
                    }
                  >
                    Ignore Field
                  </TMTooltip>
                )}
                {nameToDisplayMapper[values]}
              </span>
            }
          />
        </div>
      ))}
    </div>
    <TMButton variant="secondary" onClick={onEditMapping}>
      Edit Field & Value Mapping
    </TMButton>
  </div>
);

DisplayMapping.propTypes = {
  fieldMappings: PropTypes.shape({}),
  onEditMapping: PropTypes.func,
  nameToDisplayMapper: PropTypes.shape({})
};

DisplayMapping.defaultProps = {
  fieldMappings: {},
  onEditMapping: () => {},
  nameToDisplayMapper: {}
};

export default DisplayMapping;
