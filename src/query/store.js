import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllStore = (params) => {
  return instance.get(`store?limit=${params.limit}&page=${params.page}`);
};

export const useGetAllStore = (params) => {
  return useQuery(["get-all-store", params], () => getAllStore(params), {
    // refetchInterval: 20000,
  });
};

const createStore = (data) => {
  return instance.post("store", data);
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation(createStore, {
    onSuccess: () => queryClient.invalidateQueries("get-all-store"),
  });
};
