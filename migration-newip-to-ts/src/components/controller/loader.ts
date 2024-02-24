import { LoaderInterface, options, query, callback, ResponseError } from '../../types/index';

class Loader implements LoaderInterface {
    private _baseLink: string;
    private _options: options;

    constructor(baseLink: string, options: options) {
        this._baseLink = baseLink;
        this._options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: query,
        callback: callback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseError.Err_401 || res.status === ResponseError.Err_404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: options, endpoint: string) {
        const urlOptions = { ...this._options, ...options };
        let url = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as string]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: callback<T>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
