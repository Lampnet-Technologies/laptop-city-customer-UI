import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Collapse, Grow, Zoom } from "@mui/material";
import { Stack } from "@mui/material";

function CustomAlert({ open, details, close }) {
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 5000);
  }, [open]);

  return (
    <Stack
      sx={{ width: "100%", position: "fixed", top: 80, left: 0, zIndex: 1000 }}
    >
      <Grow in={open}>
        <Alert variant="filled" severity={details.severity} onClose={close}>
          <AlertTitle className="capitalize">{details.title}</AlertTitle>
          {/* This is an error alert — <strong>check it out!</strong> */}
          {details.message}
        </Alert>
      </Grow>
    </Stack>
  );
}

export default CustomAlert;
