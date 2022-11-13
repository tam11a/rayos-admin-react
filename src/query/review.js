import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllReview = (params) => {
  return instance.get(
    `review?${
      params.method && params.method !== "all" ? `status=${params.method}&` : ""
    }limit=${params.limit}&page=${params.page}`
  );
};

export const useGetAllReview = (params) => {
  return useQuery(["get-all-review", params], () => getAllReview(params), {
    // refetchInterval: 20000,
  });
};

const toggleReview = (id) => {
  return instance.put(`review/${id}`);
};

export const useToggleReview = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-review");
    },
  });
};
