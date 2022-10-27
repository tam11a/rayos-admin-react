import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import CFab from "../../components/CFab";
import { fontWeight } from "@mui/system";
import BackButton from "../../components/BackButton";
import CPaper from "../../components/Cpaper";

const Index = () => {
  const { cid } = useParams();
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
            <Typography variant={"body1"} sx={{ fontWeight: "500" }}>
              Description
            </Typography>
            <CPaper></CPaper>
          </Grid>
          <Grid item xs={12} sm={5.9} md={3.9}>
            <Typography variant={"body1"} sx={{ fontWeight: "500" }}>
              Category Image
            </Typography>
            <CPaper></CPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
