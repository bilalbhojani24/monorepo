import React from 'react';
import GenericErrorPage from 'common/GenericErrorPage';
import { ROUTES } from 'constants/routes';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, error } = this.props;

    if (error) {
      return <pre>{error}</pre>;
    }

    if (hasError) {
      return (
        <GenericErrorPage
          buttonProps={{
            children: 'Go to projects',
            onClick: () => {
              window.location.href = ROUTES.projects;
            },
            size: 'default'
          }}
        />
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ErrorBoundary.defaultProps = {
  error: ''
};

export default ErrorBoundary;
