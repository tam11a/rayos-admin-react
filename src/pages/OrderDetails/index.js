import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { IoIosImages } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import snackContext from "../../context/snackProvider";
import { useGetProductsByOrderID } from "../../query/order";
import { getAttachment } from "../../service/instance";
import { FaFileInvoice, FaFileInvoiceDollar, FaPhoneAlt } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { GrMail } from "react-icons/gr";

const Index = () => {
  const snack = React.useContext(snackContext);
  const { oid } = useParams();
  const [params, setParams] = React.useState({
    limit: 10,
    page: 1,
    filters: [],
  });

  const { data: orderInfo, isLoading } = useGetProductsByOrderID(oid, params);

  const [productInfo, setProductInfo] = React.useState([]);

  React.useEffect(() => {
    setProductInfo(orderInfo?.data?.data?.products || []);
  }, [isLoading]);

  console.log(orderInfo);

  return (
    <>
      <Container>
        <Grid
          container
          sx={{
            mt: 2,
          }}
          rowGap={2}
          columnGap={2}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "flex-start" },
              rowGap: 2,
              columnGap: 3,
              justifyContent: {
                xs: "center",
                md: "space-between",
              },
              my: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  position: "relative",
                  minHeight: "150px",
                  minWidth: "150px",
                }}
                component={"form"}
              >
                {isLoading ? (
                  <Box
                    sx={{
                      borderRadius: "0%",
                      position: "relative",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress color={"black"} />
                  </Box>
                ) : (
                  <Avatar
                    sx={{
                      width: "150px",
                      height: "150px",
                    }}
                    src={getAttachment(orderInfo?.data?.data?.user?.image)}
                    alt={orderInfo?.data?.data?.user?.userName}
                  />
                )}
              </Box>
              <Box>
                <Stack
                  direction={"column"}
                  sx={{
                    alignItems: {
                      xs: "center",
                      sm: "flex-start",
                    },
                  }}
                >
                  <Typography variant={"h6"}>
                    {orderInfo?.data?.data?.user?.userName}
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 1,
                      mt: {
                        sm: 1,
                      },
                    }}
                  >
                    <Hidden smDown>
                      <GrMail />
                    </Hidden>
                    <span>{orderInfo?.data?.data?.user?.email}</span>
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 1,
                      mt: {
                        sm: 1,
                      },
                    }}
                  >
                    <Hidden smDown>
                      <FaPhoneAlt />
                    </Hidden>
                    <span>{orderInfo?.data?.data?.user?.phone}</span>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack spacing={1} direction="row">
              <Box>
                <Tooltip title="Invoice">
                  <IconButton
                    // color={"black"}
                    variant="outlined"
                    sx={{ border: "1px solid", borderRadius: "2px" }}
                  >
                    <FaFileInvoiceDollar />
                  </IconButton>
                </Tooltip>
              </Box>
              <Select
                size={"small"}
                // value={d.row.status}
                // disabled={
                //   d.row.status === "Delivered" || d.row.status === "Canceled"
                // }
                sx={{ width: "200px" }}
                fullWidth
              >
                <MenuItem value={"Pending"} disabled>
                  Pending
                </MenuItem>
                <MenuItem
                  value={"Confirmed"}
                  // disabled={d.row.status === "Confirmed"}
                >
                  Confirmed
                </MenuItem>
                <MenuItem
                  value={"Shipped"}
                  // disabled={d.row.status === "Shipped"}
                >
                  Shipped
                </MenuItem>
                <MenuItem
                  value={"Delivered"}
                  // disabled={d.row.status === "Delivered"}
                >
                  Delivered
                </MenuItem>
                <MenuItem
                  value={"Canceled"}
                  // disabled={d.row.status === "Canceled"}
                >
                  Canceled
                </MenuItem>
                <MenuItem
                  value={"Returned"}
                  // disabled={d.row.status === "Returned"}
                >
                  Returned
                </MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              rowGap: 2,
              columnGap: 3,
              justifyContent: {
                xs: "center",
                md: "space-between",
              },
              my: 2,
            }}
          >
            <Grid item xs={12} md={7.55}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                Ordered Items
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  boxShadow: {
                    xs: 0,
                    md: 5,
                  },
                }}
              >
                {productInfo.map((prodItem) => {
                  return (
                    <>
                      <ListItem
                        key={prodItem?.product?._id}
                        disablePadding
                        sx={{
                          px: 1,
                          pr: { xs: 1, md: 2 },
                          py: 0.5,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={getAttachment(prodItem?.product?.image)}
                            sx={{
                              borderRadius: 1,
                              height: "55px",
                              width: "55px",
                              background: "transparent",
                              color: "primary.dark",
                              mr: 1,
                            }}
                          >
                            <IoIosImages
                              style={{
                                fontSize: "1.8em",
                              }}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{
                            flex: 1,
                          }}
                          primary={
                            <>
                              <b>{prodItem?.product?.titleEn || "-"}</b>
                            </>
                          }
                          secondary={
                            <>
                              {prodItem?.product?.variantType}:{" "}
                              <span
                                style={{
                                  fontWeight: 600,
                                }}
                              >
                                {prodItem?.variant?.titleEn || "-"}
                              </span>{" "}
                              &times;{" "}
                              <span
                                style={{
                                  fontWeight: 600,
                                }}
                              >
                                {prodItem?.product?.sellPrice || 0}
                              </span>{" "}
                              ৳ &times;{" "}
                              <span
                                style={{
                                  fontWeight: 600,
                                }}
                              >
                                {prodItem?.quantity || 0}
                              </span>{" "}
                            </>
                          }
                          primaryTypographyProps={{
                            noWrap: true,
                            sx: {
                              color: "black.main",
                              textDecoration: "none",
                            },
                            // component: Link,
                            // to: `/product/${cart?.variant?.product?._id}`,
                          }}
                          secondaryTypographyProps={{
                            noWrap: true,
                            sx: {
                              textDecoration: "none",
                              "& span": {
                                color: "black.main",
                              },
                            },
                            // component: Link,
                            // to: `/product/${cart?.variant?.product?._id}`,
                          }}
                        />
                        <Typography
                          variant="h6"
                          color={"black"}
                          sx={{
                            minWidth: "15px",
                            textAlign: "center",
                          }}
                        >
                          {prodItem?.quantity * prodItem?.product?.sellPrice ||
                            0}{" "}
                          ৳
                        </Typography>
                      </ListItem>
                    </>
                  );
                })}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                Additional Information
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  boxShadow: {
                    xs: 0,
                    md: 5,
                  },
                  p: 2,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">Payment Method :</Typography>
                  <b>{orderInfo?.data?.data?.paymentMethod}</b>
                </Stack>
                <Divider
                  sx={{
                    my: 2,
                  }}
                />
                <Stack
                  direction={{ xs: "row", md: "column" }}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">Shipping Address :</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {orderInfo?.data?.data?.shipping}
                  </Typography>
                </Stack>
                <Divider
                  sx={{
                    my: 2,
                  }}
                />
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">Subtotal :</Typography>
                  <Typography>
                    {orderInfo?.data?.data?.totalSellPrice || 0} ৳
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">Delivery Fee :</Typography>
                  <Typography>
                    {orderInfo?.data?.data?.shippingFee || 0} ৳
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant="button">Discount :</Typography>
                  <Typography>
                    - {orderInfo?.data?.data?.discount || 0} ৳
                  </Typography>
                </Stack>
                <Divider
                  sx={{
                    my: 1,
                  }}
                />
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                >
                  <Typography variant="button">
                    <b>total :</b>
                  </Typography>
                  <Typography>
                    <b>{orderInfo?.data?.data?.total || 0}</b> ৳
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
