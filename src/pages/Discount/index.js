import React from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import DataTable from "../../components/DataTable";
import { useGetAllDiscount, useToggleDiscount } from "../../query/discount";
import snackContext from "../../context/snackProvider";
import usePaginate from "../../hooks/usePaginate";
import {
	Avatar,
	Button,
	Grid,
	IconButton,
	InputBase,
	MenuItem,
	Paper,
	Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaSlackHash } from "react-icons/fa";
import moment from "moment";
import { getAttachment } from "../../service/instance";
import { IoIosImages } from "react-icons/io";
import ButtonSwitch from "../../components/ButtonSwitch";
import { responseHandler } from "../../utilities/response-handler";
import tableOptionsStyle from "../../style/tableOptions";
import CreateDiscountDrawer from "./CreateDiscount";
import { MdAdd } from "react-icons/md";

const Index = () => {
	const snack = React.useContext(snackContext);

	const [open, setOpen] = React.useState(false);
	const onClose = () => setOpen((o) => !o);
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

	const { data, isLoading } = useGetAllDiscount(getQueryParams());
	const { mutateAsync: toggleDiscount } = useToggleDiscount();

	const updateState = async (id) => {
		const res = await responseHandler(() => toggleDiscount(id));
		if (res.status) snack.createSnack(res.msg);
		else snack.createSnack(res.msg, "error");
	};
	const cols = [
		{
			headerName: "",
			headerAlign: "center",
			align: "center",
			field: "_id",
			width: 80,
			sortable: false,
			renderCell: (d) => (
				<>
					<IconButton
						component={Link}
						size={"small"}
						color={"primary"}
						to={`/discount-details/${d.row?._id}`}
					>
						<FaSlackHash />
					</IconButton>
				</>
			),
		},
		{
			headerName: "Image",
			headerAlign: "center",
			align: "center",
			field: "Icon",
			minWidth: 80,
			sortable: false,
			renderCell: (params) => (
				<Avatar
					src={getAttachment(params.row.icon)}
					variant="rounded"
					sx={{
						bgcolor: "transparent",
						color: (theme) => `${theme.palette.primary.main} !important`,
						border: "1px solid #eee",
					}}
				>
					<IoIosImages />
				</Avatar>
			),
		},
		{
			headerName: "Title",
			headerAlign: "center",
			align: "center",
			field: "titleEn",
			flex: 1,
			width: 160,
			sortable: false,
		},
		{
			headerName: "Discount",
			headerAlign: "center",
			align: "center",
			field: "amount",
			width: 120,
			sortable: false,
			renderCell: (params) => {
				return <Typography>{params.row.amount}%</Typography>;
			},
		},
		{
			headerName: "Start Date",
			headerAlign: "center",
			align: "center",
			field: "startDate",
			flex: 1,
			width: 180,
			sortable: false,
			renderCell: (params) => {
				return (
					<Typography variant={"subtitle2"}>
						{moment(params.row.startDate).format("ll")}
					</Typography>
				);
			},
		},
		{
			headerName: "End Date",
			headerAlign: "center",
			align: "center",
			field: "endDate",
			flex: 1,
			width: 180,
			sortable: false,
			renderCell: (params) => {
				return (
					<Typography variant={"subtitle2"}>
						{moment(params.row.endDate).format("ll")}
					</Typography>
				);
			},
		},
		{
			headerName: "Published",
			headerAlign: "center",
			field: "status",
			align: "center",
			width: 120,
			renderCell: (params) => (
				<ButtonSwitch
					checked={params.row?.isActive}
					color={"success"}
					onClick={() => {
						updateState(params.row?._id);
					}}
				/>
			),
		},
	];

	return (
		<Container>
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
						md={8.8}
					>
						<InputBase
							placeholder="Search Discount"
							sx={tableOptionsStyle}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={3}
					>
						<Button
							variant={"contained"}
							color={"primary"}
							size={"large"}
							sx={{
								height: "52px",
							}}
							onClick={onClose}
							startIcon={<MdAdd />}
							fullWidth
						>
							New Discount
						</Button>
						<CreateDiscountDrawer
							open={open}
							onClose={() => setOpen(!open)}
						/>
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
	);
};

export default Index;
