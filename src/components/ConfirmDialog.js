import React from "react";

// material ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = ({
  open,
  setOpen,
  title,
  content,
  yes,
  no,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{no}</Button>
        <Button onClick={onConfirm} autoFocus>
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
