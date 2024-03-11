export type Definition = {
  tag: keyof HTMLElementTagNameMap;
  text: string;
  attributes: { [key: string]: string };
  classes: string;
  child: Definition[];
  styles?: { [key: string]: string };
};

export function createElement(definition: Definition, unamed?: { [key: string]: HTMLElement }) {
  const element = document.createElement(definition.tag);
  element.textContent = definition.text;
  if (definition.classes.length > 0) {
    element.classList.add(...definition.classes.split(' '));
  }
  const keysAttributes = Object.keys(definition.attributes);
  keysAttributes.forEach((key) => {
    if (unamed && key === 'uname') {
      unamed[definition.attributes![key]] = element;
    }
    element.setAttribute(key, definition.attributes[key]);
  });
  if (definition.styles) {
    const keysStyles = Object.keys(definition.styles);
    keysStyles.forEach((key) => {
      element.style.setProperty(key, definition.styles![key]);
    });
  }
  definition.child.forEach((el) => element.appendChild(createElement(el, unamed)));
  return element;
}

export default createElement;
