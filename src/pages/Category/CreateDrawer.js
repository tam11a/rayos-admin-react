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
import { useCreateCategory } from "../../query/category";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const CreateDrawer = ({ open, onClose }) => {
  const snack = React.useContext(snackContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const { mutateAsync: postCategory, isLoading } = useCreateCategory();

  const createCategory = async (data) => {
    const res = await responseHandler(() => postCategory(data), [201]);
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
              primary={"Create Category"}
              secondary={"Create Category for Products"}
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
            Category Name *
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
            Category Name [In Bengali]
            <InputBase
              sx={tableOptionsStyle}
              placeholder={"Enter Category Name [In Bengali]"}
              {...register("titleBn")}
              fullWidth
            />
            <ShowError err={errors.titleBn} />
          </ListItem> */}
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              rowGap: 1,
            }}
          >
            Description *
            <InputBase
              sx={{ ...tableOptionsStyle, height: "unset", py: 1 }}
              placeholder={"Enter Description"}
              multiline
              minRows={5}
              // maxRows={6}
              {...register("descriptionEn", {
                required: true,
              })}
              fullWidth
            />
            <ShowError err={errors.descriptionEn} />
          </ListItem>
          {/* <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              rowGap: 1,
            }}
          >
            Description [In Bengali]
            <InputBase
              sx={{ ...tableOptionsStyle, height: "unset", py: 1 }}
              placeholder={"Enter Description [In Bengali]"}
              multiline
              minRows={5}
              maxRows={6}
              {...register("descriptionBn")}
              fullWidth
            />
            <ShowError err={errors.descriptionBn} />
          </ListItem> */}
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
        </List>
      </form>
    </Drawer>
  );
};

export default CreateDrawer;
