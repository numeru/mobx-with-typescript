import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";

export default observer(() => {
  const { movieStore } = useStoreContext();

  return (
    <div>
      <section>
        {movieStore.movies.map((movie, idx) => {
          return (
            <div key={idx}>
              <p>{movie.id}</p>
              <p>{movie.title}</p>
              <p>{movie.rate}</p>
            </div>
          );
        })}
      </section>
      <button onClick={() => movieStore.changeRate()}>
        first movie rate +1
      </button>
    </div>
  );
});
