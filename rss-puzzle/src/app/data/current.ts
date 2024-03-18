import { ENUMS } from './enums';

export const currentState = {
  level: 0,
  round: 0,
  word: 0,
  gameAction: ENUMS.gameActions.load,
  clueStates: {
    voiceActing: true,
    translate: true,
    music: true,
    image: true,
  },
};
