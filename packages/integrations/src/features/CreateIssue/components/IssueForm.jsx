import React, { useState } from 'react';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Tabs
} from '@browserstack/bifrost';

const IssueForm = ({ integrations }) => {
  // console.log(integrations);
  const options = integrations.reduce((acc, curr) => {
    const { key, label, icon } = curr;
    acc.push({
      value: key,
      label: `${label} issue`,
      image: `https://integrations.bsstag.com${icon}`
    });
    return acc;
  }, []);

  const COMBOBOX_OPTIONS = [
    {
      value: 1,
      label: 'Wade Cooper',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      value: 2,
      label: 'Arlene Mccoy',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const [selected, setSelected] = useState(options[0]);
  const [projectSelected, setProjectSelected] = useState(COMBOBOX_OPTIONS[0]);

  return (
    <div>
      <SelectMenu onChange={(val) => setSelected(val)} value={selected}>
        <div className="flex items-center">
          <SelectMenuLabel wrapperClassName="flex-1 mr-3 text-base-500">
            CREATE A:
          </SelectMenuLabel>
          <SelectMenuTrigger />
        </div>
        <SelectMenuOptionGroup>
          {options.map((item) => (
            <SelectMenuOptionItem key={item.value} option={item} />
          ))}
        </SelectMenuOptionGroup>
      </SelectMenu>
      <ComboBox
        onChange={(val) => setProjectSelected(val)}
        value={projectSelected}
      >
        <ComboboxLabel>Assigned to</ComboboxLabel>
        <ComboboxTrigger placeholder="Placeholder" />
        <ComboboxOptionGroup>
          {COMBOBOX_OPTIONS.map((item) => (
            <ComboboxOptionItem
              key={item.value}
              option={item}
              wrapperClassName="text-base-500"
            />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
      <Tabs
        tabsArray={[
          { name: 'Create issue' },
          { name: 'Update existing issue' }
        ]}
      />
    </div>
  );
};

export default IssueForm;
