export const templates = {
  templateRaceLine: {
    tag: 'div',
    text: '',
    attributes: {},
    classes: 'race-line',
    child: [
      {
        tag: 'div',
        text: '',
        attributes: {},
        classes: 'race-line-header',
        child: [
          {
            tag: 'div',
            text: 'Select',
            attributes: { identifier: 'car-select-button' },
            classes: 'app-button',
            child: [],
          },
          {
            tag: 'div',
            text: 'Remove',
            attributes: { identifier: 'car-remove-button' },
            classes: 'app-button',
            child: [],
          },
          {
            tag: 'div',
            text: '',
            attributes: { identifier: 'car-name' },
            classes: 'race-car-name',
            child: [],
          },
        ],
      },
      {
        tag: 'div',
        text: '',
        attributes: {},
        classes: 'race-track',
        child: [
          {
            tag: 'div',
            text: '',
            attributes: {},
            classes: 'race-car-button',
            child: [
              {
                tag: 'div',
                text: 'A',
                attributes: { identifier: 'car-start-engine' },
                classes: 'app-button race-car-button-action race-car-button-action-a',
                child: [],
              },
              {
                tag: 'div',
                text: 'B',
                attributes: { identifier: 'car-stop-engine' },
                classes: 'app-button race-car-button-action race-car-button-action-b disabled-button',
                child: [],
              },
            ],
          },
          {
            tag: 'div',
            text: '',
            attributes: {},
            classes: 'race-track-flag',
            child: [
              {
                tag: 'img',
                text: '',
                attributes: { src: './assets/images/flag.svg' },
                classes: 'race-track-flag-image',
                child: [],
              },
            ],
          },
        ],
      },
      {
        tag: 'div',
        text: '',
        attributes: { identifier: 'race-track-car' },
        classes: 'race-track-car',
        child: [
          {
            tag: 'div',
            text: '',
            attributes: { identifier: 'race-track-car-car' },
            classes: 'race-track-car-car',
            child: [],
          },
          {
            tag: 'div',
            text: '',
            attributes: { identifier: 'race-track-car-broken' },
            classes: 'car-broken-engine element-none',
            child: [],
          },
        ],
      },
    ],
  },
  templateCar: {
    tag: 'div',
    text: '',
    attributes: { identifier: 'race-track-car' },
    classes: 'race-track-car',
    child: [],
  },
};
