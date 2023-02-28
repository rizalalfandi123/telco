import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../components";
import { DemandAnalysisPage } from "../pages";
import { ModalFilterMaps } from "../pages/modal-filter-maps/modal-filter-maps";
import { SwitcherAnalysisPage } from "../pages/switcher-analysis";

export const AppRouter = () => {
  let location = useLocation();

  let state = location.state;

  return (
    <>
      <Routes location={(state && state.backgroundLocation) || location}>
        <Route path="/" element={<Navbar />}>
          <Route path="/demand-analysis" element={<DemandAnalysisPage />} />
          <Route path="/switcher-analysis" element={<SwitcherAnalysisPage />} />
        </Route>
      </Routes>

      {state && state.backgroundLocation && (
        <Routes>
          <Route path="/modal" element={<ModalFilterMaps />} />
        </Routes>
      )}
    </>
  );
};
