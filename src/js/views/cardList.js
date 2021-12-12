import {qs} from "../helpers/helpers";

export default class CardList {
  /**
   * @param {!Card} card Card class
   */
  constructor(card) {
    this.card = card;
    this.$cardList = qs('.card__list');
  }

  /**
   * Render card list to index.html
   *
   * @param {Object} cardList Object card containing cardNumber and description
   */
  renderCardList(cardList) {
    this.$cardList.innerHTML = cardList.reduce((html, card) => (
      html + this.card.cardHtml(card)
    ), '');
  }

  /**
   * Render info for empty card list
   */
  renderEmptyList() {
    this.$cardList.innerHTML = `
      <li class="card__item">
        Your card list is empty.
      </li>
    `;
  }
}
