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
import {
  useCancelOrder,
  useCompleteOrder,
  useConfirmOrder,
  useGetOrderListByUser,
} from "../../query/order";
import tableOptionsStyle from "../../style/tableOptions";
import { IoMdEye } from "react-icons/io";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import invoiceContext from "../../context/invoiceProvider";

/**
 * get-all-pending-user
 * get-all-confirm-user
 * get-all-deliver-user
 * get-all-cancel-user
 *
 */
const UserOrder = ({ uid }) => {
  const invoice = React.useContext(invoiceContext);
  const snack = React.useContext(snackContext);
  const [params, setParams] = React.useState({
    method: "confirm",
    limit: 10,
    page: 1,
    filters: [],
  });
  const { data, isLoading } = useGetOrderListByUser(uid, params);

  // useMutations
  const { mutateAsync: mutateConfirmOrder } = useConfirmOrder();
  const { mutateAsync: mutateCompleteOrder } = useCompleteOrder();
  const { mutateAsync: mutateCancelOrder } = useCancelOrder();

  const cols = [
    {
      headerName: "Invoice",
      field: "show_info",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (d) => (
        <>
          <IconButton
            size={"small"}
            onClick={() => {
              invoice.showInvoice(d.row.id);
            }}
          >
            <IoMdEye />
          </IconButton>
        </>
      ),
      sortable: false,
    },
    {
      headerName: "Name",
      field: "receiver_name",
      width: 200,
      sortable: false,
    },
    {
      headerName: "Phone",
      field: "receiver_number",
      width: 120,
      sortable: false,
    },
    {
      headerName: "Address",
      field: "receiver_address",
      width: 250,
      sortable: false,
    },
    {
      headerName: "Date",
      field: "created_at",
      width: 170,
      headerAlign: "center",
      renderCell: (d) => {
        return <p>{moment(d.row.created_at).format("DD/MM/YYYY hh:mm a")}</p>;
      },
      sortable: false,
    },
    {
      headerName: "Status",
      field: "status",
      width: 120,
      headerAlign: "center",
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
      field: "payment_method",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "BI Price",
      field: "sub_total",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "PND Fee",
      field: "pnd_total_fee",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Delivery Fee",
      field: "shipping_total_cost",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Reseller Price",
      field: "reseller_total_income",
      align: "center",
      width: 120,
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Reseller Profit",
      field: "reseller_profit",
      align: "center",
      width: 120,
      headerAlign: "center",
      sortable: false,
    },
    {
      headerName: "Total Price",
      field: "total_amount",
      align: "center",
      headerAlign: "center",
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
                d.row.status === "delivered" || d.row.status === "cancel"
              }
              onChange={async (e) => {
                if (e.target.value === "in progress") {
                  const res = await responseHandler(
                    () => mutateConfirmOrder(d.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                } else if (e.target.value === "delivered") {
                  const res = await responseHandler(
                    () => mutateCompleteOrder(d.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                } else if (e.target.value === "cancel") {
                  const res = await responseHandler(
                    () => mutateCancelOrder(d.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                }
              }}
              fullWidth
            >
              <MenuItem value={"new"} disabled>
                Pending
              </MenuItem>
              <MenuItem
                value={"in progress"}
                disabled={d.row.status === "in progress"}
              >
                Confirm
              </MenuItem>
              <MenuItem
                value={"delivered"}
                disabled={d.row.status === "delivered"}
              >
                Delivered
              </MenuItem>
              <MenuItem value={"cancel"} disabled={d.row.status === "cancel"}>
                Cancel
              </MenuItem>
            </Select>
          </>
        );
      },
      sortable: false,
    },
    {
      headerName: "Invoice",
      field: "invoice_print",
      align: "center",
      headerAlign: "center",
      renderCell: (d) => {
        return (
          <>
            <IconButton
              size={"small"}
              onClick={() => {
                console.log(d.row);
                window.open(
                  "https://admin.pndservicebd.com/orderdetails.html?id=" +
                    d.row.id
                );
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
              num: "-",
              title: "Total Delivered Order",
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
          rows={data?.data?.value?.data || []}
          isLoading={isLoading}
          paginationMode={"server"}
          rowCount={data?.data?.value?.total || 0}
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