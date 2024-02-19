import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Styles from "./InputFileDrag.module.sass";

const InputFileDrag: React.FC<any> = (props: any) => {
  const [errorType, setErrorType] = useState(false);
  const [statefiles, setStateFiles] = useState<any>([]);

  const drop = useRef<any>();
  const inputfile = useRef<any>();

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
    getValues,
    trigger,
  } = useFormContext();

  const { field } = useController(props);

  const handleChangeForDrop = (_files: any[]) => {
    inputfile.current.getElementsByTagName("input")[0].files = _files;
    setValue(
      props.name,
      inputfile.current.getElementsByTagName("input")[0].value
    );
    setStateFiles((old: any) => [...old, ...Array.from(_files)]);
    trigger(props.name);
  };

  const handleChange = (event: any) => {
    setValue(event.target.name, event.target.value);
    setStateFiles((old: any) => [...old, ...Array.from(event.target.files)]);
    trigger(props.name);
  };

  const handleDeleteChange = (nameDelete: string) => {
    let newArray = statefiles.filter((item: any) => item.name !== nameDelete);

    if (newArray.length < 1) {
      setValue(props.name, "");
      setValue("Resources", []);
    }

    setStateFiles(newArray);
    trigger("Resources");
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

  const convertToBase64 = () => {
    var newFile: {
      name: string;
      size: number;
      type: string;
      contentBase64: string | undefined;
    }[] = [];

    for (let file of statefiles) {
      if (file.contentBase64 || file.resource_id || file.id) {
        newFile.push(file);
        setValue("Resources", newFile);
        setValue(props.name, file.name);
        trigger("Resources");
        trigger(props.name);
        continue;
      }
      let { size, type }: Blob = file;
      let { name }: File = file;

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        var fileBase64 = reader.result?.toString().split(",")[1];

        var fileTemp = {
          name,
          size,
          type,
          contentBase64: fileBase64,
        };

        newFile.push(fileTemp);

        setValue("Resources", newFile);
        trigger("Resources");
      };
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;

    if (files && files.length) {
      handleChangeForDrop(files);
    }
  };

  useEffect(() => {
    if (props.resources) {
      setStateFiles(props.resources);
    }

    if (getValues("Resources")) {
      setStateFiles(getValues("Resources"));
    }

    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  useEffect(() => {
    convertToBase64();
  }, [statefiles]);

  useEffect(() => {
    if (props.resources) {
      setStateFiles(props.resources);
    }
  }, [props.resources]);

  return (
    <>
      <FormControl
        {...props}
        sx={{ flex: 1 }}
        error={!!errors[props.name]}
        fullWidth
      >
        <FormLabel>{props.label}</FormLabel>
        <Box ref={drop} className={`box-drop ${Styles["box-drop"]}`}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption">
              {/* Archivos maximos {statefiles.length} */}
            </Typography>
            <Typography variant="body2">
              Arrastre y suelte su archivo o &nbsp;
              <Link
                onClick={() => {
                  inputfile.current.getElementsByTagName("input")[0].click();
                }}
              >
                explorar
              </Link>
            </Typography>
          </Box>
          <Box className={Styles["box-files-container"]}>
            {statefiles.map((item: any, index: number) => {
              return (
                <Box sx={{ margin: "3px" }} key={index}>
                  <Chip
                    label={item.name}
                    onDelete={() => {
                      handleDeleteChange(item.name);
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Input
          type="file"
          {...props}
          ref={inputfile}
          inputProps={{ multiple: true }}
          onChange={handleChange}
          sx={{ display: "none" }}
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
      <Input type="text" {...props} {...field} sx={{ display: "none" }} />
    </>
  );
};

export default InputFileDrag;
