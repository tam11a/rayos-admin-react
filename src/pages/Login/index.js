import {
  Alert,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { authContext } from "../../context/AuthProvider";
import snackContext from "../../context/snackProvider";
import CInput from "./CInput";
import CPassword from "./CPassword";
import { joiResolver } from "@hookform/resolvers/joi";
import { signIn } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";

const Index = () => {
  // contexts
  const auth = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({ resolver: joiResolver(schema) });

  const onValid = async (data) => {
    const res = await responseHandler(() => signIn(data));
    if (res.status) {
      auth.setToken(res.data.value.access_token);
      snack.createSnack("Login Successfull!");
      reset();
    } else {
      snack.createSnack(res.data, "error");
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit(onValid)}>
        <Paper
          sx={{
            p: 2,
            height: "fit-content",
            maxWidth: "360px",
          }}
          elevation={10}
        >
          <Typography variant={"button"}>email</Typography>
          <CInput
            fullWidth
            placeholder="example@email.com"
            {...register("email")}
          />
          {errors.email && (
            <Alert severity="error">{errors.email.message}</Alert>
          )}
          <Typography variant={"button"}>password</Typography>
          <CPassword
            fullWidth
            placeholder="Enter Your Password"
            {...register("password")}
          />
          {errors.password && (
            <Alert severity="error">{errors.password.message}</Alert>
          )}
          <Button
            sx={{
              float: "right",
              mb: 1,
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
            disableRipple
            //   onClick={auth.handleOpenForgetPassword}
          >
            forget password ?
          </Button>
          <Button
            fullWidth
            color={"black"}
            variant={"contained"}
            type={"submit"}
            // onClick={() => authCntxt.setToken(1123)}
            disabled={isSubmitting}
          >
            sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

const schema = Joi.object({
  email: Joi.string()
    .label("Email")
    // .regex(/01\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid Email",
      "string.empty": "Email Required",
    }),
  password: Joi.string().label("Password").required().messages({
    "string.empty": "Password Required",
  }),
});

export default Index;
