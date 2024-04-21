import { SpecialElements, ElementsDefinitions } from './types';

export class Element {
  private _sellingHTML;

  private _specialElements: SpecialElements = {};

  private _lastMessage = { type: '', message: '' };

  constructor(definition: ElementsDefinitions) {
    this._sellingHTML = Element.createElement(definition, this._specialElements);
  }

  static createElement(definition: ElementsDefinitions, specialElements?: SpecialElements) {
    const element = document.createElement(definition.tag);
    element.textContent = definition.text;
    if (definition.classes.length > 0) {
      element.classList.add(...definition.classes.split(' '));
    }
    const keysAttributes = Object.keys(definition.attributes);
    keysAttributes.forEach((key) => {
      if (specialElements && key === 'identifier') {
        specialElements[definition.attributes![key]] = element;
      }
      element.setAttribute(key, definition.attributes[key]);
    });
    if (definition.styles) {
      const keysStyles = Object.keys(definition.styles);
      keysStyles.forEach((key) => {
        element.style.setProperty(key, definition.styles![key]);
      });
    }
    definition.child.forEach((el) => element.appendChild(Element.createElement(el, specialElements)));
    return element;
  }

  putAway() {
    if (this.isAway()) return;
    this._sellingHTML.style.setProperty('display', 'none');
  }

  retrieve() {
    if (!this.isAway()) return;
    this._sellingHTML.style.removeProperty('display');
  }

  isAway() {
    return this._sellingHTML.style.getPropertyValue('display') === 'none';
  }

  get sellingHTML() {
    return this._sellingHTML;
  }

  get specialElements() {
    return this._specialElements;
  }

  receiveMessage(type: string, message: string) {
    this._lastMessage = { type: type, message: message };
  }
}

// export default Element;
