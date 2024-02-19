import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PropsSelectAutoComplete } from "./type";

const SelectAutoComplete: React.FC<PropsSelectAutoComplete> = ({
  rules,
  name,
  sm,
  ...props
}) => {
  const copys = {
    general: {
      loading: "Cargando...",
    },
    formHelperText: {
      required: "Este campo es obligatorio.",
    },
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid item sm={sm || "auto"}>
      <FormControl
        error={!!errors[name]}
        fullWidth
        sx={{ flex: 1, ...props.sx }}
      >
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value }, fieldState }) => {
            let newValue = value
              ? props.options.filter(
                  (f: any) => String(f.value) === String(value)
                )[0]
              : value;
            return (
              <Autocomplete
                {...props}
                getOptionLabel={(option: any) => {
                  return option.name ? option.name : "";
                }}
                disableClearable
                openOnFocus={true}
                options={props.options}
                value={newValue || null}
                onChange={(event, values: any) => {
                  try {
                    onChange(values.value);
                    if (props.onChange) {
                      props.onChange({ target: { value: values.value } });
                    }
                  } catch (error) {
                    console.warn(error);
                  }
                }}
                fullWidth
                loading={true}
                loadingText={copys.general.loading}
                renderInput={(params) => {
                  return (
                    <>
                      <FormLabel>{props.label}</FormLabel>
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        error={!!errors[name]}
                      />
                      <FormHelperText>
                        {errors[name]?.type === "required" && (
                          <span>{copys.formHelperText.required}</span>
                        )}
                      </FormHelperText>
                    </>
                  );
                }}
              />
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default SelectAutoComplete;
