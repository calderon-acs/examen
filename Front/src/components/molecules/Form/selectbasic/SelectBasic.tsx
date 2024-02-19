import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { PropsSelectBasic } from "./types";

const SelectBasic: React.FC<PropsSelectBasic> = (props: any) => {
  const copys = {
    general: {
      loading: "Cargando...",
    },
    formHelperText: {
      required: "Este campo es obligatorio.",
    },
  };

  const { getValues } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController(props);

  const handleChange = (event: any) => {
    field.onChange(event);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <Grid item sm={props.sm ? props.sm : "auto"} sx={{ ...props.sx }}>
      <FormControl
        {...props}
        variant="standard"
        sx={{ flex: 1, ...props.sx }}
        error={!!error}
        fullWidth
        loading=""
      >
        {props.default && <InputLabel>{props.label}</InputLabel>}
        {!props.default && <FormLabel>{props.label}</FormLabel>}

        {props.readOnly !== "true" ? (
          <Select {...field} {...props} loading="" onChange={handleChange}>
            {props.options &&
              !props.loading &&
              props.options.map((item: any, index: number) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            {props.loading && (
              <MenuItem value={getValues(props.name)}>
                {copys.general.loading}
              </MenuItem>
            )}
          </Select>
        ) : (
          <Input readOnly={true} value={props.display} />
        )}

        <FormHelperText>
          {error?.type === "required" && (
            <span>{copys.formHelperText.required}</span>
          )}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default SelectBasic;
