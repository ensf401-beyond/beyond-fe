import { NavbarData } from "../data/NavBarData";
import { useNavigate, useLocation } from "react-router-dom";

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
              <div className="row-name">{val.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
