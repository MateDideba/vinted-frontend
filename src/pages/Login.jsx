import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login({ setUserToken, setBuyerId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );

        console.log(data._id);
        // enregistrer le cookie
        Cookies.set("token", data.token);

        // changer la valeur du state
        setUserToken(data.token);
        setBuyerId(data._id);
        // naviguer vers la page d'accueil
        navigate("/");
      } catch (error) {
        console.log("catch>>", error);
      }
    }
  };

  return (
    <main>
      <div className="container ">
        <div className="login">
          <h1>Se connecter</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                // vider le message d'erreur
                setErrorMessage("");
                // envoyer la valeur entrée dans le champs au state
                setEmail(event.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                setErrorMessage("");
                setPassword(event.target.value);
              }}
            />

            <button>Se connecter</button>

            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
