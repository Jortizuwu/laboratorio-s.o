import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Home, CreateProcessys } from "../pages";

const Routers = () => {
  
  const withData = localStorage.getItem("dataExists");
  const navigate = useNavigate();

  useEffect(() => {
    if (withData === "flase") {
      navigate("/");
    }
  }, [withData, navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={withData === "true" ? <Home /> : <CreateProcessys />}
        />
      </Route>
    </Routes>
  );
};

export default Routers;
