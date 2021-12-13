import {$on, qs} from "../helpers/helpers";

export default class Card {
  /**
   * Get html card
   *
   * @param {Object} card Object card containing cardNumber and description
   */
  cardHtml(card) {
    return `
      <li class="card__item">
        <div class="card__header">
          <svg class="card__type-svg" height="512px" width="512px" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="形状_1_3_" style="enable-background:new    ;"><g id="形状_1"><g><path d="M211.328,184.445l-23.465,144.208h37.542l23.468-144.208     H211.328z M156.276,184.445l-35.794,99.185l-4.234-21.358l0.003,0.007l-0.933-4.787c-4.332-9.336-14.365-27.08-33.31-42.223     c-5.601-4.476-11.247-8.296-16.705-11.559l32.531,124.943h39.116l59.733-144.208H156.276z M302.797,224.48     c0-16.304,36.563-14.209,52.629-5.356l5.357-30.972c0,0-16.534-6.288-33.768-6.288c-18.632,0-62.875,8.148-62.875,47.739     c0,37.26,51.928,37.723,51.928,57.285c0,19.562-46.574,16.066-61.944,3.726l-5.586,32.373c0,0,16.763,8.148,42.382,8.148     c25.616,0,64.272-13.271,64.272-49.37C355.192,244.272,302.797,240.78,302.797,224.48z M455.997,184.445h-30.185     c-13.938,0-17.332,10.747-17.332,10.747l-55.988,133.461h39.131l7.828-21.419h47.728l4.403,21.419h34.472L455.997,184.445z      M410.27,277.641l19.728-53.966l11.098,53.966H410.27z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#005BAC;"/></g></g></g><g id="形状_1_2_" style="enable-background:new    ;"><g id="形状_1_1_"><g><path d="M104.132,198.022c0,0-1.554-13.015-18.144-13.015H25.715     l-0.706,2.446c0,0,28.972,5.906,56.767,28.033c26.562,21.148,35.227,47.51,35.227,47.51L104.132,198.022z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#F6AC1D;"/></g></g></g></svg>
          <div class="card__number">
            ${card.cardNumber}
          </div>
          <button class="card__remove-btn" data-id="${card.cardNumber}">
            <svg class="card__remove-svg" width="512px" height="512px" viewBox="0 0 512 512">
              <g>
                <path d="M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31   h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13   c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z"/><path d="M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8   l18.7-242.6C396.8,178.1,396,176,379.4,176z"/>
              </g>
            </svg>
          </button>
        </div>
        <div class="card__description">
          ${card.description}
        </div>
      </li>
    `;
  }

  /**
   * Remove card
   *
   * @param {Function} handler Handler function called on synthetic event
   */
  bindRemoveCard(handler) {
    $on(qs('.card__list'), 'click', (event) => {
      if (event.target.closest('.card__remove-btn')) {
        handler(event.target.closest('.card__remove-btn').dataset.id);
      }
    });
  }
}
