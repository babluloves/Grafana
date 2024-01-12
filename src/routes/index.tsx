import React from "react";
import { Routes, Route } from "react-router-dom";
import Eswatini from "../pages/Eswatini";
import Nigeria from "../pages/Nigeria";
import Cameroon from "../pages/Cameroon";
import Zambia from "../pages/zambia";

export default function AppRoutes() {

    return(
    <Routes>
      <Route path="Eswatini" element={<Eswatini />} />
      <Route path="Nigeria" element={<Nigeria />} />
      <Route path="Cameroon" element={<Cameroon />} />
      <Route path="zambia" element={<Zambia/>} />
    </Routes>
    )
}