<template>
  <nav class="nav-bar">
    <div class="content">
      <div class="highlight text-2xl">Pre Order</div>
      <div class="sub-highlight text-xl">สั่งซื้อล่วงหน้า iPhone 13</div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NavBar",
});
</script>
<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  width: 100%;
  z-index: 99;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;

  .content {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    gap: 0.5rem;
    .highlight {
      /* font-size: 1.5rem; */
      color: #5bba47;
    }
  }
}
</style>
