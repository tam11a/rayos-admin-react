import React from "react";

import {
  IconButton,
  Avatar,
  Chip,
  Container,
  Paper,
  Grid,
  InputBase,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
} from "@mui/material";

import StateViewer from "../../components/StateViewer";
import DataTable from "../../components/DataTable";
import {
  useBlockUser,
  useCancelUser,
  useConfirmUser,
  useGetAllCustomer,
  useToggleCustomer,
} from "../../query/customer";
import ButtonSwitch from "../../components/ButtonSwitch";

import { IoMdEye } from "react-icons/io";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { Link } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";
import { getAttachment } from "../../service/instance";

const Index = () => {
  const snack = React.useContext(snackContext);
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { mutateAsync: toggleCustomer } = useToggleCustomer();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleCustomer(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  // get user data
  const { data, isLoading } = useGetAllCustomer(params);

  const cols = [
    {
      headerName: "#",
      headerAlign: "center",
      field: "receiver_number",
      align: "left",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Chip
          avatar={
            <Avatar
              alt={params.row?.userName}
              src={getAttachment(params.row?.image)}
            />
          }
          label={params.row?.userName}
          variant="outlined"
          to={`/customer/${params.row?._id}`}
          component={Link}
          onClick={() => {}}
        />
      ),
    },
    {
      headerName: "Username",
      headerAlign: "center",
      field: "userName",
      align: "center",
      width: 150,
    },
    {
      headerName: "Full Name",
      headerAlign: "center",
      field: "fullName",
      align: "center",
      width: 150,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 160,
    },
    {
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      width: 250,
      align: "center",
    },
    {
      headerName: "Total Orders",
      headerAlign: "center",
      field: "totalOrders",
      align: "center",
      width: 120,
      renderCell: (params) => params.row?.totalOrders || "-",
    },
    {
      headerName: "Status",
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
              num: data?.data?.total,
              title: "Active User",
            },
            {
              num: data?.data?.value?.total_pending_user,
              title: "Pending User",
            },
            {
              num: data?.data?.value?.total_cancel_user,
              title: "Canceled",
            },
            {
              num: data?.data?.value?.total_block_user,
              title: "Blocked User",
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
                placeholder="Search Customer by Phone Number"
                sx={tableOptionsStyle}
                onChange={(e) => {
                  if (e.target.value)
                    setParams({
                      ...params,
                      filters: [`phone~${e.target.value}`],
                    });
                  else
                    setParams({
                      ...params,
                      filters: [],
                    });
                }}
                fullWidth
              />
            </Grid>
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
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"filters[]=status=active&"}>Active</MenuItem>
                <MenuItem value={"filters[]=status=block&"}>Blocked</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Paper>
        <DataTable
          sx={{
            p: 2,
            my: 2,
          }}
          columns={cols}
          rows={data?.data?.data || []}
          isLoading={isLoading}
          paginationMode={"server"}
          rowCount={data?.data?.total || 0}
          getRowId={(row) => row._id}
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
        />{" "}
      </Container>
    </>
  );
};

export default Index;
