export const winners = {
  tag: 'div',
  text: '',
  attributes: { identifier: 'page-winners' },
  classes: 'main element-user-not-select element-none',
  child: [
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'winners',
      child: [
        {
          tag: 'div',
          text: 'Winners',
          attributes: { identifier: 'winners-title' },
          classes: 'winners-title',
          child: [],
        },
        {
          tag: 'div',
          text: 'Page #1',
          attributes: { identifier: 'winners-page-number' },
          classes: 'winners-page-number',
          child: [],
        },
        {
          tag: 'section',
          text: '',
          attributes: { identifier: 'winners-pool' },
          classes: 'winners-pool',
          child: [
            {
              tag: 'table',
              text: '',
              attributes: {},
              classes: 'winners-table',
              child: [
                {
                  tag: 'thead',
                  text: '',
                  attributes: {},
                  classes: 'winners-table-header',
                  child: [
                    {
                      tag: 'tr',
                      text: '',
                      attributes: {},
                      classes: 'winners-table-header-row',
                      child: [
                        {
                          tag: 'td',
                          text: 'Number',
                          attributes: { identifier: 'winners-header-id' },
                          classes: 'winners-table-header-cell',
                          child: [],
                        },
                        {
                          tag: 'td',
                          text: 'Car',
                          attributes: { identifier: 'winners-header-car' },
                          classes: 'winners-table-header-cell',
                          child: [],
                        },
                        {
                          tag: 'td',
                          text: '',
                          attributes: { identifier: 'winners-header-name' },
                          classes: 'winners-table-header-cell',
                          child: [
                            {
                              tag: 'div',
                              text: 'Name',
                              attributes: { identifier: 'pagination-winners-prev' },
                              classes: 'winners-table-header-cell-name',
                              child: [],
                            },
                          ],
                        },
                        {
                          tag: 'td',
                          text: 'Wins',
                          attributes: { identifier: 'winners-header-wins' },
                          classes: 'winners-table-header-cell winners-header-wins',
                          child: [],
                        },
                        {
                          tag: 'td',
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
                  tag: 'tbody',
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
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'pagination-buttons',
          child: [
            {
              tag: 'div',
              text: 'Prev',
              attributes: { identifier: 'pagination-winners-prev' },
              classes: 'app-button',
              child: [],
            },
            {
              tag: 'div',
              text: 'Next',
              attributes: { identifier: 'pagination-winners-next' },
              classes: 'app-button',
              child: [],
            },
          ],
        },
      ],
    },
  ],
};
