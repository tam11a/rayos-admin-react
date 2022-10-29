import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllProduct = (params) => {
  let queryString = `product?limit=${params.limit}&page=${params.page}`; // /${params.limit}?page=${params.page}
  params.filters?.map((filter) => {
    queryString += `&filters[]=${filter}`;
  });
  return instance.get(queryString);
};

export const useGetAllProduct = (params) => {
  return useQuery(["get-all-product", params], () => getAllProduct(params), {
    // refetchInterval: 20000,
  });
};

const createProduct = (data) => {
  return instance.post(`product`, {
    ...data,
    // store: "634dec83a563b7ff4b848711",
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => queryClient.invalidateQueries("get-all-product"),
  });
};

const delProduct = (product_id) => {
  return instance.delete(`product/delete/${product_id}`);
};

export const useDelProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(delProduct, {
    onSuccess: () => queryClient.invalidateQueries("get-all-product"),
  });
};

const updateProduct = (data) => {
  return instance.postForm(`product/update`, data);
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => queryClient.invalidateQueries("get-all-product"),
  });
};

const uploadProductImage = (data) => {
  return instance.postForm(`product/img/update`, data);
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation(uploadProductImage, {
    onSuccess: () => queryClient.invalidateQueries("get-all-product"),
  });
};

const delProductImage = (data) => {
  return instance.post(`product/img/delete`, data);
};

export const useDelProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation(delProductImage, {
    onSuccess: () => queryClient.invalidateQueries("get-all-product"),
  });
};
