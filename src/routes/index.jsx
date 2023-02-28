import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { Navbar } from "../components";
import {
  CompetitionAnalysisPage,
  DemandAnalysisPage,
  SwitcherAnalysisPage,
  DecisionSupportSystemPage,
} from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/demand-analysis" element={<DemandAnalysisPage />} />
        <Route
          path="/competition-analysis"
          element={<CompetitionAnalysisPage />}
        />
        <Route path="/switcher-analysis" element={<SwitcherAnalysisPage />} />
        <Route
          path="/decision-support-system"
          element={<DecisionSupportSystemPage />}
        />
      </Route>
    </Routes>
  );
};
