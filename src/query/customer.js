import { useMutation, useQuery, useQueryClient } from "react-query";
import instance, { authInstance } from "../service/instance";

const getAllCustomer = (params) => {
  let queryString = `admin/get-all-user?${
    params.method !== "all" ? params.method : ""
  }limit=${params.limit}&page=${params.page}`; // /${params.limit}?page=${params.page}
  params.filters?.map((filter) => {
    queryString += `&filters[]=${filter}`;
  });
  return authInstance.get(queryString);
};

export const useGetAllCustomer = (params) => {
  return useQuery(["get-all-customer", params], () => getAllCustomer(params), {
    // refetchInterval: 20000,
    retry: 0,
  });
};

// confirm user
const confirmUser = (id) => {
  return authInstance.put(`admin/user-register/confirm/${id}`);
};

export const useConfirmUser = () => {
  const queryClient = useQueryClient();
  return useMutation(confirmUser, {
    onSuccess: () => queryClient.invalidateQueries("get-all-customer"),
  });
};

// block user
const blockUser = (id) => {
  return authInstance.put(`admin/user-register/block/${id}`);
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation(blockUser, {
    onSuccess: () => queryClient.invalidateQueries("get-all-customer"),
  });
};

// cancel user
const cancelUser = (id) => {
  return authInstance.put(`admin/user-register/cancel/${id}`);
};

export const useCancelUser = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelUser, {
    onSuccess: () => queryClient.invalidateQueries("get-all-customer"),
  });
};

const getUserProfile = (id) => {
  return authInstance.get("admin/user-profile/" + id);
};

export const useGetCustomerProfile = (id) => {
  return useQuery(["customer-info", id], () => getUserProfile(id), {
    enabled: !!id,
  });
};

const updateUserProfile = (data) => {
  return authInstance.postForm("admin/update/user-profile", data);
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserProfile, {
    onSuccess: () => queryClient.invalidateQueries("customer-info"),
  });
};

const getWalletInfo = (userId) => {
  return instance.get(`info/admin/get-user/${userId}`);
};

export const useGetWalletInfo = (userId) => {
  return useQuery(["get-user-wallet", userId], () => getWalletInfo(userId), {
    enabled: !!userId,
  });
};

//customer wallet

const sendAmountToUser = (data) => {
  return instance.post(`info/send-amount`, data);
};

export const useSendAmountToUser = () => {
  const queryClient = useQueryClient();
  return useMutation(sendAmountToUser, {
    onSuccess: () => queryClient.invalidateQueries("get-user-wallet"),
  });
};

const updateAmountToUser = (data) => {
  return instance.post(`info/update-amount`, data);
};

export const useUpdateAmountToUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAmountToUser, {
    onSuccess: () => queryClient.invalidateQueries("get-user-wallet"),
  });
};
