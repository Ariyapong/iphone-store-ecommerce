<template>
  <div class="button-wrapper">
    <button class="button" type="button">
      <slot />
      <span class="effect"></span>
    </button>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style lang="scss" scoped>
.button-wrapper {
  padding: 2.25rem 0;
  .button {
    line-height: 1.3;
    display: block;
    background-color: rgb(91, 186, 71);
    width: 100%;
    color: rgb(255, 255, 255);
    cursor: pointer;
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    border-width: 0.0625rem;
    border-style: solid;
    border-color: rgb(91, 186, 71);
    border-image: initial;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
  }
}
</style>
