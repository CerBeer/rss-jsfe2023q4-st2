// Sources
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
