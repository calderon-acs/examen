import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Switch,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const SwitchBasic: React.FC<any> = (props: any) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const copys = {
    general: {},
    formHelperText: {
      required: "Este campo es obligatorio.",
    },
  };

  return (
    <Grid item sm={props.sm ? props.sm : "auto"}>
      <FormControl>
        <FormLabel>{props.label}</FormLabel>
        <Controller
          control={control}
          name={props.name}
          render={({ field: { value, ...field } }) => {
            return props.readOnly !== "true" ? (
              <Switch
                {...field}
                {...props}
                checked={!!value}
                disabled={props?.disabled}
                onChange={(event) => {
                  field.onChange(event);
                  if (props.onChange) {
                    props.onChange(event);
                  }
                }}
              />
            ) : (
              <Input readOnly={true} value={value ? "Activo" : "Desactivado"} />
            );
          }}
        />
      </FormControl>
      <FormHelperText>
        {errors[props.name]?.type === "required" && (
          <span>{copys.formHelperText.required}</span>
        )}
      </FormHelperText>
    </Grid>
  );
};

export default SwitchBasic;
