export const splash = {
  tag: 'div',
  text: '',
  attributes: {},
  classes: 'splash-background',
  child: [
    {
      tag: 'div',
      text: '',
      attributes: {},
      classes: 'splash',
      child: [
        {
          tag: 'img',
          text: '',
          attributes: { src: './assets/images/wait.gif' },
          classes: 'splash-icons',
          child: [],
        },
        {
          tag: 'div',
          text: 'Подключение к серверу ...',
          attributes: {},
          classes: 'splash-text',
          child: [],
        },
      ],
    },
  ],
};
