import { useContext, useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { FormBasic } from "../../../../../components/molecules";
import { ButtonSubmit } from "../../../../../components/molecules/Form/ButtonSubmit/ButtonSubmit";
import { InputBasic } from "../../../../../components/molecules/Form/InputBasic";
import { RULES_FORMS } from "../../../../../utils/Utils";
import { saveTienda } from "../../../../../services/Tienda.service";
import { useForm } from "react-hook-form";
import { contextDashbordBasic } from "../../../../../components/templates/DashbordBasic";

export function ModalTienda(props: any) {
  const [loading, setLoading] = useState(false);

  const { handleCloseModal, data } = useContext(contextDashbordBasic);
  const methods = useForm<any>({
    defaultValues: {
      sucursal: "",
      direccion: "",
      tiendaID: 0,
    },
    mode: "all",
  });
  const { handleSubmit, reset } = methods;

  const handleSetTienda = (form: any) => {
    setLoading(true);
    saveTienda(form)
      .then((response: any) => {
        handleCloseModal();
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log(data);
    if (data.tiendaID > 0) {
      reset(data);
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <FormBasic methods={methods} container>
          <InputBasic name={"tiendaID"} sx={{ display: "none" }} />
          <InputBasic
            name={"sucursal"}
            label="Sucursal"
            sm={12}
            rules={RULES_FORMS.LETTERS_NUMBERS_R3TO20}
          />

          <InputBasic
            sm={12}
            name={"direccion"}
            label="Direccion"
            rules={RULES_FORMS.LETTERS_NUMBERS_R3TO100}
          />
          <Grid item sm={12}>
            <ButtonSubmit
              loading={loading}
              onClick={handleSubmit(handleSetTienda)}
            >
              Guardar
            </ButtonSubmit>
          </Grid>
        </FormBasic>
      </Grid>
    </Grid>
  );
}
