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
  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: "bold",
          }}
        >
          All Review
        </Typography>

        <ReviewBoxes />
      </Container>
    </>
  );
};

export default Index;
