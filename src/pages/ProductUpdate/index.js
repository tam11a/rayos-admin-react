import {
  Button,
  Container,
  Grid,
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
import tableOptionsStyle from "../../style/tableOptions";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { pid } = useParams();

  const [categoryId, setCategoryId] = React.useState();
  const [subcategoryId, setSubcategoryId] = React.useState();

  React.useEffect(() => {
    setValue("category_id", categoryId);
  }, [categoryId]);

  const [params] = React.useState({
    limit: 1000,
    page: 1,
    filters: [],
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    data: catData,
    // isLoading: isCatLoading
  } = useGetAllCategory(params);

  const {
    data: subCatData,
    // isLoading: isSubCatLoading,
    isError: isSubCatError,
  } = useGetSubCategoryFromCatID(categoryId, params);

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
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
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
            </CPaper>

            <Typography variant={"h6"} sx={{ fontWeight: "500", mt: 1 }}>
              Pricing
            </Typography>
            <CPaper>
              <Typography>BuyPrice</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Buy Price"
                {...register("titleEn", {
                  required: true,
                })}
              />
              <Typography>Sell Price</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Sell Price"
                {...register("titleEn", {
                  required: true,
                })}
              />
            </CPaper>
          </Grid>
          <Grid item xs={12} sm={5.9} md={3.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Image
            </Typography>
            <CPaper>
              <DropZone />
            </CPaper>

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
                  value={categoryId || "null"}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    setValue("category", e.target.value);
                  }}
                  placeholder={"Select Category"}
                  fullWidth
                >
                  <MenuItem value={"null"} disabled>
                    Select Category
                  </MenuItem>
                  {catData?.data?.data?.map((cat) => (
                    <MenuItem
                      key={cat._id}
                      value={cat._id}
                      // disabled={cat.id === selectedCategory}
                    >
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
                  value={isSubCatError ? "null" : subcategoryId || "null"}
                  onChange={(e) => {
                    setSubcategoryId(e.target.value);
                    setValue(
                      "subcategory",
                      e.target.value !== "null" ? e.target.value : null
                    );
                  }}
                  disabled={!subCatData?.data?.total}
                  fullWidth
                >
                  <MenuItem value={"null"} disabled>
                    Select Sub Category
                  </MenuItem>
                  {subCatData?.data?.data?.map((cat) => (
                    <MenuItem
                      key={cat._id}
                      value={cat._id}
                      // disabled={cat.id === selectedCategory}
                    >
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
            </CPaper>
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
