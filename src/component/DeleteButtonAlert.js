import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteButtonAlert({ setter, deleteItem }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setter(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Remove from cart"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to remove this item from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="space-x-6 mb-2 mx-4">
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              color: "#009F7F",
              fontWeight: 600,
              border: "1px solid #009F7F",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteItem}
            variant="outlined"
            sx={{
              color: "#ef4444",
              fontWeight: 600,
              border: "1px solid #f87171",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {" "}
            <i className="bx bxs-trash text-[20px]"></i> Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
