import { actionCreator } from 'app/actionCreator';

export const userLoginActionType = 'user/login';
export const userLogoutActionType = 'user/logout';

export const userLoginAction = actionCreator(userLoginActionType);
export const userLogoutAction = actionCreator(userLogoutActionType);
