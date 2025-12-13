import { Component } from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">⚠️</div>
            <h2 className="error-boundary__title">
              Oops! Something went wrong
            </h2>
            <p className="error-boundary__description">
              We're experiencing some technical difficulties. Please refresh the
              page and try again.
            </p>
            <div className="error-boundary__actions">
              <button
                className="error-boundary__button error-boundary__button--primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <button
                className="error-boundary__button error-boundary__button--secondary"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="error-boundary__details">
                <summary>Error Details (Development)</summary>
                <div className="error-boundary__error-info">
                  <h4>Error:</h4>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <h4>Component Stack:</h4>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
