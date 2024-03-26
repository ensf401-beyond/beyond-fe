import "./assets/App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import SkyObjects from "./pages/Clusters/SkyObjects";
import SkyMap from "./pages/Stars/SkyMap";
import Favourites from "./pages/Favourites/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./pages/UserAuthentication/Registration/Register";
import Login from "./pages/UserAuthentication/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ObjectPage from "./pages/ObjectPage/ObjectPage";
import CreateObj from "./pages/CreateObj/CreateObj";

/**
 * App Component
 *
 * This component is the root component of the application, which sets up the routing for the different pages of the website.
 * 
 * @returns the view for the application
 */
function App() {

  return (
    <>
      <AuthProvider>
        <GoogleOAuthProvider clientId="506254149863-35nrqod449j7jt5kgrfp6b3iir8ps9b1.apps.googleusercontent.com">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/sky-objects" element={<SkyObjects />} />
                <Route path="/sky-map" element={<SkyMap />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/object/:id" element={<ObjectPage />} />
                <Route path="/create" element={<CreateObj />} />
              </Route>

              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </AuthProvider>
    </>
  );
}

export default App;
