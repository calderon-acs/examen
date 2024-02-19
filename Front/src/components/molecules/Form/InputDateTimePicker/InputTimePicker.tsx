import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Controller, useController, useFormContext } from "react-hook-form";
import "moment/locale/es-mx";
import { Input } from "@mui/material";

const InputTimePicker: React.FC<any> = (props: any) => {
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
            <TimePicker
              label={props.label}
              inputRef={ref}
              value={value}
              onChange={(event) => {
                onChange(event);
                if (props.onChange) {
                  props.onChange(event);
                }
              }}
              format={props.format || "h:mm a"}
              views={["hours", "minutes"]}
              disabled={props.disabled}
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
  );
};

export default InputTimePicker;
