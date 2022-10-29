import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const CPaper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  boxShadow: "unset",
  border: "2px solid #00000011",
}));

export default CPaper;
