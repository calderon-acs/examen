import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import ButtonCreate from "../../atoms/buttoncreate/ButtonCreate";
import Styles from "./GridToolbarBasic.module.sass";
import { IconButton, Tooltip } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { contextDashbordBasic } from "../../templates/DashbordBasic";

const GridToolbarBasic: React.FC<any> = (props: any) => {
  const [openShared, setOpenShared] = useState(false);

  const { handleOpenModal } = useContext(contextDashbordBasic);



  return (
    <>
      <GridToolbarContainer {...props}>
        <ButtonCreate
          sx={{
            display:
              props.buttoncreate && props.buttoncreate.active ? "" : "none",
          }}
          onClick={() => {
            handleOpenModal();
          }}
        >
          Nuevo
        </ButtonCreate>

        {props.children}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <div className={Styles["space"]}></div>
        <GridToolbarQuickFilter />
        {props.buttonrefresh && props.buttonrefresh.active && (
          <Tooltip title="Recargar">
            <IconButton
              onClick={() => {
                props.buttonrefresh.onclick();
              }}
            >
              <SyncIcon />
            </IconButton>
          </Tooltip>
        )}
      </GridToolbarContainer>
    </>
  );
};

export default GridToolbarBasic;
