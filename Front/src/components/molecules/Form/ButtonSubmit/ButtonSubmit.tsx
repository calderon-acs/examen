import React from "react";
import { Button, FormControl, FormLabel } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

export const ButtonSubmit: React.FC<any> = (props: any) => {
  const copys: any = {
    //
  };

  return (
    <FormControl fullWidth sx={{ flex: 1 }}>
      <FormLabel>&nbsp; </FormLabel>
      <LoadingButton {...props}>{props.children || "SAplicar"} </LoadingButton>
    </FormControl>
  );
};
