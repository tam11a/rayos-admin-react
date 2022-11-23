import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import DataTable from "../../components/DataTable";
import React from "react";
import { MdAdd } from "react-icons/md";
import tableOptionsStyle from "../../style/tableOptions";
import { useGetAllStore, useToggleStore } from "../../query/store";
import { FaSlackHash } from "react-icons/fa";
import { getAttachment } from "../../service/instance";
import ButtonSwitch from "../../components/ButtonSwitch";
import CreateStoreDrawer from "./CreateStoreDrawer";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { responseHandler } from "../../utilities/response-handler";
import StateViewer from "../../components/StateViewer";
import snackContext from "../../context/snackProvider";
import { useGetStoreStats } from "../../query/stats";
import usePaginate from "../../hooks/usePaginate";

const Index = () => {
  const [open, setOpen] = React.useState(false);
  const snack = React.useContext(snackContext);
  const onClose = () => setOpen(!open);

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

  const { data, isLoading } = useGetAllStore(getQueryParams());
  const { data: storeStats } = useGetStoreStats();
  console.log(storeStats);
  const { mutateAsync: toggleStore } = useToggleStore();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleStore(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
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
            to={`/store/${params.row?._id}`}
          >
            <FaSlackHash />
          </IconButton>
        </>
      ),
    },
    // {
    //   headerName: "Image",
    //   headerAlign: "center",
    //   field: "receiver_number",
    //   align: "center",
    //   width: 80,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Avatar src={getAttachment(params.row.image)} variant="square" />
    //   ),
    // },
    {
      headerName: "Store Name",
      headerAlign: "left",
      field: "titleEn",
      align: "center",
      minWidth: 200,
      flex: 1,
      align: "left",
    },

    {
      headerName: "Owner",
      headerAlign: "center",
      field: "owner",
      type: "date",
      align: "center",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Chip
          avatar={
            <Avatar
              alt={params.row.owner.userName}
              src={getAttachment(params.row.owner.image)}
            />
          }
          label={params.row.owner.userName}
          variant="outlined"
        />
      ),
    },

    {
      headerName: "Total Products",
      headerAlign: "center",
      field: "totalProducts",
      type: "date",
      align: "center",
      width: 160,
    },
    {
      headerName: "Created At",
      headerAlign: "center",
      field: "createdAt",
      type: "date",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <Typography>{moment(params.row.createdAt).format("ll")}</Typography>
      ),
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      align: "center",
      width: 120,
      renderCell: (params) => (
        <ButtonSwitch
          checked={params.row.isActive}
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
        {/* <StateViewer
          stateList={[
            {
              num: storeStats?.data?.data?.total,
              title: "Total Store",
            },
            {
              num: storeStats?.data?.data?.published,
              title: "Published",
            },
            {
              num: storeStats?.data?.data?.unpublished,
              title: "Unpublished",
            },
          ]}
        /> */}
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
