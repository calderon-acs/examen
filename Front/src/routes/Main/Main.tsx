import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../../layouts";
import { NotFound } from "../../pages";
import { Articulos, Inicio, Login, Tiendas } from "../../pages/components";
import PrivateRoute from "../../components/atoms/privateroute/PrivateRoute";

const Main: React.FC<any> = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="" element={<Inicio />} />
            <Route path="tiendas" element={<Tiendas />} />
            <Route path="articulos" element={<Articulos />} />
          </Route>
        </Route>
        <Route path="/" element={<Login></Login>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
