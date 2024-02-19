import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const SelectAutoCompleteMultiple: React.FC<any> = (props: any) => {
  const copys = {
    general: {
      loading: "Cargando...",
    },
    formHelperText: {
      required: "Este campo es obligatorio.",
    },
  };

  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Grid item sm={props.sm ? props.sm : "auto"}>
      <FormControl
        error={!!errors[props.name]}
        fullWidth
        sx={{ flex: 1, ...props.sx }}
      >
        <Controller
          control={control}
          name={props.name}
          rules={props.rules}
          render={({ field: { onChange, value, onBlur }, fieldState }) => {
            let defaultValues = props.options?.filter((item: any) =>
              value?.includes(item.value)
            );

            return (
              <Autocomplete
                {...props}
                multiple={true}
                getOptionLabel={(option: any) => {
                  return option.name ? option.name : "";
                }}
                options={props.options}
                disableCloseOnSelect
                disableClearable
                openOnFocus={true}
                fullWidth
                loading={true}
                value={defaultValues}
                loadingText={copys.general.loading}
                renderTags={(value: readonly any[], getTagProps) => {
                  return value.map((option: any, index: number) => {
                    return (
                      <Chip
                        variant="outlined"
                        label={option.name}
                        {...getTagProps({ index })}
                      />
                    );
                  });
                }}
                renderOption={(
                  propsRenderOption,
                  optionRenderOption: any,
                  { selected }
                ) => {
                  return (
                    <li {...propsRenderOption}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {optionRenderOption.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <>
                    <FormLabel>{props.label}</FormLabel>
                    <TextField
                      {...params}
                      variant="standard"
                      fullWidth
                      error={!!errors[props.name]}
                    />
                    <FormHelperText>
                      {errors[props.name]?.type === "required" && (
                        <span>{copys.formHelperText.required}</span>
                      )}
                    </FormHelperText>
                  </>
                )}
                onBlur={() => {
                  onBlur();
                  if (props.onBlur) {
                    props.onBlur();
                  }
                }}
                onChange={(event, values, typeAction, option) => {
                  let newArray = values.map((item: any) => item.value);
                  onChange(newArray);
                  if (props.onChange) {
                    setTimeout(() => {
                      props.onChange({
                        target: { value: option, values: newArray },
                      });
                    }, 1);
                  }
                }}
              />
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};
