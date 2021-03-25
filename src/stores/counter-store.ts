import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";
import { RootStore } from "stores/root-store";

class CountStore {
  rootStore: RootStore;

  count: number;
  countDouble: number;

  disposal1: () => void;
  disposal2: () => void;
  disposal3: () => void;
  disposal4: () => void;

  constructor(root: RootStore) {
    makeObservable(this, {
      count: observable,
      countDouble: observable,

      totalCount: computed,
      istotalPositive: computed,

      increaseCount: action,
      increaseDoubleCount: action,
      decreaseCount: action,
      decreaseDoubleCount: action,
    });

    this.rootStore = root;

    this.count = 0;
    this.countDouble = 0;

    this.disposal1 = autorun(() => {
      console.log(`total changed! ${this.totalCount}`);
    });

    this.disposal2 = reaction(
      () => this.count,
      (count) => {
        console.log(`count changed! ${count}`);
      }
    );

    this.disposal3 = reaction(
      () => this.countDouble,
      (countDouble) => {
        console.log(`countDouble changed! ${countDouble}`);
      }
    );

    this.disposal4 = when(
      () => this.istotalPositive,
      () => {
        console.log(`total is positive number ${this.totalCount}`);
      }
    );
  }

  get totalCount() {
    return this.count + this.countDouble;
  }

  get istotalPositive() {
    return this.totalCount > 0;
  }

  increaseCount() {
    this.count++;
  }

  increaseDoubleCount() {
    this.countDouble += 2;
  }

  decreaseCount() {
    this.count--;
  }

  decreaseDoubleCount() {
    this.countDouble -= 2;
  }

  dispose() {
    this.disposal1();
    this.disposal2();
    this.disposal3();
    this.disposal4();
  }
}

export default CountStore;
