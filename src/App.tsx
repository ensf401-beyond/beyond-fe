import "./assets/App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element="Home" />
            <Route path="/stars" element="Stars" />
            <Route path="/galaxies" element="Galaxies" />
            <Route path="/clusters" element="Clusters" />
            <Route path="/nebulae" element="Nebulae" />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
