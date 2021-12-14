export default class Store {
  /**
   * @typedef {Object} CardObject An object containing all the necessary information about the card
   * @property {string} cardNumber Card number
   * @property {string} description Description from user
   * @property {cardName} cardName Name payment system card
   */

  /**
   * @param {!string} key Database name
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Save new data to storage
   *
   * @param {CardObject[]} data Object data for save
   * @param {function()} [callback] Called when records matching query are removed
   */
  saveData(data, callback) {
    localStorage.setItem(this.key, JSON.stringify(data));

    if (callback) {
      callback();
    }
  }

  /**
   * Get data from storage
   */
  loadData() {
    const data = JSON.parse(localStorage.getItem(this.key));

    if (!data) {
      return undefined;
    }

    return data.reduce((prev, item) => (
      [...prev, {
        cardNumber: item.cardNumber,
        description: item.description,
        cardName: item.cardName
      }]
    ), []);
  }
}
