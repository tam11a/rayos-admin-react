import {
  Alert,
  Avatar,
  Box,
  Button,
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
    setProductInfo(orderInfo?.data?.data || []);
  }, [isLoading]);

  console.log(productInfo);

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
                      key={prodItem._id}
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
            <Hidden smDown>
              <Stack
                direction={"row"}
                sx={{
                  my: 2,
                  width: "100%",
                  justifyContent: "",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    maxWidth: { xs: "unset", sm: "250px" },
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
                    <Typography variant="button">Subtotal :</Typography>
                    <Typography>{""} ৳</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography variant="button">Delivery :</Typography>
                    <Typography>{0} ৳</Typography>
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
                    <Typography variant="button">total :</Typography>
                    <Typography>{""} ৳</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Hidden>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              pl: {
                xs: 0,
                md: 2,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
            >
              Payment & Shipping
            </Typography>
            <Paper
              elevation={0}
              sx={{
                mb: 1,
                boxShadow: {
                  xs: 0,
                  md: 5,
                },
              }}
            >
              <List>
                <ListItem>
                  <Typography variant={"body1"} fontWeight={"bold"}>
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    pt: 0,
                  }}
                >
                  <RadioGroup
                    defaultValue="cod"
                    sx={{
                      "& *": {
                        fontWeight: "600",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="cod"
                      control={<Radio color={"warning"} />}
                      label="Cash On Delivery"
                    />
                  </RadioGroup>
                </ListItem>
                {/* <Divider />
              <ListItem>
                <Typography variant={"body1"} fontWeight={"bold"}>
                  Shipping Info
                </Typography>
              </ListItem> */}
              </List>
            </Paper>
            <Hidden xsUp>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="button">Subtotal :</Typography>
                <Typography>{""} ৳</Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="button">Delivery :</Typography>
                <Typography>{0} ৳</Typography>
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
                <Typography variant="button">total :</Typography>
                <Typography>{""} ৳</Typography>
              </Stack>
            </Hidden>
            {/* <Button
              variant={"contained"}
              color={"black"}
            //   disabled={!cartCntxt.total || isLoading}
              fullWidth
              onClick={onCalculateOrder}
            >
              Proceed to Checkout
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
