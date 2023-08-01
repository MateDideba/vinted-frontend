import { Link } from "react-router-dom";
import "../styles/header.css";
import Cookies from "js-cookie";

export default function Header({
  userToken,
  setUserToken,
  filter,
  setFilter,
  checked,
  setChecked,
}) {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img
            className="vintedLogo"
            src="src/assets/logo.10b0caad793dd0a8ea72.png"
            alt="vintedLogo"
          />
        </Link>
        <label className="switch">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
          />
          <span className="slider"></span>
        </label>

        <input
          className="searchBar"
          type="text"
          value={filter}
          placeholder="Recherche des articles"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />

        <div>
          {userToken ? (
            <button
              className="disconnectBt"
              onClick={() => {
                setUserToken("");

                Cookies.remove("token");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <div className="sinLog">
                <Link to="/signup">S'inscrire</Link>
              </div>
              <div className="sinLog">
                <Link to="/login">Se connecter</Link>
              </div>
            </>
          )}
          <div className="saleBt">
            <Link to="/publish">Vendre ses articles</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
