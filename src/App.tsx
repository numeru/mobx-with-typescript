import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";

export default observer(() => {
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
