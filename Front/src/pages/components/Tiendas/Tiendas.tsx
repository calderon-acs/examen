import { useEffect, useRef, useState } from "react";

import DataGridBasic from "../../../components/organisms/DataGrid/datagridbasic/DataGridBasic";
import DashbordBasic from "../../../components/templates/DashbordBasic/DashbordBasic";
import { getTienda } from "../../../services/Tienda.service";
import { GridColDef } from "@mui/x-data-grid";
import { ModalTienda } from "./components";

export function Tiendas(props: any) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const refDash = useRef<any>(null);

  const columns: GridColDef[] = [
    { field: "tiendaID", headerName: "ID", width: 90 },
    {
      field: "sucursal",
      headerName: "Sucursal",
      width: 150,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 150,
    },
  ];

  const handleGetTienda = () => {
    setLoading(true);
    getTienda()
      .then((response: any) => {
        setRows(
          response.map((item: any) => {
            item.id = item.tiendaID;
            return item;
          })
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetTienda();
  }, []);

  return (
    <>
      <DashbordBasic
        ref={refDash}
        modalCallBackOnClose={handleGetTienda}
        modalComponents={<ModalTienda />}
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
