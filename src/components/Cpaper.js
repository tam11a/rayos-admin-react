import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const CPaper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  boxShadow: "unset",
  border: "2px solid #00000011",
  "& > .MuiTypography-root": {
    margin: "10px 0",
  },
  "& > .MuiTypography-root:first-child": {
    marginTop: "0",
  },
}));

export default CPaper;
