import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="xp-app-error" role="alert">
          <p className="xp-app-error__title">This window stopped responding.</p>
          <p className="xp-app-error__text">
            Close and reopen the app to try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
