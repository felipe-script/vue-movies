<template>
  <v-card max-width="374" v-if="movie.Title" class="card">
    <v-img height="250" :src="movie.Poster"></v-img>
    <v-card-title class="card-title">{{ movie.Title }}</v-card-title>
    <v-card-text class="plot">
      <v-row class="rating-content">
        <v-rating
          :value="movie.imdbRating"
          color="#09f"
          dense
          half-increments
          readonly
          size="16"
        ></v-rating>
        <div class="grey--text ms-4">
          {{ `${movie.imdbRating} (${movie.imdbVotes})` }}
        </div>
      </v-row>
      <div>
        {{ movie.Plot }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Genre</v-card-title>
    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip v-for="(genre, index) in movie.Genres" :key="index">{{
          genre
        }}</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions :class="{ 'jt-between': movie.rating, 'jt-flex-end': !movie.rating }">
      <p v-if="movie.rating">Your rating: {{movie.rating}} stars</p>
      <v-icon
        size="30"
        @click="handleFavorite"
        :color="existFavorite ? '#e74c3c' : '#c1c1c1'"
        >mdi-heart</v-icon
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardMovie",
  props: {
    movie: {
      Title: {
        type: String,
        required: true,
      },
      Poster: {
        type: String,
        required: true,
      },
      imdbRating: {
        type: Number,
      },
      imdbVotes: {
        type: Number,
      },
      imdbID: {
        type: String,
        required: true,
      },
      Plot: {
        type: String,
        required: true,
      },
      Genres: {
        type: Array,
      },
    },
  },
  computed: {
    ...mapGetters(["getFavoriteMovieList"]),
    existFavorite: function () {
      return this.getFavoriteMovieList.some(
        (item) => item.imdbID === this.movie.imdbID
      );
    },
  },
  methods: {
    ...mapActions(["setRatingMovie", "setToggleFavoriteMovie"]),
    handleFavorite() {
      this.$emit("favorite", this.existFavorite);
      this.setToggleFavoriteMovie(this.movie);
    },
  },
};
</script>

<style lang="scss" scoped>
.rating-content {
  margin-bottom: 16px;
  margin-left: 20px;
}
.card-title {
  margin-left: 20px;
}
.jt-between {
  justify-content: space-between;
}
.jt-flex-end{
  justify-content: flex-end;
}
.plot {
  min-height: 180px;
}
.card {
  margin: 20px auto;
}
</style>
