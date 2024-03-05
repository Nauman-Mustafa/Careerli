import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY as string);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_SELF_URL}/stripe-intent-redirect`,
      },
    });

    if (result.error) {
      toast(result.error.message as string);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="d-flex justify-content-center mt-3 w-100">
          <button className="save__btn w-100" disabled={!stripe}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

const StripePaymentMethodForm = (props: any) => {
  let { client_secret } = props;

  const options = {
    clientSecret: client_secret,
  };

  if (!client_secret) return <></>;
  else {
    return (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    );
  }
};

export default StripePaymentMethodForm;
