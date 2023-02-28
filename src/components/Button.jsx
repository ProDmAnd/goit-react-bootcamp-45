import React, { Component } from 'react';

export default class Button extends Component {
  componentDidMount() {
    console.log('button is mounted');
  }

  componentDidUpdate(prevProps) {
    console.log('button did update', prevProps, this.props);
  }

  componentWillUnmount() {
    console.log('button will unmount');
  }

  render() {
    return <button onClick={this.props.onClick}>{this.props.title}</button>;
  }
}
