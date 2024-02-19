import { Card, CardContent, CardHeader } from "@mui/material";
import React, {
  forwardRef,
  ForwardedRef,
  useState,
  useImperativeHandle,
  createContext,
} from "react";
import ModalBasic from "../modalbasic/ModalBasic";
import Styles from "./DashbordBasic.module.sass";


export const contextDashbordBasic = createContext<any>({
  data: {
    id: 0
  },
  handleOpenModal: () => {},
  handleCloseModal: (any: any) => {},
});

const DashbordBasic = forwardRef((props: any, ref: ForwardedRef<any>) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleOpenModal = (params: any) => {
    if (props.modalCallBackOpen) {
      props.modalCallBackOpen();
    }
    setData(params);
    setOpen(true);
  };

  const handleCloseModal = (event: any) => {
    setOpen(false);
    if (props.modalCallBackOnClose) {
      props.modalCallBackOnClose(event);
    }
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
    handleCloseModal,
  }));

  return (
    <contextDashbordBasic.Provider
      value={{ data: data || {}, handleOpenModal, handleCloseModal }}
    >
      <Card elevation={3}>
        <CardHeader
          sx={{ display: props.title ? "" : "none" }}
          className={Styles.cardheader}
          title={props.title}
        />
        <CardContent>{props.children}</CardContent>
        <ModalBasic
          open={open}
          onClose={handleCloseModal}
          title={props.title}
          {...(props.modalProps ? props.modalProps : {})}
        >
          {props.modalComponents }
        </ModalBasic>
      </Card>
    </contextDashbordBasic.Provider>
  );
});

export default DashbordBasic;
