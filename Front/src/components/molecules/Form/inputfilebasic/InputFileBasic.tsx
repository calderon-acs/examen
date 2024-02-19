import { FormControl, FormHelperText, FormLabel, Input, InputLabel, makeStyles } from "@mui/material";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import "./InputFileBasic.sass";
import { ConstructionOutlined } from "@mui/icons-material";

  const InputFileBasic  = forwardRef((props: any, ref: ForwardedRef<any>) => {
  const inputFileStyle = {
    '& input[type="file"]': {
      opacity: 0,
      // position: 'absolute'
    },
  };
  const [errorType, setErrorType] = useState(false);
  const [stateFile, setStateFile] = useState<any>({});
  const [textInput, setText] = useState('')
  const copys = {
    general: {},
    formHelperText: {
      errorType: "El archivo seleccionado no cumple con el formato requerido.",
      pattern: "Este campo solo acepta: {0}.",
      required: "Este campo es obligatorio. ",
    },
  };

  const {
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext();

  const { field } = useController(props);

  const handleChange = (event: any) => {
    const files: File[] = event.target.files;
    setStateFile({})
    if (files.length > 0) {
      convertToBase64(files);
      setText('')
      setValue(props.name, event.target.value);
    } else {
      setText('')
      if(props.change){
        props.change(files)
      }
      setValue(props.name, "");
    }

    trigger(props.name);
  };

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

  const convertToBase64 = (files: File[]) => {
    var resource: {
      name: string;
      size: number;
      type: string;
      contentBase64: string | undefined;
    };
    if(files[0].name === undefined){
      setText('')
      return;}
    if(Array.isArray(files)){
    if (stateFile.contentBase64 || stateFile.resource_id || stateFile.id) {
      resource = stateFile;
      setValue(`Resource${props.name}`, resource);
      setText(resource.name)
      if (props.change) {
        props.change(stateFile);
      }
      trigger(props.name);
      return;
    }else{
      setText('')
    }
  }
    let { name, size, type } = files[0];

    const reader = new FileReader();

    reader.readAsDataURL(files[0]);

    reader.onload = () => {
      var fileBase64 = reader.result?.toString().split(",")[1];

      var fileTemp = {
        name,
        size,
        type,
        contentBase64: fileBase64,
      };
      resource = fileTemp;

      setValue(`Resource${props.name}`, resource);
      if (props.change) {
        props.change(resource);
      }
    };
  };

  useEffect(() => {
    convertToBase64([stateFile]);
  }, [stateFile]);

  useEffect(() => {
    if (props.resource) {
      setStateFile(props.resource);
    }
  }, [props.resource]);

  return (
    <FormControl
      {...props}
      sx={{ flex: 1 }}
      error={!!errors[props.name]}
      fullWidth
    >
      {textInput !== '' &&
         <InputLabel shrink={false} htmlFor='file-input' sx={{color: 'black'}}>
         {textInput}
       </InputLabel>
      }
      <FormLabel>{props.label}</FormLabel>
      
      <Input
        type="file"
        {...props}
        {...field}
        ref = {ref}
        inputProps={{ multiple: props.multiple, accept: props.accept}}
        onChange={handleChange}
        sx={textInput !== '' && inputFileStyle}
      />
      <FormHelperText>
        {errors[props.name]?.type === "required" && (
          <span>{copys.formHelperText.required}</span>
        )}
        {errorType && <span>{copys.formHelperText.errorType}</span>}
        {errors[props.name]?.type === "pattern" && (
          <span>
            {copys.formHelperText.pattern.replace("{0}", getValueRule())}
          </span>
        )}
      </FormHelperText>
    </FormControl>
  );
});

export default InputFileBasic;
