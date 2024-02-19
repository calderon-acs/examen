import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { SelectMultipleProps } from "./SelectMultiple.props";

const SelectMultiple: React.FC<SelectMultipleProps> = (props: any) => {
  const copys = {
    general: {
      loading: "Cargando..",
    },
    formHelperText: {
      required: "Este campo es obligatorio.",
    },
  };

  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const { field } = useController(props);

  const [values, setValues] = React.useState<string[]>([]);
  const [all, setAll] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleChangeMulti = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;
    setValues(typeof value === "string" ? value.split(",") : value);
    setValue(event.target.name, event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  useEffect(() => {
    let values = getValues(props.name);
    if (values) {
      setValues(values);
    } else {
      setValues([]);
    }
    setLoading(props.options.length > 0 ? false : true);
  }, [props.options]);

  return (
    <Grid item sm={props.sm ? props.sm : "auto"} sx={{ ...props.sx }}>
      <FormControl
        {...props}
        variant="standard"
        sx={{ flex: 1, ...props.sx }}
        error={!!errors[props.name]}
        fullWidth
        checkall=""
      >
        {props.default && <InputLabel>{props.label}</InputLabel>}
        {!props.default && <FormLabel>{props.label}</FormLabel>}

        <Select
          {...props}
          multiple
          {...field}
          value={values}
          onChange={(event: SelectChangeEvent<typeof values>) => {
            const {
              target: { value },
            } = event;
            setValues(typeof value === "string" ? value.split(",") : value);

            if (Array.from(value).includes("")) {
              setAll(!all);
              let options = props.options.map((item: any) => {
                return item.value;
              });

              let eventCustom = {
                target: {
                  name: props.name,
                  value: all ? [] : options,
                },
              };
              setValues(all ? [] : options);
              field.onChange(eventCustom);
            } else {
              if (all) {
                setAll(false);
              }
              field.onChange(event);
            }
            if (props.onChange) {
              props.onChange(event);
            }
          }}
          renderValue={(selected: any[]) => {
            let newRender = Array.from(props.options)
              .filter((item: any) => selected.includes(item.value))
              .map((item: any) => {
                return item.name;
              });
            return newRender.join(", ");
          }}
          checkall=""
        >
          {loading && <MenuItem value="">{copys.general.loading}</MenuItem>}
          {props.checkall && !loading && (
            <MenuItem value={""} key={0}>
              <Checkbox
                checked={all}
                onChange={(event) => {
                  // let options = props.options.map((item: any) => {
                  //   return item.value;
                  // });
                  // let eventCustom = {
                  //   target: {
                  //     name: props.name,
                  //     value: options,
                  //   },
                  // };
                  // field.onChange(eventCustom);
                  // setValues(event.target.checked ? options : []);
                  //setValue(props.name, event.target.checked ? options : []);
                }}
              />
              <ListItemText primary="Todos" />
            </MenuItem>
          )}

          {props.options &&
            !loading &&
            props.options.map((item: any) => (
              <MenuItem value={item.value} key={item.value}>
                <Checkbox checked={values.indexOf(item.value) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>
          {errors[props.name]?.type === "required" && (
            <span>{copys.formHelperText.required}</span>
          )}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default SelectMultiple;
