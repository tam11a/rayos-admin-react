import {
  Paper,
  Avatar,
  Stack,
  Grid,
  Typography,
  Rating,
  Collapse,
  Button,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllReview } from "../../query/review";
import { getAttachment } from "../../service/instance";
import moment from "moment/moment";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const ReviewBoxes = () => {
  const { productId } = useParams();
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [params, setParams] = React.useState({
    method: "all",
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data: reviewList, isLoading, isError } = useGetAllReview(params);
  const [review, setReview] = React.useState({});

  React.useEffect(() => {
    if (isError) return;
    setReview(reviewList?.data?.data || []);
  }, [isLoading]);
  console.log(review);

  return (
    <>
      {review?.map?.((revItem, index) => (
        <React.Fragment key={index}>
          <ReviewBox revItem={revItem} />
        </React.Fragment>
      ))}
    </>
  );
};

const ReviewBox = ({ revItem }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        pb: 0.5,
        mb: 1,
        "&:last-child": { mb: 0 },
        border: "1px solid #ddd",
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        columnGap={4}
      >
        {/* <Stack
          direction="column"
          alignItems={"center"}
          rowGap={0.5}
          maxWidth="62px"
          component={Link}
          to={`/customer/${revItem?.author?._id}`}
          sx={{ textDecoration: "none", color: "unset" }}
        >
          <Avatar
            sx={{ width: 45, height: 45 }}
            src={getAttachment(revItem?.author.image)}
            alt={revItem?.author.fullName}
          />
          <Typography
            variant={"caption"}
            sx={{ fontWeight: 600 }}
            noWrap="wrap"
            maxWidth="62px"
          >
            {revItem.author.userName}
          </Typography>
        </Stack> */}
        <Stack
          direction="column"
          alignItems={"center"}
          rowGap={0.5}
          maxWidth="200px"
          component={Link}
          to={`/prod/${revItem?.product?._id}`}
          sx={{ textDecoration: "none", color: "unset" }}
        >
          <Avatar
            // sx={{ width: 38, height: 38 }}

            sx={{
              borderRadius: 1,
              height: "45px",
              width: "45px",
              background: "transparent",
              color: "primary.dark",
              mr: 1,
            }}
            src={getAttachment(revItem?.product.image)}
            alt={revItem?.product.titleEn}
          />
          <Typography
            variant={"caption"}
            sx={{ fontWeight: 600 }}
            noWrap="wrap"
            maxWidth="200px"
          >
            {revItem?.product.titleEn}
          </Typography>
        </Stack>
        <Stack direction="column" rowGap={0.5} flex={1}>
          <Rating
            name="half-rating-read"
            value={revItem?.rating}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography>{revItem?.message}</Typography>
          <Typography variant={"caption"}>
            {moment(revItem?.createdAt).format("lll")}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ReviewBoxes;
