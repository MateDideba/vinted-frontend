import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "../styles/offer.css";

export default function Offer({ userToken }) {
  const [offerInfos, setOfferInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        setOfferInfos(data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch Offer>>>", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main className="offer">
      <div className="container offer-page">
        <div>
          <img src={offerInfos.product_pictures[0].secure_url} alt="" />
        </div>

        <div>
          <h1 className="offer-name">{offerInfos.product_name}</h1>
          <p>{offerInfos.product_price} €</p>

          <div>
            {offerInfos.product_details.map((elem, index) => {
              const keyName = Object.keys(elem)[0];
              //console.log(elem[keyName]);
              return (
                <div key={index}>
                  {keyName} : {elem[keyName]}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (userToken) {
                navigate("/payment", {
                  state: {
                    OfferId: offerInfos._id,
                    OfferTitle: offerInfos.product_name,
                    price: offerInfos.product_price,
                  },
                });
              } else {
                navigate("/login");
              }
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </main>
  );
}
