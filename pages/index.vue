<template>
  <div class="document">
    <!-- <div class="text-blue-600 flex">Hello sawasdee krub <span class="font-bold"> value : ดาต้า {{ sampleVal }}</span></div> -->
    <section class="nav"><nav-bar /></section>
    <!-- <section v-if="this.products.length > 0" class="main-content"> -->
    <section class="main-content">
      <!-- <product-button>click</product-button> -->
      <div>
        <div class="image-wrap">
          <img :src="image" alt="mobile iphone" />
        </div>
        <h2 class="title">ซื้อ iPhone 13</h2>
        <h3 class="model">รุ่น</h3>
        <div
          v-for="productItem in products"
          :key="productItem.name"
          class="my-4"
        >
          <product-button
            :class="{ selected: productItem.name === productName }"
            @click="selectProduct(productItem)"
            >{{ productItem.name }}</product-button
          >
        </div>

        <div></div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash.orderby";

export default Vue.extend({
  name: "IndexPage",

  data: () => ({
    colorList: [],
    sizeList: [],
    productSelect: 0,
    image: "",
    productName: "",
    products: [],
  }),
  async asyncData({ $axios }) {
    const PRODUCT_ENDPOINT = "https://interview.com7.in/api/pre-order";
    const result = await $axios.get(PRODUCT_ENDPOINT);
    let products: any = [];
    let image = "";
    let productName = "";

    if (result.status === 200 && result.data.success) {
      const productData = result.data.data.main_product;
      console.log("trigfger... int");
      if (productData && productData.length > 0) {
        // sort products depend on prices
        products = orderBy(
          productData,
          ["model[0].data[0].price"],
          ["desc"]
        ).map((item) => item);

        // set default value
        productName = products[0].name;
        image = products[0].model[0].data[0].image_url;
      }
    }

    return {
      sampleVal: "eiei",
      products,
      image,
      productName,
    };
  },
  mounted() {
    console.log("check product er141242 : ", this.products);
  },
  methods: {
    selectProduct(items: any): void {
      console.log("items : ", items);
      this.productName = items.name;
    },
  },
});
</script>

<style lang="scss" scoped>
.main-content {
  padding: 3.75rem 1rem 1rem;

  h2.title {
    font-size: 2.5rem;
    line-height: 1.3;
    padding-bottom: 1.25rem;
    /* padding: 2rem 0; */
  }
  h3.model {
    font-size: 1.5rem;
    line-height: 1.33;
    padding-bottom: 1.25rem;
    /* padding: 2rem 0; */
  }
}
</style>
