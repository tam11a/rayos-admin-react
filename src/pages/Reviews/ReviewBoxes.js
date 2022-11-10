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
import { useParams } from "react-router-dom";
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
      {review?.slice?.(0, 5).map?.((revItem, index) => (
        <React.Fragment key={index}>
          <ReviewBox revItem={revItem} />
        </React.Fragment>
      ))}
      {!!review?.slice?.(5, review.length).length && (
        <>
          <Collapse in={checked}>
            {review?.slice?.(5, review.length).map?.((revItem, index) => (
              <React.Fragment key={index}>
                <ReviewBox perCat={revItem} />
              </React.Fragment>
            ))}
          </Collapse>
          <Button
            onClick={handleChange}
            size={"small"}
            startIcon={checked ? <IoMdRemove /> : <IoMdAdd />}
          >
            View More ({review?.slice?.(5, review.length).length})
          </Button>
        </>
      )}
    </>
  );
};

const ReviewBox = ({ revItem }) => {
  return (
    <Paper
      elevation={0}
      //   sx={{
      //     mb: 2,
      //   }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        columnGap={4}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          rowGap={0.5}
          maxWidth="62px"
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
        </Stack>
        <Stack
          direction="column"
          alignItems={"center"}
          rowGap={0.5}
          maxWidth="200px"
        >
          <Avatar
            // sx={{ width: 38, height: 38 }}
            // component={Button}
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
