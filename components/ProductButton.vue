<template>
  <div class="base" @click="({ productItem }) => $emit('click', productItem)">
    <slot />
    <span class="effect"></span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProductButton",
});
</script>
<style lang="scss" scoped>
.base {
  border-radius: 0.5rem;
  border: 0.0625rem solid #dddddd;
  padding: 1.75rem 1.25rem;

  &:hover {
    cursor: pointer;
  }

  &.selected {
    border: 0.0625rem solid #5bba47;
  }

  .button-content {
    display: flex;
    justify-content: space-between;
  }
}
</style>
