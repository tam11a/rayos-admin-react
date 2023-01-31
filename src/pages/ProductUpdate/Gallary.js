import React from "react";
import { Container, Skeleton } from "@mui/material";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import snackContext from "../../context/snackProvider";
import { getAttachment } from "../../service/instance";
import { responseHandler } from "../../utilities/response-handler";
import { useParams } from "react-router-dom";
import {
	useDeleteProductImage,
	useGetAllProductImages,
	usePostProductImage,
} from "../../query/product";

const Gallary = () => {
	const { pid } = useParams();

	const snack = React.useContext(snackContext);
	const [feedImages, setFeedImages] = React.useState([]);
	const { data: feedImageData, isLoading } = useGetAllProductImages(pid);

	const { mutateAsync: deleteFeedImage } = useDeleteProductImage();

	const deleteImage = async (id) => {
		const res = await responseHandler(() => deleteFeedImage(id));
		if (res.status) {
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	const { mutateAsync: postProductImage } = usePostProductImage();

	const postImage = async (images) => {
		const res = await responseHandler(
			() =>
				postProductImage({
					id: pid,
					data: {
						"Files[]": images,
					},
				}),
			[201]
		);
		if (res.status) {
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	React.useEffect(() => {
		if (!feedImageData) return;
		setFeedImages(feedImageData?.data?.data || []);
	}, [feedImageData]);

	return (
		<>
			<Container
				sx={{
					py: 2,
				}}
			>
				<CPaper
					sx={{
						my: 1,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						flexWrap: "wrap",
						rowGap: 1,
						columnGap: 1,
						border: 0,
					}}
				>
					{isLoading &&
						[1, 2, 3, 4]?.map?.((x) => (
							<Skeleton
								variant="rectangular"
								height={"125px"}
								width={"125px"}
								key={x}
							/>
						))}
					{feedImages?.map?.((fimg) => (
						<React.Fragment key={fimg._id}>
							<DropZone
								defaultValue={{
									preview: getAttachment(fimg.image),
									id: fimg._id,
								}}
								onDelete={(data) => deleteImage(data.id)}
							/>
						</React.Fragment>
					))}
					<DropZone onChange={(data) => postImage(data)} />
				</CPaper>
			</Container>
		</>
	);
};

export default Gallary;
