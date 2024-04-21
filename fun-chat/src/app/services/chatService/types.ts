import { MESSAGES_CHAT_SERVICE_TYPES } from './enums';

export type MessageNameKey = keyof typeof MESSAGES_CHAT_SERVICE_TYPES;

export type MessageTypes = (typeof MESSAGES_CHAT_SERVICE_TYPES)[MessageNameKey];
