import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Hidden,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { IoIosImages } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetProductsByOrderID } from "../../query/order";
import { getAttachment } from "../../service/instance";
import { FaFileInvoice, FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import Steppers from "./Steppers";
import OrderStatus from "../../components/OrderStatus";
import BackButton from "../../components/BackButton";
import { useInvoice } from "../../context/invoiceProvider";

const Index = () => {
	const { showInvoice } = useInvoice();
	const { oid } = useParams();

	const { data: orderInfo, isLoading } = useGetProductsByOrderID(oid);

	const [productInfo, setProductInfo] = React.useState([]);

	React.useEffect(() => {
		setProductInfo(orderInfo?.data?.data?.products || []);
	}, [isLoading]);
	console.log(orderInfo);

	return (
		<>
			<Container
				sx={{
					py: 2,
				}}
			>
				<BackButton
					to={"/order-list"}
					primary={"Back to Order"}
					secondary={"Update Order"}
				/>
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
										component={Link}
										to={`/customer/${orderInfo?.data?.data?.user?._id}`}
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
									<Typography
										variant={"h6"}
										component={Link}
										to={`/customer/${orderInfo?.data?.data?.user?._id}`}
										sx={{ textDecoration: "none", color: "unset" }}
									>
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
						<Stack
							spacing={1}
							direction="row"
							alignItems={"center"}
						>
							<Box>
								<Tooltip title="Download Invoice">
									<Button
										startIcon={<FaFileInvoice />}
										size={"small"}
										variant={"contained"}
										onClick={() => showInvoice(orderInfo?.data?.data?._id)}
									>
										Invoice
									</Button>
								</Tooltip>
							</Box>
							<OrderStatus
								status={orderInfo?.data?.data?.status}
								id={orderInfo?.data?.data?._id}
							/>
						</Stack>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<Typography
							variant="h6"
							sx={{
								mb: 1,
								fontWeight: "bold",
							}}
						>
							Order Track
						</Typography>
						<Paper
							elevation={0}
							sx={{
								boxShadow: {
									xs: 0,
									md: 5,
								},
								p: { xs: 0, md: 2 },
							}}
						>
							<Steppers timelines={orderInfo?.data?.data?.timeline || []} />
						</Paper>
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
						<Grid
							item
							xs={12}
							md={7.55}
						>
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
													component={Link}
													to={`/prod/${prodItem?.product?._id}`}
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
												variant="body1"
												color={"black"}
												sx={{
													fontWeight: "bold",
													minWidth: "15px",
													textAlign: "center",
												}}
											>
												{prodItem?.quantity * prodItem?.product?.sellPrice || 0}{" "}
												৳
											</Typography>
										</ListItem>
									);
								})}
							</Paper>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
						>
							<Typography
								variant="h6"
								sx={{
									mb: 1,
									fontWeight: "bold",
								}}
							>
								Shipping Information
							</Typography>
							<Paper
								elevation={0}
								sx={{
									boxShadow: {
										xs: 0,
										md: 5,
									},
									p: { xs: 0, md: 2 },
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
									direction={"row"}
									alignItems={"center"}
									justifyContent={"space-between"}
									sx={{
										width: "100%",
									}}
								>
									<Typography variant="button">Receiver Name :</Typography>
									<b>{orderInfo?.data?.data?.shipping?.name || "-"}</b>
								</Stack>
								<Stack
									direction={"row"}
									alignItems={"center"}
									justifyContent={"space-between"}
									sx={{
										width: "100%",
									}}
								>
									<Typography variant="button">
										Receiver Phone Number :
									</Typography>
									<b>{orderInfo?.data?.data?.shipping?.phone || "-"}</b>
								</Stack>
								<Stack
									direction={{ xs: "row", md: "column" }}
									alignItems={{ xs: "center", md: "flex-start" }}
									justifyContent={"space-between"}
									sx={{
										width: "100%",
									}}
								>
									<Typography variant="button">Shipping Address :</Typography>
									<b>{orderInfo?.data?.data?.shipping?.address || "-"}</b>
								</Stack>
							</Paper>

							<Typography
								variant="h6"
								sx={{
									mt: 3,
									mb: 1,
									fontWeight: "bold",
								}}
							>
								Additional Information
							</Typography>
							<Paper
								elevation={0}
								sx={{
									// boxShadow: {
									//   xs: 0,
									//   md: 5,
									// },
									p: { xs: 0, md: 2 },
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
