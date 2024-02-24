import Loader from './loader';
import { ENV } from '../../types/index';

class AppLoader extends Loader {
    constructor() {
        super(ENV.API_URL, {
            apiKey: ENV.API_KEY,
        });
    }
}

export default AppLoader;
