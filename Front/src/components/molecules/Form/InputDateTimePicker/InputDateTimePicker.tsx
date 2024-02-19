import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Controller, useController, useFormContext } from "react-hook-form";
import "moment/locale/es-mx";
import { Grid, Input } from "@mui/material";

const InputDateTimePicker: React.FC<any> = (props: any) => {
  const copys = {
    general: {},
    formHelperText: {
      required: "Este campo es obligatorio.",
      pattern: "El campo no cumple con el formato adecuado.",
    },
  };

  const {
    formState: { errors },
    getValues,
  } = useFormContext();
  useController({
    name: props.name,
    rules: {
      ...props.rules,
      pattern: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
    },
  });

  return (
    <Grid item sm={props.sm ? props.sm : "auto"}>
      <Controller
        defaultValue={props.defaultValue || null}
        name={props.name}
        rules={{
          ...props.rules,
          pattern: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return props.readOnly !== "true" ? (
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale="es-mx"
            >
              <DateTimePicker {...props}
                label={props.label}
                inputRef={ref}
                value={value}
                onChange={(event) => {
                  onChange(event);
                  if (props.onChange) {
                    props.onChange(event);
                  }
                }}
                format={props.format || "DD-MM-YYYY h:mm a"}
                views={["year", "month", "day", "hours", "minutes"]}
                disabled={props.disabled}
                minDate={props.minDate || null}
                maxDate={props.maxDate || null}
                minDateTime={props.minDateTime || null}
                maxDateTime={props.maxDateTime || null}
                slotProps={{
                  textField: {
                    error: !!errors[props.name],
                    variant: "standard",
                    label: props.label,
                    placeholder: "",
                    fullWidth: true,
                    InputLabelProps: {
                      ...{
                        shrink: true,
                        sx: {
                          ...{ position: "relative", transform: "inherit" },
                        },
                      },
                    },
                    helperText:
                      errors[props.name]?.type === "required"
                        ? copys.formHelperText.required
                        : errors[props.name]?.type === "pattern"
                          ? copys.formHelperText.pattern
                          : "",
                  },
                }}
              />
            </LocalizationProvider>
          ) : (
            <Input readOnly={true} value={getValues(props.name)} />
          );
        }}
      />
    </Grid>
  );
};

export default InputDateTimePicker;
