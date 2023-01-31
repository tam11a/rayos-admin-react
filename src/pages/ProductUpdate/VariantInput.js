import { IconButton, InputBase, ListItem, Stack } from "@mui/material";
import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import ButtonSwitch from "../../components/ButtonSwitch";
import snackContext from "../../context/snackProvider";
import { useToggleVariant, useUpdateVariant } from "../../query/product";
import tableOptionsStyle from "../../style/tableOptions";
import { responseHandler } from "../../utilities/response-handler";

const VariantInput = ({ variant }) => {
	const snack = React.useContext(snackContext);
	const [data, setData] = React.useState(variant);

	React.useEffect(() => setData(variant), [variant]);

	const { mutateAsync: updateVariant } = useUpdateVariant();

	const update = async () => {
		const res = await responseHandler(
			() =>
				updateVariant({
					id: variant?._id,
					data: {
						titleEn: data?.titleEn,
						quantity: data?.quantity,
					},
				}),
			[200]
		);
		if (res.status) {
			setData(res?.data);
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	const { mutateAsync: toggleProduct, isLoading } = useToggleVariant();

	const updateState = async (id) => {
		const res = await responseHandler(() => toggleProduct(id));
		if (res.status) snack.createSnack(res.msg);
		else snack.createSnack(res.msg, "error");
	};

	return (
		<Stack
			direction={"row"}
			columnGap={1}
			sx={{
				width: "100%",
			}}
		>
			<InputBase
				sx={tableOptionsStyle}
				placeholder={"Variant Name"}
				value={data?.titleEn}
				endAdornment={
					<>
						<ButtonSwitch
							color={"success"}
							checked={variant?.isActive}
							onClick={() => updateState(variant._id)}
							disabled={isLoading}
						/>
					</>
				}
				fullWidth
				onChange={(e) =>
					setData({
						...data,
						titleEn: e.target.value,
					})
				}
			/>
			<InputBase
				placeholder="Quantity"
				value={data?.quantity}
				sx={tableOptionsStyle}
				onChange={(e) =>
					setData({
						...data,
						quantity: e.target.value,
					})
				}
				fullWidth
				endAdornment={
					<>
						{(data?.titleEn !== variant?.titleEn ||
							data?.quantity !== variant?.quantity) && (
							<IconButton
								size={"small"}
								color={"success"}
								onClick={() => update()}
							>
								<IoCheckmarkDoneOutline />
							</IconButton>
						)}
					</>
				}
			/>
		</Stack>
	);
};

export default VariantInput;
