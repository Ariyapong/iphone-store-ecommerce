<template>
  <XyzTransition duration="auto" xyz="fade out-delay-5">
    <div v-if="display" class="popup-container z-10">
      <section class="backdrop xyz-nested xyz-none" ></section>
      <section class="content-wrapper xyz-nested" xyz="fade down-100% delay-3">
        <div class="content">
          <div class="image w-28 mx-auto">
            <img
              class="w-full"
              src="~/assets/svg/order-completed.svg"
              alt="order completed"
            />
          </div>
          <slot name="custom" />
          <slot />
          <submit-button @click="confirm">ยืนยัน</submit-button>
        </div>
      </section>
    </div>
  </XyzTransition>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Popup",
  props: {
    display: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: () => ({
    togglePopup: false,
  }),
  methods: {
    confirm() {
      console.log("configrm");
      this.$emit("toggle-popup", false);
    },
  },
});
</script>
<style lang="scss" scoped>
.popup-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;

  .backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .content-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 25%;
    margin: auto;
    width: 100%;
    width: 95%;
    max-width: 400px;
    .content {
      background-color: #fff;
      padding: 1rem;
      border-radius: 8px;
    }
  }
}
</style>
