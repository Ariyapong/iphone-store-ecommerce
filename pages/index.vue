<template>
  <div class="document">
    <!-- <div class="text-blue-600 flex">Hello sawasdee krub <span class="font-bold"> value : ดาต้า {{ sampleVal }}</span></div> -->
    <section class="nav"><nav-bar /></section>
    <section class="main-content">
      <div class="image-wrap">
        <img :src="image" alt="mobile iphone" />
      </div>
      <h2 class="title">ซื้อ iPhone 13</h2>
      <h3 class="headline">รุ่น</h3>
      <div v-for="productItem in products" :key="productItem.name" class="my-4">
        <product-button
          :class="{ selected: productItem.name === productName }"
          @click="selectProduct(productItem)"
          >{{ productItem.name }}</product-button
        >
      </div>
      <h3 class="headline">สี</h3>
      <div class="colors container">
        <div
          v-for="(item, index) in model"
          :key="`item.color-${index}`"
          class="product-color"
        >
          <product-button
            class="sqaure-pad"
            :class="{ selected: item.color === color }"
            @click="selectColor(item.color)"
          >
            <div class="button">
              <div
                class="sample-color"
                :style="`background-color: #${item.color_hex}`"
              ></div>
              <div class="text">{{ item.color }}</div>
            </div>
          </product-button>
        </div>
      </div>
      <h3 class="headline">ขนาด</h3>
      <div class="storage container">
        <div
          v-for="(item, index) in storageData"
          :key="`item.color-${index}`"
          class="product-color"
        >
          <product-button
            class="sqaure-pad"
            :class="{ selected: item.size === storage }"
            @click="selectStorage(item.size)"
          >
            <div class="button">
              <div class="text">{{ item.size }}</div>
              <div class="text">{{ item.price }}</div>
            </div>
          </product-button>
        </div>
      </div>
      <h3 class="pickup-method headline">คุณต้องการรับสินค้าด้วยวิธีใด</h3>
      <div class="pickup pb-12 space-y-4">
        <div class="store">
          <product-button
            class="sqaure-pad"
            :class="{ selected: pickupMethod === 'store' }"
            @click="selectPickupMethod('store')"
          >
            <div class="complex button flex gap-4">
              <div class="image">
                <img
                  class="w-10"
                  src="~/assets/svg/pickup.svg"
                  alt="pickup store"
                />
              </div>
              <div class="text grow">
                <div class="text-xl">บริการรับสินค้าหน้าร้าน</div>
                <div class="text-sm">จองเริ่มต้นเพียง 3,000 บาทเท่านั้น</div>
              </div>
            </div>
          </product-button>
        </div>
        <div class="delivery-home">
          <product-button
            class="sqaure-pad"
            :class="{ selected: pickupMethod === 'delivery' }"
            @click="selectPickupMethod('delivery')"
          >
            <div class="complex button flex gap-4">
              <div class="image">
                <img
                  class="w-10"
                  src="~/assets/svg/delivery.svg"
                  alt="delivery"
                />
              </div>
              <div class="text grow">
                <div class="text-xl">บริการจัดส่งถึงหน้าบ้าน</div>
                <div class="text-sm">ชำระสินค้าในราคาเต็ม</div>
              </div>
            </div>
          </product-button>
        </div>
      </div>
      <hr class="separator" />
      <submit-button> ยืนยันการสั่งซื้อล่วงหน้า </submit-button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash.orderby";
import { Data, Model, MainProduct, Detail } from "@/types/product";

export default Vue.extend({
  name: "IndexPage",
  data: () => ({
    colorList: [],
    sizeList: [],
    productSelect: 0,
    image: "",
    productName: "",
    color: "",
    storage: "",
    products: [] as Data[],
    pickupMethod: "",
    model: [] as Model[],
    storageData: [] as Detail[],
  }),
  async asyncData({ $axios }) {
    const PRODUCT_ENDPOINT = "https://interview.com7.in/api/pre-order";
    const result = await $axios.get(PRODUCT_ENDPOINT);
    let products: any = [];
    let image = "";
    let productName = "";
    let color = "";
    let storage = "";
    let model = [];
    let storageData = [];
    let pickupMethod = "";

    if (result.status === 200 && result.data.success) {
      const productData = result.data.data.main_product;
      if (productData && productData.length > 0) {
        // sort products depend on prices
        products = orderBy(
          productData,
          ["model[0].data[0].price"],
          ["desc"]
        ).map((item) => item);

        // set default value
        // default product model
        productName = products[0].name;
        image = products[0].model[0].data[0].image_url;
        // default colors
        color = products[0].model[0].color;
        // default storage
        storage = products[0].model[0].data[0].size;
        // model
        model = products[0].model;
        // storage
        storageData = products[0].model[0].data;
        // pickup store
        pickupMethod = "store";
      }
    }

    return {
      sampleVal: "eiei",
      products,
      image,
      productName,
      color,
      storage,
      model,
      storageData,
      pickupMethod,
    };
  },
  mounted() {
    /* console.log("check product er141242 : ", this.products);
    console.log("check productName er141242 : ", this.productName);
    console.log("check color er141242 : ", this.color);
    console.log("check storage er141242 : ", this.storage);
    console.log("check model er141242 : ", this.model);
    console.log("check model er141242 : ", this.model); */
    console.log("check model er141242 : ", this.model);
    console.log("check product er141242 : ", this.products);
  },
  methods: {
    selectProduct(items: any): void {
      // console.log("items : ", items);
      this.productName = items.name;
      this.mapProduct(items.name, "product");
    },
    selectColor(color: string): void {
      this.color = color;
      this.mapProduct(color, "color");
      // console.log("color LL : ", color);
    },
    selectStorage(storage: string): void {
      this.storage = storage;
      // console.log("storage LL : ", storage);
    },
    selectPickupMethod(method: string): void {
      this.pickupMethod = method;
    },
    mapProduct(productName: string, level: string): void {
      // this.clearData();
      // console.log("map product : ", productName);

      if (level === "product") {
        this.color = "";
        this.storage = "";
        // find associate data from selected productName
        // color
        const newModelData: any = this.products.find(
          (item: any) => item.name === productName
        );
        if (newModelData && Object.keys(newModelData).length > 0) {
          console.log("check model er141242 : ", newModelData);
          this.model = newModelData.model;

          // set new defaults
          // default colors
          this.color = newModelData.model[0].color;

          // storage
          const storageSet = newModelData.model.find((item) => {
            console.log("item... ", item);
            return item.color === newModelData.model[0].color;
          });
          this.storageData = storageSet.data;

          // set new defaults
          // default storage
          this.storage = storageSet.data[0].size;
        }
      }
      if (level === "color") {
        console.log("debug trigger color")
        this.storage = "";
        // console.log("check model er141242 : ", newModelData);
        // this.model = newModelData.model;

        // set new defaults
        // default colors
        // this.color = this.model[0].color;

        console.log("debug : ", this.model);

        // storage
        const datatemp = [...this.model];
        const storageSet: any = datatemp.find((item) => {
          /* console.log("item... ", item);
          console.log("this.model[0].color... ", productName); */
          return item.color === productName;
        });

        console.log("ceug : ", storageSet);
         this.storageData = storageSet.data;

        // set new defaults
        // default storage
        this.storage = storageSet.data[0].size;
      }
    },
    clearData() {
      this.color = "";
      this.storage = "";
    },
  },
  computed: {},
});
</script>

<style lang="scss" scoped>
.main-content {
  padding: 3.75rem 2rem 1rem;

  h2.title {
    font-size: 2.5rem;
    line-height: 1.3;
  }
  .headline {
    font-size: 1.5rem;
    line-height: 1.33;
    padding: 2rem 0;
  }

  .container::v-deep {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .text {
      text-align: center;
    }
    .button {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .sample-color {
        margin: 0 auto;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
  }

  .sqaure-pad {
    padding: 1rem 1.75rem;
  }
  .separator {
    border: 0.03125rem solid #dddddd;
  }
}
</style>
