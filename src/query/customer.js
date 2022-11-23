import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllCustomer = (params) => {
  return instance.get(`customer`, {
    params,
  });
};

export const useGetAllCustomer = (params) => {
  return useQuery(["get-all-customer", params], () => getAllCustomer(params), {
    // enabled: !!id,
  });
};

const getCustomerByID = (customer_id) => {
  return instance.get(`customer/${customer_id}`);
};

export const useGetCustomerByID = (customer_id) => {
  return useQuery(
    ["get-customer-by-id", customer_id],
    () => getCustomerByID(customer_id),
    {
      // refetchInterval: 20000,
    }
  );
};

const updateCustomer = ({ customer_id, data }) => {
  return instance.patch(`customer/${customer_id}`, data);
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-store");
      queryClient.invalidateQueries("get-store-by-id");
    },
  });
};

const toggleCustomer = (id) => {
  return instance.put(`customer/${id}`);
};

export const useToggleCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-customer");
      queryClient.invalidateQueries("get-customer-by-id");
    },
  });
};
