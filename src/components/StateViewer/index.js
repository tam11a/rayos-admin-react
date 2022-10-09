import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Stack, Divider } from "@mui/material";

const Index = ({ stateList }) => {
  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        rowGap={1}
        columnGap={1}
      >
        {stateList?.map((state, index) => (
          <Grid
            item
            key={index}
            // xs={12}
            xs={5.8}
            // sm={3.8}
            sm={2.8}
          >
            <Button
              color={"white"}
              variant={"contained"}
              sx={{
                // display: "flex",
                // alignItems: "center",
                // flexDirection: "column",
                height: "100%",
                aspectRatio: "1/1",
                // maxHeight: "200px",
              }}
              component={state.to ? Link : Button}
              to={state.to}
              onClick={state.func}
              fullWidth
            >
              {/* <Typography py={1} pt={2} variant={"h3"} color={"primary.main"}>
                {state?.num || 0}
              </Typography>

              <Typography pb={2} color={"#888"} variant={"subtitle2"}>
                {state?.title || "Undefined"}
              </Typography> */}
              <Stack direction={"column"} alignItems={"center"} rowGap={1}>
                <Typography variant={"h6"}>{state?.num || 0}</Typography>
                <Divider width={"100%"} />
                <Typography variant={"caption"}>
                  {state?.title || "Undefined"}
                </Typography>
              </Stack>
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Index;
