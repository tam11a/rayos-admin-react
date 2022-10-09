import React from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Box,
} from "@mui/material";
import StateViewer from "../../components/StateViewer";
import {
  useGetWalletInfo,
  useSendAmountToUser,
  useUpdateAmountToUser,
} from "../../query/customer";
import { IoWalletSharp } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { FiEdit2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import CInput from "../Login/CInput";
import { useForm } from "react-hook-form";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";

const Wallet = ({ uid }) => {
  const snack = React.useContext(snackContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(!open);
  const { data, isLoading } = useGetWalletInfo(uid);
  // console.log(data);

  const { register, reset, handleSubmit } = useForm();
  const {
    register: registerUpdate,
    reset: updateReset,
    handleSubmit: handleUpdateSubmit,
  } = useForm();

  const [walletInfo, setWalletInfo] = React.useState({});

  const { mutateAsync: sendAmountToUser } = useSendAmountToUser();
  const { mutateAsync: updateAmountToUser } = useUpdateAmountToUser();

  const sendAmount = async (e) => {
    // console.log(e);
    const res = await responseHandler(() =>
      sendAmountToUser({
        user_id: uid,
        ...e,
      })
    );
    if (res.status) {
      snack.createSnack(res.msg);
      reset();
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  const updateAmount = async (e) => {
    const res = await responseHandler(() =>
      updateAmountToUser({
        user_id: uid,
        ...e,
      })
    );
    if (res.status) {
      snack.createSnack(res.msg);
      handleClose();
      updateReset();
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <StateViewer
          stateList={[
            {
              num: data?.data?.value?.total_user_earning,
              title: "Total Earning ",
            },
            {
              num: data?.data?.value?.total_user_balance,
              title: "Current Balance",
              func: () => handleClose(),
            },
            {
              num: data?.data?.value?.total_user_order,
              title: "Total order ",
            },
            {
              num: data?.data?.value?.total_user_pending,
              title: "Total Pending ",
            },
          ]}
        />

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            my: 3,
            px: 2,
            mx: "auto",
            width: "100%",
            maxWidth: "400px",
          }}
          component={"form"}
          onSubmit={handleSubmit(sendAmount)}
        >
          <Typography variant="h6" my={3}>
            SEND MONEY
          </Typography>
          <Typography>
            {data?.data?.value?.total_user_balance || 0} ৳
          </Typography>
          <Typography mb={2}>Current Balance</Typography>
          <CInput
            placeholder="Enter Amount"
            {...register("amount")}
            sx={{
              position: "relative",
              my: 1,
              mb: 2,
            }}
            autoComplete={"off"}
            fullWidth
          />
          <Button
            color={"black"}
            variant={"contained"}
            startIcon={<GiPayMoney />}
            sx={{
              position: "relative",
              px: 2,
              mb: 3,
            }}
            fullWidth
            type={"submit"}
          >
            Send Money
          </Button>
        </Paper>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "400px",
          },
        }}
        // component={"form"}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>Update Amount</Typography>
            <IconButton size={"small"} onClick={handleClose}>
              <MdClose />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <Box component={"form"} onSubmit={handleUpdateSubmit(updateAmount)}>
          <DialogContent>
            <CInput
              placeholder="Enter Amount"
              {...registerUpdate("amount")}
              sx={{
                position: "relative",
                mb: 2,
              }}
              autoComplete={"off"}
              fullWidth
            />
            <Button
              color={"black"}
              variant={"contained"}
              startIcon={<FiEdit2 />}
              sx={{
                position: "relative",
                px: 2,
              }}
              fullWidth
              type={"submit"}
            >
              Update
            </Button>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default Wallet;
