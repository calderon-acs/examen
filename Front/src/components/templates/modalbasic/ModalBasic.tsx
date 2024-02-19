import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "./ModalBasic.module.sass";

const ModalBasic: React.FC<any> = (props: any) => {
  return (
    <>
      {props.open ? (
        <Dialog {...props} open={props.open} fullWidth={true}>
          {props.fullScreen && (
            <AppBar
              position="static"
              className={Styles["appbar"]}
              sx={{ display: props.fullScreen ? "" : "none" }}
            >
              <Toolbar>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="span"
                >
                  {props.title}
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={props.onClose}
                  aria-label="close"
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          {!props.fullScreen && <DialogTitle>{props.title}</DialogTitle>}

          {props.subtitle}
          <DialogContent
            sx={{
              position: "relative",
              minHeight: "200px",
            }}
          >
            {props.children}
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalBasic;
