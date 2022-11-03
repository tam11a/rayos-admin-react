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
} from "@mui/material";
import moment from "moment";
import DataTable from "../../components/DataTable";
import StateViewer from "../../components/StateViewer";
import { useGetUserOrderListByID } from "../../query/order";
import tableOptionsStyle from "../../style/tableOptions";
import { IoMdEye } from "react-icons/io";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import invoiceContext from "../../context/invoiceProvider";
import { Link, useParams } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";

const UserOrder = ({ uid }) => {
  const snack = React.useContext(snackContext);

  const { cid } = useParams();

  const [params, setParams] = React.useState({
    method: "confirm",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data, isLoading } = useGetUserOrderListByID(cid, params);

  console.log(data);

  // useMutations

  const cols = [
    {
      headerName: "",
      field: "id",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            size={"small"}
            color={"primary"}
            to={`/order/${params.row?._id}`}
          >
            <FaSlackHash />
          </IconButton>
        </>
      ),
      sortable: false,
    },
    // {
    //   headerName: "Name",
    //   field: "user.userName",
    //   width: 200,
    //   sortable: false,
    // },
    // {
    //   headerName: "Phone",
    //   field: "receiver_number",
    //   width: 120,
    //   sortable: false,
    // },
    {
      headerName: "Address",
      headerAlign: "center",
      field: "shipping",
      align: "center",
      width: 200,
      sortable: false,
    },
    // {
    //   headerName: "Date",
    //   field: "created_at",
    //   width: 170,
    //   headerAlign: "center",
    //   renderCell: (d) => {
    //     return <p>{moment(d.row.created_at).format("DD/MM/YYYY hh:mm a")}</p>;
    //   },
    //   sortable: false,
    // },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      width: 120,
      align: "center",
      renderCell: (d) => {
        var color;
        var text;
        switch (d.row.status) {
          case "new":
            color = "info";
            text = "Pending";
            break;
          case "in progress":
            color = "warning";
            text = "Confirm";
            break;
          case "cancel":
            color = "error";
            break;
          case "delivered":
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
      field: "paymentMethod",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Product Total",
      field: "totalSellPrice",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Shipping Fee",
      headerAlign: "center",
      field: "shippingFee",
      align: "center",
      sortable: false,
    },
    {
      headerName: "Voucher",
      headerAlign: "center",
      field: "voucher",
      align: "center",
      width: 120,
      renderCell: (params) => params.row?.voucher || "-",
      sortable: false,
    },
    {
      headerName: "Discount",
      headerAlign: "center",
      field: "discount",
      align: "center",
      sortable: false,
    },

    {
      headerName: "Total Price",
      headerAlign: "center",
      field: "total",
      align: "center",
      sortable: false,
    },
    {
      headerName: "Action",
      field: "action",
      width: 150,
      headerAlign: "center",
      renderCell: (d) => {
        return (
          <>
            <Select
              size={"small"}
              value={d.row.status}
              disabled={
                d.row.status === "Delivered" || d.row.status === "Canceled"
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
    // {
    //   headerName: "Invoice",
    //   field: "invoice_print",
    //   align: "center",
    //   headerAlign: "center",
    //   // renderCell: (d) => {
    //   //   return (
    //   //     <>
    //   //       <IconButton
    //   //         size={"small"}
    //   //         onClick={() => {
    //   //           console.log(d.row);
    //   //           window.open(
    //   //             "https://admin.pndservicebd.com/orderdetails.html?id=" +
    //   //               d.row.id
    //   //           );
    //   //         }}
    //   //       >
    //   //         <IoMdEye />
    //   //       </IconButton>
    //   //     </>
    //   //   );
    //   // },
    //   sortable: false,
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
              title: "Total Order",
            },
            {
              num: "-",
              title: "Total Confirm Order",
            },
            {
              num: "-",
              title: "Total Pending order",
            },
            {
              num: "-",
              title: "Total Cancel Order",
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
                // disabled={params.method === "delivered"}
                fullWidth
              >
                <MenuItem
                  value={"pending"}
                  disabled={params.method === "pending"} // new
                >
                  Pending
                </MenuItem>
                <MenuItem
                  value={"confirm"}
                  disabled={params.method === "confirm"} // in progress
                >
                  Confirmed
                </MenuItem>
                <MenuItem
                  value={"deliver"}
                  disabled={params.method === "deliver"} // delivered
                >
                  Delivered
                </MenuItem>
                <MenuItem
                  value={"cancel"}
                  disabled={params.method === "cancel"} // cancel
                >
                  Canceled
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Paper>

        <DataTable
          sx={{
            my: 2,
          }}
          columns={cols}
          rows={data?.data?.data || []}
          isLoading={isLoading}
          paginationMode={"server"}
          rowCount={data?.data?.total || 0}
          page={(params?.page || 1) - 1}
          onPageChange={(newPage) => {
            console.log(newPage + 1);
            setParams({
              ...params,
              page: newPage + 1,
            });
          }}
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
      ;
    </>
  );
};

export default UserOrder;
