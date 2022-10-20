import { useMutation, useQuery } from "react-query";
import instance from "../service/instance";

const login = (data) => {
  return instance.post("auth/admin/login", data);
};

export const useLogin = () => {
  return useMutation(login);
};

const validate = () => {
  return instance.get("auth/admin/validate");
};

export const useValidate = (enabled) => {
  return useQuery(["do-validate"], validate, {
    enabled: enabled,
    retry: 0,
    select: (data) => data?.data?.data || undefined,
  });
};
