export default class Store {
  /**
   * @param {!string} key Database name
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Save new data to storage
   *
   * @param {Object[]} data Object data for save
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
        description: item.description
      }]
    ), []);
  }
}
