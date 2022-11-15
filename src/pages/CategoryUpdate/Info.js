import {
  Button,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ButtonSwitch from "../../components/ButtonSwitch";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import InputBox from "../../components/InputBox";
import snackContext from "../../context/snackProvider";
import { usePostImage } from "../../query/attachments";
import {
  useGetCategory,
  useToggleSubcategory,
  useUpdateCategory,
} from "../../query/category";
import { getAttachment } from "../../service/instance";
import { responseHandler } from "../../utilities/response-handler";

const Info = () => {
  const snack = React.useContext(snackContext);
  const { cid } = useParams();

  const [open, setOpen] = React.useState(false); // Create Subcategory Drawer
  const onClose = () => setOpen(!open);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const { data: categoryInfo, isLoading, isError } = useGetCategory(cid);

  React.useEffect(() => {
    if (!categoryInfo) return;

    if (!isDirty)
      reset({
        titleEn: categoryInfo?.data?.data?.titleEn,
        titleBn: categoryInfo?.data?.data?.titleBn,
        descriptionEn: categoryInfo?.data?.data?.descriptionEn,
        descriptionBn: categoryInfo?.data?.data?.descriptionBn,
      });
  }, [categoryInfo]);
  const { mutateAsync: updateCategory, isLoading: updateLoading } =
    useUpdateCategory();

  const updateCategoryFunc = async (data) => {
    const res = await responseHandler(
      () => updateCategory({ id: cid, data }),
      [200]
    );
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  const { mutateAsync: postImage } = usePostImage();

  const uploadCategoryIcon = async (data) => {
    const res = await responseHandler(() => postImage(data), [201]);

    if (res.status)
      await updateCategoryFunc({
        icon: res.data?.[0]?._id,
      });
    else snack.createSnack(res.msg, "error");
  };

  const { mutateAsync: toggleState } = useToggleSubcategory();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleState(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
            Information
          </Typography>
          <CPaper
            sx={{
              "& form > *": {
                mt: 1,
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <DropZone
                defaultValue={
                  categoryInfo?.data?.data?.icon && {
                    preview: getAttachment(categoryInfo?.data?.data?.icon?._id),
                  }
                }
                onChange={uploadCategoryIcon}
                onDelete={() => true}
              />
              <Tooltip title="deactivate" placement="top">
                <ButtonSwitch
                  checked={categoryInfo?.data?.data?.isActive}
                  color={"success"}
                  onClick={() => {
                    updateState(categoryInfo?.data?.data?._id);
                  }}
                />
              </Tooltip>
            </Stack>
            <form onSubmit={handleSubmit(updateCategoryFunc)}>
              <Typography>Name </Typography>
              <InputBox
                fullWidth
                placeholder="Enter Category Name "
                {...register("titleEn", {
                  required: true,
                })}
              />
              {/* <Typography>Name (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Category Name (Bengali)"
                {...register("titleBn")}
              /> */}
              <Typography>Description </Typography>
              <InputBox
                fullWidth
                placeholder="Enter Description "
                {...register("descriptionEn", {
                  required: true,
                })}
                multiline={true}
                minRows={5}
                // maxRows={6}
              />
              {/* <Typography>Description (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Description (Bengali)"
                {...register("descriptionBn")}
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
                fullWidth
                disabled={updateLoading || isLoading || !isDirty}
              >
                Update Category
              </Button>
            </form>
          </CPaper>
        </Grid>
      </Container>
    </>
  );
};

export default Info;
