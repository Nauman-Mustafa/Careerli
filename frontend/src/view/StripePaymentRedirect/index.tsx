import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
const StripePaymentRedirect = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { response, post, get, loading, data: repos } = useFetch();
  const navigate = useNavigate();
  useEffect(() => {
    const setup_intent_id = searchParams.get("setup_intent");
    const redirect_status_id = searchParams.get("redirect_status");

    if (redirect_status_id === "succeeded") {
      const updatePaymentMethod = async () => {
        const payload = {
          setup_intent: setup_intent_id,
          status: redirect_status_id,
        };
        const res = await post("subscription/update-payment-method", payload);
        toast.success(res?.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      };
      updatePaymentMethod();
    } else {
      navigate("/");
    }
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

export default StripePaymentRedirect;
