import { NavbarData } from "../data/NavBarData";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarButton from "./ui/NavbarButton";

type NavbarItem = {
  name: string;
  path: string;
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div id="navbar">
        <ul id="navbar-list">
          {NavbarData.map((val: NavbarItem, key: any) => (
            <li
              className="row"
              id={location.pathname === val.path ? "active" : ""}
              key={key}
              onClick={() => handleNavigate(val.path)}
            >
              <NavbarButton name={val.name} path={val.path}/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
