export const mainPage = {
  tag: 'DIV',
  text: '',
  attributes: {},
  classes: 'start',
  child: [
    { tag: 'A1', text: 'ENGLISH PUZZLE', attributes: {}, classes: 'start-title', child: [] },
    {
      tag: 'ARTICLE',
      text: 'Click on words, collect phrases.',
      attributes: {},
      classes: 'start-article',
      child: [],
    },
    {
      tag: 'DIV',
      text: 'Words can be drag and drop. Select tooltips in the menu',
      attributes: {},
      classes: 'start-article',
      child: [],
    },
    {
      tag: 'DIV',
      text: '',
      attributes: {},
      classes: 'start-controls-buttons',
      child: [
        {
          tag: 'DIV',
          text: 'Start',
          attributes: { uname: 'buttonStart' },
          classes: 'start-controls-button app-controls-button',
          child: [],
        },
        {
          tag: 'DIV',
          text: 'Logout',
          attributes: { uname: 'buttonLogOut' },
          classes: 'start-controls-button app-controls-button',
          child: [],
        },
      ],
    },
  ],
};
