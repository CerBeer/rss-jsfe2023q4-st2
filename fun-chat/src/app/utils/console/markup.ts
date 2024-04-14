export const console = {
  tag: 'div',
  text: ``,
  attributes: {},
  classes: 'console-window',
  child: [
    {
      tag: 'code',
      text: '',
      attributes: { identifier: 'console-text' },
      classes: 'console-window-text',
      child: [],
    },
  ],
};

export function line(text: string) {
  return {
    tag: 'p',
    text: `${Math.round(performance.now())}: ${text}`,
    attributes: {},
    classes: 'console-window-line',
    child: [],
  };
}
