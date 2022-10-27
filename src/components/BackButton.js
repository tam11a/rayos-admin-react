import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import CFab from "./CFab";

const BackButton = ({ primary, secondary, to, ...others }) => {
  return (
    <ListItem {...others} disablePadding>
      <ListItemIcon>
        <CFab size={"small"} color={"default"} component={Link} to={to}>
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
