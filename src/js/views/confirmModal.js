import {$on, qs} from "../helpers/helpers";
import {classes} from "../constants";
import Modal from "./modal";

export default class ConfirmModal extends Modal {
  /**
   * @param {!Card} card Card class
   */
  constructor(card) {
    super();

    this.card = card;
    this.card.bindRemoveCard(this.bindShowConfirmModal.bind(this));
    this.idCard = null;
  }

  /**
   * Show confirm for delete card from card list
   *
   * @param {CardObject.cardNumber} id Id the card from data attribute
   */
  bindShowConfirmModal(id) {
    qs('.app').insertAdjacentHTML('beforeend', `
      <section class="${classes.modal.modal}" aria-modal="true" role="dialog">
        <div class="${classes.modal.modal__bg} ${classes.modal.modal__bgLow}"></div>
        <div class="container ${classes.modal.modal__inner}">
          <button class="${classes.modal.modal__closeBtn}"></button>
          <h2 class="${classes.modal.modal__title}">Are you sure you want to delete the card?</h2>
          <div>
            <button class="${classes.modal.modal__removeCardBtn}" data-id="${id}">Yes</button>
            <button class="${classes.modal.modal__cancelBtn}">No</button>
          </div>
        </div>
      </section>
    `);

    super.initModal();
  }

  /**
   * Remove card from card list
   *
   * @param {Function} handler Id the card from data attribute
   */
  bindModalConfirmRemoveCard(handler) {
    $on(qs(`.app`), 'click', (event) => {
      if (event.target.closest(`.${classes.modal.modal__removeCardBtn}`)) {
        handler(event.target.closest(`.${classes.modal.modal__removeCardBtn}`).dataset.id);
        super.removeModal();
      }

      if (event.target.closest(`.${classes.modal.modal__cancelBtn}`)) {
        super.removeModal();
      }
    });
  }
}
