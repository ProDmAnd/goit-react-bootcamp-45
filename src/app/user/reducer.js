import { createReducer } from '@reduxjs/toolkit';
import { userLoginAction, userLogoutAction } from './actions';

const initialState = {
  isLoggedIn: false,
  email: '',
  city: '',
  gender: '',
};

const userReducer = createReducer(initialState, {
  [userLoginAction]: (state, { payload }) => {
    console.log('userLoginAction', payload);
    return {
      ...state,
      isLoggedIn: true,
      ...payload,
    };
  },
  [userLogoutAction]: () => ({ ...initialState }),
});

// const userReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case userLoginAction.type:
//       return {
//         ...state,
//         isLoggedIn: true,
//         ...payload,
//       };
//     case userLogoutAction.type:
//       return initialState;
//     default:
//       return state;
//   }
// };

export default userReducer;
