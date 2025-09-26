import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Architecture from "./Architecture";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/architecture" element={<Architecture />} />
      </Routes>
    </BrowserRouter>
  );
}
