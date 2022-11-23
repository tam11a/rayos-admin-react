import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

const getAllCategory = (params) => {
  return instance.get(`category`, {
    params,
  });
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

const updateSubcategory = ({ id, data }) => {
  return instance.patch(`subcategory/${id}`, data);
};

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubcategory, {
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
  return instance.get(`subcategory`, {
    params: {
      ...params,
      category: category_id,
    },
  });
};

export const useGetSubCategoryFromCatID = (category_id, params) => {
  return useQuery(
    ["get-sub-category-cat", category_id, params],
    () => getSubCategoryFromCatID(category_id, params),
    {
      // refetchInterval: 20000,
      enabled: !!category_id && category_id !== "null",
      retry: 0,
    }
  );
};

const toggleCategory = (id) => {
  return instance.put(`category/${id}`);
};

export const useToggleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-all-category"),
  });
};

const toggleSubcategory = (id) => {
  return instance.put(`subcategory/${id}`);
};

export const useToggleSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleSubcategory, {
    onSuccess: () => queryClient.invalidateQueries("get-sub-category-cat"),
  });
};

const getAllCategoryImages = (pid) => {
  return instance.get(`category/${pid}/images`);
};

export const useGetAllCategoryImages = (pid) => {
  return useQuery(
    ["get-category-images", pid],
    () => getAllCategoryImages(pid),
    {
      // refetchInterval: 20000,
      enabled: !!pid,
    }
  );
};

const delCategoryImage = (id) => {
  return instance.delete(`category/images/${id}`);
};

export const useDeleteCategoryImage = () => {
  const queryClient = useQueryClient();
  return useMutation(delCategoryImage, {
    onSuccess: () => queryClient.invalidateQueries("get-category-images"),
  });
};

const postCategoryImage = ({ id, data }) => {
  return instance.postForm(`category/${id}/images`, data);
};

export const usePostCategoryImage = () => {
  const queryClient = useQueryClient();
  return useMutation(postCategoryImage, {
    onSuccess: () => queryClient.invalidateQueries("get-category-images"),
  });
};
