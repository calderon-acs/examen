import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  OutlinedInput,
} from "@mui/material";
import { useController } from "react-hook-form";
import { PATTERNS } from "../../../../utils/Utils";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PropsInputBasic } from "./types";

/**
 * Componente que devuelve un input customizado en estilos.

 * @param  {string} name Nombre del input.
 * @param  {string} label Representa a la etiqueta del input.
 * @param  {any} ... Se pueden pasar todos los parametros de un input de MUI.

 * @return  {React.FC}
 */
const InputBasic: React.FC<PropsInputBasic> = (props: any) => {
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
    field,
    fieldState: { error },
  } = useController(props);

  const getValueRule = () => {
    let nameRule = String(error?.type);
    let value = props.rules[nameRule];
    if (nameRule === "pattern") {
      value = "/" + String(value).split("/").join("/").split("\\").join("/");

      if (value === "//^[a-zA-Z0-9/s]+$/") {
        value = "Letras, numeros y espacios en blanco";
      }
      if (value === "//^[0-9]+$/") {
        value = "Numeros";
      }
      if (value === `/${PATTERNS.EMAIL.toString().replace(/\\/, "/")}`) {
        value = "Correo";
      }
      if (value === `/${PATTERNS.PASSWORD.toString().replace(/\\/, "/")}`) {
        value = "Letras, numeros y caracteres";
      }
    }
    return value;
  };
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState(false);
  const [inputValue, setInputValue] = useState<any>({});
  const [data, setData] = useState<any>({});

  const handleChange = (event: any) => {
    field.onChange(event);
    if (props.onChange) {
      props.onChange(event);
    }
  };
  useEffect(() => {
    if (props.edit) {
      if (props.Data) {
        setData({ ...props.Data });
        if (data[field.name]) {
          if (data[field.name] == field.value) {
            setEditValue(false);
          } else {
            setEditValue(true);
            setInputValue({ [field.name]: field.value });
          }
        }
      }
    }
  }, [field.value]);

  useEffect(() => {
    setEditValue(false);
  }, [props.Data]);
  return (
    <Grid item sm={props.sm ? props.sm : "auto"} sx={{ ...props.sx }}>
      <FormControl
        {...props}
        fullWidth
        sx={{ flex: 1, ...props.sx }}
        error={!!error}
      >
        <FormLabel>{props.label}</FormLabel>
        {props.variant === "outlined" ? (
          <OutlinedInput
            {...props}
            {...field}
            onChange={handleChange}
            inputProps={{ sx: { padding: "4px 5px" } }}
          />
        ) : (
          <Input
            {...props}
            {...field}
            disabled={props.edit && edit}
            onChange={handleChange}
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
        )}

        <FormHelperText>
          {error?.type === "required" && (
            <span>{copys.formHelperText.required}</span>
          )}
          {error?.type === "minLength" && (
            <span>
              {copys.formHelperText.minLength.replace("{0}", getValueRule())}
            </span>
          )}
          {error?.type === "maxLength" && (
            <span>
              {copys.formHelperText.maxLength.replace("{0}", getValueRule())}
            </span>
          )}
          {error?.type === "min" && (
            <span>
              {copys.formHelperText.min.replace("{0}", getValueRule())}
            </span>
          )}
          {error?.type === "max" && (
            <span>
              {copys.formHelperText.max.replace("{0}", getValueRule())}
            </span>
          )}
          {error?.type === "pattern" && (
            <span>
              {copys.formHelperText.pattern.replace("{0}", getValueRule())}
            </span>
          )}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default InputBasic;
