import AppLoader from './appLoader';
import { callback, sources, articles } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: callback<sources>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: callback<articles>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    filterSources(e: Event) {
        const target = e.target as HTMLElement;
        const letterActiveNew = target.innerText;
        const letterActiveElement = document.querySelector('.letter-active') as HTMLElement;
        if (letterActiveNew === letterActiveElement.innerText) return;

        letterActiveElement.classList.remove('letter-active');
        target.classList.add('letter-active');

        const sourcesElements = document.querySelectorAll('.source__item');
        sourcesElements.forEach((el) => {
            const sourceFilter = el.getAttribute('data-source-filter');
            if (sourceFilter === letterActiveNew) el.classList.remove('source__item-hide');
            else el.classList.add('source__item-hide');
        });
    }
}

export default AppController;
