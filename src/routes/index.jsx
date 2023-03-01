import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Navbar } from "../components";
import {
  CompetitionAnalysisPage,
  DemandAnalysisPage,
  SwitcherAnalysisPage,
  DecisionSupportSystemPage,
  ModalFilterMaps,
} from "../pages";

const DemandAnalysis = lazy(() =>
  import("../pages").then(({ DemandAnalysisPage }) => ({
    default: DemandAnalysisPage,
  }))
);

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<div>test loading</div>}>{children}</Suspense>;
};

export const AppRouter = () => {
  let location = useLocation();

  let state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Navbar />}>
          <Route
            path="/demand-analysis"
            element={
              <SuspenseWrapper>
                <DemandAnalysis />
              </SuspenseWrapper>
            }
          />
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
      {state && state.backgroundLocation && (
        <Routes>
          <Route path="/modal" element={<ModalFilterMaps />} />
        </Routes>
      )}
    </>
  );
};
