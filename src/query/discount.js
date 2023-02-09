import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllDiscount = (params) => {
  return instance.get(`discount`, {
    params,
  });
};

export const useGetAllDiscount = (params) => {
  return useQuery(["get-all-discount", params], () => getAllDiscount(params), {
    // refetchInterval: 20000,
    refetchOnWindowFocus: false,
  });
};
const getAllProductsByDiscount = (id, params) => {
  return instance.get(`discount/admin/${id}/products`, {
    id,
    params,
  });
};

export const useGetAllProductsByDiscount = (id, params) => {
  return useQuery(
    ["get-all-discount-admin", id, params],
    () => getAllProductsByDiscount(id, params),
    {
      // refetchInterval: 20000,
      refetchOnWindowFocus: false,
    }
  );
};

const getDiscountByID = (id) => {
  return instance.get(`discount/${id}`);
};

export const useGetDiscountByID = (id) => {
  return useQuery(["get-all-discount", id], () => getDiscountByID(id), {
    // refetchInterval: 20000,
    enabled: !!id,
  });
};

const toggleDiscount = (id) => {
  return instance.put(`discount/${id}`);
};

export const useToggleDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleDiscount, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-discount-by-id");
      queryClient.invalidateQueries("get-all-discount");
    },
  });
};

const createDiscount = (data) => {
  return instance.post("discount", data);
};

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(createDiscount, {
    onSuccess: () => queryClient.invalidateQueries("get-all-discount"),
  });
};

const updateDiscount = ({ id, data }) => {
  return instance.patch(`discount/${id}`, data);
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDiscount, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-discount-by-id");
      queryClient.invalidateQueries("get-all-discount");
    },
  });
};

const deleteDiscountProduct = ({ id, data }) => {
  return instance.delete(`discount/${id}`, data);
};

export const useDeleteDiscountProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDiscountProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-discount-by-id");
      queryClient.invalidateQueries("get-all-discount-admin");
    },
  });
};
