import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllStore = (params) => {
  return instance.get(`store?limit=${params.limit}&page=${params.page}`);
};

export const useGetAllStore = (params) => {
  return useQuery(["get-all-store", params], () => getAllStore(params), {
    // refetchInterval: 20000,
  });
};

const createStore = (data) => {
  return instance.post("store", data);
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation(createStore, {
    onSuccess: () => queryClient.invalidateQueries("get-all-store"),
  });
};

const getProductsByStoreID = (store_id, params) => {
  return instance.get(
    `store/${store_id}/products?limit=${params.limit}&page=${params.page}`
  );
};

export const useGetProductsByStoreID = (store_id, params) => {
  return useQuery(
    ["get-products-by-store", store_id, params],
    () => getProductsByStoreID(store_id, params),
    {
      // refetchInterval: 20000,
    }
  );
};

const getStoreByID = (store_id) => {
  return instance.get(`store/${store_id}`);
};

export const useGetStoreByID = (store_id) => {
  return useQuery(["get-store-by-id", store_id], () => getStoreByID(store_id), {
    // refetchInterval: 20000,
  });
};
