import { userLoginActionType, userLogoutActionType } from "./actions";

const initialState =  {
  isLoggedIn: false,
  email: '',
  city: '',
  gender: '',
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case userLoginActionType:
        return {
            ...state,
            isLoggedIn: true,
            ...action.payload,
        };
      case userLogoutActionType:
        return initialState;
      default:
        return state;
    }
  };
  
export default userReducer;