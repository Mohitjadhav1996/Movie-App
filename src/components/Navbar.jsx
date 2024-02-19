import Logo from "../MovieLogo.png";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex border space-x-8 items-center pl-3 py-4">
      <img className="w-[50px]" src={Logo} alt="" />

      <Link to="/home" className="text-blue-500 text-3xl font-bold">
        Movies
      </Link>

      <Link to="/watchlist" className="text-blue-500 text-3xl font-bold">
        Watchlist
      </Link>
      </div>
      <div>
      <button
        onClick={handleLogout}
        className="flex justify-center items-center h-[3rem] w-[6rem] bg-blue-500 rounded-xl text-white font-bold mx-4"

      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Navbar;
