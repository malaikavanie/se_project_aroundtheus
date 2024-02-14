export default class Section {
  //***SECTION CONSTRUCTOR***
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  //***ITTERATE OVER THE ITEMS ARRAY & RENDER THEM***
  rendererItems = () => {
    this._items.reverse().forEach((item) => {
      this.addItem(this._renderer(item));
    });
  };

  //***ADD DOM ELEMENT  TO THE CONTAINER***
  addItem = (element) => {
    this._container.prepend(element);
  };
}
