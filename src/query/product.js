import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllProduct = (params) => {
  return instance.get(`product`, {
    params,
  });
};

export const useGetAllProduct = (params) => {
  return useQuery(["get-all-product", params], () => getAllProduct(params), {
    // refetchInterval: 20000,
  });
};

const getProductByID = (product_id) => {
  return instance.get(`product/${product_id}`);
};

export const useGetProductByID = (product_id) => {
  return useQuery(
    ["get-product-by-id", product_id],
    () => getProductByID(product_id),
    {
      // refetchInterval: 20000,
    }
  );
};

const updateProduct = ({ product_id, data }) => {
  return instance.patch(`product/${product_id}`, data);
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-product");
      queryClient.invalidateQueries("get-product-by-id");
    },
  });
};

const createProduct = (data) => {
  return instance.post(`product`, {
    ...data,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-product"]);
      queryClient.invalidateQueries(["get-products-by-store"]);
    },
  });
};

const getAllProductImages = (pid) => {
  return instance.get(`product/${pid}/images`);
};

export const useGetAllProductImages = (pid) => {
  return useQuery(["get-product-images", pid], () => getAllProductImages(pid), {
    // refetchInterval: 20000,
    enabled: !!pid,
  });
};

const delProductImage = (id) => {
  return instance.delete(`product/images/${id}`);
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation(delProductImage, {
    onSuccess: () => queryClient.invalidateQueries("get-product-images"),
  });
};

const postProductImage = ({ id, data }) => {
  return instance.postForm(`product/${id}/images`, data);
};

export const usePostProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation(postProductImage, {
    onSuccess: () => queryClient.invalidateQueries("get-product-images"),
  });
};

const updateVariant = ({ id, data }) => {
  return instance.patch(`variant/${id}`, data);
};

export const useUpdateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation(updateVariant, {
    onSuccess: () => queryClient.invalidateQueries("get-product-by-id"),
  });
};

const createVariant = ({ id, data }) => {
  return instance.post(`variant/${id}`, data);
};

export const useCreateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation(createVariant, {
    onSuccess: () => queryClient.invalidateQueries("get-product-by-id"),
  });
};

const toggleProduct = (id) => {
  return instance.put(`product/${id}`);
};

export const useToggleProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-product");
      queryClient.invalidateQueries("get-product-by-id");
      queryClient.invalidateQueries("get-product-stats");
    },
  });
};

const toggleVariant = (id) => {
  return instance.put(`variant/${id}`);
};

export const useToggleVariant = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleVariant, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-product-by-id");
    },
  });
};
