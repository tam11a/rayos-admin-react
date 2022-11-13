import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import BackButton from "../../components/BackButton";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import DataTable from "../../components/DataTable";
import snackContext from "../../context/snackProvider";
import { useForm } from "react-hook-form";
import {
  useGetCategory,
  useGetSubCategoryFromCatID,
  useToggleSubcategory,
  useUpdateCategory,
} from "../../query/category";
import { FaSlackHash } from "react-icons/fa";
import { getAttachment } from "../../service/instance";
import ButtonSwitch from "../../components/ButtonSwitch";
import tableOptionsStyle from "../../style/tableOptions";
import { MdAdd } from "react-icons/md";
import InputBox from "../../components/InputBox";
import { responseHandler } from "../../utilities/response-handler";
import { usePostImage } from "../../query/attachments";
import CreateSubcatDrawer from "./CreateSubcatDrawer";
import SubcatDrawer from "./SubcatDrawer";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { cid } = useParams();

  const [open, setOpen] = React.useState(false); // Create Subcategory Drawer
  const onClose = () => setOpen(!open);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const { data: categoryInfo, isLoading, isError } = useGetCategory(cid);

  React.useEffect(() => {
    if (!categoryInfo) return;

    if (!isDirty)
      reset({
        titleEn: categoryInfo?.data?.data?.titleEn,
        titleBn: categoryInfo?.data?.data?.titleBn,
        descriptionEn: categoryInfo?.data?.data?.descriptionEn,
        descriptionBn: categoryInfo?.data?.data?.descriptionBn,
      });
  }, [categoryInfo]);

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

  const { mutateAsync: updateCategory, isLoading: updateLoading } =
    useUpdateCategory();

  const updateCategoryFunc = async (data) => {
    const res = await responseHandler(
      () => updateCategory({ id: cid, data }),
      [200]
    );
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };

  const { mutateAsync: postImage } = usePostImage();

  const uploadCategoryIcon = async (data) => {
    const res = await responseHandler(() => postImage(data), [201]);

    if (res.status)
      await updateCategoryFunc({
        icon: res.data?.[0]?._id,
      });
    else snack.createSnack(res.msg, "error");
  };

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
          <Grid item xs={12} md={7}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Information
            </Typography>
            <CPaper
              sx={{
                "& form > *": {
                  mt: 1,
                },
              }}
            >
              <DropZone
                defaultValue={
                  categoryInfo?.data?.data?.icon && {
                    preview: getAttachment(categoryInfo?.data?.data?.icon?._id),
                  }
                }
                onChange={uploadCategoryIcon}
                onDelete={() => true}
              />
              <form onSubmit={handleSubmit(updateCategoryFunc)}>
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
                  {...register("titleBn")}
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
                  {...register("descriptionBn")}
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
                  type={"submit"}
                  fullWidth
                  disabled={updateLoading || isLoading || !isDirty}
                >
                  Update Category
                </Button>
              </form>
            </CPaper>
          </Grid>
          <Grid item xs={12} md={4.7}>
            <Typography variant={"h6"} sx={{ fontWeight: "500" }}>
              Gallery
            </Typography>
            <CPaper
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                rowGap: 1,
                columnGap: 1,
              }}
            >
              <DropZone />
              <DropZone />
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
                onClick={onClose}
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

export default Index;
