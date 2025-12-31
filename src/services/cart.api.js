// src/services/cart.api.js
import api from "../utils/axios";

export const getCart = () =>
  api.get("/cart/").then(res => res.data);

export const addToCart = (variant_id, quantity) =>
  api.post("/cart/add/", { variant_id, quantity });

export const updateCart = (item_id, quantity) =>
  api.post("/cart/update/", { item_id, quantity });

export const removeFromCart = (item_id) =>
  api.post("/cart/remove/", { item_id });
