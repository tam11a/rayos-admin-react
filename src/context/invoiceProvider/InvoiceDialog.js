import {
	Alert,
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Chip,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { MdClose, MdOutlinePrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Preview, print } from "react-html2pdf";
import invoiceContext from ".";

const InvoiceDialog = ({ open, onClose }) => {
	const printRef = React.useRef(null);
	const invoice = React.useContext(invoiceContext);

	const reactToPrintContent = React.useCallback(() => {
		return printRef.current;
	}, [printRef.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: invoice.info?.id
			? "invoice-" + invoice.info?.id
			: "invoice-" + Date.now(),
		removeAfterPrint: true,
	});

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					sx: {
						minWidth: {
							xs: "95vw",
							md: "800px",
						},
						maxWidth: { xs: "95vw", md: "1200px" },
						maxHeight: {
							xs: "97vh",
						},
						minHeight: {
							xs: "97vh",
							sm: "unset",
						},
					},
				}}
			>
				<DialogTitle>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"flex-end"}
						columnGap={1}
					>
						<ButtonGroup>
							<Button
								color={"info"}
								variant={"contained"}
								size={"small"}
								startIcon={<MdOutlinePrint />}
								onClick={handlePrint}
							>
								Print
							</Button>
							<Button
								color={"black"}
								variant={"contained"}
								size={"small"}
								// startIcon={<MdOutlinePrint />}
								onClick={() =>
									print(
										invoice.info?.id
											? "invoice-" + invoice.info?.id
											: "invoice-" + Date.now(),
										"jsx-template"
									)
								}
							>
								Download
							</Button>
						</ButtonGroup>
						<IconButton
							onClick={onClose}
							size={"small"}
							color={"error"}
						>
							<MdClose />
						</IconButton>
					</Stack>
				</DialogTitle>
				<Divider />
				<Preview id={"jsx-template"}>
					<Box ref={printRef}>
						<DialogContent>
							<PrintableArea />
						</DialogContent>
					</Box>
				</Preview>
			</Dialog>
		</>
	);
};

const PrintableArea = ({ ...others }) => {
	const invoice = React.useContext(invoiceContext);
	console.log(invoice.info);
	return invoice.info ? (
		<React.Fragment {...others}>
			{/* <Typography variant="button">Invoice</Typography> */}
			<Grid
				container
				sx={{
					mt: 2,
				}}
			>
				<Grid
					item
					xs={4}
				>
					<Avatar
						src={"/favicon.svg"}
						variant={"square"}
						sx={{
							height: "100px",
							width: "100px",
							background: "transparent",
							borderColor: "none",
						}}
					/>
				</Grid>
				<Grid
					item
					xs={8}
					sx={{
						textAlign: "right",
					}}
				>
					<Typography sx={{ fontWeight: "bold" }}>RayosBD</Typography>
					<Typography variant={"subtitle2"}>09639129215</Typography>
					<Typography variant={"subtitle2"}>rayosbd92@gmail.com</Typography>
					{/* <Typography variant={"subtitle2"}>
						Notunbag, Khilgaon, 312/46B, <br />
						Dhaka 1219, <br />
						Dhaka, Bangladesh
					</Typography> */}
				</Grid>
			</Grid>

			<Stack
				direction={"column"}
				alignItems={"flex-end"}
			>
				<Typography variant="subtitle2">
					<b>Invoice</b>#{invoice.info?.id}
				</Typography>
			</Stack>

			<Paper
				sx={{
					mt: 1,
					mb: 2,
					bgcolor: "primary.contrastText",
					px: 2,
					py: 1.5,
				}}
				elevation={0}
			>
				<Grid container>
					<Grid
						item
						xs={6}
					>
						<Typography
							variant="button"
							sx={{
								fontWeight: "bold",
							}}
						>
							bill to
						</Typography>
						<Box
							sx={{
								mt: 1,
							}}
						/>
						<Typography
							variant={"subtitle2"}
							sx={{ fontWeight: "bold" }}
						>
							{invoice.info?.user?.userName}
						</Typography>
						<Typography variant={"subtitle2"}>
							{invoice.info?.shipping?.address}
						</Typography>
						<Typography variant={"subtitle2"}>
							{invoice.info?.shipping?.phone}
						</Typography>
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							textAlign: "right",
						}}
					>
						<Typography variant={"subtitle2"}>
							<b>Invoice Date:</b> {moment().format("ll")}
						</Typography>
					</Grid>
				</Grid>
			</Paper>

			<TableContainer>
				<Table
					sx={{
						"& tr:last-child th": {
							border: "none",
						},
					}}
				>
					<TableHead
						sx={{
							bgcolor: "primary.contrastText",
						}}
					>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: "bold",
								}}
							>
								Item Description
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
								}}
							>
								Quantity
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
								}}
							>
								Price
							</TableCell>
							<TableCell
								align="right"
								sx={{
									fontWeight: "bold",
								}}
							>
								Amount
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{invoice.info?.products?.map((cart) => {
							return (
								<TableRow key={cart.id}>
									<TableCell
										sx={{
											width: "60%",
										}}
									>
										<b>{cart.product.titleEn}</b>
										<br />
										<Typography
											variant={"subtitle2"}
											sx={{ pt: 0.7 }}
										>
											{cart.variant.titleEn}{" "}
											{cart.canceledOrReturned && (
												<Chip
													label={cart.canceledOrReturned}
													size="small"
													variant="outlined"
												/>
											)}
										</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{
											minWidth: "fit-content",
										}}
									>
										{cart.quantity}
									</TableCell>
									<TableCell
										align="center"
										sx={{
											minWidth: "fit-content",
										}}
									>
										{cart.sellPrice} ৳
									</TableCell>
									<TableCell
										align="right"
										sx={{
											minWidth: "fit-content",
										}}
									>
										{cart.price * cart.quantity} ৳
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{!invoice.info?.products?.length && (
				<Alert
					severity="error"
					sx={{
						mt: 1,
						width: "100%",
					}}
				>
					No Carts Found!!
				</Alert>
			)}

			<Grid
				container
				sx={{
					mt: 5,
				}}
			>
				<Grid
					item
					xs={8}
				></Grid>
				<Grid
					item
					xs={3}
				>
					<Typography variant={"button"}>Subtotal</Typography>
					<br />
					<Typography variant={"button"}>Delivery Fee</Typography>
					<br />
					<Typography variant={"button"}>Discount</Typography>
					<br />
					<Typography
						variant={"button"}
						sx={{ fontWeight: "bold" }}
					>
						Total
					</Typography>
				</Grid>
				<Grid
					item
					xs={1}
					sx={{
						textAlign: "right",
					}}
				>
					<Typography variant={"button"}>
						{invoice.info?.totalSellPrice} ৳
					</Typography>
					<br />
					<Typography variant={"button"}>
						{invoice.info?.shippingFee} ৳
					</Typography>
					<br />
					<Typography
						variant={"button"}
						sx={{ color: "error.main" }}
					>
						{invoice.info?.discount} ৳
					</Typography>
					<br />
					<Typography
						variant={"button"}
						sx={{ fontWeight: "bold" }}
					>
						{invoice.info?.total} ৳
					</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	) : (
		<></>
	);
};

export default InvoiceDialog;
