import {
  SAVE_LOGIN,
  DESTROY_LOGIN,
  SAVE_USER,
  USER_CREDENTIALS,
} from "../type";

export const saveLogin = (data: any) => ({
  type: SAVE_LOGIN,
  payload: data,
});

export const saveProfile = (data: any) => ({
  type: SAVE_USER,
  payload: data,
});

export const destroyLogin = () => ({
  type: DESTROY_LOGIN,
});

export const userData = (identifier: string, password: any) => ({
  type: USER_CREDENTIALS,
  payload: {
    identifier,
    password,
  },
});
