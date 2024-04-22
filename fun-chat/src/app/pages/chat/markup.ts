export const chat = {
  tag: 'main',
  text: '',
  attributes: {},
  classes: 'chat',
  child: [
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'chat-header',
      child: [
        {
          tag: 'label',
          text: '',
          attributes: {},
          classes: 'chat-header-user-name',
          child: [
            {
              tag: 'div',
              text: 'Пользователь: ',
              attributes: {},
              classes: '',
              child: [],
            },
            {
              tag: 'div',
              text: 'Myname',
              attributes: { identifier: 'user-info' },
              classes: 'chat-header-user-name-name',
              child: [],
            },
          ],
        },
        { tag: 'label', text: 'Fun Chat', attributes: {}, classes: 'chat-header-app-name', child: [] },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-header-buttons',
          child: [
            {
              tag: 'button',
              text: 'Выход',
              attributes: { type: 'button', identifier: 'chat-logout' },
              classes: 'chat-header-buttons-logout',
              child: [],
            },
            {
              tag: 'button',
              text: 'i',
              attributes: { type: 'button', identifier: 'chat-info' },
              classes: 'chat-header-buttons-info',
              child: [],
            },
          ],
        },
      ],
    },
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'chat-main',
      child: [
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-main-left',
          child: [
            {
              tag: 'input',
              text: '',
              attributes: { placeholder: 'Поиск...', identifier: 'left-search' },
              classes: 'chat-main-left-search',
              child: [],
            },
            {
              tag: 'ul',
              text: '',
              attributes: { identifier: 'left-users-list' },
              classes: 'chat-main-left-users-list',
              child: [],
            },
          ],
        },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-main-right',
          child: [
            {
              tag: 'div',
              text: '',
              attributes: {},
              classes: 'chat-main-right-companion',
              child: [
                {
                  tag: 'div',
                  text: '',
                  attributes: { identifier: 'right-companion-login' },
                  classes: 'chat-main-right-companion-login',
                  child: [],
                },
                {
                  tag: 'div',
                  text: '',
                  attributes: { identifier: 'right-companion-status' },
                  classes: 'chat-main-right-companion-status',
                  child: [],
                },
              ],
            },
            {
              tag: 'div',
              text: '',
              attributes: { identifier: 'right-dialog' },
              classes: 'chat-main-right-dialog',
              child: [
                {
                  tag: 'label',
                  text: 'Выберите пользователя для отправки сообщения...',
                  attributes: { identifier: 'right-dialog-placeholder' },
                  classes: 'chat-main-right-dialog-placeholder',
                  child: [],
                },
              ],
            },
            {
              tag: 'form',
              text: '',
              attributes: { identifier: 'right-send-input-form' },
              classes: 'chat-main-right-send',
              child: [
                {
                  tag: 'input',
                  text: '',
                  attributes: { placeholder: 'Сообщение...', disabled: '', value: '', identifier: 'right-send-input' },
                  classes: 'chat-main-right-send-input',
                  child: [],
                },
                {
                  tag: 'button',
                  text: 'Отправить',
                  attributes: { type: 'button', disabled: '', identifier: 'right-send-button' },
                  classes: 'chat-main-right-send-button',
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      tag: 'section',
      text: '',
      attributes: {},
      classes: 'chat-footer',
      child: [
        { tag: 'label', text: 'RSSchool', attributes: {}, classes: '', child: [] },
        {
          tag: 'label',
          text: 'CerBeer',
          attributes: {},
          classes: 'chat-footer-about',
          child: [
            {
              tag: 'a',
              text: '',
              attributes: { href: 'https://github.com/CerBeer' },
              classes: 'chat-footer-about-link',
              child: [
                {
                  tag: 'img',
                  text: '',
                  attributes: {
                    alt: 'Разработано CerBeer',
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTZCRDY3REIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTZCRDY3RUIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdCQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjdDQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SM9MCAAAA+5JREFUeNrEV11Ik1EY3s4+ddOp29Q5b0opCgKFsoKoi5Kg6CIhuwi6zLJLoYLopq4qsKKgi4i6CYIoU/q5iDAKs6syoS76IRWtyJ+p7cdt7sf1PGOD+e0c3dygAx/67ZzzPM95/877GYdHRg3ZjMXFxepQKNS6sLCwJxqNNuFpiMfjVs4ZjUa/pmmjeD6VlJS8NpvNT4QQ7mxwjSsJiEQim/1+/9lgMHgIr5ohuxG1WCw9Vqv1clFR0dCqBODElV6v90ogEDjGdYbVjXhpaendioqK07CIR7ZAqE49PT09BPL2PMgTByQGsYiZlQD4uMXtdr+JxWINhgINYhGT2MsKgMrm2dnZXgRXhaHAg5jEJodUAHxux4LudHJE9RdEdA+i3Juz7bGHe4mhE9FNrgwBCLirMFV9Okh5eflFh8PR5nK5nDabrR2BNJlKO0T35+Li4n4+/J+/JQCxhmu5h3uJoXNHPbmWZAHMshWB8l5/ipqammaAf0zPDDx1ONV3vurdidqwAQL+pEc8sLcAe1CCvQ3YHxIW8Pl85xSWNC1hADDIv0rIE/o4J0k3kww4xSlwIhcq3EFFOm7KN/hUGOQkt0CFa5WpNJlMvxBEz/IVQAxg/ZRZl9wiHA63yDYieM7DnLP5CiAGsC7I5sgtYKJGWe2A8seFqgFJrJjEPY1Cn3pJ8/9W1e5VWsFDTEmFrBcoDhZJEQkXuhICMyKpjhahqN21hRYATKfUOlDmkygrR4o4C0VOLGJKrOITKB4jijzdXygBKixyC5TDQdnk/Pz8qRw6oOWGlsTKGOQW6OH6FBWsyePxdOXLTgxiyebILZCjz+GLgMIKnXNzc49YMlcRdHXcSwxFVgTInQhC9G33UhNoJLuqq6t345p9y3eUy8OTk5PjAHuI9uo4b07FBaOhsu0A4Unc+T1TU1Nj3KsSSE5yJ65jqF2DDd8QqWYmAZrIM2VlZTdnZmb6AbpdV9V6ec9znf5Q7HjYumdRE0JOp3MjitO4SFa+cZz8Umqe3TCbSLvdfkR/kWDdNQl5InuTcysOcpFT35ZrbBxx4p3JAHlZVVW1D/634VRt+FvLBgK/v5LV9WS+10xMTEwtRw7XvqOL+e2Q8V3AYIOIAXQ26/heWVnZCVfcyKHg2CBgTpmPmjYM8l24GyaUHyaIh7XwfR9ErE8qHoDfn2LTNAVC0HX6MFcBIP8Bi+6F6cdW/DICkANRfx99fEYFQ7Nph5i/uQiA214gno7K+guhaiKg9gC62+M8eR7XsBsYJ4ilam60Fb7r7uAj8wFyuwM1oIOWgfmDy6RXEEQzJMPe23DXrVS7rtyD3Df8z/FPgAEAzWU5Ku59ZAUAAAAASUVORK5CYII=',
                  },
                  classes: 'chat-footer-about-link-img',
                  child: [],
                },
              ],
            },
          ],
        },
        { tag: 'label', text: '2024', attributes: {}, classes: '', child: [] },
      ],
    },
  ],
};

export const companionListElement = {
  tag: 'li',
  text: '',
  attributes: {},
  classes: 'chat-main-left-users-list-user',
  child: [
    {
      tag: 'div',
      text: '',
      attributes: { identifier: 'user-status' },
      classes: 'chat-main-left-users-list-user-status',
      child: [],
    },
    {
      tag: 'label',
      text: '',
      attributes: { identifier: 'user-login' },
      classes: 'chat-main-left-users-list-user-login',
      child: [],
    },
    {
      tag: 'label',
      text: '',
      attributes: { identifier: 'user-messages' },
      classes: 'chat-main-left-users-list-user-messages',
      child: [],
    },
  ],
};

export const messageElement = {
  tag: 'div',
  text: '',
  attributes: { identifier: 'dialog-message' },
  classes: 'chat-main-right-dialog-message',
  child: [
    {
      tag: 'div',
      text: '',
      attributes: {},
      classes: 'chat-main-right-dialog-message-box',
      child: [
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-main-right-dialog-message-box-header',
          child: [
            {
              tag: 'label',
              text: '',
              attributes: { identifier: 'header-label-left' },
              classes: 'chat-main-right-dialog-message-box-header-label-left',
              child: [],
            },
            {
              tag: 'label',
              text: '',
              attributes: { identifier: 'header-label-right' },
              classes: 'chat-main-right-dialog-message-box-header-label-right',
              child: [],
            },
          ],
        },
        {
          tag: 'div',
          text: '',
          attributes: { identifier: 'box-text' },
          classes: 'chat-main-right-dialog-message-box-text',
          child: [],
        },
        {
          tag: 'div',
          text: '',
          attributes: {},
          classes: 'chat-main-right-dialog-message-box-footer',
          child: [
            {
              tag: 'label',
              text: '',
              attributes: { identifier: 'footer-label-left' },
              classes: 'chat-main-right-dialog-message-box-footer-label-left',
              child: [],
            },
            {
              tag: 'label',
              text: '',
              attributes: { identifier: 'footer-label-right' },
              classes: 'chat-main-right-dialog-message-box-footer-label-right',
              child: [],
            },
          ],
        },
      ],
    },
  ],
};
