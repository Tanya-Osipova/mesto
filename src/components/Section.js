export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  
  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    });
  }

  addItem(element) {
    const newCard = this._renderer(element)
    this._container.prepend(newCard);
  }
}
