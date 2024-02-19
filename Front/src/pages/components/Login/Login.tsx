import { Container, Grid, Typography } from "@mui/material";
import { FormBasic } from "../../../components/molecules";
import { useForm } from "react-hook-form";
import { InputBasic } from "../../../components/molecules/Form/InputBasic";
import { ButtonSubmit } from "../../../components/molecules/Form/ButtonSubmit/ButtonSubmit";
import { RULES_FORMS } from "../../../utils/Utils";
import { getSession } from "../../../services/User.service";
import md5 from "md5-ts";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useState } from "react";

export interface LoginProps {
  prop?: string;
}

export function Login(props: any) {
  const methods = useForm<any>({
    defaultValues: {
      UserName: "andres@examen.com",
      Password: "Andres#1",
    },
    mode: "all",
  });

  const { handleSubmit } = methods;
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const handleGetSession = (form: any) => {
    setLoading(true);
    form.Password = md5(form.Password);
    getSession(form)
      .then((response: any) => {
        cookies.set("Session", response.token);
        navigate("/dashboard");
      })
      .finally(() => setLoading(false));
  };

  
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <FormBasic methods={methods} container>
            <Grid item sm={12}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Inicio de sesion
              </Typography>
            </Grid>

            <InputBasic
              name={"UserName"}
              label="Usuario"
              sm={12}
              rules={RULES_FORMS.EMAIL}
            ></InputBasic>
            <InputBasic
              sm={12}
              type="password"
              name={"Password"}
              label="Contraseña"
              rules={RULES_FORMS.PASSWORD}
            ></InputBasic>
            <Grid item sm={12}>
              <ButtonSubmit
                loading={loading}
                onClick={handleSubmit(handleGetSession)}
              >
                Ingresar
              </ButtonSubmit>
            </Grid>
          </FormBasic>
        </Grid>
      </Grid>
    </Container>
  );
}
