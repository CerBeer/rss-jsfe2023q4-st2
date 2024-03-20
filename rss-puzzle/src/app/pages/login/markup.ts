export const mainPage = {
  tag: 'DIV',
  text: '',
  attributes: { uname: 'loginPage' },
  classes: 'login-window modal-overlay',
  child: [
    {
      tag: 'DIV',
      text: '',
      attributes: {},
      classes: 'login-modal',
      child: [
        { tag: 'P', text: 'login', attributes: {}, classes: 'login-header', child: [] },
        {
          tag: 'FORM',
          text: '',
          attributes: { onsubmit: 'return false', autocomplete: 'off' },
          classes: 'login-form',
          child: [
            { tag: 'P', text: 'First Name', attributes: {}, classes: 'login-form-namefield', child: [] },
            {
              tag: 'INPUT',
              text: '',
              attributes: {
                type: 'text',
                pattern: '[A-Za-z-]{3,}',
                title: 'at least 3 characters without space',
                id: 'login-firstName',
                name: 'login-firstName',
                uname: 'loginFirstName',
                required: '',
              },
              classes: 'login-form-input',
              child: [],
            },
            { tag: 'P', text: 'Surname', attributes: {}, classes: 'login-form-namefield', child: [] },
            {
              tag: 'INPUT',
              text: '',
              attributes: {
                type: 'text',
                pattern: '[A-Za-z-]{4,}',
                title: 'at least 4 characters without space',
                id: 'login-surname',
                name: 'login-surname',
                uname: 'loginSurname',
                required: '',
              },
              classes: 'login-form-input',
              child: [],
            },
            {
              tag: 'BUTTON',
              text: '',
              attributes: {
                uname: 'loginButton',
              },
              classes: 'login-form-button app-controls-button',
              child: [{ tag: 'SPAN', text: 'Log in', attributes: {}, classes: 'login-form-button-label', child: [] }],
            },
          ],
        },
      ],
    },
  ],
};
