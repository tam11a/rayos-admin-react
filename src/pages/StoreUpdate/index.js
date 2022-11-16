import { Container, Grid } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

import CTab from "../../components/CTab";
import CTabs from "../../components/CTabs";
import Info from "./Info";
import ProdByStore from "./ProdByStore";

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
              value={"products"}
              label={"Products"}
              onClick={() =>
                setSearchParams({ ...searchParams, tab: "products" })
              }
            />
          </CTabs>
        </Grid>
        {searchParams.get("tab") === "products" ? <ProdByStore /> : <Info />}
      </Container>
    </>
  );
};
export default Index;
