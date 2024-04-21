export const login = {
  tag: 'form',
  text: '',
  attributes: { identifier: 'login-form' },
  classes: 'login-form',
  child: [
    {
      tag: 'fieldset',
      text: '',
      attributes: {},
      classes: 'login-form-fieldset',
      child: [
        { tag: 'legend', text: 'Авторизация', attributes: {}, classes: '', child: [] },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'login-form-fieldset-field',
          child: [
            { tag: 'label', text: 'Имя', attributes: {}, classes: '', child: [] },
            {
              tag: 'div',
              text: '',
              attributes: { identifier: 'field-login-name' },
              classes: 'login-form-fieldset-field-container',
              child: [
                {
                  tag: 'input',
                  text: '',
                  attributes: {
                    placeholder: 'Имя пользователя',
                    type: 'text',
                    identifier: 'login-name',
                    autocomplete: 'username',
                  },
                  classes: 'login-form-fieldset-field-container-input',
                  child: [],
                },
                {
                  tag: 'label',
                  text: 'Длина должна быть более 4 символов',
                  attributes: { identifier: 'login-name-tooltip' },
                  classes: 'login-form-fieldset-field-container-tooltip tooltip-name-length',
                  child: [],
                },
              ],
            },
          ],
        },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'login-form-fieldset-field',
          child: [
            { tag: 'label', text: 'Пароль', attributes: {}, classes: '', child: [] },
            {
              tag: 'div',
              text: '',
              attributes: { identifier: 'field-login-password' },
              classes: 'login-form-fieldset-field-container',
              child: [
                {
                  tag: 'input',
                  text: '',
                  attributes: {
                    placeholder: 'Пароль',
                    type: 'password',
                    identifier: 'login-password',
                    autocomplete: 'current-password',
                  },
                  classes: 'login-form-fieldset-field-container-input',
                  child: [],
                },
                {
                  tag: 'label',
                  text: 'Длина должна быть более 4 символов',
                  attributes: { identifier: 'login-password-tooltip-length' },
                  classes: 'login-form-fieldset-field-container-tooltip tooltip-password-length',
                  child: [],
                },
                {
                  tag: 'label',
                  text: 'Используйте прописные и заглавные буквы',
                  attributes: { identifier: 'login-password-tooltip-contains' },
                  classes: 'login-form-fieldset-field-container-tooltip tooltip-password-contains',
                  child: [],
                },
              ],
            },
          ],
        },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'login-form-fieldset-buttons',
          child: [
            {
              tag: 'button',
              text: 'Вход',
              attributes: { type: 'submit', identifier: 'button-login' },
              classes: 'app-button',
              child: [],
            },
            {
              tag: 'div',
              text: 'Вход2',
              attributes: { identifier: 'button-login2' },
              classes: 'app-button',
              child: [],
            },
            {
              tag: 'button',
              text: 'i',
              attributes: { type: 'button', identifier: 'chat-info' },
              classes: 'app-button-info',
              child: [],
            },
          ],
        },
      ],
    },
  ],
};
