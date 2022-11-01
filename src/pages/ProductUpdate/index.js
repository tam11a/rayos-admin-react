import {
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import InputBox from "../../components/InputBox";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import {
  useGetAllCategory,
  useGetSubCategoryFromCatID,
} from "../../query/category";
import { useGetProductByID, useUpdateProduct } from "../../query/product";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";
import VariantInput from "./VariantInput";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { pid } = useParams();
  const {
    register,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const [params] = React.useState({
    limit: 1000,
    page: 1,
    filters: [],
  });

  const { data: productInfo } = useGetProductByID(pid);

  React.useEffect(() => {
    if (!productInfo) return;

    if (!isDirty)
      reset({
        titleEn: productInfo?.data?.data?.titleEn,
        titleBn: productInfo?.data?.data?.titleBn,
        descriptionEn: productInfo?.data?.data?.descriptionEn,
        descriptionBn: productInfo?.data?.data?.descriptionBn,
        buyPrice: productInfo?.data?.data?.buyPrice,
        sellPrice: productInfo?.data?.data?.sellPrice,
        category: productInfo?.data?.data?.category?._id,
        subcategory: productInfo?.data?.data?.subcategory?._id,
      });
  }, [productInfo]);

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

  const { data: catData } = useGetAllCategory(params);

  const { data: subCatData, isError: isSubCatError } =
    useGetSubCategoryFromCatID(getValues()["category"], params);

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
          <Grid item xs={12} sm={5.9} md={6.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Information
            </Typography>

            <CPaper>
              <Typography>Name (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Name (English)"
                {...register("titleEn")}
              />
              <Typography>Name (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Name (Bengali)"
                {...register("titleBn")}
              />
              <Typography>Description (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Description (English)"
                {...register("descriptionEn")}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              <Typography>Description (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Prooduct Description (Bengali)"
                {...register("descriptionBn")}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
            </CPaper>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Image
            </Typography>
            <CPaper>
              <DropZone />
            </CPaper>
          </Grid>

          <Grid item xs={12} sm={5.9} md={4.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500", mt: 1 }}>
              Additional Information
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
                Category
                <Select
                  sx={tableOptionsStyle}
                  value={getValues()?.category || "null"}
                  placeholder={"Select Category"}
                  fullWidth
                  {...register("category")}
                >
                  <MenuItem value={"null"} disabled>
                    Select Category
                  </MenuItem>
                  {catData?.data?.data?.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.titleEn}
                    </MenuItem>
                  ))}
                </Select>
                <ShowError err={errors.category} />
              </ListItem>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  rowGap: 1,
                  p: 0,
                }}
              >
                Sub Category
                <Select
                  sx={tableOptionsStyle}
                  placeholder={"Select Sub Category"}
                  value={getValues()?.subcategory || "null"}
                  disabled={!subCatData?.data?.total}
                  fullWidth
                  {...register("subcategory")}
                >
                  <MenuItem value={"null"} disabled>
                    Select Sub Category
                  </MenuItem>
                  {subCatData?.data?.data?.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.titleEn}
                    </MenuItem>
                  ))}
                </Select>
                <ShowError err={errors.subcategory} />
              </ListItem>
              <Typography>BuyPrice</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Buy Price"
                {...register("buyPrice")}
              />
              <Typography>Sell Price</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Sell Price"
                {...register("sellPrice")}
              />
            </CPaper>
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
                  onChange={(e) => {
                    setValue(
                      "variantType",
                      e.target.value !== "null" ? e.target.value : null
                    );
                  }}
                  fullWidth
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
              <VariantInput />
            </CPaper>
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
              onClick={() => {
                handleUpdate(getValues());
              }}
              fullWidth
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
