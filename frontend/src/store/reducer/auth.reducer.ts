import {
  DESTROY_LOGIN,
  SAVE_LOGIN,
  SAVE_USER,
  USER_CREDENTIALS,
} from "../type";

const initialState = { access_token: null, user: {}, isLoggedIn: false };
export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SAVE_LOGIN:
      return { ...state, ...action.payload, isLoggedIn: true };
    case SAVE_USER:
      return { ...state, user: action.payload };
    case DESTROY_LOGIN:
      return { ...initialState };
    case USER_CREDENTIALS:
      return { ...state, credentials: action.payload };
    default:
      return state;
  }
};
