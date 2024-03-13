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
                id: 'login-firstName',
                name: 'login-firstName',
                uname: 'loginFirstName',
                required: '',
              },
              classes: 'login-form-input',
              child: [],
            },
            { tag: 'P', text: 'Surename', attributes: {}, classes: 'login-form-namefield', child: [] },
            {
              tag: 'INPUT',
              text: '',
              attributes: {
                type: 'text',
                id: 'login-sureName',
                name: 'login-sureName',
                uname: 'loginSureName',
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
