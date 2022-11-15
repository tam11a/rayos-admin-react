import {
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { BiReset } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import { useCreateSubcategory } from "../../query/category";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const CreateSubcatDrawer = ({ open, onClose, categoryId }) => {
  const snack = React.useContext(snackContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const { mutateAsync: postSubcategory, isLoading } = useCreateSubcategory();

  const createCategory = async (data) => {
    const res = await responseHandler(
      () =>
        postSubcategory({
          ...data,
          category: categoryId,
        }),
      [201]
    );
    if (res.status) {
      snack.createSnack(res.msg);
      reset();
      onClose();
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: {
          width: "95vw",
          maxWidth: "400px",
        },
      }}
    >
      <form onSubmit={handleSubmit(createCategory)}>
        <List disablePadding>
          <ListItem>
            <ListItemText
              primary={"Create Subcategory"}
              secondary={"Create Subcategory for Products"}
            />
            {isDirty && (
              <IconButton
                size={"small"}
                color={"black"}
                onClick={() => reset()}
              >
                <BiReset />
              </IconButton>
            )}
            <IconButton size={"small"} onClick={onClose}>
              <MdClose />
            </IconButton>
          </ListItem>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <Divider
              sx={{
                mb: 1,
              }}
            />
          )}
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              rowGap: 1,
            }}
          >
            Name *
            <InputBase
              sx={tableOptionsStyle}
              placeholder={"Enter Category Name"}
              {...register("titleEn", {
                required: true,
              })}
              fullWidth
            />
            <ShowError err={errors.titleEn} />
          </ListItem>
          {/* <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              rowGap: 1,
            }}
          >
            Name [In Bengali]
            <InputBase
              sx={tableOptionsStyle}
              placeholder={"Enter Category Name [In Bengali]"}
              {...register("titleBn")}
              fullWidth
            />
            <ShowError err={errors.titleBn} />
          </ListItem> */}
        </List>
        <ListItem>
          <Button
            variant={"contained"}
            type={"submit"}
            disabled={isLoading}
            fullWidth
          >
            Create
          </Button>
        </ListItem>
      </form>
    </Drawer>
  );
};

export default CreateSubcatDrawer;
