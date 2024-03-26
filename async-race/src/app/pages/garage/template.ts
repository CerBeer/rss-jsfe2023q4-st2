export const templates = {
  templateRaceLine: {
    tag: 'DIV',
    text: '',
    attributes: {},
    classes: 'race-line',
    child: [
      {
        tag: 'DIV',
        text: '',
        attributes: {},
        classes: 'race-line-header',
        child: [
          {
            tag: 'DIV',
            text: 'Select',
            attributes: { identifier: 'car-select-button' },
            classes: 'app-button',
            child: [],
          },
          {
            tag: 'DIV',
            text: 'Remove',
            attributes: { identifier: 'car-remove-button' },
            classes: 'app-button',
            child: [],
          },
          {
            tag: 'DIV',
            text: '',
            attributes: { identifier: 'car-name' },
            classes: 'race-car-name',
            child: [],
          },
        ],
      },
      {
        tag: 'DIV',
        text: '',
        attributes: {},
        classes: 'race-track',
        child: [
          {
            tag: 'DIV',
            text: '',
            attributes: {},
            classes: 'race-car-button',
            child: [
              {
                tag: 'DIV',
                text: 'A',
                attributes: { identifier: 'car-start-engine' },
                classes: 'app-button race-car-button-action race-car-button-action-a',
                child: [],
              },
              {
                tag: 'DIV',
                text: 'B',
                attributes: { identifier: 'car-stop-engine' },
                classes: 'app-button race-car-button-action race-car-button-action-b disabled-button',
                child: [],
              },
            ],
          },
          {
            tag: 'DIV',
            text: '',
            attributes: {},
            classes: 'race-track-flag',
            child: [
              {
                tag: 'IMG',
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
        tag: 'DIV',
        text: '',
        attributes: { identifier: 'race-track-car' },
        classes: 'race-track-car',
        child: [],
      },
    ],
  },
  templateCar: {
    tag: 'DIV',
    text: '',
    attributes: { identifier: 'race-track-car' },
    classes: 'race-track-car',
    child: [],
  },
};
