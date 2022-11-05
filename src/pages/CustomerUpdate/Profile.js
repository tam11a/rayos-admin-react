import {
  Avatar,
  Box,
  Button,
  CircularProgress,
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
  useToggleCustomer,
  useUpdateCustomer,
  useUpdateUserProfile,
} from "../../query/customer";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import CInput from "../Login/CInput";
import { useParams } from "react-router-dom";
import { getAttachment } from "../../service/instance";
import { Icon } from "@iconify/react";
import { usePostImage } from "../../query/attachments";
import ButtonSwitch from "../../components/ButtonSwitch";

const Profile = () => {
  const snack = React.useContext(snackContext);
  const { cid } = useParams();
  const [imgVal, setImgVal] = React.useState();

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const { data: userData } = useGetCustomerByID(cid);
  // console.log(userData);
  const { mutateAsync: toggleCustomer } = useToggleCustomer();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleCustomer(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  React.useEffect(() => {
    if (!userData) return;

    if (!isDirty)
      reset({
        userName: userData?.data?.data?.userName,
        fullName: userData?.data?.data?.fullName,
        email: userData?.data?.data?.email,
        phone: userData?.data?.data?.phone,
      });
  }, [userData]);
  const { mutateAsync: updateCustomer, isLoading: updateLoading } =
    useUpdateCustomer();

  const handleUpdate = async (data) => {
    const res = await responseHandler(
      () => updateCustomer({ customer_id: cid, data }),
      [200]
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };
  const { mutateAsync: postImage, isLoading: attachmentLoading } =
    usePostImage();

  const uploadImg = async () => {
    const res1 = await responseHandler(() => postImage([imgVal]), [201]);
    if (res1.status) {
      await handleUpdate({ image: res1.data?.[0]?._id });
    } else {
      snack.createSnack(res1.data, "error");
    }
  };

  React.useEffect(() => {
    if (!imgVal) return;
    // setImgVal();
    uploadImg();
  }, [imgVal]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: 1,
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              rowGap: 2,
              columnGap: 4,
              justifyContent: {
                xs: "center",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                minHeight: "150px",
                minWidth: "150px",
              }}
              component={"form"}
            >
              {attachmentLoading || updateLoading ? (
                <Box
                  sx={{
                    borderRadius: "50%",
                    position: "relative",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress color={"black"} />
                </Box>
              ) : (
                <Avatar
                  sx={{
                    width: "150px",
                    height: "150px",
                  }}
                  src={getAttachment(userData?.data?.data?.image)}
                  alt={userData?.data?.data?.fullName}
                />
              )}
              <Tooltip title={"Upload Photo"}>
                <Fab
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 100,
                    right: 0,
                  }}
                  color={"secondary"}
                  component="label"
                >
                  <FiEdit2 />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      setImgVal(e.target.files[0]);
                    }}
                  />
                </Fab>
              </Tooltip>
            </Box>
            <Stack
              direction={"column"}
              sx={{
                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                },
              }}
            >
              <Stack direction={"row"} alignItems={"center"} columnGap={1}>
                <Typography variant={"h6"}>
                  {userData?.data?.data?.userName}
                </Typography>
                <ButtonSwitch
                  checked={userData?.data?.data?.isActive}
                  color={"success"}
                  onClick={() => {
                    updateState(userData?.data?.data?._id);
                  }}
                />
              </Stack>
              <Typography
                variant={"subtitle2"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 1,
                  mt: {
                    sm: 1,
                  },
                }}
              >
                <Hidden smDown>
                  <Icon icon="uiw:mail" />
                </Hidden>
                <span>{userData?.data?.data?.email}</span>
              </Typography>
              <Typography
                variant={"subtitle2"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 1,
                  mt: {
                    sm: 1,
                  },
                }}
              >
                <Hidden smDown>
                  <FaPhoneAlt />
                </Hidden>
                <span>{userData?.data?.data?.phone}</span>
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* <form onSubmit={handleSubmit(updateHandler)}> */}
            <Paper
              // elevation={2}
              sx={{
                p: {
                  xs: 1,
                  md: 2,
                },
                boxShadow: {
                  xs: 2,
                  md: 6,
                },
                maxWidth: "350px",
                mx: "auto",
              }}
              component={Stack}
              direction={"column"}
              rowGap={1}
            >
              <Hidden mdDown>
                <Typography
                  variant={"h5"}
                  sx={{
                    p: 1,
                  }}
                >
                  ACCOUNT SETTINGS
                </Typography>
                <Divider />
              </Hidden>
              <form onSubmit={handleSubmit(handleUpdate)}>
                <Typography variant="button">Username </Typography>
                <CInput
                  placeholder="Username"
                  fullWidth
                  {...register("userName")}
                />
                <Typography variant="button">Name </Typography>
                <CInput
                  placeholder="Full Name"
                  fullWidth
                  {...register("fullName")}
                />
                <Typography variant="button">Phone </Typography>
                <CInput
                  placeholder="Phone Number"
                  readOnly
                  disabled
                  fullWidth
                  {...register("phone")}
                />
                <Typography variant="button">email </Typography>
                <CInput
                  placeholder="Full Name"
                  fullWidth
                  {...register("email")}
                />
                {/* <Typography variant="button">Address </Typography>
              <CInput
                placeholder="Address"
                fullWidth
                {...register("address")}
              /> */}
                {/* <Typography variant="button">Additional Info</Typography> */}
                {/* <CInput
                placeholder="Bank Account"
                startAdornment={<Box sx={{ mr: 1 }}>CC:</Box>}
                fullWidth
                {...register("cc")}
              />
              <CInput
                placeholder="BKash Number"
                startAdornment={<Box sx={{ mr: 1 }}>BKash:</Box>}
                fullWidth
                inputProps={{
                  type: "tel",
                }}
                {...register("bkash")}
              /> */}
                <Button
                  variant="contained"
                  color={"black"}
                  type={"submit"}
                  disabled={updateLoading || !isDirty}
                  fullWidth
                >
                  Update
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
