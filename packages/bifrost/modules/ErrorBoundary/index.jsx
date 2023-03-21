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
class ErrorBoundary extends Component {
  componentDidCatch(...args) {
    const { onError } = this.props;
    this.setState({});
    onError(...args);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  onError: PropTypes.func.isRequired
};
ErrorBoundary.defaultProps = {
  children: null
};
// Error Boundary class component end

// Error boundary context start
const noop = () => false;
const errorBoundaryContext = createContext({
  componentDidCatch: { current: undefined },
  error: undefined,
  setError: noop
});

export const ErrorBoundaryContext = ({ children }) => {
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
      <ErrorBoundary
        error={error}
        onError={(err, errorInfo) => {
          setError(err);
          componentDidCatch.current?.(err, errorInfo);
        }}
      >
        {children}
      </ErrorBoundary>
    </errorBoundaryContext.Provider>
  );
};

ErrorBoundaryContext.propTypes = {
  children: PropTypes.node
};
ErrorBoundaryContext.defaultProps = {
  children: null
};

ErrorBoundaryContext.displayName = 'ReactUseErrorBoundaryContext';
// Error boundary context end

// Error Boundary HOC component start
export const withErrorBoundary = (WrappedComponent) => {
  function WithErrorBoundary(props) {
    return (
      <ErrorBoundaryContext>
        <WrappedComponent key="WrappedComponent" {...props} />
      </ErrorBoundaryContext>
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
