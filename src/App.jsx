import React , { useEffect ,useState } from "react";
import "./styles/style.css";
import AppRoutes from "./routes/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (
    <div className="app">
      <Navbar />
      {/* Main content area */}
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
