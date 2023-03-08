import { FieldType } from './types';

const Field = ({
  required,
  schema: { type, field },
  label,
  key,
  defaultValue: { value },
  placeholder,
  validations,
  options,
  optionsUrl,
  searchUrl
}) => {};

Field.propTypes = FieldType;

export default Field;
