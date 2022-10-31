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

const getCategory = (id) => {
  return instance.get(`category/${id}`);
};

export const useGetCategory = (id) => {
  return useQuery(["get-category", id], () => getCategory(id), {
    // refetchInterval: 20000,
    enabled: !!id,
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


const createSubcategory = (data) => {
  return instance.post("subcategory", data);
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation(createSubcategory, {
    onSuccess: () => queryClient.invalidateQueries("get-sub-category-cat"),
  });
};

const updateCategory = ({ id, data }) => {
  return instance.patch(`category/${id}`, data);
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-category");
      queryClient.invalidateQueries("get-category");
    },
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
