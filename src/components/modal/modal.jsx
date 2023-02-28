import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";


export const Modal = (props) => {
  const {
    children = null,
    title = "",
    action = null,
    dialogProps = {},
    dialogTitleProps = {},
    buttonOkProps = {},
    buttonCancelProps = {},
  } = props;

  const theme = useTheme();

  const navigate = useNavigate();

  const location = useLocation()

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {};

  const handleClose = () => {
    navigate(-1);
  };


  return (
    <Dialog
      fullScreen={fullScreen}
      open
      fullWidth
      onClose={handleClose}
      
      {...dialogProps}

    >
      <DialogTitle {...dialogTitleProps}>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {action ? (
          action
        ) : (
          <>
            <Button onClick={handleClose} {...buttonCancelProps} />
            <Button
              autoFocus
              onClick={handleClose}
              variant="contained"
              {...buttonOkProps}
            />
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
