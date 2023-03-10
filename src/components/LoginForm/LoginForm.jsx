import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import { CITY_OPTIONS, GENDER_OPTIONS } from 'constants/loginForm';
import React, { useEffect, useReducer, useRef, useState } from 'react';

const formInitialState = {
  email: '',
  password: '',
  gender: GENDER_OPTIONS.skip,
  city: CITY_OPTIONS.Kyiv,
};

const formReducer = (state = formInitialState, { target: { name, value } }) => {
  return { ...state, [name]: value };
};

const LoginForm = ({ onSubmit = () => {} }) => {
  const [agree, setAgree] = useState(false);
  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const emailInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(formReducer, formInitialState);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSubmit(state);
      setLoading(false);
    }, 4000);
    console.log(state);
  };

  const { email, password, gender, city } = state;
  const canSubmit =
    email && password.length > 5 && agree && gender !== GENDER_OPTIONS.skip;

  return (
    <form style={{ maxWidth: '50vw', width: '100%' }} onSubmit={handleSubmit}>
      <FormGroup sx={{ gap: 2, width: '100%' }}>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={({ target: { checked } }) => setAgree(checked)}
            />
          }
          label="I agree with Terms & Conditions"
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {Object.entries(GENDER_OPTIONS).map(([key, value]) => (
              <FormControlLabel
                name="gender"
                checked={gender === value}
                key={key}
                value={value}
                control={<Radio />}
                label={value.toUpperCase()}
                onChange={dispatch}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="Age"
            name="city"
            onChange={dispatch}
          >
            {Object.entries(CITY_OPTIONS).map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          disabled={!canSubmit || loading}
          type="submit"
          variant="contained"
          startIcon={loading && <CircularProgress size={16} />}
        >
          Log in
        </Button>
      </FormGroup>
    </form>
  );
};

export default LoginForm;

/*
const object = {
  email: 'asdasd@mail',
  password: '123123',
  agree: true,
  0: false,
};

const emailKey = 'email';
*/
