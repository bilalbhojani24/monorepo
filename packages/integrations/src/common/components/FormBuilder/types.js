import PropTypes from 'prop-types';

const SchemaType = {
  type: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired
};

const OptionType = {
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

const ValidationType = {
  regex: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export const FieldType = {
  required: PropTypes.bool.isRequired,
  schema: PropTypes.shape(SchemaType).isRequired,
  label: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }).isRequired,
  placeholder: PropTypes.string,
  validations: PropTypes.arrayOf(PropTypes.shape(ValidationType)),
  options: PropTypes.arrayOf(
    PropTypes.shape({ ...OptionType, children: PropTypes.arrayOf(OptionType) })
  )
};

export const FormBuilderType = {
  fields: PropTypes.arrayOf(PropTypes.shape(FieldType)),
  handleSubmit: PropTypes.func.isRequired
};
