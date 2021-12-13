import {$off, $on, qs} from "../helpers/helpers";
import {parseInt} from "lodash/string";

export default class Modal {
  constructor() {
    this.values = {
      cardNumber: '',
      description: ''
    };
  }

  /**
   * Add card from modal
   *
   * @param {Function} handler Handler function called on synthetic event
   */
  bindAddCard(handler) {
    $on(qs('.modal__add-card'), 'click', (event) => {
      event.preventDefault();

      this._removeAddCardModal();

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

      this._eventClickModalClose();
      this._eventInputCardNumber();
      this._eventInputCardDescription();
      handler();
    });
  }

  /**
   * Event input card number
   */
  _eventInputCardNumber() {
    $on(qs('#card-number'), 'input', this._handleInputCardNumber.bind(this));
  }

  /**
   * Event input card description
   */
  _eventInputCardDescription() {
    $on(qs('#card-description'), 'input', this._handleInputCardDescription.bind(this));
  }

  /**
   * Handler input card number
   *
   * @param {InputEvent} event Value from card number input tag
   */
  _handleInputCardNumber(event) {
    const value = event.target.value;

    this.values.cardNumber = `${parseInt(value)}` || '';

    qs('#card-number').value = this.values.cardNumber;
  }

  /**
   * Handler input card description
   *
   * @param {InputEvent} event Value from card description input tag
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
   * Remove add card modal
   */
  _removeAddCardModal() {
    $off(qs('#card-number'), 'input', this._handleInputCardNumber);
    $off(qs('#card-description'), 'input', this._handleInputCardDescription);
    $off(qs('.modal__close'), 'click', this._removeAddCardModal);
    qs('.app .modal').remove();
  }
}
