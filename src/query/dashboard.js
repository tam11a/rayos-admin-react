import { useQuery } from "react-query";
import instance from "../service/instance";

const getDashboard = () => {
  return instance.get(`info/get-company`);
};

export const useGetDashboard = () => {
  return useQuery(["get-dashboard"], () => getDashboard(), {
    // refetchInterval: 2000,
  });
};
