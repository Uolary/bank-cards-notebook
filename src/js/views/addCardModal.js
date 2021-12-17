import {$off, $on, qs} from '../helpers/helpers';
import {getCreditCardNameByNumber} from 'creditcard.js';
import {cardName, classes, errorsCard, identifiers} from '../constants';
import Modal from "./modal";

export default class AddCardModal extends Modal {
  constructor() {
    super();

    this.values = {
      cardNumber: '',
      description: '',
      cardName: null
    };

    this._ccNumberPattern = /^\d{0,16}$/g;
    this._ccNumberInputOldValue = null;
    this._ccNumberInputOldCursor = null;

    this._handleInputCardDescription = this._handleInputCardDescription.bind(this);

    this._ccNumberInputInputHandler = this._ccNumberInputInputHandler.bind(this);
    this._ccNumberInputKeyDownHandler = this._ccNumberInputKeyDownHandler.bind(this);
  }

  /**
   * Add card from modal
   *
   * @param {Function} handler Handler function called on synthetic event
   * @param {CardObject[]} store Data from the store containing maps
   */
  bindAddCard(handler, store) {
    $on(qs(`.${classes.modal.modal__addCard}`), 'click', (event) => {
      event.preventDefault();
      const cardName= this._getNameCard(this.values.cardNumber);

      if (store.find((card) => this.values.cardNumber === card.cardNumber)) {
        this._showError(errorsCard.alreadyCard);
        this._setAriaInvalid(qs(`#${identifiers.cardNumber}`), true);
        return;
      }

      if (this.values.cardNumber.length !== 16) {
        this._showError(errorsCard.incompleteCard);
        this._setAriaInvalid(qs(`#${identifiers.cardNumber}`), true);
        return;
      }

      if (!cardName) {
        this._showError(errorsCard.invalidCard);
        this._setAriaInvalid(qs(`#${identifiers.cardNumber}`), true);
        return;
      }

      if (!this.values.description) {
        this._showError(errorsCard.emptyDescription);
        this._setAriaInvalid(qs(`#${identifiers.cardNumber}`), false);
        this._setAriaInvalid(qs(`#${identifiers.cardDescription}`), true);
        return;
      }

      this._removeAddCardModal();

      this.values.cardName = cardName;

      handler(this.values);
    });
  }

  /**
   * Event click add card button
   *
   * @param {Function} handler Handler function called on synthetic event
   */
  clickAddCard(handler) {
    /* eslint-disable max-len */
    $on(qs(`.${classes.modal.modalShowModalBtn}`), 'click', () => {
      qs('.app').insertAdjacentHTML('beforeend', `
        <section class="${classes.modal.modal}" aria-modal="true" role="dialog">
          <div class="${classes.modal.modal__bg} ${classes.modal.modal__bgHigh}"></div>
          <div class="container ${classes.modal.modal__inner}">
            <button class="${classes.modal.modal__closeBtn}"></button>
            <h2 class="${classes.modal.modal__title}">Adding a new card</h2>
            <form class="${classes.modal.modal__form}">
              <div class="${classes.modal.modal__row}">
                <label class="${classes.modal.modal__label}" for="${identifiers.cardNumber}">Card number</label>
                <input
                  name="${identifiers.cardNumber}"
                  class="${classes.modal.modal__input}"
                  id="${identifiers.cardNumber}"
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                  aria-required="true"
                >
              </div>
              <div class="${classes.modal.modal__row}">
                <label class="${classes.modal.modal__label}" for="${identifiers.cardDescription}">Description</label>
                <textarea
                  name="${identifiers.cardDescription}"
                  class="${classes.modal.modal__input}"
                  id="${identifiers.cardDescription}"
                  placeholder="Desctiption"
                  rows="10"
                  aria-required="true"
                ></textarea>
              </div>
              <button class="${classes.modal.modal__addCard}" aria-label="Close">
                Add
              </button>
            </form>
          </div>
        </section>
      `);
      /* eslint-enable max-len */


      super.initModal();

      this._eventInputCardNumber();
      this._eventInputCardDescription();

      handler();
    });
  }

  /**
   * Event input card number
   */
  _eventInputCardNumber() {
    $on(qs(`#${identifiers.cardNumber}`), 'input', this._ccNumberInputInputHandler);
    $on(qs(`#${identifiers.cardNumber}`), 'keydown', this._ccNumberInputKeyDownHandler);
  }

  /**
   * Event input card description
   */
  _eventInputCardDescription() {
    $on(qs(`#${identifiers.cardDescription}`), 'input', this._handleInputCardDescription);
  }

  /**
   * Handler input card description
   *
   * @param {InputEvent} event
   */
  _handleInputCardDescription(event) {
    const value = event.target.value;

    this.values.description = value.slice(0, 1024);

    qs(`#${identifiers.cardDescription}`).value = this.values.description;
  }

  /**
   * Remove add card modal
   */
  _removeAddCardModal() {
    $off(qs(`#${identifiers.cardNumber}`), 'input', this._ccNumberInputInputHandler);
    $off(qs(`#${identifiers.cardNumber}`), 'keydown', this._ccNumberInputKeyDownHandler);
    $off(qs(`#${identifiers.cardDescription}`), 'input', this._handleInputCardDescription);

    super.removeModal();
  }

  /**
   * Get name card (Visa or MasterCard)
   *
   * @param {CardObject.cardNumber} cardNumber Value from card description input tag
   */
  _getNameCard(cardNumber) {
    const name = getCreditCardNameByNumber(cardNumber);

    return name === cardName.masterCard || name === cardName.visa ? name : null;
  }

  /**
   * Show errors in .modal__error class
   *
   * @param {errorsCard} error Value from card description input tag
   */
  _showError(error) {
    qs(`.${classes.modal.modal__error}`) && qs(`.${classes.modal.modal__error}`).remove();

    switch (error) {
      case errorsCard.alreadyCard:
        qs(`.${classes.modal.modal__addCard}`).insertAdjacentHTML(
          'beforebegin',
          this._getElemError('This card number already exists')
        );
        break;

      case errorsCard.invalidCard:
        qs(`.${classes.modal.modal__addCard}`).insertAdjacentHTML(
          'beforebegin',
          this._getElemError('Invalid card number. Supported formats Visa and Mastercard')
        );
        break;

      case errorsCard.incompleteCard:
        qs(`.${classes.modal.modal__addCard}`).insertAdjacentHTML(
          'beforebegin',
          this._getElemError('Incomplete card number')
        );
        break;

      case errorsCard.emptyDescription:
        qs(`.${classes.modal.modal__addCard}`).insertAdjacentHTML(
          'beforebegin',
          this._getElemError('The description for the map is empty')
        );
        break;

      default:
        qs(`.${classes.modal.modal__addCard}`).insertAdjacentHTML(
          'beforebegin',
          this._getElemError('Unknown error')
        );
    }
  }

  /**
   * Set unmask
   *
   * @param {string} value
   */
  _unmask(value) {
    return value.replace(/[^\d]/g, '');
  }

  /**
   * Set mask
   *
   * @param {string} value
   * @param {number} limit
   * @param {string} separator
   */
  _mask(value, limit, separator) {
    const output = [];
    for (let i = 0; i < value.length; i++) {
      if ( i !== 0 && i % limit === 0) {
        output.push(separator);
      }

      output.push(value[i]);
    }

    return output.join("");
  }

  /**
   * Checking separator
   *
   * @param {number} position
   * @param {number} interval
   */
  _checkSeparator(position, interval) {
    return Math.floor(position / (interval + 1));
  }

  /**
   * Handler keydown card number
   *
   * @param {KeyboardEvent} event
   */
  _ccNumberInputKeyDownHandler(event) {
    let el = event.target;
    this._ccNumberInputOldValue = el.value;
    this._ccNumberInputOldCursor = el.selectionEnd;
  }

  /**
   * Handler input card number
   *
   * @param {InputEvent} event
   */
  _ccNumberInputInputHandler(event) {
    const el = event.target;
    let newValue = this.values.cardNumber = this._unmask(el.value);
    let newCursorPosition;

    if (newValue.match(this._ccNumberPattern)) {
      newValue = this._mask(newValue, 4, ' ');

      newCursorPosition =
        this._ccNumberInputOldCursor - this._checkSeparator(this._ccNumberInputOldCursor, 4) +
        this._checkSeparator(this._ccNumberInputOldCursor + (newValue.length - this._ccNumberInputOldValue.length), 4) +
        (this._unmask(newValue).length - this._unmask(this._ccNumberInputOldValue).length);

      el.value = (newValue !== "") ? newValue : "";
    } else {
      el.value = this._ccNumberInputOldValue;
      newCursorPosition = this._ccNumberInputOldCursor;
    }

    el.setSelectionRange(newCursorPosition, newCursorPosition);

    this._highlightCC(el.value);
  }

  /**
   * Finding a regular expression in a loop
   *
   * @param {string} ccValue
   */
  _highlightCC(ccValue) {
    let ccCardType = '',
      ccCardTypePatterns = {
        amex: /^3/,
        visa: /^4/,
        mastercard: /^5/,
        disc: /^6/,

        genric: /(^1|^2|^7|^8|^9|^0)/,
      };

    for (const cardType in ccCardTypePatterns) {
      if (ccCardTypePatterns[cardType].test(ccValue)) {
        ccCardType = cardType;
        break;
      }
    }
  }

  /**
   * Get the element displaying the error text
   *
   * @param {string} error Error text
   */
  _getElemError(error) {
    return `<div class="${classes.modal.modal__error}" id="error-message">${error}</div>`;
  }

  /**
   * Get the element displaying the error text
   *
   * @param {Element} elem Error text
   * @param {boolean} isValid Error text
   */
  _setAriaInvalid(elem, isValid) {
    if (isValid) {
      elem.setAttribute('aria-invalid', `${isValid}`);
      elem.setAttribute('aria-describedby', 'error-message');
    } else {
      elem.removeAttribute('aria-invalid');
      elem.removeAttribute('aria-describedby');
    }
  }
}
