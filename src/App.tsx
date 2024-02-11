import "./assets/App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Stars from "./pages/Stars/Stars";
import Galaxies from "./pages/Galaxies/Galaxies";
import Nebulae from "./pages/Nebulae/Nebulae";
import Clusters from "./pages/Clusters/Clusters";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/galaxies" element={<Galaxies />} />
            <Route path="/clusters" element={<Clusters />} />
            <Route path="/nebulae" element={<Nebulae />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
