// enveronment
export const ENV: { API_URL: string; API_KEY: string } = {
    API_URL: 'https://rss-news-api.onrender.com/mocks/',
    API_KEY: '',
};

// view
// sources
export type source = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type sources = {
    status: string;
    sources: Array<source>;
};

// articles
export type article = {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type articles = {
    status: string;
    articles: Array<article>;
};

// controller
// loader
export type options = Record<string, string>;

export type query = {
    endpoint: string;
    options?: options;
};

export type callback<T> = (data: T) => void;

export interface LoaderInterface {
    baseLink: string;
    options: options;
    getResp<T>({ endpoint, options }: query, callback: callback<T>): void;
}

export enum ResponseError {
    Err_401 = 401,
    Err_404 = 404,
}
