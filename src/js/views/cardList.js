import {qs} from '../helpers/helpers';
import {classes} from '../constants';

export default class CardList {
  /**
   * @param {!Card} card Card class
   */
  constructor(card) {
    this.card = card;
  }

  /**
   * Render card list to index.html
   *
   * @param {CardObject[]} cardList Object card containing cardNumber and description
   */
  renderCardList(cardList) {
    qs(`.${classes.cardList.card__list}`).innerHTML = '';

    cardList.reverse().forEach((card) => {
      qs(`.${classes.cardList.card__list}`).innerHTML += this.card.cardHtml(card);
      this.card.checkDescriptionLength(card.cardNumber);
    });
  }

  /**
   * Render info for empty card list
   */
  renderEmptyList() {
    qs(`.${classes.cardList.card__list}`).innerHTML = `
      <li class="${classes.card.card__item}">
        <p class="${classes.card.card__empty}">Your card list is empty.</p>
      </li>
    `;
  }
}
