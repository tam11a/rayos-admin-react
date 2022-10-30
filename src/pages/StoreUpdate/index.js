import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSlackHash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonSwitch from "../../components/ButtonSwitch";
import CPaper from "../../components/CPaper";
import InputBox from "../../components/InputBox";
import snackContext from "../../context/snackProvider";
import { useGetProductsByStoreID } from "../../query/store";
import DataTable from "../../components/DataTable";
import { getAttachment } from "../../service/instance";
import { IoMdEye } from "react-icons/io";
import { useGetAllCategory } from "../../query/category";
import DropZone from "../../components/DropZone";
import tableOptionsStyle from "../../style/tableOptions";
import { MdAdd } from "react-icons/md";
import CreateProductDrawer from "../Product/CreateProductDrawer";
import { useGetAllProduct } from "../../query/product";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { sid } = useParams();

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = React.useState("null");
  const [open, setOpen] = React.useState(false);
  const [params, setParams] = React.useState({
    limit: 100,
    page: 1,
    filters: [],
  });

  const {
    data: prodData,
    isLoading: isProdDataLoading,
    // isError: isSubCatError,
  } = useGetProductsByStoreID(sid, params);
  const { data: catData, isLoading: isCatLoading } = useGetAllCategory(params);
  const { data, isLoading } = useGetAllProduct(params);

  const onClose = () => setOpen(!open);

  const cols = [
    {
      headerName: "",
      field: "id",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            size={"small"}
            color={"primary"}
            to={`/prod/${params.row?._id}`}
          >
            <FaSlackHash />
          </IconButton>
        </>
      ),
    },
    {
      headerName: "Image",
      headerAlign: "center",
      field: "receiver_number",
      align: "center",
      width: 80,
      renderCell: (params) => (
        <Avatar src={getAttachment(params.row.image)} variant="square" />
      ),
    },
    {
      headerName: "Product Name",
      headerAlign: "center",
      field: "titleEn",
      align: "center",
      width: 200,
    },
    {
      headerName: "Variants",
      headerAlign: "center",
      field: "colors",
      width: 80,
      align: "center",
      renderCell: () => (
        <>
          <IconButton size={"small"}>
            <IoMdEye />
          </IconButton>
        </>
      ),
    },
    {
      headerName: "Category",
      headerAlign: "center",
      field: "category_id",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <>
          {catData?.data?.data?.map((cat) => {
            return cat.titleEn;
          })[0] || "-"}
        </>
      ),
    },
    {
      headerName: "Buy Price",
      headerAlign: "center",
      field: "buyPrice",
      align: "center",
      width: 100,
    },
    {
      headerName: "Sell Price",
      headerAlign: "center",
      field: "sellPrice",
      width: 100,
      align: "center",
    },
    {
      headerName: "Stock",
      headerAlign: "center",
      field: "quantity",
      align: "center",
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "status_stock",
      align: "center",
      width: 120,
      renderCell: (d) => (
        <Chip
          label={d.row.quantity > 0 ? "In Sell" : "Stock Out"}
          color={d.row.quantity > 0 ? "success" : "error"}
          size={"small"}
          sx={{
            textTransform: "uppercase",
          }}
        />
      ),
    },
    {
      headerName: "Published",
      headerAlign: "center",
      field: "status",
      align: "center",
      width: 120,
      renderCell: (params) => (
        <ButtonSwitch checked={params.row.isActive} color={"success"} />
      ),
    },
  ];

  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <BackButton
          to={"/store"}
          primary={"Back to Store List"}
          secondary={"Update Store"}
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
                placeholder="Enter Store Name (English)"
                {...register("titleEn", {
                  required: true,
                })}
              />
              <Typography>Name (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Store Name (Bengali)"
                {...register("titleBn", {
                  required: false,
                })}
              />
              <Typography>Description (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Description (English)"
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
                placeholder="Enter Description (Bengali)"
                {...register("descriptionBn", {
                  required: false,
                })}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              <Typography>Address </Typography>
              <InputBox
                fullWidth
                placeholder="Enter Store Address"
                {...register("titleBn", {
                  required: false,
                })}
              />
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
                Update Store Info
              </Button>
            </CPaper>
          </Grid>
          <Grid item xs={12} sm={5.9} md={3.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Image
            </Typography>
            <CPaper>
              <DropZone />
            </CPaper>
          </Grid>
        </Grid>
        <Typography variant={"h6"} sx={{ fontWeight: "500", mt: 2 }}>
          Products Of The Store
        </Typography>
        <Typography sx={{ fontWeight: "500", mb: 2 }} variant={"subtitle2"}>
          {prodData?.data?.total || 0} Products Found
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid #ccc",
            my: 2,
          }}
        >
          <Grid
            container
            rowGap={1}
            columnGap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} md={5.7}>
              <InputBase
                placeholder="Search Product"
                sx={tableOptionsStyle}
                onChange={(e) => {
                  setParams({
                    ...params,
                    filters: [`title_en~${e.target.value}`],
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5.9} md={3}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setParams({
                    ...params,
                    filters: [`category_id=${e.target.value}`],
                  });
                }}
                fullWidth
              >
                <MenuItem value={"null"} disabled>
                  Select Category
                </MenuItem>
                {catData?.data?.value?.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    value={cat.id}
                    disabled={cat.id === selectedCategory}
                  >
                    {cat.title_en}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={5.9} md={3}>
              <Button
                variant={"contained"}
                color={"primary"}
                size={"large"}
                sx={{
                  height: "52px",
                }}
                onClick={onClose}
                startIcon={<MdAdd />}
                fullWidth
              >
                Add Product
              </Button>
              <CreateProductDrawer open={open} onClose={onClose} />
            </Grid>
          </Grid>
        </Paper>

        <DataTable
          columns={cols}
          rows={prodData?.data?.data || []}
          //   isLoading={isLoading}
          paginationMode={"server"}
          rowCount={prodData?.data?.total || 0}
          page={(params?.page || 1) - 1}
          onPageChange={(newPage) =>
            setParams({
              ...params,
              page: newPage + 1,
            })
          }
          pageSize={params?.limit}
          onPageSizeChange={(pageSize) =>
            setParams({
              ...params,
              limit: pageSize,
            })
          }
        />
      </Container>
    </>
  );
};

export default Index;
