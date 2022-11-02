import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllOrder = (params) => {
  let queryString = `order/get-all-order?${
    params.method !== "all" ? params.method : ""
  }orders=created_at-DESC&limit=${params.limit}&page=${params.page}`; // /${params.limit}?page=${params.page}
  params.filters?.map((filter) => {
    queryString += `&filters[]=${filter}`;
  });
  return instance.get(queryString);
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

const getOrderListByUser = (userId, params) => {
  let queryString = `order/get-all-${params.method}-user/${userId}?orders=created_at-DESC&limit=${params.limit}&page=${params.page}`;
  params.filters?.map((filter) => {
    queryString += `&filters[]=${filter}`;
  });
  return instance.get(queryString);
};

export const useGetOrderListByUser = (userId, params) => {
  return useQuery(
    ["get-order-by-user", userId, params],
    () => getOrderListByUser(userId, params),
    {
      enabled: !!userId,
      retry: 0,
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
