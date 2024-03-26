export const garage = {
  tag: 'MAIN',
  text: '',
  attributes: {},
  classes: 'main element-user-not-select element-none',
  child: [
    {
      tag: 'SECTION',
      text: '',
      attributes: {},
      classes: 'garage',
      child: [
        {
          tag: 'DIV',
          text: '',
          attributes: {},
          classes: 'garage-menu',
          child: [
            {
              tag: 'DIV',
              text: '',
              attributes: {},
              classes: 'garage-menu-line',
              child: [
                {
                  tag: 'INPUT',
                  text: '',
                  attributes: { identifier: 'car-create-name', type: 'text' },
                  classes: 'garage-menu-line-input',
                  child: [],
                },
                {
                  tag: 'INPUT',
                  text: '',
                  attributes: { identifier: 'car-create-color', type: 'color' },
                  classes: 'garage-menu-line-color',
                  child: [],
                },
                {
                  tag: 'DIV',
                  text: 'create',
                  attributes: { identifier: 'car-create-button' },
                  classes: 'app-button app-button-white',
                  child: [],
                },
              ],
            },
            {
              tag: 'DIV',
              text: '',
              attributes: {},
              classes: 'garage-menu-line',
              child: [
                {
                  tag: 'INPUT',
                  text: '',
                  attributes: { identifier: 'car-update-name', type: 'text' },
                  classes: 'garage-menu-line-input',
                  child: [],
                },
                {
                  tag: 'INPUT',
                  text: '',
                  attributes: { identifier: 'car-update-color', type: 'color' },
                  classes: 'garage-menu-line-color',
                  child: [],
                },
                {
                  tag: 'DIV',
                  text: 'update',
                  attributes: { identifier: 'car-update-button' },
                  classes: 'app-button app-button-white',
                  child: [],
                },
              ],
            },
            {
              tag: 'DIV',
              text: '',
              attributes: {},
              classes: 'garage-menu-buttons-group',
              child: [
                {
                  tag: 'DIV',
                  text: 'Race',
                  attributes: { identifier: 'cars-race-button' },
                  classes: 'app-button',
                  child: [],
                },
                {
                  tag: 'DIV',
                  text: 'Reset',
                  attributes: { identifier: 'cars-reset-button' },
                  classes: 'app-button',
                  child: [],
                },
                {
                  tag: 'DIV',
                  text: 'Generate\n            cars',
                  attributes: { identifier: 'cars-generate-button' },
                  classes: 'app-button app-button-white app-button-generate-cars',
                  child: [],
                },
              ],
            },
          ],
        },
        {
          tag: 'DIV',
          text: 'Garage',
          attributes: { identifier: 'garage-title' },
          classes: 'garage-title',
          child: [],
        },
        { tag: 'DIV', text: 'Page #1', attributes: {}, classes: 'garage-page-number', child: [] },
        {
          tag: 'SECTION',
          text: '',
          attributes: { identifier: 'race-pool' },
          classes: 'race',
          child: [],
        },
        {
          tag: 'DIV',
          text: '',
          attributes: {},
          classes: 'pagination-buttons',
          child: [
            {
              tag: 'DIV',
              text: 'Prev',
              attributes: { identifier: 'pagination-garage-prev' },
              classes: 'app-button',
              child: [],
            },
            {
              tag: 'DIV',
              text: 'Next',
              attributes: { identifier: 'pagination-garage-next' },
              classes: 'app-button',
              child: [],
            },
          ],
        },
        {
          tag: 'DIV',
          text: 'Winner',
          attributes: { identifier: 'race-winner' },
          classes: 'race-winner element-none',
          child: [],
        },
      ],
    },
  ],
};
