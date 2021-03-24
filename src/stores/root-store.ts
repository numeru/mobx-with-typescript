import CountStore from "stores/counter-store";

export class RootStore {
  countStore;

  constructor() {
    this.countStore = new CountStore(this);
  }
}
