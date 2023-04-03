import Attachments from '../Attachments';
import Checkbox from '../Checkbox';
import DateField from '../DateField';
import DatetimeField from '../DatetimeField';
import MultiValueSelect from '../MultiValueSelect';
import NestedSingleValueSelect from '../NestedSingleValueSelect';
import Paragraph from '../Paragraph';
import SingleValueSelect from '../SingleValueSelect';
import TextInput from '../TextInput';

const FormFieldMap = {
  text: TextInput,
  paragraph: Paragraph,
  date: DateField,
  datetime: DatetimeField,
  file: Attachments,
  numeric: TextInput,
  checkbox: Checkbox,
  'multi-text': MultiValueSelect,
  'multi-value-select': MultiValueSelect,
  'single-value-select': SingleValueSelect,
  'nested-single-value-select': NestedSingleValueSelect
};

export default FormFieldMap;
