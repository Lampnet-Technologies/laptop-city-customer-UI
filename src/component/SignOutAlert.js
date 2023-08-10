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

export default function SignOutAlert({ logOut, closeAlert }) {
  const [open, setOpen] = React.useState(true);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeAlert}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Log out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are about to log out from your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeAlert}
            style={{ color: "#009F7F", fontWeight: 600 }}
          >
            No
          </Button>
          <Button
            onClick={logOut}
            style={{ color: "#009F7F", fontWeight: 600 }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
