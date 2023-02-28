import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: '', info: '' };
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }
  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return typeof this.props.fallbackComponent === 'function' ? (
      this.props.fallbackComponent(this.state.error, this.state.info)
    ) : (
      <div>Something went wrong...</div>
    );
  }
}
