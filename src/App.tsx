import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";

export default observer(() => {
  const { countStore } = useStoreContext();

  return (
    <div>
      <section>
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
      </section>
      <section>
        <p>{countStore.countDouble}</p>
        <button
          onClick={() => {
            countStore.increaseDoubleCount();
          }}
        >
          +2
        </button>
        <button
          onClick={() => {
            countStore.decreaseDoubleCount();
          }}
        >
          -2
        </button>
      </section>
      <p>total : {countStore.totalCount}</p>
    </div>
  );
});
