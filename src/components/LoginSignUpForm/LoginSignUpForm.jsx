import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  TextField
} from '@mui/material';
import { useAppSelector } from 'app/reduxHooks';
import React, { useEffect, useReducer, useRef, useState } from 'react';

const formInitialState = {
  name: '',
  email: '',
  password: '',
};

const formReducer = (state = formInitialState, { target: { name, value } }) => {
  return { ...state, [name]: value };
};

const LoginSignUpForm = ({ onSubmit = () => {}, signUp = false }) => {
  const [agree, setAgree] = useState(!signUp);
  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const emailInputRef = useRef();
  const isLoading = useAppSelector(state => state.user.isLoading);

  const [state, dispatch] = useReducer(formReducer, formInitialState);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ ...state, username: name });
  };

  const { email, password, name } = state;

  const haveName = signUp ? name : true;
  const canSubmit = haveName && email && password.length > 5 && agree;

  return (
    <form style={{ maxWidth: '50vw', width: '100%' }} onSubmit={handleSubmit}>
      <FormGroup sx={{ gap: 2, width: '100%' }}>
        {signUp && (
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onInput={dispatch}
            placeholder="Enter your Name"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          inputRef={emailInputRef}
          name="email"
          value={email}
          onInput={dispatch}
          placeholder="Enter your email"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={password}
          onInput={dispatch}
          placeholder="Enter your password"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {signUp && (
          <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                onChange={({ target: { checked } }) => setAgree(checked)}
              />
            }
            label="I agree with Terms & Conditions"
          />
        )}

        <Button
          disabled={!canSubmit || isLoading}
          type="submit"
          variant="contained"
          startIcon={isLoading && <CircularProgress size={16} />}
        >
          {signUp ? 'Sign Up' : 'Log in'}
        </Button>
      </FormGroup>
    </form>
  );
};

export default LoginSignUpForm;

/*
const object = {
  email: 'asdasd@mail',
  password: '123123',
  agree: true,
  0: false,
};

const emailKey = 'email';
*/
