import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { Process, Catalogue, Home } from "../pages";

const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Catalogue />} />
        <Route path="/process" element={<Process />} />
      </Route>
    </Routes>
  );
};

export default Routers;
