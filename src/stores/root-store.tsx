import { MovieStore } from "stores/movie-store";

export class RootStore {
  movieStore;

  constructor() {
    this.movieStore = new MovieStore(this);
  }
}
