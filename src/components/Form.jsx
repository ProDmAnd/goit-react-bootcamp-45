import React, { PureComponent } from 'react';
import { Component } from 'react';

export class Form extends Component {

  static propTypes = {};

  state = { text: '' };

  componentDidUpdate() {
    console.log('Form updated');
  }

  changeText = ({ target: { value } }) => this.setState({ text: value });

  submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    return (
      <form onSubmit={this.submit}>
        <input value={text} onChange={this.changeText} />
        <button>Add todo</button>
      </form>
    );
  }
}

export default Form;