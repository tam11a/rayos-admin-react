import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllFeedImages = () => {
  return instance.get(`feed/image`);
};

export const useGetAllFeedImages = () => {
  return useQuery(["get-feed-images"], () => getAllFeedImages(), {
    // refetchInterval: 20000,
  });
};

const delFeedImage = (id) => {
  return instance.delete(`feed/image/${id}`);
};

export const useDeleteFeedImage = () => {
  const queryClient = useQueryClient();
  return useMutation(delFeedImage, {
    onSuccess: () => queryClient.invalidateQueries("get-feed-images"),
  });
};

const postFeedImage = (data) => {
  return instance.postForm(`feed/image`, data);
};

export const usePostFeedImage = () => {
  const queryClient = useQueryClient();
  return useMutation(postFeedImage, {
    onSuccess: () => queryClient.invalidateQueries("get-feed-images"),
  });
};
