import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { COMBOBOX_OPTIONS } from '../ComboBox/const/comboBoxConstants';
import ComboboxLabel from '../ComboboxLabel';

import ComboboxBadge from './index';

const defaultConfig = {
  title: 'Application/Components/ComboboxBadge',
  component: ComboboxBadge,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ComboboxBadge from 'bifrost/ComboboxBadge'"}
        />
      )
    }
  },
  argTypes: {
    options: {
      defaultValue: COMBOBOX_OPTIONS
    }
  },
  controls: {}
};
const Template = (args) => <ComboboxBadge {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;

export const ControlledBadgeCombobox = () => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState(COMBOBOX_OPTIONS);

  const [states, setStates] = useState({
    rightLoader: false,
    disable: false,
    errorText: ''
  });

  return (
    <>
      <ComboboxBadge
        options={options}
        label={<ComboboxLabel>Assigned to</ComboboxLabel>}
        value={selected}
        onChange={(currentItem, val) => {
          const foundObject = options.find(
            (obj) => obj.value === currentItem.value
          );
          if (!foundObject) {
            setOptions([...options, currentItem]);
          }
          setSelected(val);
        }}
        onBadgeCrossClick={(val, removedItem) => {
          console.log(removedItem);
          setSelected(val);
        }}
        deleteOnBackspace={(val, removedItem) => {
          console.log(removedItem);
          setSelected(val);
        }}
        onClearAll={(val) => {
          setSelected(val);
        }}
        comboboxProps={{
          errorText: states.errorText,
          isLoadingRight: states.rightLoader,
          isLoading: states.leftLoader,
          disabled: states.disable
        }}
      />

      <div className="mt-5 space-x-2">
        <Button
          onClick={() => {
            setStates({ ...states, rightLoader: !states.rightLoader });
          }}
        >
          Toogle Right Loader
        </Button>
        <Button
          onClick={() => {
            setStates({ ...states, disable: !states.disable });
          }}
        >
          Toogle Disable
        </Button>
        <Button
          onClick={() => {
            setStates({
              ...states,
              errorText: states.errorText.length > 0 ? '' : 'Error text'
            });
          }}
        >
          Toogle Error
        </Button>
      </div>
    </>
  );
};

export const UncontrolledBadgeCombobox = () => {
  const [options, setOptions] = useState(COMBOBOX_OPTIONS);
  return (
    <ComboboxBadge
      options={options}
      label={<ComboboxLabel>Assigned to</ComboboxLabel>}
      defaultValue={[]}
      onChange={(currentItem) => {
        const foundObject = options.find(
          (obj) => obj.value === currentItem.value
        );
        if (!foundObject) {
          setOptions([...options, currentItem]);
        }
      }}
      onBadgeCrossClick={(val, removedItem) => {
        console.log(val);
        console.log(removedItem);
      }}
      deleteOnBackspace={(val, removedItem) => {
        console.log(val);
        console.log(removedItem);
      }}
      onClearAll={(val) => {
        console.log(val);
      }}
      // onInputChange={async (value) =>
      //   await new Promise((resolve) =>
      //     setTimeout(() => {
      //       const newOption = { label: 'Bilal', value: 1000 };
      //       const updated = [...COMBOBOX_OPTIONS, newOption];
      //       resolve(updated);
      //     }, 1000)
      //   )
      // }
    />
  );
};
