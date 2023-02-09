import {
	Avatar,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";
import {
	useAddProductToDiscount,
	useSearchToAddDiscount,
} from "../../query/discount";
import { getAttachment } from "../../service/instance";
import { IoIosImages } from "react-icons/io";
import { responseHandler } from "../../utilities/response-handler";
import snackContext from "../../context/snackProvider";

const AddNewProductDialog = ({ discount, onClose }) => {
	const [search, setSearch] = React.useState("");
	const snack = React.useContext(snackContext);
	const { data } = useSearchToAddDiscount({ search, discount });

	const { mutateAsync: uploadProduct } = useAddProductToDiscount();

	const addProductToDiscount = async (id) => {
		const res = await responseHandler(() =>
			uploadProduct({ id: discount, products: id })
		);
		if (res.status) snack.createSnack(res.msg);
		else snack.createSnack(res.msg, "error");
	};
	return (
		<Dialog
			open={true}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: "95vw",
				},
			}}
		>
			<DialogTitle>
				<InputBase
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search to Add"
					fullWidth
					endAdornment={
						<IconButton onClick={onClose}>
							<MdClose />
						</IconButton>
					}
				/>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<List>
					{data?.map?.((product) => (
						<ListItem
							key={product._id}
							sx={{ columnGap: 1 }}
						>
							<Avatar
								variant="rounded"
								src={getAttachment(product.image)}
								sx={{
									bgcolor: "transparent",
									color: (theme) => `${theme.palette.primary.main} !important`,
									border: "1px solid #eee",
								}}
							>
								<IoIosImages />
							</Avatar>
							<ListItemText
								primary={product.titleEn}
								primaryTypographyProps={{
									noWrap: true,
								}}
							/>
							<IconButton onClick={() => addProductToDiscount(product._id)}>
								<MdAdd />
							</IconButton>
						</ListItem>
					))}
				</List>
			</DialogContent>
		</Dialog>
	);
};

export default AddNewProductDialog;
