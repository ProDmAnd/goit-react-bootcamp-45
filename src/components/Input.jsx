import React, { Component } from 'react';
import { PureComponent } from 'react';

export default class Input extends PureComponent {
  render() {
    console.log('rerender');
    return (
      <input
        value={this.props.value}
        onChange={this.props.onChange}
        //   onFocus={this.inputFocused}
        //   onBlur={this.inputBlurred}
        //   onKeyDown={this.inputKeyPressed}
      />
    );
  }
}
