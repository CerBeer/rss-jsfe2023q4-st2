export const chat = {
  tag: 'main',
  text: '',
  attributes: {},
  classes: 'chat',
  child: [
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'chat-header',
      child: [
        {
          tag: 'label',
          text: '',
          attributes: {},
          classes: 'chat-header-user-name',
          child: [
            {
              tag: 'div',
              text: 'Пользователь: ',
              attributes: {},
              classes: '',
              child: [],
            },
            {
              tag: 'div',
              text: 'Myname',
              attributes: { identifier: 'user-info' },
              classes: 'chat-header-user-name-name',
              child: [],
            },
          ],
        },
        { tag: 'label', text: 'Fun Chat', attributes: {}, classes: 'chat-header-app-name', child: [] },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-header-buttons',
          child: [
            {
              tag: 'button',
              text: 'Выход',
              attributes: { type: 'button', identifier: 'chat-logout' },
              classes: 'chat-header-buttons-logout',
              child: [],
            },
            {
              tag: 'button',
              text: 'i',
              attributes: { type: 'button', identifier: 'chat-info' },
              classes: 'chat-header-buttons-info',
              child: [],
            },
          ],
        },
      ],
    },
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'chat-main',
      child: [
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-main-left',
          child: [
            {
              tag: 'input',
              text: '',
              attributes: { placeholder: 'Поиск...', identifier: 'left-search' },
              classes: 'chat-main-left-search',
              child: [],
            },
            {
              tag: 'ul',
              text: '',
              attributes: { identifier: 'left-users-list' },
              classes: 'chat-main-left-users-list',
              child: [],
            },
          ],
        },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-main-right',
          child: [
            {
              tag: 'div',
              text: '',
              attributes: {},
              classes: 'chat-main-right-companion',
              child: [
                {
                  tag: 'div',
                  text: '',
                  attributes: { identifier: 'right-companion-login' },
                  classes: 'chat-main-right-companion-login',
                  child: [],
                },
                {
                  tag: 'div',
                  text: '',
                  attributes: { identifier: 'right-companion-status' },
                  classes: 'chat-main-right-companion-status',
                  child: [],
                },
              ],
            },
            {
              tag: 'div',
              text: '',
              attributes: { identifier: 'right-dialog' },
              classes: 'chat-main-right-dialog',
              child: [
                {
                  tag: 'label',
                  text: 'Выберите пользователя для отправки сообщения...',
                  attributes: { identifier: 'right-dialog-placeholder' },
                  classes: 'chat-main-right-dialog-placeholder',
                  child: [],
                },
              ],
            },
            {
              tag: 'form',
              text: '',
              attributes: {},
              classes: 'chat-main-right-send',
              child: [
                {
                  tag: 'input',
                  text: '',
                  attributes: { placeholder: 'Сообщение...', disabled: '', value: '', identifier: 'right-send-input' },
                  classes: 'chat-main-right-send-input',
                  child: [],
                },
                {
                  tag: 'button',
                  text: 'Отправить',
                  attributes: { type: 'button', disabled: '', identifier: 'right-send-button' },
                  classes: 'chat-main-right-send-button',
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'chat-footer',
      child: [
        { tag: 'label', text: 'RSSchool', attributes: {}, classes: '', child: [] },
        { tag: 'label', text: 'CerBeer', attributes: {}, classes: '', child: [] },
        { tag: 'label', text: '2024', attributes: {}, classes: '', child: [] },
      ],
    },
  ],
};

export const companionListElement = {
  tag: 'li',
  text: '',
  attributes: {},
  classes: 'chat-main-left-users-list-user',
  child: [
    {
      tag: 'div',
      text: '',
      attributes: { identifier: 'user-status' },
      classes: 'chat-main-left-users-list-user-status',
      child: [],
    },
    {
      tag: 'label',
      text: '',
      attributes: { identifier: 'user-login' },
      classes: 'chat-main-left-users-list-user-login',
      child: [],
    },
    {
      tag: 'label',
      text: '',
      attributes: { identifier: 'user-messages' },
      classes: 'chat-main-left-users-list-user-messages',
      child: [],
    },
  ],
};
