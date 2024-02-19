import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";

export const PATTERNS = {
  PASSWORD: /[A-Za-z\d$@.$#!%*?&]{8,15}/,
  ONLY_NUMBERS: /^[0-9]+$/,
  ONLY_LETTERS_NUMBERS: /^[a-zA-Z0-9\s]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  RFC: /^[A-ZÑ&]{4}\d{6}[A-V1-9][0-9A-Za-z]\d{1}$/,
  CURP: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
};

export const RULES_FORMS = {
  LETTERS_NUMBERS_R3TO20: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: PATTERNS.ONLY_LETTERS_NUMBERS,
  },
  EMAIL: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: PATTERNS.EMAIL,
  },
  PASSWORD: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: PATTERNS.PASSWORD,
  },
  LETTERS_NUMBERS_R3TO100: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: PATTERNS.ONLY_LETTERS_NUMBERS,
  },
  ALL_R3TO100: {
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  NUMBERS_R1TO18: {
    required: true,
    minLength: 1,
    maxLength: 18,
  },
};

export const FUNCTIONS = {
  PARSE_REQUEST_GET: (request: any) => {
    const processedObj: any = { ...request }; // Crear una copia del objeto original

    // Iterar sobre los atributos del objeto
    for (const key in processedObj) {
      if (Object.prototype.hasOwnProperty.call(processedObj, key)) {
        const value = processedObj[key];

        // Verificar si el atributo es una fecha (instancias de Date)
        if (moment.isMoment(value) && !Array.isArray(value)) {
          // Reasignar el valor del atributo a una cadena formateada de la fecha
          processedObj[key] = moment(value).format("YYYY-MM-DD HH:mm"); // O cualquier otro formato deseado
        }
        if (Array.isArray(value)) {
          // Reasignar el valor del atributo a una cadena formateada de la fecha
          processedObj[key] = value.join(",");
        }
      }
    }

    return processedObj;
  },
  ROUND_NUMBER: (numero: number, decimales: number) => {
    const factor = 10 ** decimales;

    return Math.round(numero * factor) / factor;
  },

  GET_NESTED_VALUE: (objeto: any, clave: string) => {
    const claves = clave.split(".");

    if (!claves.length) return objeto[clave];

    let valor = objeto;

    for (const k of claves) {
      if (valor && valor.hasOwnProperty(k)) {
        valor = valor[k];
      } else {
        valor = undefined;
        break;
      }
    }

    return valor;
  },
  GENERATE_UUID: () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  },

  CONFIRM: (
    successCallBack: () => void,
    { title, message, labelConfirm, labelCancel }: any = {}
  ) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog open={true}>
            <DialogTitle>{title ?? "Confirmar"}</DialogTitle>
            <DialogContent>
              {message ?? "¿Desea continuar con este proceso?"}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>{labelCancel ?? "Cancelar"}</Button>
              <Button
                onClick={() => {
                  successCallBack();
                  onClose();
                }}
                autoFocus
              >
                {labelConfirm ?? "Confirmar"}
              </Button>
            </DialogActions>
          </Dialog>
        );
      },
    });
  },
};
