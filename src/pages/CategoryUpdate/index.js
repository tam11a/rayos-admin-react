import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import CFab from "../../components/CFab";
import { fontWeight } from "@mui/system";
import BackButton from "../../components/BackButton";
import CPaper from "../../components/CPaper";
import CatInput from "./CatInput";
import DropZone from "../../components/DropZone";
import DataTable from "../../components/DataTable";
import snackContext from "../../context/snackProvider";
import { useForm } from "react-hook-form";
import { useGetSubCategoryFromCatID } from "../../query/category";
import { FaSlackHash } from "react-icons/fa";
import { getAttachment } from "../../service/instance";
import ButtonSwitch from "../../components/ButtonSwitch";
import tableOptionsStyle from "../../style/tableOptions";
import { MdAdd } from "react-icons/md";
import InputBox from "../../components/InputBox";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { cid } = useParams();

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [subcategoryId, setSubcategoryId] = React.useState();

  const [params] = React.useState({
    limit: 100,
    page: 1,
    filters: [],
  });

  const {
    data: subCatData,
    // isLoading: isSubCatLoading,
    isError: isSubCatError,
  } = useGetSubCategoryFromCatID(cid, params);
  console.log(subCatData);

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
      headerName: "Name",
      //   headerAlign: "center",
      field: "titleEn",
      minWidth: 120,
      flex: 1,
    },
    {
      headerName: "Products",
      headerAlign: "center",
      field: "totalProducts",
      align: "center",
      sortable: true,
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "isActive",
      align: "center",
      sortable: false,
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
        <BackButton
          to={"/category"}
          primary={"Back to Category"}
          secondary={"Update Category"}
        />
        <Grid
          container
          rowGap={1}
          columnGap={1}
          sx={{
            mt: 2,
          }}
        >
          <Grid item xs={12} sm={5.9} md={7.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Information
            </Typography>
            <CPaper>
              <Typography>Name (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Category Name (English)"
                {...register("titleEn", {
                  required: true,
                })}
              />
              <Typography>Name (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Category Name (Bengali)"
                {...register("titleBn", {
                  required: true,
                })}
              />
              <Typography>Description (English)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Description (English)"
                {...register("descriptionEn", {
                  required: true,
                })}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              <Typography>Description (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Description (Bengali)"
                {...register("descriptionBn", {
                  required: true,
                })}
                multiline={true}
                minRows={5}
                maxRows={6}
              />
              <Button
                variant={"contained"}
                color={"primary"}
                size={"large"}
                sx={{
                  height: "52px",
                  mt: 1,
                }}
                // onClick={() => setOpenCreate(!openCreate)}
                fullWidth
              >
                Update Category
              </Button>
            </CPaper>
          </Grid>
          <Grid item xs={12} sm={5.9} md={3.9}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Image
            </Typography>
            <CPaper>
              <DropZone />
            </CPaper>
          </Grid>
        </Grid>
        <Typography variant={"h6"} sx={{ fontWeight: "500", mt: 2 }}>
          Subcategory
        </Typography>
        <Typography sx={{ fontWeight: "500" }} variant={"subtitle2"}>
          {subCatData?.data?.total || 0} Subcategories Found
        </Typography>
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
                placeholder="Search Subcategory"
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
                // onClick={() => setOpenCreate(!openCreate)}
                fullWidth
              >
                Add Subcategory
              </Button>
            </Grid>
          </Grid>
        </Paper>{" "}
        <DataTable
          columns={cols}
          rows={subCatData?.data?.data || []}
          getRowId={(row) => row._id}
          // isLoading={isLoading}
          width={"auto"}
          paginationMode={"server"}
          rowCount={subCatData?.data?.total || 0}
          page={(params?.page || 1) - 1}
          // onPageChange={(newPage) =>
          //   setParams({
          //     ...params,
          //     page: newPage + 1,
          //   })
          // }
          pageSize={params?.limit}
          // onPageSizeChange={(pageSize) =>
          //   setParams({
          //     ...params,
          //     limit: pageSize,
          //   })
          // }
        />
      </Container>
    </>
  );
};

export default Index;
