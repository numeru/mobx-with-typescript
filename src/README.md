# MobX

- 객체지향적인 상태 관리 라이브러리

# 목차

- [설치]()
- [요소]()
- [예제 코드]()
- [그 외]()

---

## 설치

```
yarn add mobx
yarn add mobx-react
```

---

## 요소

1. observable

- 업데이트가 감지되는 state

```ts
count: observable;
```

2. computed

- observable의 영향을 받는다.
- observable이 업데이트 될 때 마다 다시 계산되어야 하는 값
- getter로 표현

```ts
get totalCount() {
  return this.count + this.countDouble;
}
```

3. flow

- 인자로 generator만을 받아 yield를 통해 비동기적인 동작을 하는 함수.
- async / await 을 \* / yield 로 대체한다.

```ts
fetchSomthing: flow

*fetchSomthing() {
  //...

  const somthing = yield promiseProgress();

  //...
}
```

4. action

- observables를 업데이트 시키는 메서드

```ts
increaseCount: action

increaseCount() {
  this.count++;
}
```

5. autorun

- observables가 업데이트 때마다 임의의 함수를 실행시킨다.

```ts
this.disposal1 = autorun(() => {
  console.log(`total changed! ${this.totalCount}`);
});
```

6. reaction

- 특정 observables가 업데이트 때마다 임의의 함수를 실행시킨다.
- 첫번째 인자는 data 함수로, 변화를 감지할 observables를 정한다.
- 두번쨰 인자인 effect 함수는 data 함수에서 정한 observables를 인자로 받아 함수를 실행한다.

```ts
this.disposal2 = reaction(
  () => this.count,
  (count) => {
    console.log(`count changed! ${count}`);
  }
);
```

7. when

- 특정 조건이 참일 때, 임의의 함수를 실행시킨다.
- 첫번째 인자는 predicate 함수로 조건을 return한다.
- 두번째 인자는 effect 함수는 조건이 참일 때 실행된다.
- 두번째 인자가 없으면 promise를 return한다.

```ts
this.disposal4 = when(
  () => this.istotalPositive,
  () => {
    console.log(`total is positive number ${this.totalCount}`);
  }
);
```

8. disposal

- autorun, reaction, when은 observables의 변화가 있을 때 까지 영원히 기다리는 경우가 생길 수 있다.
- 필요가 없다면 반드시 disposal해준다.

```ts
dispose() {
  this.disposal1();
  this.disposal2();
  this.disposal3();
  this.disposal4();
}
```

---

## 예제 코드

### import

```ts
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
```

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

---

## 그 외

1. Only use Reactions if there is no direct relation between cause and effect.

2. Reactions shouldn't update other observables.

3. Reactions should be independent

4. Don't pass observables into components that aren't observer.

5. observer components never need to be wrapped in memo.

6. Render lists in dedicated components.

```ts
const MyComponent = observer(({ todos, user }) => (
  <div>
    {user.name}
    <TodosView todos={todos} />
  </div>
));

const TodosView = observer(({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <TodoView todo={todo} key={todo.id} />
    ))}
  </ul>
));
```

7. Don't use array indexes as keys

8. Dereference values late.

```ts
<DisplayName person={person} />
```
