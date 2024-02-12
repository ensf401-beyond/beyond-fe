import "./assets/App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Stars from "./pages/Stars/Stars";
import Galaxies from "./pages/Galaxies/Galaxies";
import Nebulae from "./pages/Nebulae/Nebulae";
import Clusters from "./pages/Clusters/Clusters";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import LogoutButton from "./pages/Login/LogoutButton";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientID = "138234664993-d0mvhfhmbq2vh2877oq6ub1v6ie1hbj9.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      });
    };

    gapi.load("client:auth2", start);
  });

  // var accessToken = gapi.auth.getToken().access_token;

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
