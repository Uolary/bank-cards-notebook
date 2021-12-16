import {$off, $on, qs} from "../helpers/helpers";
import {classes} from "../constants";

export default class Modal {
  constructor() {
    this._handleDocumentFocus = this._handleDocumentFocus.bind(this);
    this._handleDocumentKeyUp = this._handleDocumentKeyUp.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }

  /**
   * Initial basic method modal
   */
  initModal() {
    this._eventDocumentFocus();
    this._eventDocumentKeyUp();
    this._eventClickModalClose();
    this._setBodyOverflowHidden(true);
  }

  /**
   * Remove add card modal
   */
  removeModal() {
    $off(qs('body'), 'focus', this._handleDocumentFocus, true);
    $off(qs('body'), 'keyup', this._handleDocumentKeyUp);
    $off(qs(`.${classes.modal.modal__closeBtn}`), 'click', this.removeModal);
    qs(`.${classes.app} .${classes.modal.modal}`).remove();
    this._setBodyOverflowHidden(false);
  }

  /**
   * Focus event on the document
   */
  _eventDocumentFocus() {
    $on(qs('body'), 'focus', this._handleDocumentFocus, true);
  }

  /**
   * Key click event on the document
   */
  _eventDocumentKeyUp() {
    $on(qs('body'), 'keyup', this._handleDocumentKeyUp);
  }

  /**
   * Event click close modal button
   */
  _eventClickModalClose() {
    $on(qs(`.${classes.modal.modal__closeBtn}`), 'click', this.removeModal);
  }

  /**
   * Handler click event on the document
   *
   * @param {FocusEvent} event
   */
  _handleDocumentFocus(event) {
    if (qs(`.${classes.modal.modal}`) && !qs(`.${classes.modal.modal}`).contains(event.target)) {
      event.stopPropagation();
      qs(`.${classes.modal.modal__closeBtn}`).focus();
    }
  }

  /**
   * Handler click event on the document
   *
   * @param {KeyboardEvent} event
   */
  _handleDocumentKeyUp(event) {
    if ('key' in event) {
      if (event.key === 'Escape') {
        this.removeModal();
      }
    }
  }

  /**
   * Set overflow-hidden class at body
   *
   * @param {boolean} isShow
   */
  _setBodyOverflowHidden(isShow) {
    if (isShow) {
      qs('body').classList.add(classes.overflowHidden);
    } else {
      qs('body').classList.remove(classes.overflowHidden);
    }
  }
}
