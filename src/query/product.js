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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-product"]);
      queryClient.invalidateQueries(["get-products-by-store"]);
    },
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
    },
  });
};
