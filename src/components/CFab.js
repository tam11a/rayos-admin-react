import { styled } from "@mui/material/styles";
import { Fab } from "@mui/material";

const CFab = styled(Fab)(({ theme }) => ({
  boxShadow: "unset",
  border: "2px solid #00000011",
  borderRadius: "2px",
  background: "transparent",
  width: "35px",
  height: "30px",
}));

export default CFab;
