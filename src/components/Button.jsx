import React, { PureComponent } from 'react';

export default class Button extends PureComponent {
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
    const { onClick, title, ...restProps } = this.props;
    return (
      <button onClick={this.props.onClick} {...restProps}>
        {this.props.title}
      </button>
    );
  }
}
