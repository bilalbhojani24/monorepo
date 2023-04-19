/* eslint-disable tailwindcss/no-arbitrary-value */
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

  const badgeValue = (field, showField) => (
    <span>
      {!mappedFields.includes(field) && (
        <span className="text-sm font-black">&#x2605; </span>
      )}
      {field} &rarr; &nbsp;
      {mappedFields.includes(field) && (
        <>{nameToDisplayMapper[fieldMappings[field]]}</>
      )}
      {showField && `${field}`}
    </span>
  );

  return (
    <div>
      <div className="my-4 px-5">
        <TMAlerts
          show
          description={`Yay! We have mapped ${allImportFields.length} fields from CSV to Test Management fields automatically.`}
          linkText={null}
          modifier="success"
          alertIcon={<MdCheckCircle className="text-success-600 h-5 w-5" />}
        />
      </div>
      <div className="flex max-h-[calc(100vh-550px)] flex-wrap overflow-scroll px-5 [&>*:nth-child(even)]:pl-2 [&>*:nth-child(odd)]:pr-2">
        {allImportFields.map((field) => (
          <div className="mb-4 w-1/2">
            <TMBadge
              wrapperClassName="hover:bg-base-100"
              size="large"
              text={
                unmappedFields.includes(field) ? (
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
                      {badgeValue(field, true)}
                    </TMTooltip>
                  </>
                ) : (
                  badgeValue(field)
                )
              }
            />
          </div>
        ))}
      </div>
      <div className="bg-base-50  flex justify-end p-4">
        <TMButton variant="secondary" onClick={onEditMapping}>
          Edit Field & Value Mapping
        </TMButton>
      </div>
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
