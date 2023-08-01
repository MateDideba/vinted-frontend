import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "../styles/singup.css";
export default function Signup({ setUserToken, setBuyerId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !username || !password) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsletter);
      formData.append("avatar", avatar);
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // -- Créer le cookie
        Cookies.set("token", data.token);
        // Changer la val du state
        setUserToken(data.token);
        setBuyerId(data._id);
        navigate("/");
      } catch (error) {
        console.log("catch>>>", error);
        setErrorMessage("Désolé, une erreur est survenue !");
      }
    }
  };

  return (
    <main>
      <div className="container">
        <div className="singup">
          <h1>S'inscrire</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(event) => {
                // vider le message d'erreur
                setErrorMessage("");
                //   envoyer la valeur entrée dans le champs au state
                setUsername(event.target.value);
              }}
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(event) => {
                setErrorMessage("");
                setEmail(event.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setErrorMessage("");
                setPassword(event.target.value);
              }}
            />
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
                setAvatarPreview(URL.createObjectURL(event.target.files[0]));
                console.log(avatar);
              }}
            />
            <div>
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                checked={newsletter}
                onChange={() => {
                  setNewsletter(!newsletter);
                }}
              />

              <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
            </div>

            <span>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </span>

            <button>S'inscrire</button>

            {avatarPreview && <img src={avatarPreview} alt="" />}
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
