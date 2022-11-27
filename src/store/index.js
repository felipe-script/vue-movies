import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foundMovie: {},
    favoriteMovieList: [],
  },

  getters: {
    getFavoriteMovieList: state => state.favoriteMovieList
  },

  mutations: {
    SET_ADD_FAVORITE_MOVIE(state, movie) {
      state.favoriteMovieList.push(movie);
    },
    SET_REMOVE_FAVORITE_MOVIE(state, movies) {
      state.favoriteMovieList = movies;
    },
    SET_RATING_MOVIE(state, { ratedMovie, indexMovie }) {
      state.favoriteMovieList[indexMovie] = ratedMovie;
    },
  },

  actions: {
    setToggleFavoriteMovie({ commit, state }, movie) {
      const movieIsFavorite = state.favoriteMovieList.some(
        (item) => item.imdbID === movie.imdbID
      );
      if (!movieIsFavorite) return commit("SET_ADD_FAVORITE_MOVIE", movie);

      const favoriteMoviesFiltered = state.favoriteMovieList.filter(
        (item) => item.imdbID !== movie.imdbID
      );
      
      commit("SET_REMOVE_FAVORITE_MOVIE", favoriteMoviesFiltered);
    },

    setRatingMovie({ commit, state }, { imdbID, rating }) {
      const indexMovie = state.favoriteMovieList.findIndex(
        (item) => item.imdbID === imdbID
      );
      const ratedMovie = { ...state.favoriteMovieList[indexMovie], rating };
      commit("SET_RATING_MOVIE", { ratedMovie, indexMovie });
    },
  },
  modules: {},
});
