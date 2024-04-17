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

export const userAuthenticationResponse = (response: string) => {
  const responseObject = JSON.parse(response);
  return responseObject;
};
