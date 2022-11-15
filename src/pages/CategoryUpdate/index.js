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
              value={"subCatagory"}
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
