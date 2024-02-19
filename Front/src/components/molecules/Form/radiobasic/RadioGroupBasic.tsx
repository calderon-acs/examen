import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

const RadioGroupBasic: React.FC<any> = (props: any) => {
  const copys = {
    general: {},
    formHelperText: {
      required: "Este radio es obligatorio.",
    },
  };

  const [selectedBefore, setSelectedBefore] = useState(false);
  const {
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { field } = useController(props);

  const handleOnChange = (event: any) => {
    field.onChange(event);

    setSelectedBefore(true);
    if (props.onChange) {
      props.onChange();
    }
  };

  useEffect(() => {
    let newValue = getValues(props.name);
    if ((newValue == 0 || newValue == "") && selectedBefore) {
      if (props.onChange) {
        props.onChange();
      }
    }
  }, [watch(props.name)]);

  return (
    <FormControl error={!!errors[props.name]} sx={props.sx}>
      <FormLabel>{props.label}</FormLabel>
      <RadioGroup
        {...field}
        aria-label={props.name}
        name={props.name}
        onChange={handleOnChange}
        sx={props.sx}
      >
        {props.options
          ? props.options.map((item: any, index: number) => (
              <FormControlLabel
                sx={{ backgroundColor: item.color ? item.color : "" }}
                value={item.value}
                key={item.value}
                control={<Radio />}
                label={item.name}
              />
            ))
          : props.children}
      </RadioGroup>
      <FormHelperText>
        {errors[props.name]?.type === "required" && (
          <span>{copys.formHelperText.required}</span>
        )}
      </FormHelperText>
    </FormControl>
  );
};

export default RadioGroupBasic;
