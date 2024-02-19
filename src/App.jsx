import { useEffect, useState } from "react";
import "./App.css";

import { AppContext } from "./context/AppContext";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RouteFile from "./Routes/Routes";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });

    setWatchList(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <Router>
        <AuthProvider>
          <AppContext.Provider
            value={{
              watchlist,
              handleAddtoWatchlist,
              handleRemoveFromWatchlist,
              setWatchList,
            }}
          >
            <RouteFile />
          </AppContext.Provider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
