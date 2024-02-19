import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import NotFound from "../Component/UiComponent/Notfound";
import WatchList from "../components/WatchList";
import Movies from "../components/Movies";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import LoginForm from "../components/Login";

const RouteFile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("authtoken") !== "") {
      if(location.pathname==="/login"){
          navigate("/home")
      }else{
          navigate(location.pathname);

      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Banner /> <Movies />
            </>
          }
        />

        <Route
          path="/watchlist"
          element={
            <>
              <Navbar />
              <WatchList />
            </>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default RouteFile;
