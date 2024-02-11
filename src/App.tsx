import "./assets/App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Stars from "./pages/Stars/Stars";
import Galaxies from "./pages/Galaxies/Galaxies";
import Nebulae from "./pages/Nebulae/Nebulae";
import Clusters from "./pages/Clusters/Clusters";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/galaxies" element={<Galaxies />} />
            <Route path="/clusters" element={<Clusters />} />
            <Route path="/nebulae" element={<Nebulae />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
