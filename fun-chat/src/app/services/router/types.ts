import { PAGE_NAMES } from './enums';
import Login from '../../pages/login/login';
import About from '../../pages/about/about';
import Chat from '../../pages/chat/chat';

export type PageNameKey = keyof typeof PAGE_NAMES;

export type PageNames = (typeof PAGE_NAMES)[PageNameKey];

export type Page = Login | Chat | About | undefined;

export type CurrentPage = { pageName: PageNames; page: Page };
