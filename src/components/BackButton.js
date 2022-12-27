import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CFab from "./CFab";

const BackButton = ({ primary, secondary, to, ...others }) => {
  const navigate = useNavigate();
  return (
    <ListItem {...others} disablePadding sx={{ mx: 1 }}>
      <ListItemIcon sx={{ minWidth: "45px" }}>
        <CFab
          size={"small"}
          sx={{ p: 0 }}
          color={"default"}
          onClick={() => {
            navigate(-1);
          }}
        >
          <BiArrowBack />
        </CFab>
      </ListItemIcon>
      <ListItemText
        // disableTypography={true}
        primary={primary}
        primaryTypographyProps={{ variant: "caption", color: "black.light" }}
        secondary={secondary}
        secondaryTypographyProps={{
          variant: "h6",
          color: "black.dark",
          fontWeight: "500",
          lineHeight: "20px",
        }}
      />
    </ListItem>
  );
};

export default BackButton;
