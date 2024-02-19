import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import MenuIcon from "@mui/icons-material/Menu";

export const Dashboard: React.FC<any> = (props: any) => {
  const copys: any = {
    //
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/dashboard");
                }}
              >
                Inicio
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/dashboard/tiendas");
                }}
              >
                Tiendas
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/dashboard/articulos");
                }}
              >
                Articulos
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                cookies.remove("Session", { path: "/" });

                navigate("/");
              }}
            >
              Cerrar sesion
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth={"lg"} className="container-main">
        <Outlet />
      </Container>
    </>
  );
};
