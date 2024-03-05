import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import Header from "../../components/Header";
// import Navbar from "../../components/Navbar/Navbar";
import useFetch from "use-http";

const StripeFailure = () => {
  const { response, post, get, loading, data: repos } = useFetch();
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const { checkout_id } = param;
    const muatateFailureStripeSession = async () => {
      const res = await get(`subscription/stripe-failure/${checkout_id}`);
      console.log(res, "ressssss");
      window.open(res?.data?.redirectURL, "_self");
    };

    muatateFailureStripeSession();
    // dispatch(muatateFailureStripeSession(checkout_id));
  }, []);

  return (
    <div className="Dashboard">
      <div>
        <div
          className="mainSection"
          style={{
            width: "100%",
            marginLeft: "0",
            padding: "200px",
          }}
        >
          <div className="subscription-plans">
            <div className="stripe-loader">
              <div className="heading-area text-center">
                <h1 className="main-heading">Verifying Checkout</h1>
                <p className="mt-5">Please wait while we verify the checkout</p>
              </div>
              <div className="spinner-border mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeFailure;
