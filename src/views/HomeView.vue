<template>
  <div data-app>
    <v-container>
      <v-row class="text-center">
        <v-col>
          <div class="s-container">
            <h1 class="display-2 font-weight-bold mb-3">
              Search about any movies
            </h1>

            <p class="subheading font-weight-regular">
              A very easy way to search for movies,
              <br />please try it yourself.
            </p>

            <InputSearch placeholder="Ex: Constantine" @search="searchMovies" />
            <CardMovie :movie="movie" @favorite="favoriteEvent" />
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <ModalRating
      v-model="dialog"
      @close="dialog = false"
      :imdbID="movie.imdbID"
    />
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch";
import CardMovie from "@/components/CardMovie";
import ModalRating from "@/components/ModalRating";

import services from "@/services";

export default {
  name: "HomeView",
  components: {
    InputSearch,
    CardMovie,
    ModalRating,
  },
  data: function () {
    return {
      isLoading: false,
      dialog: false,
      movie: {
        Title: "",
        Genres: [],
        Plot: "",
        Poster: "",
        imdbRating: "",
        imdbVotes: "",
        imdbID: "",
      },
    };
  },
  methods: {
    async searchMovies(movieTitle) {
      this.isLoading = true;
      try {
        const {
          data: { Title, Genre, Plot, Poster, imdbRating, imdbVotes, imdbID },
        } = await services.getByMovieTitle(movieTitle);

        const Genres = Genre ? Genre.split(",") : [];

        this.movie = {
          Title,
          Genres,
          Plot,
          Poster,
          imdbRating: !isNaN(imdbRating) ? parseFloat(imdbRating) / 2 : 0,
          imdbVotes: !isNaN(imdbVotes) ? parseFloat(imdbVotes) / 2 : 0,
          imdbID,
        };
      } catch (error) {
        this.movie = {};
        console.log("error", error);
      }finally{
        this.isLoading = false;
      }
    },
    favoriteEvent(existFavorite) {
      if (!existFavorite) this.dialog = true;
    },
  },
  mounted(){
    console.log(process.env.VUE_APP_TEST)
  }
};
</script>

<style lang="scss" scoped>
.s-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
