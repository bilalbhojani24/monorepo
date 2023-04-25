import React, {
  Component,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react';
import { PropTypes } from 'prop-types';

// Error Boundary class component start
class ErrorBoundaryContainer extends Component {
  componentDidCatch(...args) {
    const { onError } = this.props;
    this.setState({});
    onError(...args);
  }

  render() {
    const { children, error, fallbackUI } = this.props;
    if (error && fallbackUI) {
      return fallbackUI;
    }
    return children;
  }
}

ErrorBoundaryContainer.propTypes = {
  children: PropTypes.node,
  fallbackUI: PropTypes.node,
  error: PropTypes.bool,
  onError: PropTypes.func.isRequired
};
ErrorBoundaryContainer.defaultProps = {
  children: null,
  fallbackUI: null,
  error: false
};
// Error Boundary class component end

// Error boundary context start
const noop = () => false;
const errorBoundaryContext = createContext({
  componentDidCatch: { current: undefined },
  error: undefined,
  setError: noop
});

export const ErrorBoundary = ({ children, fallbackUI }) => {
  const [error, setError] = useState();
  const componentDidCatch = useRef();

  const ctx = useMemo(
    () => ({
      componentDidCatch,
      error,
      setError
    }),
    [error]
  );

  return (
    <errorBoundaryContext.Provider value={ctx}>
      <ErrorBoundaryContainer
        error={error}
        onError={(err, errorInfo) => {
          setError(err);
          componentDidCatch.current?.(err, errorInfo);
        }}
        fallbackUI={fallbackUI}
      >
        {children}
      </ErrorBoundaryContainer>
    </errorBoundaryContext.Provider>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallbackUI: PropTypes.node
};
ErrorBoundary.defaultProps = {
  children: null,
  fallbackUI: null
};

ErrorBoundary.displayName = 'ReactUseErrorBoundaryContext';
// Error boundary context end

// Error Boundary HOC component start
export const withErrorBoundary = (WrappedComponent) => {
  function WithErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <WrappedComponent key="WrappedComponent" {...props} />
      </ErrorBoundary>
    );
  }
  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return WithErrorBoundary;
};
// Error Boundary HOC component end

// Error Boundary custom hook start
export const useErrorBoundary = (componentDidCatch) => {
  const ctx = useContext(errorBoundaryContext);
  ctx.componentDidCatch.current = componentDidCatch;
  const resetError = useCallback(() => {
    ctx.setError(undefined);
  }, [ctx]);
  return [ctx.error, resetError];
};
// Error Boundary custom hook end

/**
 * How to use ?
 * 1. ErrorBoundaryContext and useErrorBoundary
 * 2. withErrorBoundary and useErrorBoundary
 
 * Limitation:-
 * Because React recreates the component tree from scratch after catching an error, the component using the useErrorBoundary hook is always remounted after an error is encountered. This means any state will be reinitialized: useState and useRef hooks will be reinitialized to their initial value and will not persist across caught errors. Any values that need to be preserved across error catching must be lifted into a parent component above the component wrapped in withErrorBoundary
 */
