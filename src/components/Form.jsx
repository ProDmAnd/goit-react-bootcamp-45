// @ts-check
import React, { Component } from 'react';

/**
@extends {Component<{addTodo: (todo: {title: string, message: string}) => void}, {title:string, message: string}>}
 */
export class Form extends Component {
  static propTypes = {};

  state = { title: '', message: '' };

  componentDidUpdate() {
    console.log('Form updated');
  }

  changeText = ({ target: { name, value } }) =>
    //@ts-ignore
    this.setState({ [name]: value });

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  submit = e => {
    e.preventDefault();
    this.props.addTodo(this.state);
    this.setState({ title: '', message: '' });
  };

  render() {
    const { title, message } = this.state;
    return (
      <form onSubmit={this.submit}>
        <label>
          Title
          <input name="title" value={title} onChange={this.changeText} />
        </label>
        <label>
          Message
          <input name="message" value={message} onChange={this.changeText} />
        </label>
        <button>Add todo</button>
      </form>
    );
  }
}

export default Form;
