import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../service/instance";

export const signIn = (data) => {
  return instance.post("auth/admin/login", data);
};

// export const requestOTP = (phoneNumber) => {
//   return instance.get("forget-password/by-phone/" + phoneNumber);
// };

// export const resetPassword = (data) => {
//   return instance.post("change-password/by-phone", data);
// };

export const validate = () => {
  return instance.get("auth/admin/validate");
};
