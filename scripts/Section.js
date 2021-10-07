export default class Section {
  constructor({ items, render }, containerSelector) {
    this._items = items;
    this._render = render;

    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems() {
    this._clear();

    this._items.forEach(item => {
      this._render(item);
    });
  }

  addElementToBegin(element) {
    this._containerElement.prepend(element);
  }

  addElementToEnd(element) {
    this._containerElement.append(element);
  }

  _clear() {
    this._containerElement.innerHTML = '';
  }
}
