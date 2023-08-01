import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/home.css";

import OfferCard from "../components/OfferCard";

export default function Home({ filter, checked, soldOffers }) {
  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filter) {
          const response = await axios.get(
            `https://lereacteur-vinted-api.herokuapp.com/offers?title=${filter}`
          );
          setOffersList(response.data.offers);
        } else if (checked) {
          const response = await axios.get(
            "https://lereacteur-vinted-api.herokuapp.com/offers?sort=price-asc"
          );
          setOffersList(response.data.offers);
        } else if (!checked) {
          const response = await axios.get(
            "https://lereacteur-vinted-api.herokuapp.com/offers?sort=price-desc"
          );
          setOffersList(response.data.offers);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filter, checked]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="banner">
        <img
          src="src/assets/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt=""
        />
      </div>
      <div className="container offers-bloc">
        {offersList.map((offer) => {
          if (!soldOffers.includes(offer._id)) {
            return <OfferCard key={offer._id} offer={offer} />;
          }
        })}
      </div>
    </main>
  );
}
