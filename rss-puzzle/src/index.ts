import { Router } from './app/components/router/router';
import App from './app/app';
import './styles/style.css';

export const app = new App();
export const router = new Router(app);
router.start();
