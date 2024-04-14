export type SpecialElements = { [key: string]: HTMLElement };

export type ElementsDefinitions = {
  tag: keyof HTMLElementTagNameMap;
  text: string;
  attributes: { [key: string]: string };
  classes: string;
  child: ElementsDefinitions[];
  styles?: { [key: string]: string };
};
