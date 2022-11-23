import React from "react";
import {
  Paper,
  Avatar,
  Stack,
  Grid,
  Typography,
  Rating,
  Collapse,
  Button,
  Pagination,
  TablePagination,
  MenuItem,
  Select,
  InputBase,
  Alert,
  Container,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetAllReview, useToggleReview } from "../../query/review";
import { getAttachment } from "../../service/instance";
import moment from "moment/moment";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import tableOptionsStyle from "../../style/tableOptions";
import ButtonSwitch from "../../components/ButtonSwitch";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import ReviewBoxes, { ReviewBoxs } from "../../pages/Reviews/ReviewBoxes";

const Reviews = () => {
  const { pid } = useParams();

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
        {/* <Paper sx={{ p: 2 }}> */}
        <ReviewBoxes product={pid} />
        {/* </Paper> */}
      </Container>
    </>
  );
};

export default Reviews;
