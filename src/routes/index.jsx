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

const CompetitionAnalysis = lazy(()=> 
  import ("../pages").then(({ CompetitionAnalysisPage })=> ({
    default: CompetitionAnalysisPage,
  }))
);

const SwitcherAnalysis = lazy(()=> 
import("../pages").then(({ SwitcherAnalysisPage })=> ({
  default: SwitcherAnalysisPage,
})));

const DecisionSupportSystem = lazy(()=> 
  import ("../pages").then(({ DecisionSupportSystemPage })=> ({
    default: DecisionSupportSystemPage,
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
            element={
              <SuspenseWrapper>
                <CompetitionAnalysis />
              </SuspenseWrapper>
            }
          />
          <Route path="/switcher-analysis" element={
            <SuspenseWrapper>
              <SwitcherAnalysis/>
            </SuspenseWrapper>
          } />
          <Route
            path="/decision-support-system"
            element={
              <SuspenseWrapper>
                <DecisionSupportSystem/>
              </SuspenseWrapper>
            }
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
