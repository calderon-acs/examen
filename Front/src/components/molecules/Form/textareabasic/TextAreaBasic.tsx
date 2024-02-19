import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TextAreaBasic: React.FC<any> = (props: any) => {
  const copys = {
    general: {},
    formHelperText: {
      required: "Este campo es obligatorio.",
      minLength: "Este campo debe tener {0} caracteres minimo.",
      maxLength: "Este campo debe tener un maximo de {0} caracteres.",
      min: "Este campo debe ser minimo {0}.",
      max: "Este campo debe ser maximo {0}.",
      pattern: "Este campo solo acepta: {0}.",
    },
  };

  const {
    formState: { errors },
  } = useFormContext();

  const { field } = useController(props);

  const getValueRule = () => {
    let nameRule = String(errors[props.name]?.type);
    let value = props.rules[nameRule];
    if (nameRule === "pattern") {
      value = "/" + String(value).split("/").join("/").split("\\").join("/");
      //console.info(value);
      if (value === "//^[a-zA-Z0-9/s]+$/") {
        value = "Letras, numeros y espacios en blanco";
      }
      if (value === "//^[0-9]+$/") {
        value = "Numeros";
      }
    }
    return value;
  };

  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState(false);
  const [inputValue, setInput] = useState<any>({});
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (props.edit) {
      if (props.Data) {
        setData({ ...props.Data });
        if (data[field.name]) {
          if (data[field.name] == field.value) {
            setEditValue(false);
          } else {
            setEditValue(true);
            setInput({ [field.name]: field.value });
          }
        }
      }
    }
  }, [field.value]);

  useEffect(() => {
    setEditValue(false);
  }, [props.Data]);

  return (
    <FormControl {...props} sx={{ flex: 1 }} error={!!errors[props.name]}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        {...field}
        multiline
        rows={3}
        onBlur={props.onBlur}
        {...props}
        disabled={props.edit && edit}
        endAdornment={
          !props.edit ? null : edit || !editValue ? (
            <IconButton
              onClick={() => (!edit ? setEdit(true) : setEdit(false))}
              color={edit ? "primary" : undefined}
            >
              <EditIcon></EditIcon>
            </IconButton>
          ) : (
            <IconButton
              onClick={() =>
                !editValue ? setEdit(true) : props.click(inputValue)
              }
              color={editValue ? "success" : undefined}
            >
              <CheckCircleIcon></CheckCircleIcon>
            </IconButton>
          )
        }
      />

      <FormHelperText>
        {errors[props.name]?.type === "required" && (
          <span>{copys.formHelperText.required}</span>
        )}
        {errors[props.name]?.type === "minLength" && (
          <span>
            {copys.formHelperText.minLength.replace("{0}", getValueRule())}
          </span>
        )}
        {errors[props.name]?.type === "maxLength" && (
          <span>
            {copys.formHelperText.maxLength.replace("{0}", getValueRule())}
          </span>
        )}
        {errors[props.name]?.type === "min" && (
          <span>{copys.formHelperText.min.replace("{0}", getValueRule())}</span>
        )}
        {errors[props.name]?.type === "max" && (
          <span>{copys.formHelperText.max.replace("{0}", getValueRule())}</span>
        )}
        {errors[props.name]?.type === "pattern" && (
          <span>
            {copys.formHelperText.pattern.replace("{0}", getValueRule())}
          </span>
        )}
      </FormHelperText>
    </FormControl>
  );
};

export default TextAreaBasic;
