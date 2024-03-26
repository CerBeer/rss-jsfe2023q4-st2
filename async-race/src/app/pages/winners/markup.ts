export const winners = {
  tag: 'DIV',
  text: '',
  attributes: { identifier: 'page-winners' },
  classes: 'main element-user-not-select element-none',
  child: [
    {
      tag: 'SECTION',
      text: '',
      attributes: {},
      classes: 'winners',
      child: [
        { tag: 'DIV', text: 'Winners', attributes: {}, classes: 'winners-title', child: [] },
        {
          tag: 'DIV',
          text: 'Page #1',
          attributes: { identifier: 'winners-page-number' },
          classes: 'winners-page-number',
          child: [],
        },
        {
          tag: 'TABLE',
          text: '',
          attributes: {},
          classes: 'winners-table',
          child: [
            {
              tag: 'THEAD',
              text: '',
              attributes: {},
              classes: 'winners-table-header',
              child: [
                {
                  tag: 'TR',
                  text: '',
                  attributes: {},
                  classes: 'winners-table-header-row',
                  child: [
                    {
                      tag: 'TD',
                      text: 'Number',
                      attributes: { identifier: 'winners-header-id' },
                      classes: 'winners-table-header-cell',
                      child: [],
                    },
                    {
                      tag: 'TD',
                      text: 'Car',
                      attributes: { identifier: 'winners-header-car' },
                      classes: 'winners-table-header-cell',
                      child: [],
                    },
                    {
                      tag: 'TD',
                      text: 'Name',
                      attributes: { identifier: 'winners-header-name' },
                      classes: 'winners-table-header-cell',
                      child: [],
                    },
                    {
                      tag: 'TD',
                      text: 'Wins',
                      attributes: { identifier: 'winners-header-wins' },
                      classes: 'winners-table-header-cell winners-header-wins',
                      child: [],
                    },
                    {
                      tag: 'TD',
                      text: 'Best time (seconds)',
                      attributes: { identifier: 'winners-header-time' },
                      classes: 'winners-table-header-cell winners-header-time',
                      child: [],
                    },
                  ],
                },
              ],
            },
            {
              tag: 'TBODY',
              text: '',
              attributes: { identifier: 'winners-table-body' },
              classes: 'winners-table-body',
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
      classes: 'pagination-buttons',
      child: [
        {
          tag: 'DIV',
          text: 'Prev',
          attributes: { identifier: 'pagination-winners-prev' },
          classes: 'app-button',
          child: [],
        },
        {
          tag: 'DIV',
          text: 'Next',
          attributes: { identifier: 'pagination-winners-next' },
          classes: 'app-button',
          child: [],
        },
      ],
    },
  ],
};
