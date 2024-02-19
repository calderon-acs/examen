import { IconButton } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import {
  createContext,
  ForwardedRef,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import EditIcon from "@mui/icons-material/Edit";
import { AxiosResponse } from "axios";
import Style from "../datagridbasic/DataGridBasic.module.sass";
import { DataGridBasicProps } from "./types";
import { contextDashbordBasic } from "../../../templates/DashbordBasic";
import GridToolbarBasic from "../../gridtoolbarbasic/GridToolbarBasic";

/**
 * Componente que genera un DataGrid Basico con las configuraciones predefinidas.

 * @param  {string[]} columnsFixed Columnas para fijar.
 * @param  {string[]} columnsFixed Columnas para fijar.

 * History
 * v1.0 – Se crea datagrid con las configuraciones y estilos definidos.
**/

export const contextDataGrid = createContext<any>({
  context: {
    ids: [],
    selectedRowData: [],
    serviceSet: (params: any): Promise<AxiosResponse<any, any>> => {
      return new Promise((resolve, reject) => {});
    },
    serviceGet: (params: any): Promise<AxiosResponse<any, any>> => {
      return new Promise((resolve, reject) => {});
    },
  },
  handleSetContext: (any: any) => {},
});

const DataGridBasic: React.FC<DataGridBasicProps> = forwardRef(
  (props: DataGridBasicProps, ref: ForwardedRef<any>) => {
    const { handleOpenModal } = useContext(contextDashbordBasic);

    const dataGridRef = useRef<any>();

    const [context, setContext] = useState({
      ids: [],
      selectedRowData: [],
      serviceSet: (params: any): Promise<AxiosResponse<any, any>> => {
        return new Promise((resolve, reject) => {});
      },
      serviceGet: (params: any): Promise<AxiosResponse<any, any>> => {
        return new Promise((resolve, reject) => {});
      },
    });

    const handleSetContext = (newContext: any) => {
      setContext(newContext);
    };

    const setCellClassNameFixed = (columns: any[]) => {
      return columns.map((column) => {
        if (props.columnsFixed?.includes(column.field)) {
          column.cellClassName = Style["cell-fixed"];
        }

        return column;
      });
    };

    const columns: GridColDef[] = [
      {
        field: "action",
        headerName: "",
        sortable: false,
        width: 20,
        align: "center",
        renderCell: (params) => {
          return (
            <IconButton
              onClick={() => {
                handleOpenModal(params.row);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          );
        },
      },
    ];

    const [pageSize, setPageSize] = useState(20);
    
    const [newColumns, setNewColumns] = useState(
      props.editButton
        ? [...columns, ...setCellClassNameFixed(props.columns)]
        : setCellClassNameFixed(props.columns)
    );

    useImperativeHandle(ref, () => ({
      handleSetContext,
      element: dataGridRef,
    }));

    const obj = useMemo(
      () => ({
        context,
        handleSetContext,
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }),
      []
    ); // value is cached by useMemo

    useEffect(() => {
      setNewColumns(
        props.editButton
          ? [...columns, ...setCellClassNameFixed(props.columns)]
          : setCellClassNameFixed(props.columns)
      );
    }, [props.columns]);

    return (
      <contextDataGrid.Provider value={obj}>
        <DataGrid
          ref={dataGridRef}
          autoHeight
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 50, 100]}
          disableSelectionOnClick={true}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
          }}
          components={{ Toolbar: GridToolbarBasic }}
          selectionModel={context.ids}
          {...props}
          keepNonExistentRowsSelected={true}
          onSelectionModelChange={async (ids: any, details: any) => {
            const selectedRowData = props.rows.filter((row: { id: any }) =>
              ids.includes(row.id)
            );
            handleSetContext({
              ids: ids,
              selectedRowData: selectedRowData,
              refresh: () => {
                if (props.handleRefresh) {
                  props.handleRefresh();
                }
              },
            });
            if (props.onSelectionModelChange) {
              props.onSelectionModelChange(ids, details);
            }
          }}
          sx={{
            "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator":
              {
                display: "none",
              },
          }}
          columns={newColumns}
          componentsProps={{
            toolbar: {
              buttoncreate: {
                active: !!props.buttoncreate,
                onclick: handleOpenModal,
              },
              buttonrefresh: {
                active: !!props.buttonrefresh,
                onclick:
                  props.handleRefresh === undefined
                    ? () => {
                        console.error(
                          "Función handleRefresh no definida como parametro."
                        );
                      }
                    : props.handleRefresh,
              },
              ...(props.componentsProps?.toolbar
                ? props.componentsProps.toolbar
                : {}),
            },
          }}
        />
      </contextDataGrid.Provider>
    );
  }
);

export default DataGridBasic;
