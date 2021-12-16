import {$on, qs} from '../helpers/helpers';
import {cardName, classes} from '../constants';

export default class Card {
  constructor() {
    this._isShowDescription = false;

    this._eventLessShowDescription();
  }

  /**
   * Get html card
   *
   * @param {CardObject} card Object card containing cardNumber and description
   */
  cardHtml(card) {
    /* eslint-disable max-len */
    return `
      <li class="${classes.card.card__item}">
        <header class="${classes.card.card__header}">
          ${this._getCardIcon(card.cardName)}
          <h2 class="${classes.card.card__number}">
            ${this._getSpacedCardNumber(card.cardNumber)}
          </h2>
          <button class="${classes.card.card__removeBtn}" data-id="${card.cardNumber}" aria-label="Remove a credit card">
            <svg class="${classes.card.card__removeSvg}" width="512px" height="512px" viewBox="0 0 512 512">
              <g>
                <path d="M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31   h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13   c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z"/><path d="M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8   l18.7-242.6C396.8,178.1,396,176,379.4,176z"/>
              </g>
            </svg>
          </button>
        </header>
        <p class="${classes.card.card__description}" data-full-description="${card.description}">
          ${this._getDescriptionHtml(card.description)}
        </p>
      </li>
    `;
    /* eslint-enable max-len */
  }

  /**
   * Remove card
   *
   * @param {Function} handler Handler function called on synthetic event
   */
  bindRemoveCard(handler) {
    $on(qs(`.${classes.cardList.card__list}`), 'click', (event) => {
      if (event.target.closest(`.${classes.card.card__removeBtn}`)) {
        handler(event.target.closest(`.${classes.card.card__removeBtn}`).dataset.id);
      }
    });
  }

  /**
   * Get icon svg from card name
   *
   * @param {cardName} name Card name
   */
  _getCardIcon(name) {
    if (name === cardName.visa) {
      /* eslint-disable max-len */
      return `
        <svg class="${classes.card.card__typeSvg}" height="512px" width="512px" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g><g><g><path d="M211.328,184.445l-23.465,144.208h37.542l23.468-144.208     H211.328z M156.276,184.445l-35.794,99.185l-4.234-21.358l0.003,0.007l-0.933-4.787c-4.332-9.336-14.365-27.08-33.31-42.223     c-5.601-4.476-11.247-8.296-16.705-11.559l32.531,124.943h39.116l59.733-144.208H156.276z M302.797,224.48     c0-16.304,36.563-14.209,52.629-5.356l5.357-30.972c0,0-16.534-6.288-33.768-6.288c-18.632,0-62.875,8.148-62.875,47.739     c0,37.26,51.928,37.723,51.928,57.285c0,19.562-46.574,16.066-61.944,3.726l-5.586,32.373c0,0,16.763,8.148,42.382,8.148     c25.616,0,64.272-13.271,64.272-49.37C355.192,244.272,302.797,240.78,302.797,224.48z M455.997,184.445h-30.185     c-13.938,0-17.332,10.747-17.332,10.747l-55.988,133.461h39.131l7.828-21.419h47.728l4.403,21.419h34.472L455.997,184.445z      M410.27,277.641l19.728-53.966l11.098,53.966H410.27z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#005BAC;"/></g></g></g><g><g><g><path d="M104.132,198.022c0,0-1.554-13.015-18.144-13.015H25.715     l-0.706,2.446c0,0,28.972,5.906,56.767,28.033c26.562,21.148,35.227,47.51,35.227,47.51L104.132,198.022z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#F6AC1D;"/></g></g></g></svg>
      `;
      /* eslint-enable max-len */
    }

    if (name === cardName.masterCard) {
      /* eslint-disable max-len */
      return `
        <svg class="${classes.card.card__typeSvg}" height="64px" width="64px" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g><g><g><path d="M63.5,32c0,10.4-8.4,18.9-18.9,18.9c-10.4,0-18.9-8.5-18.9-18.9v0c0-10.4,8.4-18.9,18.8-18.9     C55.1,13.1,63.5,21.6,63.5,32C63.5,32,63.5,32,63.5,32z" fill="#FFB600"/></g></g><g><g><path d="M44.6,13.1c10.4,0,18.9,8.5,18.9,18.9c0,0,0,0,0,0c0,10.4-8.4,18.9-18.9,18.9c-10.4,0-18.9-8.5-18.9-18.9     " fill="#F7981D"/></g></g><g><g><path d="M44.6,13.1c10.4,0,18.9,8.5,18.9,18.9c0,0,0,0,0,0c0,10.4-8.4,18.9-18.9,18.9" fill="#FF8500"/></g></g><g><g><path d="M19.2,13.1C8.9,13.2,0.5,21.6,0.5,32c0,10.4,8.4,18.9,18.9,18.9c4.9,0,9.3-1.9,12.7-4.9l0,0h0     c0.7-0.6,1.3-1.3,1.9-2h-3.9c-0.5-0.6-1-1.3-1.4-1.9h6.7c0.4-0.6,0.8-1.3,1.1-2h-8.9c-0.3-0.6-0.6-1.3-0.8-2h10.4     c0.6-1.9,1-3.9,1-6c0-1.4-0.2-2.7-0.4-4H26.2c0.1-0.7,0.3-1.3,0.5-2h10.4c-0.2-0.7-0.5-1.4-0.8-2h-8.8c0.3-0.7,0.7-1.3,1.1-2h6.7     c-0.4-0.7-0.9-1.4-1.5-2h-3.7c0.6-0.7,1.2-1.3,1.9-1.9c-3.3-3.1-7.8-4.9-12.7-4.9C19.3,13.1,19.3,13.1,19.2,13.1z" fill="#FF5050"/></g></g><g><g><path d="M0.5,32c0,10.4,8.4,18.9,18.9,18.9c4.9,0,9.3-1.9,12.7-4.9l0,0h0c0.7-0.6,1.3-1.3,1.9-2h-3.9     c-0.5-0.6-1-1.3-1.4-1.9h6.7c0.4-0.6,0.8-1.3,1.1-2h-8.9c-0.3-0.6-0.6-1.3-0.8-2h10.4c0.6-1.9,1-3.9,1-6c0-1.4-0.2-2.7-0.4-4     H26.2c0.1-0.7,0.3-1.3,0.5-2h10.4c-0.2-0.7-0.5-1.4-0.8-2h-8.8c0.3-0.7,0.7-1.3,1.1-2h6.7c-0.4-0.7-0.9-1.4-1.5-2h-3.7     c0.6-0.7,1.2-1.3,1.9-1.9c-3.3-3.1-7.8-4.9-12.7-4.9c0,0-0.1,0-0.1,0" fill="#E52836"/></g></g><g><g><path d="M19.4,50.9c4.9,0,9.3-1.9,12.7-4.9l0,0h0c0.7-0.6,1.3-1.3,1.9-2h-3.9c-0.5-0.6-1-1.3-1.4-1.9h6.7     c0.4-0.6,0.8-1.3,1.1-2h-8.9c-0.3-0.6-0.6-1.3-0.8-2h10.4c0.6-1.9,1-3.9,1-6c0-1.4-0.2-2.7-0.4-4H26.2c0.1-0.7,0.3-1.3,0.5-2     h10.4c-0.2-0.7-0.5-1.4-0.8-2h-8.8c0.3-0.7,0.7-1.3,1.1-2h6.7c-0.4-0.7-0.9-1.4-1.5-2h-3.7c0.6-0.7,1.2-1.3,1.9-1.9     c-3.3-3.1-7.8-4.9-12.7-4.9c0,0-0.1,0-0.1,0" fill="#CB2026"/></g></g><g><g><g><path d="M26.1,36.8l0.3-1.7c-0.1,0-0.3,0.1-0.5,0.1c-0.7,0-0.8-0.4-0.7-0.6l0.6-3.5h1.1l0.3-1.9h-1l0.2-1.2h-2      c0,0-1.2,6.6-1.2,7.4c0,1.2,0.7,1.7,1.6,1.7C25.4,37.1,25.9,36.9,26.1,36.8z" fill="#FFFFFF"/></g></g><g><g><path d="M26.8,33.6c0,2.8,1.9,3.5,3.5,3.5c1.5,0,2.1-0.3,2.1-0.3l0.4-1.9c0,0-1.1,0.5-2.1,0.5      c-2.2,0-1.8-1.6-1.8-1.6h4.1c0,0,0.3-1.3,0.3-1.8c0-1.3-0.7-2.9-2.9-2.9C28.3,28.9,26.8,31.1,26.8,33.6z M30.3,30.7      c1.1,0,0.9,1.3,0.9,1.4H29C29,32,29.2,30.7,30.3,30.7z" fill="#FFFFFF"/></g></g><g><g><path d="M43,36.8l0.4-2.2c0,0-1,0.5-1.7,0.5c-1.4,0-2-1.1-2-2.3c0-2.4,1.2-3.7,2.6-3.7c1,0,1.8,0.6,1.8,0.6      l0.3-2.1c0,0-1.2-0.5-2.3-0.5c-2.3,0-4.6,2-4.6,5.8c0,2.5,1.2,4.2,3.6,4.2C41.9,37.1,43,36.8,43,36.8z" fill="#FFFFFF"/></g></g><g><g><path d="M15.1,28.9c-1.4,0-2.4,0.4-2.4,0.4l-0.3,1.7c0,0,0.9-0.4,2.2-0.4c0.7,0,1.3,0.1,1.3,0.7      c0,0.4-0.1,0.5-0.1,0.5s-0.6,0-0.9,0c-1.7,0-3.6,0.7-3.6,3c0,1.8,1.2,2.2,1.9,2.2c1.4,0,2-0.9,2.1-0.9l-0.1,0.8h1.8l0.8-5.5      C17.8,29,15.8,28.9,15.1,28.9z M15.5,33.4c0,0.3-0.2,1.9-1.4,1.9c-0.6,0-0.8-0.5-0.8-0.8c0-0.5,0.3-1.2,1.8-1.2      C15.4,33.4,15.5,33.4,15.5,33.4z" fill="#FFFFFF"/></g></g><g><g><path d="M19.7,37c0.5,0,3,0.1,3-2.6c0-2.5-2.4-2-2.4-3c0-0.5,0.4-0.7,1.1-0.7c0.3,0,1.4,0.1,1.4,0.1l0.3-1.8      c0,0-0.7-0.2-1.9-0.2c-1.5,0-3,0.6-3,2.6c0,2.3,2.5,2.1,2.5,3c0,0.6-0.7,0.7-1.2,0.7c-0.9,0-1.8-0.3-1.8-0.3l-0.3,1.8      C17.5,36.8,18,37,19.7,37z" fill="#FFFFFF"/></g></g><g><g><path d="M59.6,27.3L59.2,30c0,0-0.8-1-1.9-1c-1.8,0-3.4,2.2-3.4,4.8c0,1.6,0.8,3.3,2.5,3.3      c1.2,0,1.9-0.8,1.9-0.8l-0.1,0.7h2l1.5-9.6L59.6,27.3z M58.7,32.6c0,1.1-0.5,2.5-1.6,2.5c-0.7,0-1.1-0.6-1.1-1.6      c0-1.6,0.7-2.6,1.6-2.6C58.3,30.9,58.7,31.4,58.7,32.6z" fill="#FFFFFF"/></g></g><g><g><path d="M4.2,36.9l1.2-7.2l0.2,7.2H7l2.6-7.2l-1.1,7.2h2.1l1.6-9.6H8.9l-2,5.9l-0.1-5.9H3.9l-1.6,9.6H4.2z" fill="#FFFFFF"/></g></g><g><g><path d="M35.2,36.9c0.6-3.3,0.7-6,2.1-5.5c0.2-1.3,0.5-1.8,0.7-2.3c0,0-0.1,0-0.4,0c-0.9,0-1.6,1.2-1.6,1.2      l0.2-1.1h-1.9l-1.3,7.8H35.2z" fill="#FFFFFF"/></g></g><g><g><path d="M47.6,28.9c-1.4,0-2.4,0.4-2.4,0.4l-0.3,1.7c0,0,0.9-0.4,2.2-0.4c0.7,0,1.3,0.1,1.3,0.7      c0,0.4-0.1,0.5-0.1,0.5s-0.6,0-0.9,0c-1.7,0-3.6,0.7-3.6,3c0,1.8,1.2,2.2,1.9,2.2c1.4,0,2-0.9,2.1-0.9l-0.1,0.8h1.8l0.8-5.5      C50.4,29,48.3,28.9,47.6,28.9z M48.1,33.4c0,0.3-0.2,1.9-1.4,1.9c-0.6,0-0.8-0.5-0.8-0.8c0-0.5,0.3-1.2,1.8-1.2      C48,33.4,48,33.4,48.1,33.4z" fill="#FFFFFF"/></g></g><g><g><path d="M52,36.9c0.6-3.3,0.7-6,2.1-5.5c0.2-1.3,0.5-1.8,0.7-2.3c0,0-0.1,0-0.4,0c-0.9,0-1.6,1.2-1.6,1.2      l0.2-1.1h-1.9l-1.3,7.8H52z" fill="#FFFFFF"/></g></g></g><g><g><g><path d="M23,35.4c0,1.2,0.7,1.7,1.6,1.7c0.7,0,1.3-0.2,1.5-0.3l0.3-1.7c-0.1,0-0.3,0.1-0.5,0.1      c-0.7,0-0.8-0.4-0.7-0.6l0.6-3.5h1.1l0.3-1.9h-1l0.2-1.2" fill="#DCE5E5"/></g></g><g><g><path d="M27.8,33.6c0,2.8,0.9,3.5,2.5,3.5c1.5,0,2.1-0.3,2.1-0.3l0.4-1.9c0,0-1.1,0.5-2.1,0.5      c-2.2,0-1.8-1.6-1.8-1.6h4.1c0,0,0.3-1.3,0.3-1.8c0-1.3-0.7-2.9-2.9-2.9C28.3,28.9,27.8,31.1,27.8,33.6z M30.3,30.7      c1.1,0,1.3,1.3,1.3,1.4H29C29,32,29.2,30.7,30.3,30.7z" fill="#DCE5E5"/></g></g><g><g><path d="M43,36.8l0.4-2.2c0,0-1,0.5-1.7,0.5c-1.4,0-2-1.1-2-2.3c0-2.4,1.2-3.7,2.6-3.7c1,0,1.8,0.6,1.8,0.6      l0.3-2.1c0,0-1.2-0.5-2.3-0.5c-2.3,0-3.6,2-3.6,5.8c0,2.5,0.2,4.2,2.6,4.2C41.9,37.1,43,36.8,43,36.8z" fill="#DCE5E5"/></g></g><g><g><path d="M12.4,31.1c0,0,0.9-0.4,2.2-0.4c0.7,0,1.3,0.1,1.3,0.7c0,0.4-0.1,0.5-0.1,0.5s-0.6,0-0.9,0      c-1.7,0-3.6,0.7-3.6,3c0,1.8,1.2,2.2,1.9,2.2c1.4,0,2-0.9,2.1-0.9l-0.1,0.8h1.8l0.8-5.5c0-2.3-2-2.4-2.8-2.4 M16.5,33.4      c0,0.3-1.2,1.9-2.4,1.9c-0.6,0-0.8-0.5-0.8-0.8c0-0.5,0.3-1.2,1.8-1.2C15.4,33.4,16.5,33.4,16.5,33.4z" fill="#DCE5E5"/></g></g><g><g><path d="M17.5,36.8c0,0,0.6,0.2,2.3,0.2c0.5,0,3,0.1,3-2.6c0-2.5-2.4-2-2.4-3c0-0.5,0.4-0.7,1.1-0.7      c0.3,0,1.4,0.1,1.4,0.1l0.3-1.8c0,0-0.7-0.2-1.9-0.2c-1.5,0-2,0.6-2,2.6c0,2.3,1.5,2.1,1.5,3c0,0.6-0.7,0.7-1.2,0.7" fill="#DCE5E5"/></g></g><g><g><path d="M59.2,30c0,0-0.8-1-1.9-1c-1.8,0-2.4,2.2-2.4,4.8c0,1.6-0.2,3.3,1.5,3.3c1.2,0,1.9-0.8,1.9-0.8l-0.1,0.7      h2l1.5-9.6 M59.1,32.6c0,1.1-0.9,2.5-2,2.5c-0.7,0-1.1-0.6-1.1-1.6c0-1.6,0.7-2.6,1.6-2.6C58.3,30.9,59.1,31.4,59.1,32.6z" fill="#DCE5E5"/></g></g><g><g><path d="M4.2,36.9l1.2-7.2l0.2,7.2H7l2.6-7.2l-1.1,7.2h2.1l1.6-9.6H9.7l-2.8,5.9l-0.1-5.9H5.7l-3.4,9.6H4.2z" fill="#DCE5E5"/></g></g><g><g><path d="M33.1,36.9h2.1c0.6-3.3,0.7-6,2.1-5.5c0.2-1.3,0.5-1.8,0.7-2.3c0,0-0.1,0-0.4,0c-0.9,0-1.6,1.2-1.6,1.2      l0.2-1.1" fill="#DCE5E5"/></g></g><g><g><path d="M44.9,31.1c0,0,0.9-0.4,2.2-0.4c0.7,0,1.3,0.1,1.3,0.7c0,0.4-0.1,0.5-0.1,0.5s-0.6,0-0.9,0      c-1.7,0-3.6,0.7-3.6,3c0,1.8,1.2,2.2,1.9,2.2c1.4,0,2-0.9,2.1-0.9l-0.1,0.8h1.8l0.8-5.5c0-2.3-2-2.4-2.8-2.4 M49,33.4      c0,0.3-1.2,1.9-2.4,1.9c-0.6,0-0.8-0.5-0.8-0.8c0-0.5,0.3-1.2,1.8-1.2C48,33.4,49,33.4,49,33.4z" fill="#DCE5E5"/></g></g><g><g><path d="M49.9,36.9H52c0.6-3.3,0.7-6,2.1-5.5c0.2-1.3,0.5-1.8,0.7-2.3c0,0-0.1,0-0.4,0c-0.9,0-1.6,1.2-1.6,1.2      l0.2-1.1" fill="#DCE5E5"/></g></g></g></g></svg>
      `;
      /* eslint-enable max-len */
    }

    return '';
  }

  /**
   * Get html for card__description class
   *
   * @param {string} description Card description
   */
  _getDescriptionHtml(description) {
    const averageCharacterLength = 7;
    const lessShowDescriptionOffsetWidth = 210;
    const cardListOffsetWidth = qs(`.${classes.cardList.card__list}`).offsetWidth - lessShowDescriptionOffsetWidth;

    if (description.length > cardListOffsetWidth && !this._isShowDescription) {
      return `
        ${description.slice(0, (cardListOffsetWidth / averageCharacterLength).toFixed(0) || description.length)}
        ...
        ${this._lessShowDescriptionBtn()}
      `;
    }

    if (this._isShowDescription) {
      return `${description} ${this._lessShowDescriptionBtn()}`;
    }

    return description;
  }

  /**
   * Button for less show description card
   */
  _lessShowDescriptionBtn() {
    return `
      <button
        class="${classes.card.card__lessShowDescription}"
        aria-label="${this._isShowDescription ? 'Less': 'Show'} full description"
      >
        ${this._isShowDescription ? 'Less full': 'Show full'}
      </button>
    `;
  }

  /**
   * Click at card__list class
   */
  _eventLessShowDescription() {
    $on(qs(`.${classes.cardList.card__list}`), 'click', (event) => {
      const lessShowBtn = event.target.closest(`.${classes.card.card__lessShowDescription}`);
      const cardDescriptionElem = event.target.closest(`.${classes.card.card__description}`);

      if (lessShowBtn) {
        this._isShowDescription = !this._isShowDescription;
        cardDescriptionElem.innerHTML = this._getDescriptionHtml(cardDescriptionElem.dataset.fullDescription);
      }
    });
  }

  /**
   * Get card number with spaced in span tags
   *
   * @param {string} number Card number
   */
  _getSpacedCardNumber(number) {
    return number.replace(/(.{4})/g, '$1 ').trim().split(' ').map((number) => (
      `<span class="${classes.card.card__numberPart}">${number}</span>`
    )).join('');
  }
}
