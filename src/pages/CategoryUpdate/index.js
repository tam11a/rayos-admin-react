import { Container, Grid } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

import CTab from "../../components/CTab";
import CTabs from "../../components/CTabs";
import Info from "./Info";
import Subcatagory from "./Subcatagory";
import Gallary from "./Gallary";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(productInfo?.data?.data);

  return (
    <>
      <Container sx={{ pt: 1 }}>
        <Grid
          container
          rowGap={1}
          columnGap={1}
          sx={{
            mt: 2,
          }}
        >
          <CTabs
            value={searchParams.get("tab")}
            sx={{
              // width: "fit-content",
              minWidth: {
                xs: "90vw",
                sm: "350px",
              },
              maxWidth: "95vw",
              mx: "auto",
              my: 2,
            }}
          >
            <CTab
              value={null}
              label={"Info"}
              onClick={() => {
                delete searchParams.tab;
                setSearchParams({ ...searchParams });
              }}
            />
            <CTab
              value={"subcatagory"}
              label={"Subcatagory"}
              onClick={() =>
                setSearchParams({ ...searchParams, tab: "subCatagory" })
              }
            />
            <CTab
              value={"gallary"}
              label={"Gallary"}
              onClick={() =>
                setSearchParams({ ...searchParams, tab: "gallary" })
              }
            />
          </CTabs>
        </Grid>
        {searchParams.get("tab") === "subCatagory" ? (
          <Subcatagory />
        ) : searchParams.get("tab") === "gallary" ? (
          <Gallary />
        ) : (
          <Info />
        )}
      </Container>
    </>
  );
};
export default Index;

// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   Button,
//   Chip,
//   Container,
//   Grid,
//   IconButton,
//   InputBase,
//   Paper,
//   Typography,
// } from "@mui/material";
// import BackButton from "../../components/BackButton";
// import CPaper from "../../components/CPaper";
// import DropZone from "../../components/DropZone";
// import DataTable from "../../components/DataTable";
// import snackContext from "../../context/snackProvider";
// import { useForm } from "react-hook-form";
// import {
//   useGetCategory,
//   useGetSubCategoryFromCatID,
//   useToggleSubcategory,
//   useUpdateCategory,
// } from "../../query/category";
// import { FaSlackHash } from "react-icons/fa";
// import { getAttachment } from "../../service/instance";
// import ButtonSwitch from "../../components/ButtonSwitch";
// import tableOptionsStyle from "../../style/tableOptions";
// import { MdAdd } from "react-icons/md";
// import InputBox from "../../components/InputBox";
// import { responseHandler } from "../../utilities/response-handler";
// import { usePostImage } from "../../query/attachments";
//
// import SubcatDrawer from "./SubcatDrawer";

// const Index = () => {
//   const snack = React.useContext(snackContext);
//   const { cid } = useParams();

//   const [open, setOpen] = React.useState(false); // Create Subcategory Drawer
//   const onClose = () => setOpen(!open);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors, isDirty },
//   } = useForm();

//   const { data: categoryInfo, isLoading, isError } = useGetCategory(cid);

//   React.useEffect(() => {
//     if (!categoryInfo) return;

//     if (!isDirty)
//       reset({
//         titleEn: categoryInfo?.data?.data?.titleEn,
//         titleBn: categoryInfo?.data?.data?.titleBn,
//         descriptionEn: categoryInfo?.data?.data?.descriptionEn,
//         descriptionBn: categoryInfo?.data?.data?.descriptionBn,
//       });
//   }, [categoryInfo]);

//   const [params, setParams] = React.useState({
//     limit: 10,
//     page: 1,
//     filters: [],
//   });

//   const {
//     data: subCatData,
//     // isLoading: isSubCatLoading,
//     isError: isSubCatError,
//   } = useGetSubCategoryFromCatID(cid, params);

//   const { mutateAsync: updateCategory, isLoading: updateLoading } =
//     useUpdateCategory();

//   const updateCategoryFunc = async (data) => {
//     const res = await responseHandler(
//       () => updateCategory({ id: cid, data }),
//       [200]
//     );
//     if (res.status) snack.createSnack(res.msg);
//     else snack.createSnack(res.msg, "error");
//   };

//   const { mutateAsync: postImage } = usePostImage();

//   const uploadCategoryIcon = async (data) => {
//     const res = await responseHandler(() => postImage(data), [201]);

//     if (res.status)
//       await updateCategoryFunc({
//         icon: res.data?.[0]?._id,
//       });
//     else snack.createSnack(res.msg, "error");
//   };

//

//

//   return (
//
//   );
// };

//

// export default Index;
