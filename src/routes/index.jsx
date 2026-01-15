// routes/index.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ScrollToTop from "../services/ScrollToTop";
import InnerPage from "../pages/InnerPage";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inner/:id" element={<InnerPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
