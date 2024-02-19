import { Box, Grid } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import { FormBasicProps } from "./types";

const FormBasic: React.FC<FormBasicProps> = ({ methods, ...props }) => {
  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        className="form-horizontal"
        style={{ width: "100%" }}
      >
        <Box sx={{ display: { sm: "flex" }, ...{ ...props.boxsx } }}>
          {props.container && (
            <Grid container spacing={props.spacing ? props.spacing : 2}>
              {props.children}
            </Grid>
          )}
          {!props.container && props.children}
        </Box>
      </form>
    </FormProvider>
  );
};

export default FormBasic;
