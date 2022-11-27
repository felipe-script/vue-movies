<template>
  <div class="favorite">
    <template>
      <v-container>
        <v-row>
          <v-col>
            <div class="content">
              <CardMovie :movie="movie" v-for="(movie) in getFavoriteMovieList" :key="movie.imdbID" />
              <p v-if="!getFavoriteMovieList.length" class="msg-no-favorites">No favorites yet :(</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CardMovie from "@/components/CardMovie";

export default {
  components: {
    CardMovie,
  },
  computed: {
    ...mapGetters(["getFavoriteMovieList"]),
  },
};
</script>

<style lang="scss" scoped>
  .content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    .msg-no-favorites{
      flex: 1;
    }
  }
</style>