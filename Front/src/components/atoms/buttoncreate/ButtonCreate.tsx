import { Button } from "@mui/material";
import React from "react";
import Styles from "./ButtonCreate.module.sass";
import AddIcon from "@mui/icons-material/Add";

const ButtonCreate: React.FC<any>= (props: any) => {
  return (
    <Button {...props} variant="contained" className={Styles["primary"]}>
      <AddIcon />
      {props.children}
    </Button>
  );
};

export default ButtonCreate;
