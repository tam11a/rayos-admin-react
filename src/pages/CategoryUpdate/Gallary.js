import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";

const Gallary = () => {
  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
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
      </Container>
    </>
  );
};

export default Gallary;
