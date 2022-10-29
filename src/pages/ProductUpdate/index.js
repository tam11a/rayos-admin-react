import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import InputBox from "../../components/InputBox";
import snackContext from "../../context/snackProvider";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { pid } = useParams();

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <BackButton
          to={"/product-list"}
          primary={"Back to Product"}
          secondary={"Update Product"}
        />
        <Grid
          container
          rowGap={1}
          columnGap={1}
          sx={{
            mt: 2,
          }}
        >
          <Grid item xs={12} sm={5.9} md={7.9}>
            <Typography variant={"body1"} sx={{ fontWeight: "500" }}>
              Information
            </Typography>
            <CPaper>
              <Typography>Name (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Name (English)"
                {...register("titleEn", {
                  required: true,
                })}
              />
              <Typography>Name (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Name (Bengali)"
                {...register("titleBn", {
                  required: true,
                })}
              />
              <Typography>Description (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Description (English)"
                {...register("descriptionEn", {
                  required: true,
                })}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              <Typography>Description (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Prooduct Description (Bengali)"
                {...register("descriptionBn", {
                  required: true,
                })}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              <Button
                variant={"contained"}
                color={"primary"}
                size={"large"}
                sx={{
                  height: "52px",
                  mt: 1,
                }}
                // onClick={() => setOpenCreate(!openCreate)}
                fullWidth
              >
                Update Product
              </Button>
            </CPaper>
          </Grid>
          <Grid item xs={12} sm={5.9} md={3.9}>
            <Typography variant={"body1"} sx={{ fontWeight: "500" }}>
              Image
            </Typography>
            <CPaper>
              <DropZone />
            </CPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
