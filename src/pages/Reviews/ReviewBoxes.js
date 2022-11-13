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
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    if (isError) return;
    setReview(reviewList?.data?.data || []);
  }, [isLoading, reviewList]);
  console.log(reviewList);

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
      {review?.map?.((revItem, index) => (
        <React.Fragment key={index}>
          <ReviewBox revItem={revItem} />
        </React.Fragment>
      ))}
      <Stack direction="row" justifyContent={"flex-end"}>
        <TablePagination
          component="div"
          count={reviewList?.data?.total || 0}
          page={(params?.page || 1) - 1}
          onPageChange={(e, newPage) =>
            setParams({
              ...params,
              page: newPage + 1,
            })
          }
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          rowsPerPage={params?.limit}
          onRowsPerPageChange={(pageSize) => {
            // console.log(pageSize);
            setParams({
              ...params,
              limit: pageSize.target.value,
            });
          }}
        />
      </Stack>
    </>
  );
};

const ReviewBox = ({ revItem, showUser, showProd }) => {
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
        {/* {showUser && ( */}
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
            src={getAttachment(revItem?.author.image)}
            alt={revItem?.author.fullName}
          />
          <Typography
            variant={"caption"}
            sx={{ fontWeight: 600 }}
            noWrap={true}
            maxWidth="62px"
          >
            {revItem.author.userName}
          </Typography>
        </Stack>
        {/* )} */}
        {/* {showProd && ( */}
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
            noWrap={true}
            maxWidth="200px"
          >
            {revItem?.product.titleEn}
          </Typography>
        </Stack>
        {/* )} */}
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
