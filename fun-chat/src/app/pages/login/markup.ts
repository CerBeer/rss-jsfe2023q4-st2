export const login = {
  tag: 'form',
  text: '',
  attributes: {},
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
              attributes: {},
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
                  classes: 'login-form-fieldset-field-container-input input-error',
                  child: [],
                },
                {
                  tag: 'label',
                  text: 'Длина должна быть более 4 символов',
                  attributes: { identifier: 'login-name-tooltip' },
                  classes: 'login-form-fieldset-field-container-tooltip',
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
              attributes: {},
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
                  classes: 'login-form-fieldset-field-container-tooltip',
                  child: [],
                },
                {
                  tag: 'label',
                  text: 'Используйте прописные и заглавные буквы',
                  attributes: { identifier: 'login-password-tooltip-contains' },
                  classes: 'login-form-fieldset-field-container-tooltip',
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
            { tag: 'button', text: 'Вход', attributes: { type: 'submit' }, classes: 'app-button', child: [] },
            { tag: 'button', text: 'i', attributes: { type: 'button' }, classes: 'app-button-info', child: [] },
          ],
        },
      ],
    },
  ],
};
