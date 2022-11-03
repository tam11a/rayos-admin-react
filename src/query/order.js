import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllOrder = (params) => {
  return instance.get(`order?limit=${params.limit}&page=${params.page}`);
};

export const useGetAllOrder = (params) => {
  return useQuery(["get-all-order", params], () => getAllOrder(params), {
    // refetchInterval: 20000,
  });
};

const getUserOrderListByID = (user_id) => {
  return instance.get(`order/user/${user_id}`);
};

export const useGetUserOrderListByID = (user_id) => {
  return useQuery(
    ["get-user-orderlist-by-id", user_id],
    () => getUserOrderListByID(user_id),
    {
      // refetchInterval: 20000,
    }
  );
};

const getProductsByOrderID = (order_id) => {
  return instance.get(`order/${order_id}/products`);
};

export const useGetProductsByOrderID = (order_id) => {
  return useQuery(
    ["get-products-by-order-id", order_id],
    () => getProductsByOrderID(order_id),
    {
      // refetchInterval: 20000,
    }
  );
};

// confirm order
const confirmOrder = (id) => {
  return instance.put(`order/confirm-order/${id}`);
};

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(confirmOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-order");
      queryClient.invalidateQueries("get-order-by-user");
    },
  });
};

// complete order
const completeOrder = (id) => {
  return instance.put(`order/complete-order/${id}`);
};

export const useCompleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(completeOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-order");
      queryClient.invalidateQueries("get-order-by-user");
    },
  });
};

// cancel order
const cancelOrder = (id) => {
  return instance.put(`order/cancel-order/${id}`);
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-order");
      queryClient.invalidateQueries("get-order-by-user");
    },
  });
};
