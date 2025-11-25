import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import StatsPage from "./pages/StatsPage/StatsPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<MainPage />} />
        <Route path="/item/:id" element={<ProductPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route
          path="*"
          element={<div className="not-found">404 Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
