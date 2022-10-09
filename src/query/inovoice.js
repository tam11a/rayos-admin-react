import { useQuery } from "react-query";
import instance from "../service/instance";

const getInvoice = (id) => {
  return instance.get(`order/generate-invoice/${id}`);
};

export const useGetInvoice = (id) => {
  return useQuery(["get-invoice", id], () => getInvoice(id), {
    enabled: !!id,
  });
};
