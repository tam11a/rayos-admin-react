import { ListItem, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CPaper from "../../components/CPaper";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import { useGetProductByID, useUpdateProduct } from "../../query/product";
import tableOptionsStyle from "../../style/tableOptions";
import VariantInput from "./VariantInput";
import CreateVariantInput from "./CreateVariantInput";
import { responseHandler } from "../../utilities/response-handler";

const Variants = () => {
  const snack = React.useContext(snackContext);
  const { pid } = useParams();
  const {
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { data: productInfo } = useGetProductByID(pid);
  const { mutateAsync: updateProduct, isLoading: updateLoading } =
    useUpdateProduct();

  const handleUpdate = async (data) => {
    const res = await responseHandler(
      () => updateProduct({ product_id: pid, data }),
      [200]
    );
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  React.useEffect(() => {
    if (!productInfo) return;
    reset({
      variantType: productInfo?.data?.data?.variantType || "null",
    });
  }, [productInfo]);

  return (
    <div>
      <Typography variant={"h6"} sx={{ fontWeight: "500", mt: 1 }}>
        Variants
      </Typography>
      <CPaper>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            rowGap: 1,
            p: 0,
          }}
        >
          Variant Type
          <Select
            sx={tableOptionsStyle}
            placeholder={"Select Sub Category"}
            value={watch("variantType") || "null"}
            fullWidth
            onChange={(e) => {
              handleUpdate({ variantType: e.target.value });
            }}
          >
            <MenuItem value={"null"} disabled>
              Select a Variant Type
            </MenuItem>
            <MenuItem value={"Size"}>Size</MenuItem>
            <MenuItem value={"Color"}>Color</MenuItem>
            <MenuItem value={"Variant"}>Variant</MenuItem>
          </Select>
          <ShowError err={errors.variantType} />
        </ListItem>
        {productInfo?.data?.data?.variants?.map?.((variant) => (
          <ListItem
            key={variant._id}
            disablePadding
            sx={{
              py: 0.5,
            }}
          >
            <VariantInput variant={variant} />
          </ListItem>
        ))}
        <CreateVariantInput product_id={pid} />
      </CPaper>
    </div>
  );
};

export default Variants;
