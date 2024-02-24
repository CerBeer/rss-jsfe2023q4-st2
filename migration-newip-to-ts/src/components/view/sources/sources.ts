import './sources.css';
import { source } from '../../../types/index';

class Sources {
    draw(data: Array<source>) {
        const letterActiveElement = document.querySelector('.letter-active') as HTMLElement;
        const letterActive = letterActiveElement.innerText;
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp!.content.cloneNode(true) as HTMLElement;

            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            const source__item = sourceClone.querySelector('.source__item');
            if (source__item !== null) {
                source__item.setAttribute('data-source-id', item.id);
                source__item.setAttribute('data-source-filter', item.name[0]);
                if (item.name[0] !== letterActive) {
                    source__item.classList.add('source__item-hide');
                }
            }
            fragment.append(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
