import { Button } from "@mui/material";
import React from "react";

const ButtonBasic: React.FC<any> = (props: any) => {
  return (
    <Button {...props} variant="text">
      {props.children}
    </Button>
  );
};

export default ButtonBasic;
