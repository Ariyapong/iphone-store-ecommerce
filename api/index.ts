const express = require("express");
const app = express();
const product = require("../mock-data/store.json");

app.get("/mock/product-store", (req, res) => {
  res.json({
    data: product,
    success: true,
    count: 2,
    message: "ทำรายการสำเร็จ",
    status: 200,
  });
});

module.exports = app;
