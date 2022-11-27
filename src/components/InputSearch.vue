<template data-app>
  <v-text-field
    class="search-input"
    :label="label"
    @input="search"
    :placeholder="placeholder"
		solo
  ></v-text-field>
</template>

<script>
import { debounce } from "@/utils";

const DEBOUCE_TIMING = 500;

export default {
	name: 'InputSearch',
  props: {
    label: {
      type: String,
      default: "",
    },
		placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    search: debounce(function (text){
			this.$emit('search', text);
		}, DEBOUCE_TIMING),
  },
};
</script>

<style lang="scss" scoped>
  .search-input{
		width: 600px;
		margin: 20px auto;
	}

</style>