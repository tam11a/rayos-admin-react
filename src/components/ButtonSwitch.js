import { Box, Switch, styled } from "@mui/material";
import React from "react";

const ButtonSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: 44,
  height: 26,
  padding: 5,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 6,
    transform: "translateX(0px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(18px)",
    },
    "&.Mui-checked + .MuiSwitch-track": {},
  },
  "& .MuiSwitch-thumb": {
    width: 12,
    height: 12,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16,
  },
}));

export default ButtonSwitch;
