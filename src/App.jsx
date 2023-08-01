import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  // Le state aura pour valeur initiale la valeur du cookie "token" s'il exitste sinon elle aura pour valeur une string vide
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(true);
  const [buyerId, setBuyerId] = useState("");
  const [soldOffers, setSoldOffers] = useState([]);

  return (
    <Router>
      <Header
        userToken={userToken}
        setUserToken={setUserToken}
        setFilter={setFilter}
        filter={filter}
        checked={checked}
        setChecked={setChecked}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home filter={filter} checked={checked} soldOffers={soldOffers} />
          }
        />
        <Route path="/offer/:id" element={<Offer userToken={userToken} />} />
        <Route
          path="/signup"
          element={
            <Signup
              userToken={userToken}
              setUserToken={setUserToken}
              setBuyerId={setBuyerId}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login setUserToken={setUserToken} setBuyerId={setBuyerId} />
          }
        />

        <Route path="/publish" element={<Publish userToken={userToken} />} />
        <Route
          path="/payment"
          element={
            <Payment
              buyerId={buyerId}
              soldOffers={soldOffers}
              setSoldOffers={setSoldOffers}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
