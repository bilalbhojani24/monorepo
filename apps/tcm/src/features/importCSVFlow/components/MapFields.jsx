import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  SelectMenu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { TMSectionHeadings, TMSelectMenu } from 'common/bifrostProxy';

import { getFieldMapping } from '../../../api/importCSV.api';
import { setMapFieldModalConfig } from '../slices/importCSVSlice';

import MapFieldModal from './mapFieldModal';
import useImportCSV from './useImportCSV';

const MapFields = ({
  importId,
  importFields,
  defaultFields,
  customFields,
  fieldMappings
}) => {
  const defaultOptions = defaultFields.map((field) => ({
    label: field.display_name,
    value: field.display_name
  }));

  const customOptions = customFields.map((field) => ({
    label: field.display_name,
    value: field.display_name
  }));

  const defaultNameToDisplayMapper = defaultFields.reduce(
    (mapObject, field) => {
      const key = field.name;
      const value = field.display_name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customNameToDisplayMapper = customFields.reduce((mapObject, field) => {
    const key = field.name;
    const value = field.display_name;
    return { ...mapObject, [key]: value };
  }, {});

  const defaultDisplayToNameMapper = defaultFields.reduce(
    (mapObject, field) => {
      const key = field.display_name;
      const value = field.name;
      return { ...mapObject, [key]: value };
    },
    {}
  );

  const customDisplayToNameMapper = customFields.reduce((mapObject, field) => {
    const key = field.display_name;
    const value = field.name;
    return { ...mapObject, [key]: value };
  }, {});

  const mapNameToDisplay = {
    ...defaultNameToDisplayMapper,
    ...customNameToDisplayMapper
  }; // maps field name to display name

  const mapDisplayToName = {
    ...defaultDisplayToNameMapper,
    ...customDisplayToNameMapper
  };

  const defaultTypeMapper = defaultFields.reduce((mapObject, field) => {
    const key = field.name;
    const value = field.type;
    return { ...mapObject, [key]: value };
  }, {});

  const customTypeMapper = customFields.reduce((mapObject, field) => {
    const key = field.name;
    const value = field.type;
    return { ...mapObject, [key]: value };
  }, {});

  const typeMapper = { ...defaultTypeMapper, ...customTypeMapper };
  const [myFieldMappings, setMyFieldMappings] = useState(fieldMappings);
  const { mapFieldModalConfig } = useImportCSV();
  const dispatch = useDispatch();

  const rows = importFields.map((item) => {
    const options = [
      ...defaultOptions,
      ...customOptions,
      { label: 'Ignore Column', value: 'Ignore Column' }
    ];
    return {
      field: item,
      mappedField: {
        options,
        defaultValue: {
          label: mapNameToDisplay[myFieldMappings[item]],
          value: mapNameToDisplay[myFieldMappings[item]]
        }
      },
      mappedValue: myFieldMappings[item]
    };
  });

  const columns = [
    {
      name: 'CSV Column Header',
      key: 'field'
    },
    {
      name: 'Test Management Fields',
      key: 'mappedField'
    },
    {
      name: 'Value Mapping',
      key: 'mappedValue'
    }
  ];

  const handleSelectMenuChange = (field) => (d) => {
    setMyFieldMappings({
      ...myFieldMappings,
      [field]: mapDisplayToName[d.label]
    });
  };

  const handleUpdateClick = (value) => () => {
    dispatch(setMapFieldModalConfig({ show: true, field: value })); // isme value from api add karna hai
    getFieldMapping({
      importId,
      field: mapNameToDisplay[value],
      mapped_field: value
    }).then((data) => console.log('data', data));
  };

  const getMappingForLastCol = (value, mappingType) => {
    switch (mappingType) {
      case 'field_text':
        return (
          <SelectMenu
            checkPosition="right"
            options={[
              { label: 'Text', value: 'Text' },
              { label: 'HTML', value: 'HTML' }
            ]}
          />
        );

      case 'field_dropdown':
        return (
          <span>
            Value Mapped{' '}
            <button
              type="button"
              className="text-brand-400"
              onClick={handleUpdateClick(value)}
              onKeyDown={handleUpdateClick(value)}
            >
              (Update)
            </button>
          </span>
        );

      default:
        return <>No Mapping Needed</>;
    }
  };

  return (
    <div className="border-base-200 m-4 flex w-4/5 flex-col self-center rounded-md border-2 border-solid bg-white p-6">
      <TMSectionHeadings
        title="Map Fields"
        variant="buttons"
        primaryButtonProps={{
          children: 'Back'
        }}
        secondaryButtonProps={{ children: 'Proceed' }}
      />
      <div className="text-base-800 my-4 text-sm">
        Fields and values are mapped by default. You can update the mapping if
        needed:
      </div>
      <Table>
        <TableHead wrapperClass="w-full rounded-xs">
          <TableRow wrapperClass="relative">
            {columns.map((col) => (
              <TableCell key={col.key} variant="header">
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell wrapperClass="py-1">{row.field}</TableCell>
              <TableCell wrapperClass="py-2 mr-4">
                <TMSelectMenu
                  checkPosition="right"
                  options={row.mappedField.options}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...(row.mappedField.defaultValue.label && {
                    defaultValue: row.mappedField.defaultValue
                  })}
                  {...(!row.mappedField.defaultValue.label && {
                    defaultValue: {
                      label: 'Ignore Column',
                      value: 'Ignore Column'
                    }
                  })}
                  onChange={handleSelectMenuChange(row.field)}
                />
              </TableCell>
              <TableCell wrapperClass="py-1">
                {getMappingForLastCol(
                  row.mappedValue,
                  typeMapper[row.mappedValue]
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {mapFieldModalConfig.show && (
        <MapFieldModal modalConfig={mapFieldModalConfig} />
      )}
    </div>
  );
};
export default MapFields;
