import PropTypes from 'prop-types';

export const FiltersType = PropTypes.shape({
  date: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }),
  query: PropTypes.string,
  method: PropTypes.arrayOf(PropTypes.shape({})),
  status: PropTypes.arrayOf(PropTypes)
});
