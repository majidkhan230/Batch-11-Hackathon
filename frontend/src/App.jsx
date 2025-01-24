import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { routes } from "./routes/routes";

const renderRoutes = (routes) =>
  routes.map(({ element, path, children }, index) => (
    <Route key={index} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

function App() {
  return (
    <>
      <Routes>{renderRoutes(routes)}</Routes>
    </>
  );
}

export default App;
