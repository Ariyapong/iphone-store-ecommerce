export interface Data {
  main_product: MainProduct[];
}

export interface MainProduct {
  name: Name;
  model: Model[];
}

export interface Model {
  color: string;
  color_hex: string;
  data: Detail[];
}

export interface Detail {
  id: number;
  name: string;
  model_name: Name;
  color: string;
  color_hex: string;
  image_url: string;
  size: Size;
  price: number;
  price_deposit: number;
  images: string[];
  condition_html: null | string;
  force_bundle: number;
  priority: number;
  footer_html: null;
  preview_html: null | string;
  variant_product: any[];
  active: boolean;
}

export enum Name {
  IPhone12Mini = "iPhone 12 mini",
  IPhone13 = "iPhone 13",
  IPhone13Mini = "iPhone 13 mini",
  IPhone13Pro = "iPhone 13 Pro",
  IPhone13ProMax = "iPhone 13 Pro Max",
}

export enum Size {
  The128GB = "128 GB",
  The1TB = "1 TB",
  The256GB = "256 GB",
  The512GB = "512 GB",
  The64GB = "64 GB",
}
