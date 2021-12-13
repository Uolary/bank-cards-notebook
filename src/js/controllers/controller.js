export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!CardList} cardList A cardList instance
   * @param  {!Card} card A card instance
   */
  constructor(store, cardList, card) {
    this.store = store;
    this.storeData = this.store.loadData() || [];
    this.cardList = cardList;
    this.card = card;

    card.bindRemoveCard(this.removeCard.bind(this));
  }

  /**
   * Initializes after the first launch of the application
   */
  initApp() {
    if (this.storeData.length === 0) {
      this.cardList.renderEmptyList();
    } else {
      this.cardList.renderCardList(this.storeData);
    }
  }

  /**
   * Remove card from card list
   *
   * @param {string} id Id the card from data attribute
   */
  removeCard(id) {
    this.storeData = this.storeData.filter((card) => card.cardNumber !== id);

    if (this.storeData.length === 0) {
      this.cardList.renderEmptyList();
    } else {
      this.store.saveData(this.storeData, () => {
        this.cardList.renderCardList(this.storeData);
      });
    }
  }
}
