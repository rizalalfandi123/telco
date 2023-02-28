import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { Navbar } from "../components";
import { DemandAnalysisPage } from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/demand-analysis" element={<DemandAnalysisPage/>} />
      </Route>
    </Routes>
  );
};
