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
} from "../../query/customer";
import ButtonSwitch from "../../components/ButtonSwitch";

import { IoMdEye } from "react-icons/io";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { Link } from "react-router-dom";

const Index = () => {
  const snack = React.useContext(snackContext);
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  // useMutations
  const { mutateAsync: mutateConfirmUser } = useConfirmUser();
  const { mutateAsync: mutateCancelUser } = useCancelUser();
  const { mutateAsync: mutateBlockUser } = useBlockUser();

  // get user data
  const { data, isLoading } = useGetAllCustomer(params);

  // console.log(data);

  const cols = [
    {
      headerName: "#",
      field: "show_info",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton component={Link} to={`/user/${params.row?.id}`}>
            <IoMdEye />
          </IconButton>
        </>
      ),
    },
    {
      headerName: "Name",
      headerAlign: "center",
      field: "userprofile.full_name",
      align: "center",
      width: 200,
      renderCell: (params) => params.row.userprofile?.full_name || "-",
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
      width: 120,
      align: "center",
    },
    {
      headerName: "Company or Page name",
      headerAlign: "center",
      field: "userprofile.company_name",
      align: "center",
      width: 200,
      renderCell: (params) => params.row.userprofile?.company_name || "-",
    },
    {
      headerName: "Address",
      headerAlign: "center",
      field: "userprofile.address",
      width: 230,
      align: "center",
      renderCell: (params) => params.row.userprofile?.address || "-",
    },
    // {
    //   headerName: "Total Order",
    //   headerAlign: "center",
    //   field: "quantity",
    //   align: "center",
    // },
    // {
    //   headerName: "Total Earn",
    //   headerAlign: "center",
    //   field: "discount",
    //   align: "center",
    // },
    // {
    //   headerName: "Total Pending",
    //   headerAlign: "center",
    //   field: "total_pending",
    //   align: "center",
    // },
    {
      headerName: "Action",
      headerAlign: "center",
      field: "actions",
      align: "center",
      width: 320,
      renderCell: (params) =>
        params.row.status === "pending" ? (
          <>
            <ButtonGroup variant="contained" size="small">
              <Button
                color="success"
                onClick={async () => {
                  const res = await responseHandler(
                    () => mutateConfirmUser(params.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                }}
              >
                Accept
              </Button>
              <Button
                color="black"
                onClick={async () => {
                  const res = await responseHandler(
                    () => mutateCancelUser(params.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                color="error"
                onClick={async () => {
                  const res = await responseHandler(
                    () => mutateBlockUser(params.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                }}
              >
                Block
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <ButtonSwitch
              checked={params.row.status === "active"}
              color={"success"}
              onClick={async () => {
                if (params.row.status === "active") {
                  const res = await responseHandler(
                    () => mutateBlockUser(params.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                } else {
                  const res = await responseHandler(
                    () => mutateConfirmUser(params.row.id),
                    [200]
                  );
                  if (res.status) {
                    snack.createSnack(res.msg);
                  } else {
                    snack.createSnack(res.msg, "error");
                  }
                }
              }}
            />
          </>
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
              num: data?.data?.value?.total_user,
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
                <MenuItem value={"filters[]=status=pending&"}>Pending</MenuItem>
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
          rows={data?.data?.value?.data?.data || []}
          isLoading={isLoading}
          paginationMode={"server"}
          rowCount={data?.data?.value?.data?.total || 0}
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
};;;;;;;;;;;;;;;;;;

export default Index;
