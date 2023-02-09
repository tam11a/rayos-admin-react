import React from "react";
import {
	Button,
	Container,
	Grid,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ButtonSwitch from "../../components/ButtonSwitch";
import CPaper from "../../components/CPaper";

import InputBox from "../../components/InputBox";
import snackContext from "../../context/snackProvider";

import { responseHandler } from "../../utilities/response-handler";
import {
	useGetDiscountByID,
	useToggleDiscount,
	useUpdateDiscount,
} from "../../query/discount";
import { FiPercent } from "react-icons/fi";
import moment from "moment/moment";

const Info = () => {
	const { did } = useParams();

	const snack = React.useContext(snackContext);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm();

	const { data: discountInfo, isLoading, isError } = useGetDiscountByID(did);

	React.useEffect(() => {
		if (!discountInfo) return;

		if (!isDirty)
			reset({
				titleEn: discountInfo?.data?.data?.titleEn,
				titleBn: discountInfo?.data?.data?.titleBn,
				amount: discountInfo?.data?.data?.amount,

				descriptionEn: discountInfo?.data?.data?.descriptionEn,
				descriptionBn: discountInfo?.data?.data?.descriptionBn,
				startDate: moment(discountInfo?.data?.data?.startDate).format(
					"yyyy-MM-DD"
				),
				endDate: moment(discountInfo?.data?.data?.endDate).format("yyyy-MM-DD"),
			});
	}, [discountInfo]);

	const { mutateAsync: updateDiscount, isLoading: updateLoading } =
		useUpdateDiscount();

	const updateDiscountFunc = async (data) => {
		const res = await responseHandler(
			() => updateDiscount({ id: did, data }),
			[200]
		);
		if (res.status) snack.createSnack(res.msg);
		else snack.createSnack(res.msg, "error");
	};

	const { mutateAsync: toggleState } = useToggleDiscount();

	const updateState = async (id) => {
		const res = await responseHandler(() => toggleState(id));
		if (res.status) snack.createSnack(res.msg);
		else snack.createSnack(res.msg, "error");
	};
	return (
		<>
			<Container
				sx={{
					py: 2,
				}}
				maxWidth={"sm"}
			>
				<Grid
					item
					xs={12}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Typography
							variant={"h6"}
							sx={{ fontWeight: "500" }}
						>
							Information
						</Typography>
						<Tooltip
							title="deactivate"
							placement="top"
						>
							<ButtonSwitch
								checked={discountInfo?.data?.data?.isActive}
								color={"success"}
								onClick={() => {
									updateState(discountInfo?.data?.data?._id);
								}}
							/>
						</Tooltip>
					</Stack>
					<CPaper
						sx={{
							"& form > *": {
								mt: 1,
							},
						}}
					>
						<form onSubmit={handleSubmit(updateDiscountFunc)}>
							<Grid
								container
								rowGap={1}
								columnGap={1}
								sx={{
									mt: 2,
								}}
							>
								<Grid
									item
									xs={12}
									sm={8.9}
								>
									<Typography>Name </Typography>
									<InputBox
										fullWidth
										placeholder="Enter Name "
										{...register("titleEn", {
											//   required: true,
										})}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={2.7}
								>
									<Typography>Amount </Typography>
									<InputBox
										fullWidth
										endAdornment={<FiPercent />}
										placeholder="Enter amount "
										{...register("amount", {
											//   required: true,
										})}
									/>
								</Grid>
							</Grid>
							{/* <Typography>Name (Bengali)</Typography>
			<InputBox
			  fullWidth
			  placeholder="Enter Category Name (Bengali)"
			  {...register("titleBn")}
			/> */}
							<Typography>Description </Typography>
							<InputBox
								fullWidth
								placeholder="Enter Description "
								{...register("descriptionEn", {
									//   required: true,
								})}
								multiline={true}
								minRows={5}
								// maxRows={6}
							/>
							{/* <Typography>Description (Bengali)</Typography>
			<InputBox
			  fullWidth
			  placeholder="Enter Description (Bengali)"
			  {...register("descriptionBn")}
			  multiline={true}
			  minRows={5}
			  maxRows={6}
			/> */}
							<Grid
								container
								rowGap={1}
								columnGap={1}
								sx={{
									mt: 2,
								}}
							>
								<Grid
									item
									xs={12}
									sm={5.9}
								>
									<Typography>Start Date </Typography>
									<InputBox
										type="date"
										fullWidth
										placeholder="Enter starting date "
										{...register("startDate", {
											//   required: true,
										})}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={5.9}
								>
									<Typography>End Date </Typography>
									<InputBox
										type="date"
										fullWidth
										placeholder="Enter end date "
										{...register("endDate", {
											//   required: true,
										})}
									/>
								</Grid>
							</Grid>
							<Button
								variant={"contained"}
								color={"primary"}
								size={"large"}
								sx={{
									height: "52px",
									mt: 1,
								}}
								type={"submit"}
								fullWidth
								disabled={updateLoading || isLoading || !isDirty}
							>
								Update Category
							</Button>
						</form>
					</CPaper>
				</Grid>
			</Container>
		</>
	);
};

export default Info;
