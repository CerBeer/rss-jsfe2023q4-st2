// import { Console } from '../../utils/console/console';
import { GeneratorID } from '../../utils/generatorID/generatorID';
import { MESSAGES_TYPES } from './enums';
import * as types from './types';

export const requestUserLogin = (user: types.User) => {
  const requestObject = {
    id: GeneratorID.next(),
    type: MESSAGES_TYPES.USER_LOGIN,
    payload: {
      user: {
        login: user.login,
        password: user.password,
      },
    },
  };
  return { request: JSON.stringify(requestObject), id: requestObject.id };
};

export const requestUserLogout = (user: types.User) => {
  const requestObject = {
    id: GeneratorID.next(),
    type: MESSAGES_TYPES.USER_LOGOUT,
    payload: {
      user: {
        login: user.login,
        password: user.password,
      },
    },
  };
  return { request: JSON.stringify(requestObject), id: requestObject.id };
};

export const requestCompanionLoggedIn = () => {
  const requestObject = {
    id: GeneratorID.next(),
    type: MESSAGES_TYPES.USER_ACTIVE,
    payload: null,
  };
  return { request: JSON.stringify(requestObject), id: requestObject.id };
};

export const requestCompanionLoggedOut = () => {
  const requestObject = {
    id: GeneratorID.next(),
    type: MESSAGES_TYPES.USER_INACTIVE,
    payload: null,
  };
  return { request: JSON.stringify(requestObject), id: requestObject.id };
};

export const requestCompanionMessageHistory = (login: string) => {
  const requestObject = {
    id: GeneratorID.next(),
    type: MESSAGES_TYPES.MSG_FROM_USER,
    payload: {
      user: {
        login: login,
      },
    },
  };
  return { request: JSON.stringify(requestObject), id: requestObject.id };
};

// export const toDeleteUserAuthenticationResponse = (response: string) => {
//   const responseObject = JSON.parse(response);
//   return responseObject;
// };
