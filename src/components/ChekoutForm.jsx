import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import "../styles/CheckoutForm.css";

const CheckoutForm = ({
  OfferId,
  soldOffers,
  setSoldOffers,
  OfferTitle,
  price,
  buyerId,
}) => {
  const [confirmMessage, setConfirmMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: buyerId,
    });
    console.log(stripeResponse.token.id);
    const stripeToken = stripeResponse.token.id;
    // envoi au serveur
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: OfferTitle,
          amount: price,
        }
      );
      //console.log("reponse du serveur =>", response.data);
      if (response.data.status === "succeeded") {
        setConfirmMessage("Paiement validé !");
        const updateSoldOffers = [...soldOffers];
        updateSoldOffers.push(OfferId);
        setSoldOffers(updateSoldOffers);
      } else {
        alert("Le paiement n'a pas été effectué !");
      }
    } catch (error) {
      console.log("vousss etees " + error.response);
    }
  };

  return (
    <main>
      {confirmMessage ? (
        <p>{confirmMessage}</p>
      ) : (
        <form className="paymentForm" onSubmit={handleSubmit}>
          <p className="title">Résumé de la commande</p>
          <div className="orderResume">
            <div>
              <span>Commande</span>
              <span>Frais protection acheteurs</span>
              <span>Frais de port</span>
            </div>
            <div>
              <span>{price} €</span>
              <span id="buyerProtection">0.40 €</span>
              <span id="deliveryFee">0.80 €</span>
            </div>
          </div>

          <div className="total">
            <div>
              <span className="bold">Total</span>
              <span className="bold">{(price + 0.4 + 0.8).toFixed(2)} €</span>
            </div>
          </div>
          <div className="payment">
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir
              <span className="bold"> {OfferTitle} </span>. Vous allez payer
              <span className="bold"> {(price + 0.4 + 0.8).toFixed(2)} € </span>
              (frais de protection et frais de port inclus)
            </p>
            <div className="stripeElement">
              <CardElement />
            </div>
            <button>Pay</button>
          </div>
        </form>
      )}
    </main>
  );
};

export default CheckoutForm;
