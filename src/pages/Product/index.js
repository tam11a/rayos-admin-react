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
import { useGetAllProduct } from "../../query/product";
import { useGetAllCategory } from "../../query/category";
import ButtonSwitch from "../../components/ButtonSwitch";
import tableOptionsStyle from "../../style/tableOptions";

import { IoMdEye } from "react-icons/io";
import { getAttachment, rootURL } from "../../service/instance";

import StateViewer from "../../components/StateViewer";
import { FaSlackHash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("null");

  const [params, setParams] = React.useState({
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data: catData, isLoading: isCatLoading } = useGetAllCategory(params);
  // console.log(catData);
  const { data, isLoading } = useGetAllProduct(params);
  // console.log(params);

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
      // renderCell: (params) => (
      //   <>
      //     <UpdateProductDrawer info={params.row} drawerIcon={<IoMdEye />} />
      //   </>
      // ),
    },

    {
      headerName: "Image",
      headerAlign: "center",
      field: "icon",
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
      field: "category",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <>
          {params.row.category.titleEn}
          {/* {data?.data?.data?.map((cat) => {
            return cat.titleEn;
          })[0] || "-"} */}
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
    // {
    //   headerName: "Discount",
    //   headerAlign: "center",
    //   field: "discount",
    //   align: "center",
    // },
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
    // {
    //   headerName: "Action",
    //   headerAlign: "center",
    //   field: "actions",
    //   align: "center",
    //   width: 120,
    //   renderCell: (params) => (
    //     <>
    //       <UpdateProductDrawer info={params.row} />
    //     </>
    //   ),
    // },
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
              num: data?.data?.total,
              title: "Total Products",
            },
            {
              num: data?.data?.value?.total_publish_product,
              title: "Published",
            },
            {
              num: data?.data?.value?.total_unpublish_product,
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
            <Grid item xs={12} md={5.9}>
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
            <Grid item xs={12} md={5.9}>
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
