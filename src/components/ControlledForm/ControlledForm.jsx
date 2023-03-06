import React, { Component } from 'react';
import css from './ControlledFrom.module.css';
import { CITY_OPTIONS, GENDER_OPTIONS } from 'constants/loginForm';
import Button from 'components/Button/Button';
import { PureComponent } from 'react';

class ControlledForm extends PureComponent {
  /** @type {HTMLInputElement} */
  emailInputRef;
  state = {
    email: '',
    password: '',
    agree: false,
    gender: GENDER_OPTIONS.skip,
    city: CITY_OPTIONS.Kyiv,
    showEmail: true,
  };

  componentDidMount() {
    this.emailInputRef.focus();
    console.log(this.emailInputRef);
    setTimeout(() => {
      this.setState({ showEmail: false });
    }, 3000);
  }

  componentDidUpdate() {
    console.log('form update', this.props.list);
  }

  /** @param {React.FormEvent<HTMLFormElement>} event */
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChangeValue = event => {
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeChecked = event => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { email, password, agree, gender, city, showEmail } = this.state;
    const canSubmit =
      email && password.length > 5 && agree && gender !== GENDER_OPTIONS.skip;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        {showEmail && (
          <div className={css.field}>
            <label htmlFor={this.emailField}>Email</label>
            <input
              ref={ref => (this.emailInputRef = ref)}
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onInput={this.handleChangeValue}
            />
          </div>
        )}

        <div className={css.field}>
          <label htmlFor={this.emailField}>Password</label>
          <input
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onInput={this.handleChangeValue}
          />
        </div>

        <div className={css.field}>
          <label>
            <input
              type="checkbox"
              checked={agree}
              name="agree"
              onChange={this.handleChangeChecked}
              style={{ marginRight: 6 }}
            />
            I agree with Terms & Conditions
          </label>
        </div>
        <div className={css.field}>
          {Object.entries(GENDER_OPTIONS).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                checked={gender === value}
                value={value}
                name="gender"
                onChange={this.handleChangeValue}
              />
              {' ' + value.toUpperCase()}
            </label>
          ))}
        </div>
        <div>
          <select value={city} name="city" onChange={this.handleChangeValue}>
            {Object.entries(CITY_OPTIONS).map(([key, value]) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <Button disabled={!canSubmit} type="submit">
          Log in
        </Button>
      </form>
    );
  }
}

export default ControlledForm;

/*
const object = {
  email: 'asdasd@mail',
  password: '123123',
  agree: true,
  0: false,
};

const emailKey = 'email';
*/
