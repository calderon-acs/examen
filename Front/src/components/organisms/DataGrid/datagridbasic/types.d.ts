import { DataGridProps } from "@mui/x-data-grid";

/**
 * Componente que genera un DataGrid con Cards en lugar de filas.

 * @param  {string[]} columnsFixed Filas a renderizar.

 * History
 * v1.0 – Se crea datagrid con card en lugar de filas
**/
export type DataGridBasicProps = DataGridProps & {
  columnsFixed?: string[]; //Nombre (field) de la definicion de columnas para fijarla.
  editButton?: boolean;
  onSelectionModelChange?: (ids: any, details: any) => void;
  [key: string]: any;
};
