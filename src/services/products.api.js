import api from "../utils/axios";
export const getProducts = (params) =>
  api.get("/products/", { params }).then(res => res.data);

export const getProductDetail = (slug) =>
  api.get(`/products/${slug}/`).then(res => res.data);
