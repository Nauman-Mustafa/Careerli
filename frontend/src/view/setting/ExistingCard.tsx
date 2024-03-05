// @ts-nocheck
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "use-http";
// import exsitingimg from "../../assets/images/exsitingimg.svg";
import { RootState } from "../../store";
import StripePaymentMethodForm from "./StripePaymentMethodForm";

const ExistingCard = () => {
  const dispatch = useDispatch();
  const [card, setCard] = useState(false);
  const billingSelector = useSelector((state: RootState) => state.billing);
  const authSelector = useSelector((state: RootState) => state.auth);
  const { response, post, get, loading, data: repos } = useFetch();

  const payment_method_details = billingSelector?.user?.payment_method_details;
  const createIntentResponse = useRef(null);
  const initiateSetupIntent = (e) => {
    e.preventDefault();
    CreateSetupIntent();
    // dispatch(createSetupIntent())
    //   .then((response) => {
    //     createIntentResponse.current = { ...response.payload.data.data };
    //     setCard(true);
    //   })
    //   .catch(() => {
    //     setCard(false);
    //   });
  };
  const CreateSetupIntent = async () => {
    const res = await post("subscription/create-setup-intent");

    createIntentResponse.current = { ...res?.data };
    setCard(true);
  };

  const dateFormate = () => {
    let date = new Date(authSelector?.user?.createdAt).toLocaleDateString();
    return date;
  };

  return (
    <>
      <div className="billing-detail-content">
        <div
          className="profile-card existing__cards"
          style={card ? { display: "none" } : { display: "block" }}
        >
          <h1 className="main-heading">Existing Cards</h1>
          <figure>{/* <img src={exsitingimg} alt="" /> */}</figure>
          <div className="card__content">
            {/* <h1 className="main-heading">{`${authSelector.firstName} ${authSelector.lastName}`}</h1> */}
            <p>
              {`${payment_method_details?.brand?.toUpperCase()}`} ending in
              {` ${payment_method_details?.last4}`} •
              {` ${payment_method_details?.exp_month}/${payment_method_details?.exp_year}`}
            </p>
            {/* <h6>
              Card added by
              {` ${authSelector.firstName} ${authSelector.lastName}`}
            </h6> */}
          </div>
          <div className="payment__div">Future payments will use this card</div>
          <button
            className="Generate__btn w-100 h-10"
            onClick={initiateSetupIntent}
          >
            Update Your Card
          </button>
          <div className="Member__text">
            Member Since:
            <span> {dateFormate()}</span>
          </div>
        </div>
        <div
          className="profile-card newCard"
          style={card ? { display: "block" } : { display: "none" }}
        >
          <StripePaymentMethodForm {...createIntentResponse.current} />
        </div>
      </div>
    </>
  );
};

export default ExistingCard;
