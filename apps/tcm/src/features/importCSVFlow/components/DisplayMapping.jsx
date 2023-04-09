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
  nameToDisplayMapper,
  allImportFields
}) => {
  const mappedFields = Object.keys(fieldMappings).map((key) => key);
  const unmappedFields = allImportFields.filter(
    (field) => !mappedFields.includes(field)
  );

  return (
    <div>
      <div className="my-4">
        <TMAlerts
          show
          description={`Ta Da! We have mapped ${allImportFields.length} fields from CSV to Test Management fields automatically.`}
          linkText={null}
          modifier="success"
          alertIcon={<MdCheckCircle className="text-success-600 h-5 w-5" />}
        />
      </div>
      <div className="flex flex-wrap">
        {allImportFields.map((field) => (
          <div className="mb-4 basis-1/2">
            <TMBadge
              wrapperClassName="hover:bg-base-100"
              size="large"
              text={
                <span>
                  {field} &rarr; &nbsp;
                  {mappedFields.includes(field) && (
                    <>{nameToDisplayMapper[fieldMappings[field]]}</>
                  )}
                  {unmappedFields.includes(field) && (
                    <>
                      <TMTooltip
                        size="xs"
                        placementSide="top"
                        theme="dark"
                        content={
                          <>
                            <TMTooltipBody>
                              {`A new field will be created with this name. If
                                you want to ignore this field, go to "Edit Field
                                & Value Mapping"`}
                            </TMTooltipBody>
                          </>
                        }
                      >
                        {`'${field}'`}
                      </TMTooltip>
                      {/* {fieldMappings[field]?.action === 'ignore' && (
                        <TMTooltip
                          size="xs"
                          placementSide="top"
                          theme="dark"
                          content={
                            <>
                              <TMTooltipBody>
                                {`This field will be ignored and not imported. If
                                you want to read this field, go to "Edit Field &
                                Value Mapping" and select "Create New Field" for
                                this incoming field.`}
                              </TMTooltipBody>
                            </>
                          }
                        >
                          Ignore this field
                        </TMTooltip>
                      )} */}
                    </>
                  )}
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
};

DisplayMapping.propTypes = {
  fieldMappings: PropTypes.shape({}),
  onEditMapping: PropTypes.func,
  nameToDisplayMapper: PropTypes.shape({}),
  allImportFields: PropTypes.arrayOf(PropTypes.string)
};

DisplayMapping.defaultProps = {
  fieldMappings: {},
  onEditMapping: () => {},
  nameToDisplayMapper: {},
  allImportFields: []
};

export default DisplayMapping;
