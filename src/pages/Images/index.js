import { Container, Typography } from "@mui/material";
import React from "react";
import CPaper from "../../components/CPaper";
import DropZone from "../../components/DropZone";
import snackContext from "../../context/snackProvider";
import {
  useDeleteFeedImage,
  useGetAllFeedImages,
  usePostFeedImage,
} from "../../query/attachments";
import { getAttachment } from "../../service/instance";
import { responseHandler } from "../../utilities/response-handler";

const Index = () => {
  const snack = React.useContext(snackContext);
  const [feedImages, setFeedImages] = React.useState([]);
  const { data: feedImageData } = useGetAllFeedImages();

  const { mutateAsync: deleteFeedImage } = useDeleteFeedImage();

  const deleteImage = async (id) => {
    const res = await responseHandler(() => deleteFeedImage(id));
    if (res.status) {
      snack.createSnack(res.msg);
    } else {
      snack.createSnack(res.msg, "error");
    }
  };

  const { mutateAsync: postFeedImage } = usePostFeedImage();

  const postImage = async (images) => {
    const res = await responseHandler(
      () =>
        postFeedImage({
          "Files[]": images,
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
        <Typography variant={"h5"} fontWeight={"600"}>
          News Feed
        </Typography>
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
          }}
        >
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

export default Index;
