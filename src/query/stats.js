import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getProductStats = () => {
  return instance.get(`stats/product`);
};

export const useGetProductStats = () => {
  return useQuery(["get-product-stats"], () => getProductStats(), {
    // refetchInterval: 20000,
  });
};

const getCustomerStats = () => {
  return instance.get(`stats/customer`);
};

export const useGetCustomerStats = () => {
  return useQuery(["get-customer-stats"], () => getCustomerStats(), {
    // refetchInterval: 20000,
  });
};

const getStoreStats = () => {
  return instance.get(`stats/store`);
};

export const useGetStoreStats = () => {
  return useQuery(["get-store-stats"], () => getStoreStats(), {
    // refetchInterval: 20000,
  });
};

const getOrderStats = () => {
  return instance.get(`stats/order`);
};

export const useGetOrderStats = () => {
  return useQuery(["get-orders-stats"], () => getOrderStats(), {
    // refetchInterval: 20000,
  });
};

const getCatStats = () => {
  return instance.get(`stats/category`);
};

export const useGetCatStats = () => {
  return useQuery(["get-category-stats"], () => getCatStats(), {
    // refetchInterval: 20000,
  });
};
