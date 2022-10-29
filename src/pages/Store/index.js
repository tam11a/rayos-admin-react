import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import DataTable from "../../components/DataTable";
import React from "react";
import { MdAdd } from "react-icons/md";
import tableOptionsStyle from "../../style/tableOptions";
import { useGetAllStore } from "../../query/store";
import { FaSlackHash } from "react-icons/fa";
import { getAttachment } from "../../service/instance";
import ButtonSwitch from "../../components/ButtonSwitch";
import CreateStoreDrawer from "./CreateStoreDrawer";

const Index = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(!open);

  const [params, setParams] = React.useState({
    limit: 5,
    page: 1,
  });
  const { data, isLoading } = useGetAllStore(params);
  console.log(data);

  const [openCreate, setOpenCreate] = React.useState(false);

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
            // component={Link}
            size={"small"}
            color={"primary"}
            // to={`/prod/${params.row?._id}`}
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
      sortable: false,
      renderCell: (params) => (
        <Avatar src={getAttachment(params.row.image)} variant="square" />
      ),
    },
    {
      headerName: "Store Name",
      headerAlign: "center",
      field: "titleEn",
      align: "center",
      width: 200,
    },

    {
      headerName: "Owner",
      headerAlign: "center",
      field: "ownerModel",
      type: "date",
      align: "center",
      width: 120,
    },
    {
      headerName: "Total Products",
      headerAlign: "center",
      field: "totalProduct",
      type: "date",
      align: "center",
      width: 120,
    },
    {
      headerName: "Created At",
      headerAlign: "center",
      field: "createdAt",
      type: "date",
      align: "center",
      width: 250,
    },
    {
      headerName: "Status",
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
                placeholder="Search Store"
                sx={tableOptionsStyle}
                // onChange={(e) => {
                //   setParams({
                //     ...params,
                //     filters: [`titleEn~${e.target.value}`],
                //   });
                // }}
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
                startIcon={<MdAdd />}
                onClick={onClose}
                fullWidth
              >
                Add Store
              </Button>
              <CreateStoreDrawer open={open} onClose={onClose} />
            </Grid>
          </Grid>
        </Paper>

        <DataTable
          columns={cols}
          rows={data?.data?.data || []}
          getRowId={(row) => row._id}
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
