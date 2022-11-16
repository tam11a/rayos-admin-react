import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CPaper from "../../components/CPaper";
import InputBox from "../../components/InputBox";
import snackContext from "../../context/snackProvider";
import { useGetStoreByID, useUpdateStore } from "../../query/store";
import { responseHandler } from "../../utilities/response-handler";

const Info = () => {
  const snack = React.useContext(snackContext);
  const { sid } = useParams();

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const { data: storeInfo, isLoading, isError } = useGetStoreByID(sid);
  // console.log(storeInfo);

  React.useEffect(() => {
    if (!storeInfo) return;

    if (!isDirty)
      reset({
        titleEn: storeInfo?.data?.data?.titleEn,
        titleBn: storeInfo?.data?.data?.titleBn,
        descriptionEn: storeInfo?.data?.data?.descriptionEn,
        descriptionBn: storeInfo?.data?.data?.descriptionBn,
      });
  }, [storeInfo]);

  const { mutateAsync: updateStore, isLoading: updateLoading } =
    useUpdateStore();

  const handleUpdate = async (data) => {
    const res = await responseHandler(
      () => updateStore({ store_id: sid, data }),
      [200]
    );
    // console.log(res);
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <Grid item xs={12} sm={5.9} md={7.9}>
          <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
            Information
          </Typography>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <CPaper>
              <Typography>Name</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Store Name"
                {...register("titleEn", {
                  required: true,
                })}
              />
              {/* <Typography>Name (Bengali)</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Store Name (Bengali)"
                  {...register("titleBn", {
                    required: false,
                  })}
                /> */}
              <Typography>Description</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Description"
                {...register("descriptionEn", {
                  required: true,
                })}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              {/* <Typography>Description (Bengali)</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Description (Bengali)"
                  {...register("descriptionBn", {
                    required: false,
                  })}
                  multiline={true}
                  minRows={5}
                  maxRows={6}
                /> */}

              <Button
                variant={"contained"}
                color={"primary"}
                size={"large"}
                sx={{
                  height: "52px",
                  mt: 1,
                }}
                type={"submit"}
                disabled={updateLoading || !isDirty}
                fullWidth
              >
                Update Store Info
              </Button>
            </CPaper>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default Info;
