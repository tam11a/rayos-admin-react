import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { MdAdd } from "react-icons/md";
import {
  useGetSubCategoryFromCatID,
  useToggleSubcategory,
} from "../../query/category";
import DataTable from "../../components/DataTable";
import { useParams } from "react-router-dom";
import tableOptionsStyle from "../../style/tableOptions";
import ButtonSwitch from "../../components/ButtonSwitch";
import CreateSubcatDrawer from "./CreateSubcatDrawer";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";
import { FaSlackHash } from "react-icons/fa";
import SubcatDrawer from "./SubcatDrawer";

const Subcatagory = () => {
  const snack = React.useContext(snackContext);
  const { cid } = useParams();
  const [params, setParams] = React.useState({
    limit: 10,
    page: 1,
    filters: [],
  });

  const {
    data: subCatData,
    // isLoading: isSubCatLoading,
    isError: isSubCatError,
  } = useGetSubCategoryFromCatID(cid, params);
  const [open, setOpen] = React.useState(false); // Create Subcategory Drawer
  const onClose = () => setOpen(!open);

  const { mutateAsync: toggleState } = useToggleSubcategory();

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
      renderCell: (params) => <SubCatHash info={params?.row} />,
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
        <ButtonSwitch
          checked={params?.row?.isActive}
          color={"success"}
          onClick={() => updateState(params?.row?._id)}
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
                onClick={onClose}
                fullWidth
              >
                Add Subcategory
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <DataTable
          columns={cols}
          rows={subCatData?.data?.data || []}
          getRowId={(row) => row._id}
          // isLoading={isLoading}
          width={"auto"}
          paginationMode={"server"}
          rowCount={subCatData?.data?.total || 0}
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
        <CreateSubcatDrawer open={open} onClose={onClose} categoryId={cid} />
      </Container>
    </>
  );
};
const SubCatHash = ({ info }) => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(!open);
  return (
    <>
      <IconButton size={"small"} color={"primary"} onClick={onClose}>
        <FaSlackHash />
      </IconButton>
      <SubcatDrawer open={open} onClose={onClose} info={info} />
    </>
  );
};

export default Subcatagory;
