import { Alert, AlertTitle, Collapse } from "@mui/material";
import React from "react";

const ShowError = ({ err }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(!!err), [err]);
  return (
    <Collapse
      in={open}
      sx={{
        width: "100%",
      }}
    >
      <Alert
        severity="error"
        sx={{
          width: "100%",
        }}
        onClose={() => setOpen(false)}
      >
        {err?.type === "required"
          ? "This Field is Required!"
          : err?.message || "Something wrong here!"}
      </Alert>
    </Collapse>
  );
};

export default ShowError;
