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
import { MdClose } from "react-icons/md";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import { useCreateStore } from "../../query/store";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const CreateStoreDrawer = ({ open, onClose, ...others }) => {
  const snack = React.useContext(snackContext);
  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isDirty },
  } = useForm();

  const { mutateAsync: postStore, isLoading } = useCreateStore();

  const createStore = async (data) => {
    const res = await responseHandler(() => postStore(data), [201]);
    if (res.status) {
      snack.createSnack(res.msg);
      reset();
      onClose();
    } else {
      snack.createSnack(res.msg, "error");
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "570px",
          },
        }}
        open={open}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(createStore)}>
          <List
            disablePadding
            sx={{
              flex: 1,
            }}
          >
            <ListItem>
              <ListItemText
                primary={"Create Store"}
                secondary={"Upload Store Information"}
              />
              <IconButton size={"small"} color={"black"} onClick={onClose}>
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
              Store Name *
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Store Name"}
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
              Store Name [In Bengali]
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Store Name [In Bengali]"}
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
    </>
  );
};

export default CreateStoreDrawer;
