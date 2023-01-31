import {
	Button,
	Container,
	Grid,
	ListItem,
	MenuItem,
	Select,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import ButtonSwitch from "../../components/ButtonSwitch";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import InputBox from "../../components/InputBox";
import ShowError from "../../components/ShowError";
import snackContext from "../../context/snackProvider";
import { usePostImage } from "../../query/attachments";
import {
	useGetAllCategory,
	useGetSubCategoryFromCatID,
} from "../../query/category";
import {
	useGetProductByID,
	useToggleProduct,
	useUpdateProduct,
} from "../../query/product";
import { getAttachment } from "../../service/instance";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";
import { BiStore } from "react-icons/bi";

const Info = () => {
	const snack = React.useContext(snackContext);
	const { pid } = useParams();
	const {
		register,
		getValues,
		reset,
		watch,
		formState: { errors, isDirty },
	} = useForm();

	const [params] = React.useState({
		limit: 1000,
		page: 1,
		filters: [],
	});

	const { data: productInfo } = useGetProductByID(pid);

	const { mutateAsync: updateProduct, isLoading: updateLoading } =
		useUpdateProduct();
	const { mutateAsync: postImage } = usePostImage();
	const { data: catData } = useGetAllCategory(params);
	const { data: subCatData } = useGetSubCategoryFromCatID(
		watch("category"),
		params
	);
	const { mutateAsync: toggleProduct } = useToggleProduct();

	const updateState = async (id) => {
		const res = await responseHandler(() => toggleProduct(id));
		if (res.status) snack.createSnack(res.msg);
		else snack.createSnack(res.msg, "error");
	};

	React.useEffect(() => {
		if (!productInfo) return;

		if (!isDirty)
			reset({
				titleEn: productInfo?.data?.data?.titleEn,
				titleBn: productInfo?.data?.data?.titleBn,
				descriptionEn: productInfo?.data?.data?.descriptionEn,
				descriptionBn: productInfo?.data?.data?.descriptionBn,
				buyPrice: productInfo?.data?.data?.buyPrice,
				variantType: productInfo?.data?.data?.variantType,
				sellPrice: productInfo?.data?.data?.sellPrice,
				category: productInfo?.data?.data?.category?._id,
				subcategory: productInfo?.data?.data?.subcategory?._id,
			});
	}, [productInfo]);

	const uploadProductIcon = async (data) => {
		const res = await responseHandler(() => postImage(data), [201]);
		if (res.status)
			await handleUpdate({
				image: res.data?.[0]?._id,
			});
		else snack.createSnack(res.msg, "error");
	};

	const handleUpdate = async (data) => {
		const res = await responseHandler(
			() => updateProduct({ product_id: pid, data }),
			[200]
		);
		if (res.status) {
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	return (
		<Container>
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
					md={6.9}
				>
					<Typography
						variant={"h6"}
						sx={{ fontWeight: "500" }}
					>
						Information
					</Typography>

					<CPaper>
						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<DropZone
								defaultValue={
									productInfo?.data?.data?.image && {
										preview: getAttachment(productInfo?.data?.data?.image),
									}
								}
								onChange={uploadProductIcon}
								onDelete={() => true}
							/>
							<Tooltip
								title="deactivate"
								placement="top"
							>
								<ButtonSwitch
									checked={productInfo?.data?.data?.isActive}
									color={"success"}
									onClick={() => {
										updateState(productInfo?.data?.data?._id);
									}}
								/>
							</Tooltip>
						</Stack>
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							<Typography>Name</Typography>
							<InputBox
								fullWidth
								placeholder="Enter Product Name"
								{...register("titleEn")}
							/>
							<ShowError err={errors.titleEn} />
						</ListItem>
						{/* <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
                p: 0,
              }}
            >
              <Typography>Name (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Product Name (Bengali)"
                {...register("titleBn")}
              />
              <ShowError err={errors.titleBn} />
            </ListItem> */}
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							<Typography>Description</Typography>
							<InputBox
								fullWidth
								placeholder="Enter Product Description"
								{...register("descriptionEn")}
								multiline={true}
								minRows={5}
							/>
							<ShowError err={errors.descriptionEn} />
						</ListItem>
						{/* <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: 1,
                p: 0,
              }}
            >
              <Typography>Description (Bengali)</Typography>
              <InputBox
                fullWidth
                placeholder="Enter Prooduct Description (Bengali)"
                {...register("descriptionBn")}
                multiline={true}
                minRows={5}
                maxRows={6}
              />9
              <ShowError err={errors.descriptionBn} />
            </ListItem> */}
					</CPaper>
				</Grid>
				<Grid
					item
					xs={12}
					md={4.9}
				>
					<Typography
						variant={"h6"}
						sx={{ fontWeight: "500" }}
					>
						Additional Information
					</Typography>
					<CPaper>
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							Store
							<Button
								sx={{
									...tableOptionsStyle,
									justifyContent: "flex-start",
									textTransform: "unset",
									px: 2,
									mb: 1,
								}}
								startIcon={<BiStore />}
								component={Link}
								to={`/store/${productInfo?.data?.data?.store?._id}?tab=products`}
								fullWidth
							>
								{productInfo?.data?.data?.store?.titleEn}
							</Button>
						</ListItem>
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							Category
							<Select
								sx={tableOptionsStyle}
								placeholder={"Select Category"}
								fullWidth
								{...register("category")}
								value={watch("category") || "null"}
							>
								<MenuItem
									value={"null"}
									disabled
								>
									Select Category
								</MenuItem>
								{catData?.data?.data?.map((cat) => (
									<MenuItem
										key={cat._id}
										value={cat._id}
									>
										{cat.titleEn}
									</MenuItem>
								))}
							</Select>
							<ShowError err={errors.category} />
						</ListItem>
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							Sub Category
							<Select
								sx={tableOptionsStyle}
								placeholder={"Select Sub Category"}
								disabled={!subCatData?.data?.total}
								fullWidth
								{...register("subcategory")}
								value={watch("subcategory") || "null"}
							>
								<MenuItem
									value={"null"}
									disabled
								>
									Select Sub Category
								</MenuItem>
								{subCatData?.data?.data?.map((cat) => (
									<MenuItem
										key={cat._id}
										value={cat._id}
									>
										{cat.titleEn}
									</MenuItem>
								))}
							</Select>
							<ShowError err={errors.subcategory} />
						</ListItem>
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							<Typography>BuyPrice</Typography>
							<InputBox
								fullWidth
								placeholder="Enter Buy Price"
								{...register("buyPrice")}
							/>
							<ShowError err={errors.buyPrice} />
						</ListItem>
						<ListItem
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								rowGap: 1,
								p: 0,
							}}
						>
							<Typography>Sell Price</Typography>
							<InputBox
								fullWidth
								placeholder="Enter Sell Price"
								{...register("sellPrice")}
							/>
							<ShowError err={errors.sellPrice} />
						</ListItem>
					</CPaper>
					<Button
						variant={"contained"}
						color={"primary"}
						size={"large"}
						sx={{
							height: "52px",
							my: 1,
						}}
						type={"submit"}
						disabled={updateLoading || updateLoading || !isDirty}
						onClick={() => {
							handleUpdate(getValues());
						}}
						fullWidth
					>
						Update Product
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Info;
