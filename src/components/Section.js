export default class Section {
  //***SECTION CONSTRUCTOR***
  constructor({ renderer }, classSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  //***ITTERATE OVER THE ITEMS ARRAY & RENDER THEM***
  rendererItems = (items) => {
    items.reverse().forEach((item) => {
      this.addItem(this._renderer(item));
    });
  };

  //***ADD DOM ELEMENT  TO THE CONTAINER***
  addItem = (element) => {
    this._container.prepend(element);
  };
}
