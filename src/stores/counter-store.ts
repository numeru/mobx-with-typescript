import { action, makeObservable, observable } from "mobx";
import { RootStore } from "stores/root-store";

class CountStore {
  rootStore: RootStore;

  count: number;

  constructor(root: RootStore) {
    makeObservable(this, {
      count: observable,
      increaseCount: action,
      decreaseCount: action,
    });

    this.rootStore = root;

    this.count = 0;
  }

  increaseCount() {
    this.count++;
  }

  decreaseCount() {
    this.count--;
  }
}

export default CountStore;
