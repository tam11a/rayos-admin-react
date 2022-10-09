import { useMutation, useQuery, useQueryClient } from "react-query";
import { authInstance } from "../service/instance";

export const signIn = (data) => {
  return authInstance.post("admin/login", data);
};

// export const requestOTP = (phoneNumber) => {
//   return authInstance.get("forget-password/by-phone/" + phoneNumber);
// };

// export const resetPassword = (data) => {
//   return authInstance.post("change-password/by-phone", data);
// };

export const validate = () => {
  return authInstance.get("admin/validate");
};
