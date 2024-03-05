import { SAVE_LOGIN, DESTROY_LOGIN, SAVE_USER } from "../type";

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
