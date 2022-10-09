import { useQuery } from "react-query";
import instance from "../service/instance";

const getAllCategory = () => {
  return instance.get(`category/get-all-category-info`);
};

export const useGetAllCategory = () => {
  return useQuery(["get-all-category"], () => getAllCategory(), {
    // refetchInterval: 20000,
  });
};

const getSubCategoryFromCatID = (category_id) => {
  return instance.get(
    `subcategory/get-subcategory-info-by-category/${category_id}`
  );
};

export const useGetSubCategoryFromCatID = (category_id) => {
  return useQuery(
    ["get-sub-category-cat", category_id],
    () => getSubCategoryFromCatID(category_id),
    {
      // refetchInterval: 20000,
      enabled: !!category_id,
      retry: 0,
    }
  );
};
