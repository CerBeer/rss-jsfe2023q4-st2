export const login = {
  tag: 'FORM',
  text: '',
  attributes: {},
  classes: 'login-form',
  child: [
    {
      tag: 'FIELDSET',
      text: '',
      attributes: {},
      classes: 'login-form-fieldset',
      child: [
        { tag: 'LEGEND', text: 'Авторизация', attributes: {}, classes: '', child: [] },
        {
          tag: 'DIV',
          text: '',
          attributes: {},
          classes: 'login-form-fieldset-field',
          child: [
            { tag: 'LABEL', text: 'Имя', attributes: {}, classes: '', child: [] },
            {
              tag: 'DIV',
              text: '',
              attributes: {},
              classes: 'login-form-fieldset-field-container',
              child: [
                {
                  tag: 'INPUT',
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
                  tag: 'LABEL',
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
          tag: 'DIV',
          text: '',
          attributes: {},
          classes: 'login-form-fieldset-field',
          child: [
            { tag: 'LABEL', text: 'Пароль', attributes: {}, classes: '', child: [] },
            {
              tag: 'DIV',
              text: '',
              attributes: {},
              classes: 'login-form-fieldset-field-container',
              child: [
                {
                  tag: 'INPUT',
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
                  tag: 'LABEL',
                  text: 'Длина должна быть более 4 символов',
                  attributes: { identifier: 'login-password-tooltip-length' },
                  classes: 'login-form-fieldset-field-container-tooltip',
                  child: [],
                },
                {
                  tag: 'LABEL',
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
          tag: 'DIV',
          text: '',
          attributes: {},
          classes: 'login-form-fieldset-buttons',
          child: [
            { tag: 'BUTTON', text: 'Вход', attributes: { type: 'submit' }, classes: 'app-button', child: [] },
            { tag: 'BUTTON', text: 'i', attributes: { type: 'button' }, classes: 'app-button-info', child: [] },
          ],
        },
      ],
    },
  ],
};
