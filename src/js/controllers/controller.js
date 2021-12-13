export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!Modal} modal A modal instance
   * @param  {!CardList} cardList A cardList instance
   * @param  {!Card} card A card instance
   */
  constructor(store, modal, cardList, card) {
    this.store = store;
    this.storeData = this.store.loadData() || [];
    this.modal = modal;
    this.cardList = cardList;
    this.card = card;

    this.modal.clickAddCard(() => {
      this.modal.bindAddCard(this.addCard.bind(this));
    });
    this.card.bindRemoveCard(this.removeCard.bind(this));
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
      this.store.saveData(this.storeData);
    } else {
      this.store.saveData(this.storeData, () => {
        this.cardList.renderCardList(this.storeData);
      });
    }
  }

  /**
   * Add card to storage and card list
   *
   * @param {Object} values Object with card number and description
   */
  addCard(values) {
    this.storeData = [
      ...this.storeData,
      {
        cardNumber: values.cardNumber,
        description: values.description
      }
    ];

    this.store.saveData(this.storeData);
    this.cardList.renderCardList(this.storeData);
  }
}
