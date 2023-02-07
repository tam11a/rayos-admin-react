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
  });
};

const toggleDiscount = (id) => {
  return instance.put(`discount/${id}`);
};

export const useToggleDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleDiscount, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-discount");
    },
  });
};

const getDiscountByID = (discount_id) => {
  return instance.get(`discount/${discount_id}`);
};

export const useGetDiscountByID = (discount_id) => {
  return useQuery(
    ["get-discount-by-id", discount_id],
    () => getDiscountByID(discount_id),
    {
      // refetchInterval: 20000,
    }
  );
};

const updateDiscount = ({ discount_id, data }) => {
  return instance.patch(`discount/${discount_id}`, data);
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDiscount, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-discount");
      queryClient.invalidateQueries("get-discount-by-id");
    },
  });
};
