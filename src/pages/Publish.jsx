import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/publish.css";
import axios from "axios";

export default function Publish({ userToken }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Création du formData
      const formData = new FormData();
      // Ajout des clé au formData
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      // console.log(formData);

      const { data } = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log("catch>>", error);
    }
  };

  return userToken ? (
    <main>
      <div className="publish">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
          />
          <label htmlFor="title">Description :</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          />
          <label htmlFor="title">Price :</label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            value={price}
          />
          <label htmlFor="title">Condition :</label>
          <input
            type="text"
            name="condition"
            id="conditon"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
            value={condition}
          />

          <label htmlFor="title">City :</label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
            value={city}
          />

          <label htmlFor="title">Brand :</label>
          <input
            type="text"
            name="brand"
            id="brand"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
            value={brand}
          />
          <label htmlFor="title">Size :</label>
          <input
            type="text"
            name="size"
            id="size"
            onChange={(event) => {
              setSize(event.target.value);
            }}
            value={size}
          />
          <label htmlFor="title">Color :</label>
          <input
            type="text"
            name="color"
            id="color"
            onChange={(event) => {
              setColor(event.target.value);
            }}
            value={color}
          />

          <label htmlFor="picture">Image :</label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={(event) => {
              setPicture(event.target.files[0]);
              console.log("image", picture);
            }}
          />
          <button>Envoyer</button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
}
