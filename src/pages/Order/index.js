import {
  Avatar,
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
import moment from "moment";
import React from "react";
import { IoMdEye } from "react-icons/io";
import StateViewer from "../../components/StateViewer";
import DataTable from "../../components/DataTable";
import {
  useCancelOrder,
  useCompleteOrder,
  useConfirmOrder,
  useGetAllOrder,
} from "../../query/order";
import tableOptionsStyle from "../../style/tableOptions";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import invoiceContext from "../../context/invoiceProvider";
import { getAttachment } from "../../service/instance";
import { Link } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";
/**
 * get-all-pending
 * get-all-confirm
 * get-all-deliver
 * get-all-cancel
 * get-all-order
 */
const Index = () => {
  const invoice = React.useContext(invoiceContext);
  const snack = React.useContext(snackContext);
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data, isLoading } = useGetAllOrder(params);
  console.log(data);

  // useMutations
  // const { mutateAsync: mutateConfirmOrder } = useConfirmOrder();
  // const { mutateAsync: mutateCompleteOrder } = useCompleteOrder();
  // const { mutateAsync: mutateCancelOrder } = useCancelOrder();

  const cols = [
    {
      // headerName: "#",
      // field: "show_info",
      // width: 60,
      headerName: "Order Details",
      field: "show_info",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (d) => (
        <>
          <IconButton
            component={Link}
            size={"small"}
            color={"primary"}
            to={`/order-details/${d.row?._id}`}
          >
            <FaSlackHash />
          </IconButton>
        </>
      ),
      sortable: false,
    },
    {
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      field: "receiver_name",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Chip
          avatar={
            <Avatar
              alt={params.row?.user?.userName}
              src={getAttachment(params.row?.user?.image)}
            />
          }
          label={params.row.user.userName}
          variant="outlined"
          to={`/customer/${params.row?.user?._id}`}
          component={Link}
          onClick={() => {}}
        />
      ),
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      align: "center",
      field: "phone",
      width: 120,
      sortable: false,
    },
    {
      headerName: "Address",
      headerAlign: "center",
      align: "center",
      field: "address",
      width: 200,
      sortable: false,
    },
    {
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      field: "createdAt",
      width: 170,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography>{moment(params.row.createdAt).format("ll")}</Typography>
        );
      },
      sortable: false,
    },
    {
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      field: "status",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (d) => {
        var color;
        var text;
        switch (d.row.status) {
          case "Pending":
            color = "info";
            break;
          case "Confirmed":
            color = "warning";
            break;
          case "Canceled":
          case "Returned":
            color = "error";
            break;
          case "Delivered":
            color = "success";
            break;
          default:
            color = "default";
            break;
        }
        return (
          <Chip
            label={text || d.row.status}
            color={color}
            size={"small"}
            variant={"outlined"}
            sx={{
              textTransform: "uppercase",
            }}
          />
        );
      },
      sortable: false,
    },
    {
      headerName: "Method",
      headerAlign: "center",
      align: "center",
      field: "paymentMethod",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Delivery Fee",
      headerAlign: "center",
      align: "center",
      field: "shippingFee",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Voucher",
      headerAlign: "center",
      align: "center",
      field: "voucher",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => params.row?.voucher || "-",
    },
    {
      headerName: "Total Price",
      headerAlign: "center",
      align: "center",
      field: "total",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      field: "action",
      width: 200,
      headerAlign: "center",
      renderCell: (d) => {
        return (
          <>
            <Select
              size={"small"}
              value={d.row.status}
              disabled={
                d.row.status === "Returned" || d.row.status === "Canceled"
              }
              fullWidth
            >
              <MenuItem value={"Pending"} disabled>
                Pending
              </MenuItem>
              <MenuItem
                value={"Confirmed"}
                disabled={d.row.status === "Confirmed"}
              >
                Confirmed
              </MenuItem>
              <MenuItem value={"Shipped"} disabled={d.row.status === "Shipped"}>
                Shipped
              </MenuItem>
              <MenuItem
                value={"Delivered"}
                disabled={d.row.status === "Delivered"}
              >
                Delivered
              </MenuItem>
              <MenuItem
                value={"Canceled"}
                disabled={d.row.status === "Canceled"}
              >
                Canceled
              </MenuItem>
              <MenuItem
                value={"Returned"}
                disabled={d.row.status === "Returned"}
              >
                Returned
              </MenuItem>
            </Select>
          </>
        );
      },
      sortable: false,
    },
    {
      headerName: "Invoice",
      headerAlign: "center",
      align: "center",
      field: "invoice_print",
      align: "center",
      headerAlign: "center",
      renderCell: (d) => {
        return (
          <>
            <IconButton
              size={"small"}
              onClick={() => {
                // console.log(d.row);
                // window.open(
                //   "https://admin.pndservicebd.com/orderdetails.html?id=" +
                //     d.row.id
                // );
              }}
            >
              <IoMdEye />
            </IconButton>
          </>
        );
      },
      sortable: false,
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
              num: data?.data?.value?.total_delivered_order,
              title: "Total Delivered",
            },
            {
              num: data?.data?.value?.total_confirm_order,
              title: "Confirmed",
            },
            {
              num: data?.data?.value?.total_pending_order,
              title: "pending",
            },
            {
              num: data?.data?.value?.total_cancel_order,
              title: "Canceled",
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
            <Grid item xs={12} sm={8.7}>
              <InputBase
                placeholder="Search Order"
                sx={tableOptionsStyle}
                onChange={(e) => {
                  setParams({
                    ...params,
                    filters: [
                      // `receiver_name~${e.target.value}`,
                      `receiver_number~${e.target.value}`,
                      // `receiver_address~${e.target.value}`,
                    ],
                  });
                }}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} sm={5.9} md={3}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={"x"}
                disabled
                fullWidth
              >
                <MenuItem value={"x"}>Filter</MenuItem>
              </Select>
            </Grid> */}
            <Grid item xs={12} sm={3}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={params.method}
                onChange={(e) =>
                  setParams({
                    ...params,
                    method: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value={"all"} disabled={params.method === "all"}>
                  All
                </MenuItem>
                <MenuItem
                  value={"Pending"}
                  disabled={params.method === "Pending"}
                >
                  Pending
                </MenuItem>
                <MenuItem
                  value={"Confirmed"}
                  disabled={params.method === "Confirmed"}
                >
                  Confirmed
                </MenuItem>
                <MenuItem
                  value={"Shipped"}
                  disabled={params.method === "Shipped"}
                >
                  Shipped
                </MenuItem>
                <MenuItem
                  value={"Delivered"}
                  disabled={params.method === "Delivered"}
                >
                  Delivered
                </MenuItem>
                <MenuItem
                  value={"Canceled"}
                  disabled={params.method === "Canceled"}
                >
                  Canceled
                </MenuItem>
                <MenuItem
                  value={"Returned"}
                  disabled={params.method === "Returned"}
                >
                  Returned
                </MenuItem>
              </Select>
            </Grid>
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
              page: 1,
            })
          }
        />
      </Container>
    </>
  );
};

export default Index;







