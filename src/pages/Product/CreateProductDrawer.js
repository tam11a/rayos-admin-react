import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { MdClose, MdDeleteForever, MdOutlineCheck } from "react-icons/md";
import DropZone from "../../components/DropZone";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import {
  useGetAllCategory,
  useGetSubCategoryFromCatID,
} from "../../query/category";
import {
  useCreateProduct,
  useDelProductImage,
  useUpdateProduct,
  useUploadProductImage,
} from "../../query/product";
import { rootURL } from "../../service/instance";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const CreateProductDrawer = ({ open, onClose, ...others }) => {
  const snack = React.useContext(snackContext);

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = React.useState();
  const [categoryId, setCategoryId] = React.useState();
  const [subcategoryId, setSubcategoryId] = React.useState();
  const [colorDetails, setColorDetails] = React.useState({});
  const [multiimgs, setMultiimgs] = React.useState([]);
  const [colors, setColors] = React.useState({});
  const [tempColor, setTempColor] = React.useState({
    name: "",
    value: 0,
  });

  //   React.useEffect(() => {
  //     let temp = {};
  //     Object.keys(JSON.parse(info.color_product_details)?.color || {}).map(
  //       (color, index) => {
  //         temp[index] = {
  //           name: color,
  //           value: colorDetails[color],
  //           remove: false,
  //         };
  //       }
  //     );
  //     setColors(temp);
  //   }, [colorDetails]);

  React.useEffect(() => {
    setValue("category_id", categoryId);
  }, [categoryId]);

  const {
    data: catData,
    // isLoading: isCatLoading
  } = useGetAllCategory();

  const {
    data: subCatData,
    // isLoading: isSubCatLoading,
    isError: isSubCatError,
  } = useGetSubCategoryFromCatID(categoryId);

  const { mutateAsync: mutateCreateProduct, isLoading } = useCreateProduct();

  // console.log(multiimgs);

  const handleUpdate = async (data) => {
    let colorList = {};
    let totalProduct = 0;
    if (Object.keys(colors).length)
      Object.keys(colors).map((color) => {
        if (colors[color].name) {
          colorList[colors[color].name] = colors[color].value;
          totalProduct += parseInt(colors[color].value);
        }
      });
    let formData = {
      title_en: data.title_en,
      description_en: data.description_en,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id,
      buy_price: data.buy_price,
      sell_price: data.sell_price,
      is_featured: data.is_featured ? 1 : 0,
      color_product_details: JSON.stringify({
        color: colorList,
      }),
      quantity: totalProduct,
      keyword: data.keyword,
    };
    if (image?.previous !== true) {
      formData = {
        ...formData,
        photo: image,
      };
    }
    if (data.title_ba) {
      formData = {
        ...formData,
        title_ba: data.title_ba,
      };
    }
    if (data.description_ba) {
      formData = {
        ...formData,
        description_ba: data.description_ba,
      };
    }

    multiimgs?.map((multiimg, index) => {
      formData = {
        ...formData,
        [`multi_img[${index}]`]: multiimg,
      };
    });

    const res = await responseHandler(() => mutateCreateProduct(formData));
    // console.log(res);
    if (res.status) {
      snack.createSnack(res.msg);
      onClose();
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  React.useEffect(() => {
    setImage();
    setCategoryId();
    setSubcategoryId();
    setColorDetails({});
    setColors({});
    setMultiimgs([]);
    setTempColor({
      name: "",
      value: 0,
    });
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
            <ListItem>
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
            </ListItem>
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
                {...register("title_en", {
                  required: true,
                })}
                fullWidth
              />
              <ShowError err={errors.title_en} />
            </ListItem>
            <ListItem
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
                {...register("title_ba")}
                fullWidth
              />
              <ShowError err={errors.title_ba} />
            </ListItem>
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
                {...register("buy_price", {
                  required: true,
                })}
                fullWidth
              />
              <ShowError err={errors.buy_price} />
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
                {...register("sell_price", {
                  required: true,
                })}
                fullWidth
              />
              <ShowError err={errors.sell_price} />
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
                  setValue("category_id", e.target.value);
                }}
                placeholder={"Select Category"}
                fullWidth
              >
                <MenuItem value={"null"} disabled>
                  Select Category
                </MenuItem>
                {catData?.data?.value?.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    value={cat.id}
                    // disabled={cat.id === selectedCategory}
                  >
                    {cat.title_en}
                  </MenuItem>
                ))}
              </Select>
              <ShowError err={errors.category_id} />
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
                    "subcategory_id",
                    e.target.value !== "null" ? e.target.value : null
                  );
                }}
                disabled={isSubCatError}
                fullWidth
              >
                <MenuItem value={"null"} disabled>
                  Select Sub Category
                </MenuItem>
                {subCatData?.data?.value?.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    value={cat.id}
                    // disabled={cat.id === selectedCategory}
                  >
                    {cat.title_en}
                  </MenuItem>
                ))}
              </Select>
              <ShowError err={errors.subcategory_id} />
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
                {...register("description_en", {
                  required: true,
                })}
                multiline
                minRows={5}
                maxRows={6}
                fullWidth
              />
              <ShowError err={errors.description_en} />
            </ListItem>
            <ListItem
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
                {...register("description_ba")}
                multiline
                minRows={5}
                maxRows={6}
                fullWidth
              />
              <ShowError err={errors.description_ba} />
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
              }}
            >
              Colors
              {colors ? (
                Object.keys(colors).map(
                  (color) =>
                    colors[color] && (
                      <Stack
                        key={color}
                        direction={"row"}
                        columnGap={1}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <InputBase
                          sx={tableOptionsStyle}
                          endAdornment={
                            <IconButton
                              size={"small"}
                              color={"error"}
                              onClick={() => {
                                let temp = colors;
                                delete temp[color];
                                setColors(temp);
                              }}
                            >
                              <MdDeleteForever />
                            </IconButton>
                          }
                          defaultValue={colors[color].name}
                          onChange={(e) => {
                            setColors({
                              ...colors,
                              [color]: {
                                name: e.target.value,
                                value: colors[color].value,
                              },
                            });
                          }}
                          fullWidth
                        />
                        <InputBase
                          sx={tableOptionsStyle}
                          defaultValue={colors[color].value}
                          onChange={(e) =>
                            setColors({
                              ...colors,
                              [color]: {
                                name: colors[color].name,
                                value: parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      </Stack>
                    )
                )
              ) : (
                <ShowError
                  err={{
                    message: "No Color Added!",
                  }}
                />
              )}
              <Stack
                direction={"row"}
                columnGap={1}
                sx={{
                  width: "100%",
                }}
              >
                <InputBase
                  sx={tableOptionsStyle}
                  placeholder={"Color Name"}
                  value={tempColor.name}
                  onChange={(e) => {
                    setTempColor({
                      name: e.target.value,
                      value: tempColor.value,
                    });
                  }}
                  endAdornment={
                    tempColor.name ? (
                      <IconButton
                        size={"small"}
                        color={"success"}
                        onClick={() => {
                          setColors({
                            ...colors,
                            [Date.now()]: {
                              name: tempColor.name,
                              value: tempColor.value,
                            },
                          });
                          setTempColor({
                            name: "",
                            value: 0,
                          });
                        }}
                      >
                        <MdOutlineCheck />
                      </IconButton>
                    ) : (
                      <></>
                    )
                  }
                  fullWidth
                />
                <InputBase
                  sx={tableOptionsStyle}
                  placeholder={"Quantity"}
                  value={tempColor.value}
                  onChange={(e) =>
                    setTempColor({
                      name: tempColor.name,
                      value: e.target.value,
                    })
                  }
                />
              </Stack>
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
              }}
            >
              Product Gallery
              <Stack
                direction={"row"}
                rowGap={1}
                columnGap={1}
                flexWrap={"wrap"}
              >
                <DropZone
                  maxSize={10242880}
                  onChange={async (data) => {
                    setMultiimgs([...multiimgs, data]);
                  }}
                />
                {multiimgs?.map((imgs, index) => (
                  <React.Fragment key={index}>
                    <DropZone
                      defaultValue={imgs}
                      onDelete={async (data) => {
                        setMultiimgs(multiimgs.filter((item) => item !== data));
                      }}
                    />
                  </React.Fragment>
                ))}
              </Stack>
            </ListItem>
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
