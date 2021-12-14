import {$off, $on, qs} from "../helpers/helpers";
import {
  getCreditCardNameByNumber
} from 'creditcard.js';
import {cardName, errorsCardNumber} from "../constants";

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
    $on(qs('.modal__add-card'), 'click', (event) => {
      event.preventDefault();
      const cardName= this._getNameCard(this.values.cardNumber);

      if (store.find((card) => this.values.cardNumber === card.cardNumber)) {
        this._showError(errorsCardNumber.already);
        return;
      }

      if (this.values.cardNumber.length !== 16) {
        this._showError(errorsCardNumber.incomplete);
        return;
      }

      if (!cardName) {
        this._showError(errorsCardNumber.invalidCard);
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
    $on(qs('.card__add-btn'), 'click', () => {
      qs('.app').insertAdjacentHTML('beforeend', `
        <section class="modal">
          <div class="modal__bg"></div>
          <div class="container modal__inner">
            <button class="modal__close"></button>
            <h2 class="modal__title">Adding a new card</h2>
            <form class="modal__form">
              <div class="modal__row">
                  <input class="modal__input" id="card-number" type="text" placeholder="Card number">
              </div>
              <div class="modal__row">
                  <textarea class="modal__input" id="card-description" placeholder="Desctiption" rows="10"></textarea>
              </div>
              <button class="modal__add-card">
                  Add
              </button>
            </form>
          </div>
        </section>
      `);

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
    $on(qs('#card-number'), 'input', this._handleInputCardNumber);
  }

  /**
   * Event input card description
   */
  _eventInputCardDescription() {
    $on(qs('#card-description'), 'input', this._handleInputCardDescription);
  }

  /**
   * Handler input card number
   *
   * @param {InputEvent} event
   */
  _handleInputCardNumber(event) {
    const value = event.target.value;

    if (value.length <= 16) {
      this.values.cardNumber = value.replace(/[^0-9]/g, '');
    }

    qs('#card-number').value = this.values.cardNumber;
  }

  /**
   * Handler input card description
   *
   * @param {InputEvent} event
   */
  _handleInputCardDescription(event) {
    const value = event.target.value;

    this.values.description = value.slice(0, 1024);

    qs('#card-description').value = this.values.description;
  }

  /**
   * Event click close modal button
   */
  _eventClickModalClose() {
    $on(qs('.modal__close'), 'click', this._removeAddCardModal);
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
    if (!qs('.modal').contains(event.target)) {
      event.stopPropagation();
      qs('.modal__close').focus();
    }
  }

  /**
   * Remove add card modal
   */
  _removeAddCardModal() {
    $off(qs('body'), 'focus', this._handleDocumentFocus, true);
    $off(qs('body'), 'keyup', this._handleDocumentKeyUp);
    $off(qs('#card-number'), 'input', this._handleInputCardNumber);
    $off(qs('#card-description'), 'input', this._handleInputCardDescription);
    $off(qs('.modal__close'), 'click', this._removeAddCardModal);
    qs('.app .modal').remove();
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
   * @param {errorsCardNumber} error Value from card description input tag
   */
  _showError(error) {
    qs('.modal__error') && qs('.modal__error').remove();

    switch (error) {
      case errorsCardNumber.already:
        qs('.modal__add-card').insertAdjacentHTML(
          'beforebegin',
          this._getElemError('This card number already exists')
        );
        break;

      case errorsCardNumber.invalidCard:
        qs('.modal__add-card').insertAdjacentHTML(
          'beforebegin',
          this._getElemError('Invalid card number. Supported formats Visa and Mastercard.')
        );
        break;

      case errorsCardNumber.incomplete:
        qs('.modal__add-card').insertAdjacentHTML(
          'beforebegin',
          this._getElemError('Incomplete card number')
        );
        break;

      default:
        qs('.modal__add-card').insertAdjacentHTML(
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
    return `<div class="modal__error">${error}</div>`;
  }
}
