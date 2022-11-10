import {
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Container,
  Typography,
  Stack,
  Avatar,
  Rating,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";

import React from "react";
import { IoIosImages } from "react-icons/io";
import snackContext from "../../context/snackProvider";
import { useGetAllOrder } from "../../query/order";
import { useGetAllReview } from "../../query/review";
import { getAttachment } from "../../service/instance";
import tableOptionsStyle from "../../style/tableOptions";
import ReviewBoxes from "./ReviewBoxes";
import ReviewBoxess from "./ReviewBoxes";

const Index = () => {
  const snack = React.useContext(snackContext);
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data: reviewList, isLoading } = useGetAllReview(params);

  const [reviewInfo, setReviewInfo] = React.useState([]);

  React.useEffect(() => {
    setReviewInfo(reviewList?.data?.data || []);
  }, [isLoading]);
  console.log(reviewInfo);
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
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: "bold",
          }}
        >
          All Review
        </Typography>
        <Paper sx={{ p: 2 }}>
          <ReviewBoxes />
        </Paper>
      </Container>
    </>
  );
};

export default Index;
