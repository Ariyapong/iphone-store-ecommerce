<template>
  <div class="document">
    <section><nav-bar /></section>
    <section class="main-content px-8 relative z-10">
      <div class="product-image max-w-md mx-auto relative">
        <XyzTransition xyz="fade ease-in-out-back">
          <img
            class="w-full absolute xyz-absolute"
            :src="image"
            alt="mobile iphone"
            :key="image"
          />
        </XyzTransition>
        <img :src="image" class="invisible locksize" alt="" />
      </div>
      <div class="product-detail">
        <h2 class="title">ซื้อ iPhone 13</h2>
        <h3 class="headline">รุ่น</h3>
        <div
          v-for="productItem in products"
          :key="productItem.name"
          class="my-4"
        >
          <product-button
            :class="{ selected: productItem.name === productName }"
            @click="selectModel(productItem)"
          >
            <div class="button-content">
              <div>{{ productItem.name }}</div>
              <div>{{ formatPrice(productItem.model[0].data[0].price) }}</div>
            </div>
          </product-button>
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
                <div class="text">{{ formatPrice(item.price) }}</div>
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
        <submit-button class="py-9" @click="submitPreOrder">
          ยืนยันการสั่งซื้อล่วงหน้า
        </submit-button>
      </div>
    </section>
    <section>
      <popup :display="displayPopup" @toggle-popup="togglePopup">
        <div class="pb-8 text-center">
          <h3 class="text-2xl py-8 font-semibold">{{ popupMsg.title }}</h3>
          <div>{{ popupMsg.subTitle }}</div>
          <div>{{ popupMsg.detail }}</div>
        </div>
      </popup>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash.orderby";
import { Model, MainProduct, Detail } from "@/types/product";

interface msg {
  isError: boolean;
  title: string;
  subTitle: string;
  detail: string;
}

export default Vue.extend({
  name: "IndexPage",
  data: () => ({
    productSelect: 0,
    image: "",
    productName: "",
    color: "",
    storage: "",
    products: [] as MainProduct[],
    pickupMethod: "",
    model: [] as Model[],
    storageData: [] as Detail[],
    displayPopup: false,
    popupMsg: {} as msg,
  }),
  async asyncData({ $axios }) {
    const PRODUCT_ENDPOINT = "https://interview.com7.in/api/pre-order";
    const result = await $axios.get(PRODUCT_ENDPOINT);
    let products: MainProduct[] = [];
    let image = "";
    let productName = "";
    let color = "";
    let storage = "";
    let model: Model[] = [];
    let storageData: Detail[] = [];
    let pickupMethod = "";

    if (result.status === 200 && result.data.success) {
      const productData = result.data.data.main_product;
      if (productData && productData.length > 0) {
        // sort products base on prices
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
    // console.log("check product er141242 : ", this.products);
  },
  methods: {
    selectModel(items: MainProduct): void {
      this.productName = items.name;
      this.mapProduct(items.name, "product");
    },
    selectColor(color: string): void {
      this.color = color;
      this.mapProduct(color, "color");
    },
    selectStorage(storage: string): void {
      this.storage = storage;
    },
    selectPickupMethod(method: string): void {
      this.pickupMethod = method;
    },
    mapProduct(productName: string, level: string): void {
      if (level === "product") {
        // this.color = "";
        // this.storage = "";
        // find associate data from selected productName
        const newModelData: MainProduct | undefined = this.products.find(
          (item: any) => item.name === productName
        );
        if (newModelData && Object.keys(newModelData).length > 0) {
          console.log("check model er141242 : ", newModelData);
          this.model = newModelData.model;
          // set new defaults
          // default colors
          this.color = newModelData.model[0].color;
          // default images
          this.image = newModelData.model[0].data[0].image_url;
          // storage
          const storageSet = newModelData.model.find((item: Model) => {
            console.log("item... ", item);
            return item.color === newModelData.model[0].color;
          });

          if (storageSet !== undefined) {
            this.storageData = storageSet.data;
            // set new defaults
            // default storage
            this.storage = storageSet.data[0].size;
          }
        }
      }
      if (level === "color") {
        // this.storage = "";

        // storage
        const datatemp: Model[] = [...this.model];
        const storageSet: Model | undefined = datatemp.find(
          (item) => item.color === productName
        );

        if (storageSet !== undefined) {
          this.storageData = storageSet.data;

          // set new defaults
          // default storage
          this.storage = storageSet.data[0].size;
          // default images
          this.image = storageSet.data[0].image_url;
        }
      }
    },

    togglePopup(flag: boolean): void {
      this.displayPopup = flag;
    },
    formatPrice(value: number): string {
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(value);
    },
    async submitPreOrder(): Promise<void> {
      // extract info
      const modelName = this.productName;
      const modelStorage = this.storage;
      const modelColor = this.color;
      const pickupMethod = this.pickupMethod;

      // find target
      // const targetModel = this.products.find(model => model.name === modelName)
      const targetModel: MainProduct | undefined = this.products.find(
        (model) => model.name === modelName
      );
      const targetColor: Model | undefined = targetModel?.model.find(
        ({ color }) => color === modelColor
      );
      const targetProduct: Detail | undefined = targetColor?.data.find(
        ({ size }) => size === modelStorage
      );
      const productId: number | null = targetProduct?.id || null;

      const responseData = await this.$axios.post(
        "https://interview.com7.in/api/pre-order",
        { id: productId }
      );

      if (responseData.data && responseData.data.success) {
        console.log("no error ...");
        this.popupMsg.isError = false;
        this.popupMsg.title = "การสั่งซื้อล่วงหน้าสำเร็จ";
        this.popupMsg.subTitle = "การชำระเงินของคุณสำเร็จแล้ว!";
        this.popupMsg.detail =
          "ตอนนี้เราจะส่งอีเมลยืนยันคำสั่งซื้อสำเร็จให้คุณ";
      } else {
        this.popupMsg.isError = true;
        this.popupMsg.title = `Something went wrong... `;
        this.popupMsg.subTitle = `Error ${responseData.data.status}`;
        this.popupMsg.detail = responseData.data.message;
      }

      this.displayPopup = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.main-content {
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
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    gap: 0 2rem;
    max-width: 1024px;
    margin: 0 auto;
    .product-image {
      position: sticky;
      flex: 1 1;
      top: 1rem;
      height: 100%;
    }
    .product-detail {
      padding-top: 7rem;
      flex: 1 1;
    }
  }
}
</style>
