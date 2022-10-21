import { set } from './helpers.js';
import { EventBus } from './EventBus.js';

export class Store extends EventBus {
  constructor() {
    super();
    this.state = {};
  }

  set(keypath, data) {
    set(this.state, keypath, data);
    let eventname = keypath
    if(eventname.includes('.')) {
      eventname = keypath.substring(0, keypath.indexOf('.'));
    }
    this.emit(eventname, this.getState());
  }

  getState() {
    return this.state;
  }
}

const store = new Store();

window.store = store;

export default store;