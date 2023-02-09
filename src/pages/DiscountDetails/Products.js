import React from "react";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
  Container,
  Chip,
} from "@mui/material";
import ButtonSwitch from "../../components/ButtonSwitch";
import DataTable from "../../components/DataTable";
import tableOptionsStyle from "../../style/tableOptions";
import { useParams } from "react-router-dom";
import snackContext from "../../context/snackProvider";
import usePaginate from "../../hooks/usePaginate";
import {
  useDeleteDiscountProduct,
  useGetAllDiscount,
  useGetAllDiscountByID,
  useGetAllProductsByDiscount,
  useToggleDiscount,
} from "../../query/discount";

import { Link } from "react-router-dom";
import moment from "moment";
import { getAttachment } from "../../service/instance";
import { responseHandler } from "../../utilities/response-handler";
import { FaSlackHash } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { MdAdd, MdOutlineDeleteForever } from "react-icons/md";
import { BiCategoryAlt, BiStore } from "react-icons/bi";
import AddNewProductDialog from "./AddNewProductDialog";

const Products = () => {
  const { did } = useParams();
  const snack = React.useContext(snackContext);

  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen((o) => !o);
  const { limit, setLimit, page, setPage, search, setSearch, getQueryParams } =
    usePaginate();

  const { data, isLoading } = useGetAllProductsByDiscount(
    did,
    getQueryParams()
  );
  const { mutateAsync: toggleDiscount } = useToggleDiscount();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleDiscount(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  const [selectionModel, setSelectionModel] = React.useState([]);

  const { mutateAsync: deleteProduct } = useDeleteDiscountProduct();

  const removeProductToDiscount = async () => {
    const res = await responseHandler(() =>
      deleteProduct({ id: did, products: selectionModel?.join?.(",") })
    );
    if (res.status) {
      snack.createSnack(res.msg);
      setSelectionModel([]);
    } else snack.createSnack(res.msg, "error");
  };

  const cols = [
    {
      headerName: "",
      field: "_id",
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
      headerName: "Discount",
      headerAlign: "center",
      field: "discount amount",
      align: "center",
      width: 100,
      renderCell: (params) => <>{params.row.discount.amount}%</>,
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
            updateState(params.row?.id);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Container>
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
            <Grid item xs={12} md={8.8}>
              <InputBase
                placeholder="Search Product"
                sx={tableOptionsStyle}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
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
                New Product
              </Button>
            </Grid>
            {!!selectionModel?.length && (
              <Button
                variant={"contained"}
                color={"error"}
                size={"large"}
                sx={{
                  height: "52px",
                }}
                onClick={removeProductToDiscount}
                startIcon={<MdOutlineDeleteForever />}
                fullWidth
              >
                Remove Selected Products
              </Button>
            )}
          </Grid>
        </Paper>
        <DataTable
          checkboxSelection
          columns={cols}
          rows={data?.data?.data || []}
          isLoading={isLoading}
          getRowId={(d) => d._id}
          paginationMode={"server"}
          rowCount={data?.data?.total || 0}
          page={page}
          onPageChange={setPage}
          pageSize={limit}
          onPageSizeChange={setLimit}
          keepNonExistentRowsSelected
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
        {/* <Typography>Selected Cell ID: {data[selectedCell.row]?.id}</Typography> */}
      </Container>
      {open && <AddNewProductDialog discount={did} onClose={onClose} />}
    </>
  );
};

export default Products;
