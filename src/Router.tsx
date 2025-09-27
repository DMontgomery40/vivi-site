import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Architecture from "./Architecture";
import ThreeLaneArchitecture from "./ThreeLaneArchitecture";
import TraitSystem from "./TraitSystem";
import DeveloperTools from "./DeveloperTools";
import ImplementationRoadmap from "./ImplementationRoadmap";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/three-lane" element={<ThreeLaneArchitecture />} />
        <Route path="/trait-system" element={<TraitSystem />} />
        <Route path="/developer-tools" element={<DeveloperTools />} />
        <Route path="/roadmap" element={<ImplementationRoadmap />} />
      </Routes>
    </BrowserRouter>
  );
}
