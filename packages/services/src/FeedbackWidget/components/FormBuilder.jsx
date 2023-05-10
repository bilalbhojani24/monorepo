import React from 'react';
import { InputField, TextArea } from '@browserstack/bifrost';

const fields = [
  {
    label: 'Other comments',
    fileType: 'textarea',
    placeholder: 'Please elaborate here',
    isMandatory: true,
    isResizable: true

    // initialValue: ''
  },
  {
    label: 'Business email',
    fileType: 'input',
    placeholder: 'you@example.com',
    // initialValue: '',
    wrapperClassName: '',
    isMandatory: true
  }
];

const FormBuilder = () => {
  //   const [fields, setFields] = useState([]);
  console.log('');
  return (
    <div className="space-y-2">
      {fields.map((field) => {
        if (field.fileType === 'textarea') return <TextArea {...field} />;
        if (field.fileType === 'input') return <InputField {...field} />;
        return null;
      })}
    </div>
  );
};

export default FormBuilder;
