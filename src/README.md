# MobX

- 객체지향적인 상태 관리 라이브러리

---

## 설치

```
yarn add mobx
yarn add mobx-react
```

---

## import

```ts
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
```

---

## 예제 코드

### 구조

- App.tsx
- src
  - context
    - store-context.tsx
  - stores
    - root-store.ts
    - counter-store.ts

### 과정

1. store 생성

- 필요한 state 클래스를 생성한다.

```ts
class CountStore {
  // root store
  rootStore: RootStore;

  // state
  count: number;

  constructor(root: RootStore) {
    // make observable
    makeObservable(this, {
      count: observable,
      increaseCount: action,
      decreaseCount: action,
    });

    this.rootStore = root;

    this.count = 0;
  }

  // action
  increaseCount() {
    this.count++;
  }

  decreaseCount() {
    this.count--;
  }
}

export default CountStore;
```

2. root store 생성

- 이 곳에 모든 store를 모아둔다.

```ts
export class RootStore {
  // stores
  countStore;

  constructor() {
    this.countStore = new CountStore(this);
  }
}
```

3. store context 생성

- context를 통해 root store를 원하는 컴포넌트에 전달한다.

```ts
// Context Instance
const StoreContext = createContext(new RootStore());

// Provider
type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  const rootStore = new RootStore();

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

// Consumer (useContext)
export const useStoreContext = () => useContext(StoreContext);
```

---

4. 컴포넌트에서 사용

- useStoreContext를 통해 root store를 가져온다.

```ts
// observer
export default observer(() => {
  // useStoreContext
  const { countStore } = useStoreContext();

  return (
    <div>
      <p>{countStore.count}</p>
      <button
        onClick={() => {
          countStore.increaseCount();
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          countStore.decreaseCount();
        }}
      >
        -1
      </button>
    </div>
  );
});
```
