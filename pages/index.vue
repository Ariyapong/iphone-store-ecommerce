<template>
  <div>
    <!-- <Tutorial/> -->
    <div class="text-blue-600 flex">Hello sawasdee krub {{ sampleVal }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",

  asyncData({ $axios }){
    console.log('check axios : ', $axios)

    return {
      sampleVal: 'eiei'
    }
  }
});
</script>
