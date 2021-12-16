import {$off, $on, qs} from '../helpers/helpers';
import {getCreditCardNameByNumber} from 'creditcard.js';
import {cardName, classes, errorsCard, identifiers} from '../constants';

export default class Modal {
  constructor() {
    this.values = {
      cardNumber: '',
      description: '',
      cardName: null
    };

    this._handleDocumentFocus = this._handleDocumentFocus.bind(this);
    this._handleDocumentKeyUp = this._handleDocumentKeyUp.bind(this);
    this._handleInputCardNumber = this._handleInputCardNumber.bind(this);
    this._handleInputCardDescription = this._handleInputCardDescription.bind(this);
    this._removeAddCardModal = this._removeAddCardModal.bind(this);
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
          <div class="${classes.modal.modal__bg}"></div>
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

      this._eventDocumentFocus();
      this._eventDocumentKeyUp();
      this._eventClickModalClose();
      this._eventInputCardNumber();
      this._eventInputCardDescription();

      handler();
    });
  }

  /**
   * Key click event on the document
   */
  _eventDocumentKeyUp() {
    $on(qs('body'), 'keyup', this._handleDocumentKeyUp);
  }

  /**
   * Focus event on the document
   */
  _eventDocumentFocus() {
    $on(qs('body'), 'focus', this._handleDocumentFocus, true);
  }

  /**
   * Event input card number
   */
  _eventInputCardNumber() {
    $on(qs(`#${identifiers.cardNumber}`), 'input', this._handleInputCardNumber);
  }

  /**
   * Event input card description
   */
  _eventInputCardDescription() {
    $on(qs(`#${identifiers.cardDescription}`), 'input', this._handleInputCardDescription);
  }

  /**
   * Handler input card number
   *
   * @param {InputEvent} event
   */
  _handleInputCardNumber(event) {
    const value = event.target.value.replace(/\s/g, '');

    if (value.length <= 16) {
      this.values.cardNumber = value.replace(/[^0-9]/g, '');
    }

    qs(`#${identifiers.cardNumber}`).value = this.values.cardNumber.replace(/(.{4})/g, '$1 ').trim();
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
   * Event click close modal button
   */
  _eventClickModalClose() {
    $on(qs(`.${classes.modal.modal__closeBtn}`), 'click', this._removeAddCardModal);
  }

  /**
   * Handler click event on the document
   *
   * @param {KeyboardEvent} event
   */
  _handleDocumentKeyUp(event) {
    if ('key' in event) {
      if (event.key === 'Escape') {
        this._removeAddCardModal();
      }
    }
  }

  /**
   * Handler click event on the document
   *
   * @param {FocusEvent} event
   */
  _handleDocumentFocus(event) {
    if (!qs(`.${classes.modal.modal}`).contains(event.target)) {
      event.stopPropagation();
      qs(`.${classes.modal.modal__closeBtn}`).focus();
    }
  }

  /**
   * Remove add card modal
   */
  _removeAddCardModal() {
    $off(qs('body'), 'focus', this._handleDocumentFocus, true);
    $off(qs('body'), 'keyup', this._handleDocumentKeyUp);
    $off(qs(`#${identifiers.cardNumber}`), 'input', this._handleInputCardNumber);
    $off(qs(`#${identifiers.cardDescription}`), 'input', this._handleInputCardDescription);
    $off(qs(`.${classes.modal.modal__closeBtn}`), 'click', this._removeAddCardModal);
    qs(`.${classes.app} .${classes.modal.modal}`).remove();
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
