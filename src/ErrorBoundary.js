import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
  }

  componentDidUpdate(prevProps) {
    if (this.props.fragmentSource !== prevProps.fragmentSource) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <div style={{
        width: 400,
        height: 400,
        minWidth: 400,
        marginBottom: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "#5d0909",
      }}>
        <h3>Something went wrong.</h3>
      </div>;
    }

    return this.props.children;
  }
}
