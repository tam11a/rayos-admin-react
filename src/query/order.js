import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllOrder = (params) => {
	return instance.get(`order`, {
		params,
	});
};

export const useGetAllOrder = (params) => {
	return useQuery(["get-all-order", params], () => getAllOrder(params), {
		// refetchInterval: 20000,
	});
};

const getUserOrderListByID = (user_id, params) => {
	return instance.get(
		`order/user/${user_id}?${
			params.method && params.method !== "all" ? `status=${params.method}&` : ""
		}limit=${params.limit}&page=${params.page}`
	);
};

export const useGetUserOrderListByID = (user_id, params) => {
	return useQuery(
		["get-user-orderlist-by-id", user_id, params],
		() => getUserOrderListByID(user_id, params),
		{
			// refetchInterval: 20000,
		}
	);
};

const getProductsByOrderID = (order_id) => {
	return instance.get(`order/${order_id}`);
};

export const useGetProductsByOrderID = (order_id) => {
	return useQuery(
		["get-products-by-order-id", order_id],
		() => getProductsByOrderID(order_id),
		{
			enabled: !!order_id,
			// refetchInterval: 20000,
		}
	);
};

// order status
const updateOrderStatus = ({ id, status }) => {
	return instance.put(`order/${id}?status=${status}`);
};

export const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient();
	return useMutation(updateOrderStatus, {
		onSuccess: () => {
			queryClient.invalidateQueries("get-all-order");
			queryClient.invalidateQueries("get-user-orderlist-by-id");
			queryClient.invalidateQueries("get-products-by-order-id");
		},
	});
};
