import PropTypes from 'prop-types';

// default version that is given by the backend
export const SingleValueSelectRawOptionType = PropTypes.shape({
  key: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
});

const MultiValueSelectRawOptionType = PropTypes.shape({
  SingleValueSelectRawOptionType
});

const NestedSingleValueSelectRawOptionType = PropTypes.shape({
  key: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  options: PropTypes.arrayOf(SingleValueSelectRawOptionType)
});

// Cleaned version that the UI component can consume
export const SingleValueSelectOptionType = PropTypes.shape({
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string
});

const MultiValueSelectOptionType = PropTypes.arrayOf(
  SingleValueSelectOptionType
);
const NestedSingleValueSelectOptionType = PropTypes.shape({
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string,
  child: SingleValueSelectOptionType
});

export const FieldType = {
  value: PropTypes.oneOfType(
    PropTypes.string,
    SingleValueSelectRawOptionType,
    MultiValueSelectRawOptionType,
    NestedSingleValueSelectRawOptionType
  ),
  defaultValue: PropTypes.oneOfType(
    PropTypes.string,
    SingleValueSelectRawOptionType,
    MultiValueSelectRawOptionType,
    NestedSingleValueSelectRawOptionType
  ),
  label: PropTypes.bool.isRequired,
  required: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  setFieldsData: PropTypes.func.isRequired,
  fieldsData: PropTypes.shape({
    [PropTypes.string]: PropTypes.oneOfType(
      PropTypes.string,
      SingleValueSelectOptionType,
      MultiValueSelectOptionType,
      NestedSingleValueSelectOptionType
    )
  }).isRequired,
  fieldErrors: PropTypes.object({
    [PropTypes.string]: PropTypes.string
  }).isRequired,
  areSomeRequiredFieldsEmpty: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  schema: PropTypes.object({
    type: PropTypes.string
  })
};

// options: PropTypes.arrayOf(SingleValueSelectRawOptionType),
// searchPath: PropTypes.string,
// optionsPath: PropTypes.string,
// attachments: PropTypes.arrayOf(PropTypes.string),
// setAttachments: PropTypes.func,
// descriptionMeta: PropTypes.string,
// hideDescription: PropTypes.bool,
// validations: PropTypes.arrayOf(PropTypes.string)
