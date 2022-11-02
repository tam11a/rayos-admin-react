import { Button, IconButton, InputBase, ListItem, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import { useCreateVariant } from "../../query/product";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const CreateVariantInput = ({ product_id }) => {
  const snack = React.useContext(snackContext);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync: createVariant, isLoading } = useCreateVariant();

  const onValid = async (data) => {
    const res = await responseHandler(
      () => createVariant({ id: product_id, data }),
      [201]
    );
    if (res.status) {
      reset();
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <ListItem
        disablePadding
        sx={{
          py: 0.5,
        }}
      >
        <InputBase
          sx={tableOptionsStyle}
          {...register("titleEn", { required: true })}
          placeholder={"Create New Variant"}
          endAdornment={
            watch("titleEn") && (
              <>
                <IconButton
                  size={"small"}
                  color={"error"}
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => reset()}
                  disabled={isLoading}
                >
                  <MdDeleteForever />
                </IconButton>
                <Button
                  variant={"contained"}
                  size={"small"}
                  type={"submit"}
                  disabled={isLoading}
                >
                  Create
                </Button>
              </>
            )
          }
          fullWidth
        />
      </ListItem>
      <ShowError err={errors.titleEn} />
    </form>
  );
};

export default CreateVariantInput;
