<template>
  <div class="text-center">
    <template>
      <div class="text-center">
        <v-dialog v-model="value" width="500" persistent>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              How was the movie?
            </v-card-title>

            <div class="text-center">
              <v-rating
                v-model="rating"
              ></v-rating>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeModal">
                CONFIRM
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: 'ModalRating',
  props: {
    value: Boolean,
		imdbID: String,
  },
	data: function(){
		return{ rating: 3}
	},
	methods:{
		...mapActions(["setRatingMovie"]),
		closeModal(){
			this.setRatingMovie({imdbID: this.imdbID, rating: this.rating});
			this.$emit('close');
		}
	}
};
</script>
