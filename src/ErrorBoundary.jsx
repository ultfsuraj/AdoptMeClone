import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // typically you would log this to something like TrackJS, or NewRelic
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was error with this listing.{" "}
          <Link to={"/"}>Click here to go back to the home page.</Link>
        </h2>
      );
    }

    // pass through if no error happens.
    return this.props.children;
  }
}

export default ErrorBoundary;
