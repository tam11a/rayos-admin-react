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
import CreateVariantInput from "./CreateVariantInput";
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
        variantType: productInfo?.data?.data?.variantType,
        sellPrice: productInfo?.data?.data?.sellPrice,
        category: productInfo?.data?.data?.category?._id,
        subcategory: productInfo?.data?.data?.subcategory?._id,
      });
  }, [productInfo]);

  // console.log(productInfo?.data?.data);

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
    useGetSubCategoryFromCatID(watch("category"), params);

  // React.useEffect(() => setValue("subcategory", "null"), [watch("category")]);

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
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  rowGap: 1,
                  p: 0,
                }}
              >
                <Typography>Name</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Product Name"
                  {...register("titleEn")}
                />
                <ShowError err={errors.titleEn} />
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
                <Typography>Name (Bengali)</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Product Name (Bengali)"
                  {...register("titleBn")}
                />
                <ShowError err={errors.titleBn} />
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
                <Typography>Description</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Product Description"
                  {...register("descriptionEn")}
                  multiline={true}
                  minRows={5}
                  maxRows={6}
                />
                <ShowError err={errors.descriptionEn} />
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
                <Typography>Description (Bengali)</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Prooduct Description (Bengali)"
                  {...register("descriptionBn")}
                  multiline={true}
                  minRows={5}
                  maxRows={6}
                />
                <ShowError err={errors.descriptionBn} />
              </ListItem>
            </CPaper>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Images
            </Typography>
            <CPaper>
              <DropZone />
            </CPaper>
          </Grid>

          <Grid item xs={12} sm={5.9} md={4.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
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
                  placeholder={"Select Category"}
                  fullWidth
                  {...register("category")}
                  value={watch("category") || "null"}
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
                  disabled={!subCatData?.data?.total}
                  fullWidth
                  {...register("subcategory")}
                  value={watch("subcategory") || "null"}
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
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  rowGap: 1,
                  p: 0,
                }}
              >
                <Typography>BuyPrice</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Buy Price"
                  {...register("buyPrice")}
                />
                <ShowError err={errors.buyPrice} />
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
                <Typography>Sell Price</Typography>
                <InputBox
                  fullWidth
                  placeholder="Enter Sell Price"
                  {...register("sellPrice")}
                />
                <ShowError err={errors.sellPrice} />
              </ListItem>
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
                  {...register("variantType")}
                  value={watch("variantType") || "null"}
                  fullWidth
                >
                  <MenuItem value={"null"} disabled>
                    Select a Variant Type
                  </MenuItem>
                  <MenuItem value={"size"}>Size</MenuItem>
                  <MenuItem value={"color"}>Color</MenuItem>
                  <MenuItem value={"variant"}>Variant</MenuItem>
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
            <Button
              variant={"contained"}
              color={"primary"}
              size={"large"}
              sx={{
                height: "52px",
                mt: 1,
              }}
              type={"submit"}
              disabled={updateLoading}
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
};;;;;;;;;;
export default Index;
