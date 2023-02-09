import {
	Avatar,
	Chip,
	Container,
	Grid,
	IconButton,
	InputBase,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { IoMdEye } from "react-icons/io";
import StateViewer from "../../components/StateViewer";
import DataTable from "../../components/DataTable";
import { useGetAllOrder } from "../../query/order";
import tableOptionsStyle from "../../style/tableOptions";
import { useInvoice } from "../../context/invoiceProvider";
import { getAttachment } from "../../service/instance";
import { Link } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";
import OrderStatus from "../../components/OrderStatus";
import { useGetOrderStats } from "../../query/stats";
import usePaginate from "../../hooks/usePaginate";

const Index = () => {
	const { showInvoice } = useInvoice();

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

	const { data, isLoading } = useGetAllOrder(getQueryParams());
	const { data: orderStats } = useGetOrderStats();

	const cols = [
		{
			headerName: "",
			field: "show_info",
			width: 100,
			align: "center",
			headerAlign: "center",
			renderCell: (d) => (
				<>
					<IconButton
						component={Link}
						size={"small"}
						color={"primary"}
						to={`/order-details/${d.row?._id}`}
					>
						<FaSlackHash />
					</IconButton>
				</>
			),
			sortable: false,
		},
		{
			headerName: "Name",
			headerAlign: "left",
			align: "left",
			field: "receiver_name",
			flex: 1,
			minWidth: 150,
			sortable: false,
			renderCell: (params) => (
				<Chip
					avatar={
						<Avatar
							alt={params.row?.user?.userName}
							src={getAttachment(params.row?.user?.image)}
						/>
					}
					label={params.row.user.userName}
					variant="outlined"
					to={`/customer/${params.row?.user?._id}`}
					component={Link}
					onClick={() => {}}
				/>
			),
		},
		{
			headerName: "Reciepent Phone",
			headerAlign: "center",
			align: "center",
			field: "phone",
			width: 120,
			sortable: false,
			renderCell: (params) => {
				return <Typography>{params.row.shipping?.phone || "-"}</Typography>;
			},
		},

		{
			headerName: "Order Date",
			headerAlign: "center",
			align: "center",
			field: "createdAt",
			width: 170,
			headerAlign: "center",
			renderCell: (params) => {
				return (
					<Typography variant={"subtitle2"}>
						{moment(params.row.createdAt).format("lll")}
					</Typography>
				);
			},
		},
		{
			headerName: "Status",
			headerAlign: "center",
			align: "center",
			field: "status",
			width: 120,
			headerAlign: "center",
			align: "center",
			renderCell: (d) => (
				<OrderStatus
					id={d.row._id}
					status={d.row.status}
					size={"small"}
				/>
			),
			sortable: false,
		},
		{
			headerName: "Method",
			headerAlign: "center",
			align: "center",
			field: "paymentMethod",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			headerName: "Subtotal",
			headerAlign: "center",
			align: "center",
			field: "totalSellPrice",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			headerName: "Delivery Fee",
			headerAlign: "center",
			align: "center",
			field: "shippingFee",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			headerName: "Voucher",
			headerAlign: "center",
			align: "center",
			field: "voucher",
			align: "center",
			headerAlign: "center",
			sortable: false,
			renderCell: (params) => params.row?.voucher || "-",
		},
		{
			headerName: "Discount",
			headerAlign: "center",
			align: "center",
			field: "discount",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			headerName: "Total Price",
			headerAlign: "center",
			align: "center",
			field: "total",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		// {
		//   headerName: "Action",
		//   headerAlign: "center",
		//   align: "center",
		//   field: "action",
		//   width: 200,
		//   headerAlign: "center",
		//   renderCell: (d) => {
		//     return (
		//       <>
		//         <Select
		//           size={"small"}
		//           value={d.row.status}
		//           disabled={
		//             d.row.status === "Returned" || d.row.status === "Canceled"
		//           }
		//           fullWidth
		//         >
		//           <MenuItem value={"Pending"} disabled>
		//             Pending
		//           </MenuItem>
		//           <MenuItem
		//             value={"Confirmed"}
		//             disabled={d.row.status === "Confirmed"}
		//           >
		//             Confirmed
		//           </MenuItem>
		//           <MenuItem value={"Shipped"} disabled={d.row.status === "Shipped"}>
		//             Shipped
		//           </MenuItem>
		//           <MenuItem
		//             value={"Delivered"}
		//             disabled={d.row.status === "Delivered"}
		//           >
		//             Delivered
		//           </MenuItem>
		//           <MenuItem
		//             value={"Canceled"}
		//             disabled={d.row.status === "Canceled"}
		//           >
		//             Canceled
		//           </MenuItem>
		//           <MenuItem
		//             value={"Returned"}
		//             disabled={d.row.status === "Returned"}
		//           >
		//             Returned
		//           </MenuItem>
		//         </Select>
		//       </>
		//     );
		//   },
		//   sortable: false,
		// },
		{
			headerName: "Invoice",
			headerAlign: "center",
			align: "center",
			field: "invoice_print",
			align: "center",
			headerAlign: "center",
			renderCell: (d) => {
				return (
					<>
						<IconButton
							size={"small"}
							onClick={() => {
								showInvoice(d.row._id);
							}}
						>
							<IoMdEye />
						</IconButton>
					</>
				);
			},
			sortable: false,
		},
	];

	return (
		<>
			<Container
				sx={{
					py: 2,
				}}
			>
				<StateViewer
					stateList={[
						{
							num: orderStats?.data?.data?.total,
							title: "Total order",
						},
						{
							num: orderStats?.data?.data?.confirmed,
							title: "Confirmed",
						},
						{
							num: orderStats?.data?.data?.pending,
							title: "pending",
						},
						{
							num: orderStats?.data?.data?.shipped,
							title: "Shipped",
						},
						{
							num: orderStats?.data?.data?.delivered,
							title: "Deliverd",
						},
						{
							num: orderStats?.data?.data?.returned,
							title: "Returned",
						},
						{
							num: orderStats?.data?.data?.canceled,
							title: "Canceled",
						},
					]}
				/>

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
						<Grid
							item
							xs={12}
							sm={8.7}
						>
							<InputBase
								placeholder="Search Order"
								sx={tableOptionsStyle}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								fullWidth
							/>
						</Grid>
						{/* <Grid item xs={12} sm={5.9} md={3}>
              <Select
                sx={{
                  ...tableOptionsStyle,
                }}
                value={"x"}
                disabled
                fullWidth
              >
                <MenuItem value={"x"}>Filter</MenuItem>
              </Select>
            </Grid> */}
						<Grid
							item
							xs={12}
							sm={3}
						>
							<Select
								sx={{
									...tableOptionsStyle,
								}}
								value={watch("status") || "null"}
								onChange={(e) => {
									setFilterField(
										"status",
										e.target.value === "null" ? undefined : e.target.value
									);
								}}
								fullWidth
							>
								<MenuItem
									value={"null"}
									selected
								>
									All
								</MenuItem>
								<MenuItem
									value={"Pending"}
									disabled={watch("status") === "Pending"}
								>
									Pending
								</MenuItem>
								<MenuItem
									value={"Confirmed"}
									disabled={watch("status") === "Confirmed"}
								>
									Confirmed
								</MenuItem>
								<MenuItem
									value={"Shipped"}
									disabled={watch("status") === "Shipped"}
								>
									Shipped
								</MenuItem>
								<MenuItem
									value={"Delivered"}
									disabled={watch("status") === "Delivered"}
								>
									Delivered
								</MenuItem>
								<MenuItem
									value={"Canceled"}
									disabled={watch("status") === "Canceled"}
								>
									Canceled
								</MenuItem>
								<MenuItem
									value={"Returned"}
									disabled={watch("status") === "Returned"}
								>
									Returned
								</MenuItem>
							</Select>
						</Grid>
					</Grid>
				</Paper>
				<DataTable
					columns={cols}
					rows={data?.data?.data || []}
					isLoading={isLoading}
					paginationMode={"server"}
					rowCount={data?.data?.total || 0}
					page={page}
					onPageChange={setPage}
					pageSize={limit}
					onPageSizeChange={setLimit}
				/>
			</Container>
		</>
	);
};

export default Index;
