import {
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import {
  useGetAllCategory,
  useGetSubCategoryFromCatID,
} from "../../query/category";
import { useCreateProduct } from "../../query/product";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const CreateProductDrawer = ({ open, onClose, ...others }) => {
  const snack = React.useContext(snackContext);
  const navigate = useNavigate();
  const { sid } = useParams();
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
    data: catData,
    // isLoading: isCatLoading
  } = useGetAllCategory(params);

  const {
    data: subCatData,
    // isLoading: isSubCatLoading,
    isError: isSubCatError,
  } = useGetSubCategoryFromCatID(categoryId, params);

  const { mutateAsync: mutateCreateProduct, isLoading } = useCreateProduct();

  const handleUpdate = async (data) => {
    const res = await responseHandler(
      () => mutateCreateProduct({ ...data, store: sid }),
      [201]
    );
    if (res.status) {
      snack.createSnack(res.msg);
      navigate("/prod/" + res?.data?.id);
      onClose();
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  React.useEffect(() => {
    setCategoryId();
    setSubcategoryId();
    reset();
  }, [open]);

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
        <form onSubmit={handleSubmit(handleUpdate)}>
          <List
            disablePadding
            sx={{
              flex: 1,
            }}
          >
            <ListItem
              // disablePadding
              sx={{
                px: 2,
              }}
            >
              <ListItemText
                primary={"Create Product"}
                secondary={"Upload Product Information"}
              />
              <IconButton size={"small"} color={"black"} onClick={onClose}>
                <MdClose />
              </IconButton>
            </ListItem>
            <Divider />
            {/* <ListItem>
              <Box
                sx={
                  {
                    // mx: "auto",
                  }
                }
              >
                <DropZone
                  maxSize={10242880}
                  defaultValue={image}
                  onChange={(data) => {
                    setImage(data);
                    return true;
                  }}
                  onDelete={() => {
                    setImage();
                    return true;
                  }}
                />
              </Box>
            </ListItem> */}
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
              }}
            >
              Product Name
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Product Name"}
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
              Product Name [Bengali]
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Product Name"}
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
              Buy Price
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Buy Price"}
                {...register("buyPrice", {
                  required: true,
                })}
                fullWidth
              />
              <ShowError err={errors.buyPrice} />
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
              }}
            >
              Sell Price
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Sell Price"}
                {...register("sellPrice", {
                  required: true,
                })}
                fullWidth
              />
              <ShowError err={errors.sellPrice} />
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
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
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
              }}
            >
              Description
              <InputBase
                sx={{ ...tableOptionsStyle, height: "unset", py: 1 }}
                placeholder={"Enter Description"}
                {...register("descriptionEn", {
                  required: true,
                })}
                multiline
                minRows={5}
                // maxRows={6}
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
              Description [Bengali]
              <InputBase
                sx={{ ...tableOptionsStyle, height: "unset", py: 1 }}
                placeholder={"Enter Description"}
                {...register("descriptionBn")}
                multiline
                minRows={5}
                maxRows={6}
                fullWidth
              />
              <ShowError err={errors.descriptionBn} />
            </ListItem> */}
            {/* <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox
                {...register("is_featured")}
                defaultChecked={!!getValues("is_featured")}
              />{" "}
              Product is Featured
            </ListItem> */}
            {/* <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
              }}
            >
              <Typography>
                Keywords{" "}
                <Typography variant={"caption"}>
                  [Separate with Comma]
                </Typography>
              </Typography>
              <InputBase
                sx={tableOptionsStyle}
                placeholder={"Enter Keywords"}
                {...register("keyword", {
                  required: true,
                })}
                fullWidth
              />
              <ShowError err={errors.keyword} />
            </ListItem> */}
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                rowGap: 1,
                columnGap: 1,
              }}
            >
              <Button
                variant="contained"
                type={"submit"}
                disabled={isLoading}
                fullWidth
              >
                Upload
              </Button>
            </ListItem>
          </List>
        </form>
      </Drawer>
    </>
  );
};

export default CreateProductDrawer;
