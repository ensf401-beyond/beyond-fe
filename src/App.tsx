import "./assets/App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Stars from "./pages/Stars/Stars";
import Galaxies from "./pages/Galaxies/Galaxies";
import Nebulae from "./pages/Nebulae/Nebulae";
import Clusters from "./pages/Clusters/Clusters";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import { useEffect } from "react";
import { getUsername } from "./utils/API_calls";
import { gapi } from "gapi-script";
import { AuthProvider } from "./contexts/AuthContext";

const clientID =
  "138234664993-d0mvhfhmbq2vh2877oq6ub1v6ie1hbj9.apps.googleusercontent.com";

function App() {
  // a function to load things in the local storage for testing, this should be removed when the backend is implemented
  const loadFakeDataToLS = async () => {
    let name = await getUsername(localStorage.getItem("Email") || "").then(
      (data: any) => {
        console.log(data);
        localStorage.setItem("Name", data);
        return data;
      }
    );

    localStorage.setItem("Email", "tate@mcrae.com");
    localStorage.setItem("Location", "Canada");
    localStorage.setItem(
      "PFP",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Tate_McRae_on_iHeartRadio_Canada_in_2023_%281%29.png/1200px-Tate_McRae_on_iHeartRadio_Canada_in_2023_%281%29.png"
    );
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  useEffect(() => {
    loadFakeDataToLS();
  }, []);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stars" element={<Stars />} />
              <Route path="/galaxies" element={<Galaxies />} />
              <Route path="/clusters" element={<Clusters />} />
              <Route path="/nebulae" element={<Nebulae />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
