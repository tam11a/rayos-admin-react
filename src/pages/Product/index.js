import React from "react";
import {
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Avatar,
} from "@mui/material";
import DataTable from "../../components/DataTable";
import { useGetAllProduct, useToggleProduct } from "../../query/product";
import { useGetAllCategory } from "../../query/category";
import ButtonSwitch from "../../components/ButtonSwitch";
import tableOptionsStyle from "../../style/tableOptions";
import { BiCategoryAlt, BiStore } from "react-icons/bi";
import { getAttachment } from "../../service/instance";

import StateViewer from "../../components/StateViewer";
import { FaSlackHash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { useGetProductStats } from "../../query/stats";
import { IoIosImages } from "react-icons/io";
import usePaginate from "../../hooks/usePaginate";

const Index = () => {
  const snack = React.useContext(snackContext);

  const {
    limit,
    setLimit,
    page,
    setPage,
    search,
    setSearch,
    watch,
    setFilterField,
    getQueryParams,
  } = usePaginate();

  const [selectedCategory, setSelectedCategory] = React.useState("null");
  const { data: prodStats } = useGetProductStats();
  const { data: catData } = useGetAllCategory({ limit: 10000, page: 1 });
  const { data, isLoading } = useGetAllProduct(getQueryParams());
  const { mutateAsync: toggleProduct } = useToggleProduct();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleProduct(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

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
      field: "icon",
      align: "center",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={getAttachment(params.row.image)}
          variant="rounded"
          sx={{
            bgcolor: "transparent",
            color: (theme) => `${theme.palette.primary.main} !important`,
            border: "1px solid #eee",
          }}
        >
          <IoIosImages />
        </Avatar>
      ),
    },
    {
      headerName: "Product Name",
      headerAlign: "center",
      field: "titleEn",
      align: "left",
      width: 200,
    },
    {
      headerName: "Store",
      headerAlign: "center",
      field: "store title",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <>
          <Chip
            label={params.row.store.titleEn}
            variant="outlined"
            to={`/store/${params.row.store._id}`}
            component={Link}
            onClick={() => {}}
            avatar={
              <Avatar
                src={getAttachment(params.row.store.image)}
                sx={{
                  bgcolor: "transparent",
                  color: (theme) => `${theme.palette.primary.main} !important`,
                }}
              >
                <BiStore
                  style={{
                    fontSize: "1.8em",
                  }}
                />
              </Avatar>
            }
          />
        </>
      ),
    },
    {
      headerName: "Category",
      headerAlign: "center",
      field: "category",
      width: 120,
      align: "center",
      renderCell: (params) => (
        <>
          <Chip
            avatar={
              <Avatar
                src={getAttachment(params.row.category.icon)}
                sx={{
                  bgcolor: "transparent",
                  color: (theme) => `${theme.palette.primary.main} !important`,
                }}
              >
                <BiCategoryAlt
                  style={{
                    fontSize: "1.8em",
                  }}
                />
              </Avatar>
            }
            label={params.row.category.titleEn}
            variant="outlined"
            to={`/cat/${params.row.category._id}`}
            component={Link}
            onClick={() => {}}
          />
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
        <ButtonSwitch
          checked={params.row?.isActive}
          color={"success"}
          onClick={() => {
            updateState(params.row?._id);
          }}
        />
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
        <StateViewer
          stateList={[
            {
              num: prodStats?.data?.data?.total,
              title: "Total Products",
            },
            {
              num: prodStats?.data?.data?.published,
              title: "Published",
            },
            {
              num: prodStats?.data?.data?.unpublished,
              title: "Unpublished",
            },
          ]}
        />
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
            <Grid item xs={12} md={8.2}>
              <InputBase
                placeholder="Search Product"
                sx={tableOptionsStyle}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3.6}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={watch("category") || "null"}
                onChange={(e) => {
                  setFilterField("category", e.target.value);
                }}
                fullWidth
              >
                <MenuItem value={"null"} selected disabled>
                  Select Category
                </MenuItem>
                {catData?.data?.data?.map((cat) => (
                  <MenuItem
                    key={cat._id}
                    value={cat._id}
                    disabled={cat._id === selectedCategory}
                  >
                    {cat.titleEn}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={5.9} md={3}>
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
            </Grid> */}
          </Grid>
        </Paper>

        <DataTable
          columns={cols}
          rows={data?.data?.data || []}
          isLoading={isLoading}
          paginationMode={"server"}
          rowCount={data?.data?.total || 0}
          page={page}
          onPageChange={setPage}
          pageSize={limit}
          onPageSizeChange={setLimit}
        />
      </Container>
    </>
  );
};

export default Index;
