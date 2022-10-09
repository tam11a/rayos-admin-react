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
import { useGetAllCategory } from "../../query/category";
import { rootURL } from "../../service/instance";
import ButtonSwitch from "../../components/ButtonSwitch";
import tableOptionsStyle from "../../style/tableOptions";

import { IoMdEye } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

const Index = () => {
  const { data, isLoading } = useGetAllCategory();
  console.log(data);

  const cols = [
    {
      headerName: "#",
      headerAlign: "center",
      field: "show_info",
      width: 60,
      align: "center",
      renderCell: () => (
        <>
          <IconButton>
            <IoMdEye />
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
      renderCell: (params) => (
        <Avatar src={rootURL + params.row.photo} variant="square" />
      ),
    },

    {
      headerName: "Category Name",
      //   headerAlign: "center",
      field: "title_en",
      minWidth: 120,
      flex: 1,
    },
    {
      headerName: "Subcategory",
      headerAlign: "center",
      field: "sub-category",
      Width: 120,
      // flex: 1,
      align: "center",
      renderCell: () => (
        <>
          <IconButton>
            <IoMdEye />
          </IconButton>
        </>
      ),
    },

    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      align: "center",
      renderCell: (params) => (
        <ButtonSwitch
          checked={params.row.status === "active"}
          color={"success"}
        />
      ),
    },
    {
      headerName: "Action",
      headerAlign: "center",
      field: "actions",
      align: "center",
      width: 120,
      renderCell: () => (
        <>
          <IconButton size={"small"}>
            <FiEdit2 />
          </IconButton>
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
                onChange={(e) => {
                  //   setParams({
                  //     ...params,
                  //     filters: [`title_en~${e.target.value}`],
                  //   });
                }}
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
                fullWidth
              >
                Add Category
              </Button>
            </Grid>
          </Grid>
        </Paper>{" "}
        <DataTable
          columns={cols}
          rows={data?.data?.value || []}
          isLoading={isLoading}
          width={"auto"}
        />
      </Container>
    </>
  );
};

export default Index;
