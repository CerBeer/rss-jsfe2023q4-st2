export const templates = {
  templateTableLine: {
    tag: 'tr',
    text: '',
    attributes: {},
    classes: 'winners-table-row',
    child: [
      {
        tag: 'td',
        text: '',
        attributes: { identifier: 'winners-cell-id' },
        classes: 'winners-table-cell',
        child: [],
      },
      {
        tag: 'td',
        text: '',
        attributes: { identifier: 'winners-cell-car' },
        classes: 'winners-table-cell',
        child: [
          {
            tag: 'div',
            text: '',
            attributes: { identifier: 'winners-cell-car-car' },
            classes: 'winners-table-cell-car',
            child: [],
          },
        ],
      },
      {
        tag: 'td',
        text: '',
        attributes: { identifier: 'winners-cell-name' },
        classes: 'winners-table-cell',
        child: [],
      },
      {
        tag: 'td',
        text: '',
        attributes: { identifier: 'winners-cell-wins' },
        classes: 'winners-table-cell',
        child: [],
      },
      {
        tag: 'td',
        text: '',
        attributes: { identifier: 'winners-cell-time' },
        classes: 'winners-table-cell',
        child: [],
      },
    ],
  },
};
