import api from "@/utils/axios";

export const getCategories = () =>
  api.get("/categories/").then(res => res.data);
