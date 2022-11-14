import {
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  useParams,
  Link,
  Navigate,
  useSearchParams,
  Route,
  Routes,
} from "react-router-dom";
import BackButton from "../../components/BackButton";

import snackContext from "../../context/snackProvider";
import {
  useGetAllCategory,
  useGetSubCategoryFromCatID,
} from "../../query/category";
import { useGetProductByID, useUpdateProduct } from "../../query/product";
import { responseHandler } from "../../utilities/response-handler";

import CTab from "../../components/CTab";
import CTabs from "../../components/CTabs";
import Info from "./Info";
import Variants from "./Variants";
import Gallary from "./Gallary";
import Reviews from "./Reviews";

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
              value={"variant"}
              label={"Variants"}
              onClick={() =>
                setSearchParams({ ...searchParams, tab: "variant" })
              }
            />
            <CTab
              value={"gallary"}
              label={"Gallary"}
              onClick={() =>
                setSearchParams({ ...searchParams, tab: "gallary" })
              }
            />
            <CTab
              value={"review"}
              label={"Reviews"}
              onClick={() =>
                setSearchParams({ ...searchParams, tab: "review" })
              }
            />
          </CTabs>
        </Grid>
        {searchParams.get("tab") === "variant" ? (
          <Variants />
        ) : searchParams.get("tab") === "gallary" ? (
          <Gallary />
        ) : searchParams.get("tab") === "review" ? (
          <Reviews />
        ) : (
          <Info />
        )}
      </Container>
    </>
  );
};
export default Index;
