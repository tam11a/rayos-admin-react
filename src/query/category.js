import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllCategory = (params) => {
  return instance.get(`category?limit=${params.limit}&page=${params.page}`);
};

export const useGetAllCategory = (params) => {
  return useQuery(["get-all-category", params], () => getAllCategory(params), {
    // refetchInterval: 20000,
  });
};

const createCategory = (data) => {
  return instance.post("category", data);
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-all-category"),
  });
};

const getSubCategoryFromCatID = (category_id, params) => {
  return instance.get(
    `category/${category_id}/subcategories?limit=${params.limit}&page=${params.page}`
  );
};

export const useGetSubCategoryFromCatID = (category_id, params) => {
  return useQuery(
    ["get-sub-category-cat", category_id, params],
    () => getSubCategoryFromCatID(category_id, params),
    {
      // refetchInterval: 20000,
      enabled: !!category_id,
      retry: 0,
    }
  );
};
