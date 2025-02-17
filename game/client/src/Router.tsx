import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}
