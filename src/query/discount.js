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

const getDiscountById = (id) => {
	return instance.get(`discount/${id}`);
};

export const useGetDiscountById = (id) => {
	return useQuery(["get-discount-by-id", id], () => getDiscountById(id), {
		// refetchInterval: 20000,
		refetchOnWindowFocus: false,
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
	return instance.post(`discount/${id}`, data);
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
