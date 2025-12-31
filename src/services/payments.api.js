import api from "../utils/axios";

export const createPayment = (order_id) =>
  api.post("/payments/create/", { order_id });

export const verifyPayment = (payload) =>
  api.post("/payments/verify/", payload);
