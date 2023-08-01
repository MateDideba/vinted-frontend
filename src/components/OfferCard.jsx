import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <Link to={`/offer/${offer._id}`} key={offer._id}>
      <div className="offer-card">
        <div>
          {offer.owner.account.avatar ? (
            <img
              src={offer.owner.account.avatar.secure_url}
              alt="avatar"
              className="avatar"
            />
          ) : null}
          <p>{offer.owner.account.username}</p>
        </div>

        <img src={offer.product_image.secure_url} alt="" />

        <div>
          <p>{offer.product_price} €</p>
        </div>
      </div>
    </Link>
  );
}
