import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Tabs
} from '@browserstack/bifrost';

import { getProjectsThunk } from '../../../api';
import SingleFixedSelect from '../../../common/components/SingleFixedSelect';

const IssueForm = ({ integrations }) => {
  const dispatch = useDispatch();

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
      label: 'Design (DES)',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ticketTypes: [
        {
          value: 'story',
          label: 'Story',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
          value: 'bug',
          label: 'Bug',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      ]
    },
    {
      value: 2,
      label: 'Arlene Mccoy',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ticketTypes: [
        {
          value: 'story',
          label: 'Story',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      ]
    }
  ];

  const [selected, setSelected] = useState(options[0]);
  const [projectSelected, setProjectSelected] = useState(COMBOBOX_OPTIONS[0]);
  const [issueTypeSelected, setIssueTypeSelected] = useState(
    projectSelected.ticketTypes[0]
  );

  useEffect(() => {
    dispatch(getProjectsThunk(selected.value));
  }, [dispatch, selected.value]);

  return (
    <div>
      <SelectMenu onChange={(val) => setSelected(val)} value={selected}>
        <div className="flex items-center">
          <SelectMenuLabel wrapperClassName="flex-1 mr-3 text-base-500 min-w-fit">
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
      <SingleFixedSelect
        value={projectSelected}
        setValue={setProjectSelected}
        label="Project"
        required
        options={COMBOBOX_OPTIONS}
        wrapperClassName="my-3"
      />
      <Tabs
        tabsArray={[
          { name: 'Create issue' },
          { name: 'Update existing issue' }
        ]}
      />
      <SingleFixedSelect
        value={issueTypeSelected}
        setValue={setIssueTypeSelected}
        label="Issue type"
        required
        options={projectSelected.ticketTypes}
        wrapperClassName="my-3"
      />
    </div>
  );
};

export default IssueForm;
