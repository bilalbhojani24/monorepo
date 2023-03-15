import Checkbox from '../Checkbox';
import Description from '../Description';
import MultiValueSelect from '../MultiValueSelect';
import NestedSingleValueSelect from '../NestedSingleValueSelect';
import SingleValueSelect from '../SingleValueSelect';
import TextArea from '../TextArea';
import TextInput from '../TextInput';

const FormFieldMap = {
  text: TextInput,
  paragraph: TextArea,
  description: Description,
  // data: TextInput,
  // datetime: TextInput,
  // numeric: TextInput,
  checkbox: Checkbox,
  'multi-text': TextInput,
  'multi-value-select': MultiValueSelect,
  'single-value-select': SingleValueSelect,
  'nested-single-value-select': NestedSingleValueSelect
};

export default FormFieldMap;
