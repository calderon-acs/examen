import { useEffect, useState } from "react";

import { CardArticulo } from "../Articulos/components";
import { getArticulos } from "../../../services/Articulo.service";
import { Box } from "@mui/material";

export interface InicioProps {
  prop?: string;
}

export function Inicio({ prop = "default value" }: InicioProps) {
  const [loading, setLoading] = useState(false);
  const [articulos, setArticulos] = useState([]);

  const handleGetArticulos = () => {
    setLoading(true);
    getArticulos()
      .then((response: any) => {
        setArticulos(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetArticulos();
  }, []);
  return (
    <Box sx={{display:"flex"}}>
      {articulos.map((item) => {
        return <CardArticulo item={item} />;
      })}
    </Box>
  );
}
