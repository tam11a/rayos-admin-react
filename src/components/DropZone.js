import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import ImageIcon from "../assets/ImageUploadIconPreview.svg";
import { MdDelete } from "react-icons/md";
import snackContext from "../context/snackProvider";

const DropZone = ({
  onChange,
  maxSize,
  extension,
  defaultValue,
  onDelete,
  ...others
}) => {
  const snack = React.useContext(snackContext);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: extension || [],
    // maxFiles: 1,
    minSize: 0,
    maxSize: maxSize || 5242880,
    multiple: true,
    // onError:
    onDropAccepted: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected: (rejectedFiles) => {
      snack.createSnack(rejectedFiles[0].errors[0].message, "error");
    },
  });

  const resOnChange = async (file) => {
    const res = await onChange(file);
    if (!res) {
      setFiles([]);
    }
  };

  useEffect(() => {
    if (
      files.length &&
      !(defaultValue && files[0].preview === defaultValue.preview)
    ) {
      if (typeof onChange === "function") {
        resOnChange(files);
      }
    }
  }, [files]);

  useEffect(() => {
    if (defaultValue) setFiles([defaultValue]);
  }, [defaultValue]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "125px",
        width: "125px",
        border: "2px dashed",
        borderColor: "#00000022",
        rowGap: 0.5,
        ...others.sx,
      }}
      {...others}
    >
      <DragFileHere
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isImageAdded={!!files.length}
      />
      {files.length ? (
        <Box
          sx={{
            position: "absolute",
            height: "125px",
            width: "125px",
            p: 1,
            "&:hover > div": {
              display: "flex",
            },
          }}
        >
          <Avatar
            src={files[0].preview}
            alt={files[0].name}
            style={{
              height: "108px",
              width: "108px",
              m: "12px",
              borderRadius: 0,
            }}
          />
          <Box
            sx={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              background: "#2D323Faa",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <IconButton
              color={"secondary"}
              onClick={async () => {
                if (typeof onDelete === "function") {
                  const res = await onDelete(files[0]);
                  if (res) setFiles([]);
                }
              }}
            >
              <MdDelete />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

const DragFileHere = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isImageAdded,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "15px",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {!isDragActive ? (
        <>
          {!isImageAdded && (
            <>
              <img
                src={ImageIcon}
                alt={"drag file here"}
                height={"45px"}
                style={{
                  marginLeft: "8px",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
              <Typography
                variant={"overline"}
                sx={{
                  textTransform: "capitalize",
                  color: "#aaa",
                }}
              >
                Drag File Here
              </Typography>
            </>
          )}
        </>
      ) : (
        <>
          <Typography
            variant={"overline"}
            sx={{
              textTransform: "capitalize",
              color: "#666",
            }}
          >
            DROP HERE!
          </Typography>
        </>
      )}
    </div>
  );
};

export default DropZone;
