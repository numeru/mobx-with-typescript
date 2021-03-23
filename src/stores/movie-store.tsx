import { action, makeObservable, observable } from "mobx";
import { RootStore } from "stores/root-store";

class Movie {
  id;
  title;
  rate;

  constructor(id: number, title: string, rate: number) {
    this.id = id;
    this.title = title;
    this.rate = rate;
  }
}

export class MovieStore {
  rootStore: RootStore;

  movies: Movie[] = [];

  constructor(root: RootStore) {
    makeObservable(this, {
      movies: observable,
      createMovie: action,
      changeRate: action,
    });

    this.rootStore = root;

    this.movies = [
      new Movie(1, "LOTR", 5),
      new Movie(2, "Harry Potter", 4),
      new Movie(3, "창궐", 0),
    ];
  }

  createMovie(title: string, rate: number) {
    this.movies = [
      ...this.movies,
      new Movie(this.movies[this.movies.length - 1].id + 1, title, rate),
    ];
  }

  changeRate() {
    const newMovies: Movie[] = this.movies.map((movie) => {
      if (movie.id === 1) {
        return { ...movie, rate: movie.rate + 1 };
      }
      return movie;
    });
    this.movies = newMovies;
  }
}
