import { MESSAGES_TYPES } from './enums';

export type User = {
  login: string;
  password: string;
};

export type UserLogged = {
  login: string;
  isLogined: boolean;
};

export type ResponseError = {
  id: string;
  type: typeof MESSAGES_TYPES.ERROR;
  payload: {
    error: string;
  };
};

export type ResponseUserLogIn = {
  id: string;
  type: typeof MESSAGES_TYPES.USER_LOGIN;
  payload: {
    user: UserLogged;
  };
};

export type ResponseUserLogOut = {
  id: string;
  type: typeof MESSAGES_TYPES.USER_LOGOUT;
  payload: {
    user: UserLogged;
  };
};
