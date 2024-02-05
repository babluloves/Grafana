import React from "react";
import { Routes, Route } from "react-router-dom";
import Eswatini from "../pages/Eswatini";
import Nigeria from "../pages/Nigeria";
import Cameroon from "../pages/Cameroon";
import Zambia from "../pages/zambia";
import NigeriaMonitoring from "../pages/Nigeria/NigeriaMonitoring";
import CameroonMonitoring from "../pages/Cameroon/Monitoring"
import EswatiniMonitoring from "../pages/Eswatini/EswatiniMonitoring";
import EswatiniRenewals from "../pages/Eswatini/EsawtiniRenewals";
import CameroonRenewals from "../pages/Cameroon/Renewals";
import NigeriaRenewals from "../pages/Nigeria/Renewals";
import ZambiaMonitoring from "../pages/zambia/Monitoring";
import ZambiaRenewals from "../pages/zambia/Renewals";

export default function AppRoutes() {

    return(
    <Routes>
      <Route path="Eswatini" element={<Eswatini />} />
      <Route path="Nigeria" element={<Nigeria />} />
      <Route path="Cameroon" element={<Cameroon />} />
      <Route path="zambia" element={<Zambia/>} />
      <Route path="Nigeria/Monitoring" element={<NigeriaMonitoring/>} />
      <Route path="Cameroon/Monitoring" element={<CameroonMonitoring/>} />
      <Route path="Eswatini/Monitoring" element={<EswatiniMonitoring/>} />
      <Route path="Zambia/Monitoring" element={<ZambiaMonitoring />} />
      <Route path="Eswatini/Renewals" element={<EswatiniRenewals/>} />
      <Route path="cameroon/Renewals" element={<CameroonRenewals/>} />
      <Route path="nigeria/Renewals" element={<NigeriaRenewals/>} />
      <Route path="zambia/Renewals" element={<ZambiaRenewals/>} />
    </Routes>
    )
}