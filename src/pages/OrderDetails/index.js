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
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
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
import { FaPhoneAlt } from "react-icons/fa";
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
        >
          <Grid item xs={12} md={8}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                rowGap: 2,
                columnGap: 3,
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                },
                my: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  minHeight: "100px",
                  minWidth: "100px",
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
                      width: "100px",
                      height: "100px",
                    }}
                    src={getAttachment(orderInfo?.data?.data?.user?.image)}
                    alt={orderInfo?.data?.data?.user?.userName}
                  />
                )}
              </Box>
              <Stack
                direction={"column"}
                sx={{
                  alignItems: {
                    xs: "center",
                    sm: "flex-start",
                  },
                }}
              >
                <Stack direction={"row"} alignItems={"center"} columnGap={1}>
                  <Typography variant={"h6"}>
                    {orderInfo?.data?.data?.user?.userName}
                  </Typography>
                </Stack>
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
            </Grid>
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
                          // component={Link}
                          // to={`/product/${cart?.variant?.product?._id}`}
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
                        {prodItem?.quantity * prodItem?.product?.sellPrice || 0}{" "}
                        ৳
                      </Typography>
                    </ListItem>
                  </>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
