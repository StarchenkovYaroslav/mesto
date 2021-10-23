export default class Section {
  constructor(render, containerSelector) {
    this._render = render;

    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._clear();

    items.forEach(item => {
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
