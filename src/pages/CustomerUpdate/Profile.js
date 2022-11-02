import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Grid,
  Hidden,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { authContext } from "../../context/AuthProvider";
import { objToFormData } from "../../utilities/json-form";
import {
  useGetCustomerByID,
  useGetCustomerProfile,
  useUpdateUserProfile,
} from "../../query/customer";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import CInput from "../Login/CInput";

const Profile = ({ uid }) => {
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const { register, setValue, handleSubmit } = useForm();

  // const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  // const updateHandler = async (e) => {
  //   let info = {
  //     bkash: e.bkash,
  //     cc: e.cc,
  //     company_link: e.company_link,
  //   };
  //   delete e.phone;
  //   delete e.bkash;
  //   delete e.company_link;
  //   delete e.cc;
  //   e = {
  //     ...e,
  //     info: JSON.stringify(JSON.stringify(info)),
  //   };
  //   const res = await responseHandler(() => updateUserProfile(e));
  //   if (res.status) {
  //     snack.createSnack(res.msg);
  //   } else {
  //     snack.createSnack(res.data, "error");
  //   }
  // };

  const { data: userData } = useGetCustomerByID(uid);
  console.log(userData);

  // React.useEffect(() => {
  //   if (!userData) return;
  //   // console.log(authCntxt.userInfo);
  //   setValue("user_id", userData?.data?.value?.user_id);
  //   setValue("full_name", userData?.data?.value?.full_name);
  //   setValue("company_name", userData?.data?.value?.company_name);
  //   setValue("phone", userData?.data?.value?.user?.phone);
  //   setValue("address", userData?.data?.value?.address);
  //   if (userData?.data?.value?.info) {
  //     let additionalInfo = JSON.parse(userData?.data?.value?.info);
  //     setValue("cc", additionalInfo.cc);
  //     setValue("bkash", additionalInfo.bkash);
  //     setValue("company_link", additionalInfo.company_link);
  //   }
  // }, [userData]);

  // const [imgVal, setImgVal] = React.useState();
  // const uploadImg = async () => {
  //   const res = await responseHandler(() =>
  //     updateUserProfile({
  //       image: imgVal,
  //       full_name: userData?.data?.value?.full_name,
  //       company_name: userData?.data?.value?.company_name,
  //       address: userData?.data?.value?.address,
  //       user_id: uid,
  //     })
  //   );
  //   if (res.status) {
  //     snack.createSnack(res.msg);
  //     setImgVal();
  //   } else {
  //     snack.createSnack(res.data, "error");
  //   }
  // };
  // React.useEffect(() => {
  //   if (!imgVal) return;
  //   // setImgVal();
  //   uploadImg();
  // }, [imgVal]);

  //   console.log(userData);
  return (
    <div></div>
    // <>
    //   <Container
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       pb: 1,
    //     }}
    //   >
    //     <Grid
    //       container
    //       spacing={4}
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         mt: 1,
    //       }}
    //     >
    //       <Grid
    //         item
    //         xs={12}
    //         sx={{
    //           display: "flex",
    //           flexDirection: { xs: "column", sm: "row" },
    //           alignItems: "center",
    //           rowGap: 2,
    //           columnGap: 4,
    //           justifyContent: {
    //             xs: "center",
    //             //   sm: "flex-start",
    //           },
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             position: "relative",
    //           }}
    //           component={"form"}
    //         >
    //           <Avatar
    //             sx={{
    //               width: "150px",
    //               height: "150px",
    //             }}
    //             // src={authRootURL + userData?.data?.value?.image}
    //             alt={userData?.data?.value?.full_name}
    //           />
    //           <Tooltip title={"Upload Photo"}>
    //             <Fab
    //               size="small"
    //               sx={{
    //                 position: "absolute",
    //                 top: 100,
    //                 right: 0,
    //               }}
    //               color={"secondary"}
    //               component="label"
    //             >
    //               <FiEdit2 />
    //               <input
    //                 hidden
    //                 accept="image/*"
    //                 type="file"
    //                 onChange={(e) => {
    //                   setImgVal(e.target.files[0]);
    //                 }}
    //               />
    //             </Fab>
    //           </Tooltip>
    //         </Box>
    //         <Stack
    //           direction={"column"}
    //           sx={{
    //             alignItems: {
    //               xs: "center",
    //               sm: "flex-start",
    //             },
    //           }}
    //         >
    //           <Typography variant={"h6"}>
    //             {userData?.data?.value?.full_name}
    //           </Typography>
    //           <Typography
    //             variant={"subtitle2"}
    //             sx={{
    //               display: "flex",
    //               alignItems: "center",
    //               columnGap: 1,
    //               mt: {
    //                 sm: 1,
    //               },
    //             }}
    //           >
    //             <Hidden smDown>
    //               <FaPhoneAlt />
    //             </Hidden>
    //             <span>{userData?.data?.value?.user?.phone}</span>
    //           </Typography>
    //         </Stack>
    //       </Grid>

    //       <Grid item xs={12} md={6}>
    //         <form onSubmit={handleSubmit(updateHandler)}>
    //           <Paper
    //             // elevation={2}
    //             sx={{
    //               p: {
    //                 xs: 1,
    //                 md: 2,
    //               },
    //               boxShadow: {
    //                 xs: 2,
    //                 md: 6,
    //               },
    //             }}
    //             component={Stack}
    //             direction={"column"}
    //             rowGap={1}
    //           >
    //             <Hidden mdDown>
    //               <Typography
    //                 variant={"h5"}
    //                 sx={{
    //                   p: 1,
    //                 }}
    //               >
    //                 ACCOUNT SETTINGS
    //               </Typography>
    //               <Divider />
    //             </Hidden>
    //             <Typography variant="button">Name *</Typography>
    //             <CInput
    //               placeholder="Full Name"
    //               fullWidth
    //               {...register("full_name")}
    //             />
    //             <Typography variant="button">Company Name *</Typography>
    //             <CInput
    //               placeholder="Company Name"
    //               fullWidth
    //               {...register("company_name")}
    //             />
    //             <Typography variant="button">Company Link</Typography>
    //             <CInput
    //               placeholder="Company Link"
    //               fullWidth
    //               {...register("company_link")}
    //             />
    //             <Typography variant="button">Phone *</Typography>
    //             <CInput
    //               placeholder="Phone Number"
    //               readOnly
    //               disabled
    //               fullWidth
    //               {...register("phone")}
    //             />
    //             <Typography variant="button">Address *</Typography>
    //             <CInput
    //               placeholder="Address"
    //               fullWidth
    //               {...register("address")}
    //             />
    //             <Typography variant="button">Additional Info</Typography>
    //             <CInput
    //               placeholder="Bank Account"
    //               startAdornment={<Box sx={{ mr: 1 }}>CC:</Box>}
    //               fullWidth
    //               {...register("cc")}
    //             />
    //             <CInput
    //               placeholder="BKash Number"
    //               startAdornment={<Box sx={{ mr: 1 }}>BKash:</Box>}
    //               fullWidth
    //               inputProps={{
    //                 type: "tel",
    //               }}
    //               {...register("bkash")}
    //             />
    //             <Button variant="contained" color={"black"} type={"submit"}>
    //               Update
    //             </Button>
    //           </Paper>
    //         </form>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </>
  );
};

export default Profile;
