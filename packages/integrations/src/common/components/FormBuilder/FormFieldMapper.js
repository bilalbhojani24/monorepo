import TextInput from '../TextInput';
import TextArea from '../TextArea';

const FormFieldMap = {
  text: TextInput,
  paragraph: TextArea,
  data: TextInput,
  datetime: TextInput,
  numeric: TextInput,
  multi_text: TextInput,
  checkbox: TextInput,
  select: TextInput
};

export default FormFieldMap;
