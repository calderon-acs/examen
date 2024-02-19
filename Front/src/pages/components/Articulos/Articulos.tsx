import { useEffect, useRef, useState } from "react";
import DataGridBasic from "../../../components/organisms/DataGrid/datagridbasic/DataGridBasic";
import DashbordBasic from "../../../components/templates/DashbordBasic/DashbordBasic";
import { GridColDef } from "@mui/x-data-grid";
import { getArticulos } from "../../../services/Articulo.service";
import { ModalArticulo } from "./components";

export function Articulos(props: any) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const refDash = useRef<any>(null);

  const columns: GridColDef[] = [
    { field: "Codigo", headerName: "Codigo", width: 90 },
    {
      field: "Descripcion",
      headerName: "Descripcion",
      flex: 1,
    },
    {
      field: "Sucursal",
      headerName: "Sucursal",
      width: 150,
    },
    {
      field: "Precio",
      headerName: "Precio",
      width: 150,
    },
    {
      field: "Imagen",
      headerName: "Imagen",
      width: 150,
    },
    {
      field: "Stock",
      headerName: "Stock",
      width: 150,
    },
  ];

  const handleGetArticulos = () => {
    setLoading(true);
    getArticulos()
      .then((response: any) => {
        setRows(
          response.map((item: any) => {
            item.id = item.ArticuloID;
            return item;
          })
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetArticulos();
  }, []);

  return (
    <>
      <DashbordBasic
        ref={refDash}
        modalCallBackOnClose={handleGetArticulos}
        modalComponents={<ModalArticulo></ModalArticulo>}
      >
        <DataGridBasic
          buttoncreate
          editButton
          loading={loading}
          columns={columns}
          rows={rows}
        ></DataGridBasic>
      </DashbordBasic>
    </>
  );
}
