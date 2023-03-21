import Checkbox from '../Checkbox';
import {
  MultiValueSelect,
  NestedSingleValueSelect,
  Paragraph,
  SingleValueSelect,
  TextInput
} from '..';

const FormFieldMap = {
  text: TextInput,
  paragraph: Paragraph,
  // data: TextInput,
  // datetime: TextInput,
  numeric: TextInput,
  checkbox: Checkbox,
  'multi-text': MultiValueSelect,
  'multi-value-select': MultiValueSelect,
  'single-value-select': SingleValueSelect,
  'nested-single-value-select': NestedSingleValueSelect
};

export default FormFieldMap;
