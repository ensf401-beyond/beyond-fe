import { useNavigate } from "react-router-dom";

type NavbarItem = {
  name: string;
  path: string;
};

function NavbarButton({ name, path }: NavbarItem) {
  const nav = useNavigate();

  return (
    <>
      <button
        className="navbar-button"
        onClick={() => {
          nav(path);
        }}
      >
        {name}
      </button>
    </>
  );
}

export default NavbarButton;
