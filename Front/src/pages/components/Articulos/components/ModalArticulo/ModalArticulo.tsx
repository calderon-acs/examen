import { useContext, useEffect, useState } from "react";
import { FormBasic } from "../../../../../components/molecules";
import { ButtonSubmit } from "../../../../../components/molecules/Form/ButtonSubmit/ButtonSubmit";
import { InputBasic } from "../../../../../components/molecules/Form/InputBasic";
import SelectBasic from "../../../../../components/molecules/Form/selectbasic/SelectBasic";
import { RULES_FORMS } from "../../../../../utils/Utils";
import { Grid } from "@mui/material";
import { saveArticulo } from "../../../../../services/Articulo.service";
import { useForm } from "react-hook-form";
import { getTienda } from "../../../../../services/Tienda.service";
import { contextDashbordBasic } from "../../../../../components/templates/DashbordBasic";

export function ModalArticulo(props: any) {
  const { handleCloseModal, data } = useContext(contextDashbordBasic);

  const [loading, setLoading] = useState(false);
  const [tiendas, setTiendas] = useState([]);
  const methods = useForm<any>({
    defaultValues: {
      Codigo: "0001",
      Descripcion: "Descripcion",
      ArticuloID: 0,
      Precio: 10,
      Stock: 10,
      TiendaID: null,
      Imagen: "",
    },
    mode: "all",
  });
  const { handleSubmit, reset } = methods;

  const handleSetArticulo = (form: any) => {
    setLoading(true);
    saveArticulo(form)
      .then((response: any) => {
        handleCloseModal();
      })
      .finally(() => setLoading(false));
  };

  const handleGetTienda = () => {
    setLoading(true);
    getTienda()
      .then((response: any) => {
        setTiendas(
          response.map((item: any) => {
            return { name: item.sucursal, value: item.tiendaID };
          })
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetTienda();

    if (data.ArticuloID > 0) {
      reset(data);
    }
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <FormBasic methods={methods} container>
          <InputBasic name={"ArticuloID"} sx={{ display: "none" }} />
          <SelectBasic
            options={tiendas}
            name={"TiendaID"}
            label={"Tienda"}
            sm={12}
          />
          <InputBasic
            name={"Codigo"}
            label="Codigo"
            sm={12}
            rules={RULES_FORMS.LETTERS_NUMBERS_R3TO20}
          />

          <InputBasic
            sm={12}
            name={"Descripcion"}
            label="Descripcion"
            rules={RULES_FORMS.LETTERS_NUMBERS_R3TO100}
          />
          <InputBasic
            sm={12}
            name={"Precio"}
            label="Precio"
            type="number"
            rules={RULES_FORMS.NUMBERS_R1TO18}
          />
          <InputBasic
            sm={12}
            name={"Imagen"}
            label="Imagen"
            rules={RULES_FORMS.ALL_R3TO100}
          />
          <InputBasic
            sm={12}
            name={"Stock"}
            label="Stock"
            type="number"
            rules={RULES_FORMS.NUMBERS_R1TO18}
          />
          <Grid item sm={12}>
            <ButtonSubmit
              loading={loading}
              onClick={handleSubmit(handleSetArticulo)}
            >
              Guardar
            </ButtonSubmit>
          </Grid>
        </FormBasic>
      </Grid>
    </Grid>
  );
}
