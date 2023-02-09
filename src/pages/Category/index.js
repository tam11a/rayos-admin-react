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
  Button,
  Avatar,
} from "@mui/material";

import DataTable from "../../components/DataTable";
import { useGetAllCategory, useToggleCategory } from "../../query/category";
import { getAttachment, rootURL } from "../../service/instance";
import ButtonSwitch from "../../components/ButtonSwitch";
import tableOptionsStyle from "../../style/tableOptions";

import { MdAdd } from "react-icons/md";
import CreateDrawer from "./CreateDrawer";
import { FaSlackHash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import StateViewer from "../../components/StateViewer";
import { useGetCatStats } from "../../query/stats";
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
  const { data, isLoading } = useGetAllCategory(getQueryParams());
  const { data: catStats } = useGetCatStats();
  const [openCreate, setOpenCreate] = React.useState(false);

  const { mutateAsync: toggleState } = useToggleCategory();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleState(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  const cols = [
    {
      headerName: "",
      headerAlign: "center",
      field: "actions",
      align: "center",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            component={Link}
            size={"small"}
            color={"primary"}
            to={`/cat/${params.row?._id}`}
          >
            <FaSlackHash />
          </IconButton>
        </>
      ),
    },
    {
      headerName: "Icon",
      headerAlign: "center",
      field: "receiver_number",
      align: "center",
      width: 80,
      renderCell: (params) => (
        <Avatar src={getAttachment(params.row.icon)} variant="square" />
      ),
    },

    {
      headerName: "Category Name",
      //   headerAlign: "center",
      field: "titleEn",
      minWidth: 120,
      flex: 1,
    },
    {
      headerName: "Subcategory",
      headerAlign: "center",
      field: "totalSubcategories",
      Width: 120,
      // flex: 1,
      align: "center",
      // renderCell: () => (
      //   <>
      //     <IconButton>
      //       <IoMdEye />
      //     </IconButton>
      //   </>
      // ),
    },

    {
      headerName: "Status",
      headerAlign: "center",
      field: "isActive",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <ButtonSwitch
          checked={params.row.isActive}
          color={"success"}
          onClick={() => updateState(params?.row?._id)}
        />
      ),
    },
    // {
    //   headerName: "Action",
    //   headerAlign: "center",
    //   field: "actions",
    //   align: "center",
    //   width: 120,
    //   renderCell: () => (
    //     <>
    //       <IconButton size={"small"}>
    //         <FiEdit2 />
    //       </IconButton>
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
              num: catStats?.data?.data?.total,
              title: "Total Products",
            },
            {
              num: catStats?.data?.data?.active,
              title: "Published",
            },
            {
              num: catStats?.data?.data?.blocked,
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
            <Grid item xs={12} md={8.8}>
              <InputBase
                placeholder="Search Category"
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
                startIcon={<MdAdd />}
                onClick={() => setOpenCreate(!openCreate)}
                fullWidth
              >
                Add Category
              </Button>
            </Grid>
          </Grid>
        </Paper>{" "}
        <DataTable
          columns={cols}
          rows={data?.data?.data || []}
          isLoading={isLoading}
          width={"auto"}
          paginationMode={"server"}
          rowCount={data?.data?.total || 0}
          page={page}
          onPageChange={setPage}
          pageSize={limit}
          onPageSizeChange={setLimit}
        />
        <CreateDrawer
          open={openCreate}
          onClose={() => setOpenCreate(!openCreate)}
        />
      </Container>
    </>
  );
};

export default Index;
