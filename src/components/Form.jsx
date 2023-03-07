import React, { Component } from 'react';

export class Form extends Component {
  static propTypes = {};

  state = { title: '', message: '' };

  componentDidUpdate() {
    console.log('Form updated');
  }

  changeText = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
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
