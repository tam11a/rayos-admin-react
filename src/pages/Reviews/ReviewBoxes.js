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
  CircularProgress,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllReview, useToggleReview } from "../../query/review";
import { getAttachment } from "../../service/instance";
import moment from "moment/moment";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import tableOptionsStyle from "../../style/tableOptions";
import ButtonSwitch from "../../components/ButtonSwitch";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import usePaginate from "../../hooks/usePaginate";

const ReviewBoxes = ({ author, product }) => {
  const {
    limit,
    setLimit,
    page,
    setPage,
    search,
    setSearch,
    watch,
    setFilterField,
    getQueryParams,
  } = usePaginate();

  React.useEffect(() => {
    if (!author && !product) return;
    if (author) setFilterField("author", author);
    if (product) setFilterField("product", product);
  }, []);
  // console.log(product, author);
  const {
    data: reviewList,
    isLoading,
    isError,
  } = useGetAllReview(getQueryParams());
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    if (isError) return;
    setReview(reviewList?.data?.data || []);
  }, [isLoading, reviewList]);
  // console.log(reviewList);

  return (
    <>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              sx={{
                ...tableOptionsStyle,
              }}
              value={watch("isActive") || "null"}
              onChange={(e) => {
                setFilterField(
                  "isActive",
                  e.target.value === "null" ? undefined : e.target.value
                );
              }}
              fullWidth
            >
              <MenuItem value={"null"} selected>
                All
              </MenuItem>
              <MenuItem value={"true"}>Active</MenuItem>
              <MenuItem value={"false"}>Blocked</MenuItem>/
            </Select>
          </Grid>
        </Grid>
      </Paper>
      {isLoading && (
        <Stack alignItems="center" py={2} pb={4}>
          <CircularProgress />
        </Stack>
      )}
      {review?.map?.((revItem, index) => (
        <React.Fragment key={index}>
          <ReviewBox
            revItem={revItem}
            showProd={!!author}
            showUser={!!product}
            showAll={!author && !product}
          />
        </React.Fragment>
      ))}
      <Stack direction="row" justifyContent={"flex-end"}>
        <TablePagination
          component="div"
          count={reviewList?.data?.total || 0}
          // rowsPerPageOptions={[5, 10, 25, 50, 100]}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => setLimit(e.target.value)}
        />
      </Stack>
    </>
  );
};

const ReviewBox = ({ revItem, showUser, showProd, showAll }) => {
  const snack = React.useContext(snackContext);
  const { mutateAsync: toggleReview } = useToggleReview();

  const updateState = async (id) => {
    const res = await responseHandler(() => toggleReview(id));
    if (res.status) snack.createSnack(res.msg);
    else snack.createSnack(res.msg, "error");
  };
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
        {(showUser || showAll) && (
          <Stack
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
              variant={"rounded"}
              src={getAttachment(revItem?.author.image)}
              alt={revItem?.author.fullName}
            />
            {/* <Typography
              variant={"caption"}
              sx={{ fontWeight: 600 }}
              noWrap={true}
              maxWidth="62px"
            >
              {revItem.author.userName}
            </Typography> */}
          </Stack>
        )}
        {(showProd || showAll) && (
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
            {/* <Typography
              variant={"caption"}
              sx={{ fontWeight: 600 }}
              noWrap={true}
              maxWidth="200px"
            >
              {revItem?.product.titleEn}
            </Typography> */}
          </Stack>
        )}
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
        <ButtonSwitch
          checked={revItem?.isActive}
          color={"success"}
          onClick={() => {
            updateState(revItem?._id);
          }}
        />
      </Stack>
    </Paper>
  );
};

export default ReviewBoxes;
