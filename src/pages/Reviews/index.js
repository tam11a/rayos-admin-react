import {
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Container,
  Typography,
} from "@mui/material";

import React from "react";
import snackContext from "../../context/snackProvider";
import { useGetAllOrder } from "../../query/order";
import tableOptionsStyle from "../../style/tableOptions";

const Index = () => {
  const snack = React.useContext(snackContext);
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data, isLoading } = useGetAllOrder(params);
  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
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
            <Grid item xs={12} sm={8.7}>
              <InputBase
                placeholder="Search User"
                sx={tableOptionsStyle}
                onChange={(e) => {
                  setParams({
                    ...params,
                    filters: [
                      // `receiver_name~${e.target.value}`,
                      `receiver_number~${e.target.value}`,
                      // `receiver_address~${e.target.value}`,
                    ],
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={params.method}
                onChange={(e) =>
                  setParams({
                    ...params,
                    method: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value={"all"} disabled={params.method === "all"}>
                  All
                </MenuItem>
                <MenuItem
                  value={"Pending"}
                  disabled={params.method === "Pending"}
                >
                  Pending
                </MenuItem>
                <MenuItem
                  value={"Confirmed"}
                  disabled={params.method === "Confirmed"}
                >
                  Confirmed
                </MenuItem>
                <MenuItem
                  value={"Shipped"}
                  disabled={params.method === "Shipped"}
                >
                  Shipped
                </MenuItem>
                <MenuItem
                  value={"Delivered"}
                  disabled={params.method === "Delivered"}
                >
                  Delivered
                </MenuItem>
                <MenuItem
                  value={"Canceled"}
                  disabled={params.method === "Canceled"}
                >
                  Canceled
                </MenuItem>
                <MenuItem
                  value={"Returned"}
                  disabled={params.method === "Returned"}
                >
                  Returned
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Paper>
        <Paper>
          <Typography>All Reviews</Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Index;
