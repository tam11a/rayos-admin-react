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
