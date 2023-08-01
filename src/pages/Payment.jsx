import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/ChekoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

export default function Payment({ buyerId, soldOffers, setSoldOffers }) {
  const location = useLocation();
  const { OfferId, OfferTitle, price } = location.state;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        soldOffers={soldOffers}
        setSoldOffers={setSoldOffers}
        OfferTitle={OfferTitle}
        price={price}
        buyerId={buyerId}
        OfferId={OfferId}
      />
    </Elements>
  );
}
