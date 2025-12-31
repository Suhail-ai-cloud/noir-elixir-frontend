// src\services\orders.api.js
import api from "../utils/axios";

export const createOrder = () =>
  api.post("/orders/create/");

export const getMyOrders = () =>
  api.get("/orders/my-orders/");
