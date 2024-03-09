import { useEffect, useState } from "react";
import {
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY as string);

const CheckoutForm = ({ products }: { products: any[] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!selectedProduct) {
      toast("Please select a product");
      return;
    }

    // Use selectedProduct for checkout
    // You may need to create a PaymentIntent or PaymentMethod
    // Refer to Stripe documentation for more details
  };

  useEffect(() => {
    // Pre-select the first product initially
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedProduct ? selectedProduct.id : ""}
          onChange={(e) =>
            setSelectedProduct(
              products.find((p) => p.id === e.target.value)
            )
          }
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>
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
  let { client_secret, products } = props;

  if (!client_secret || !products) return null;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm products={products} />
    </Elements>
  );
};

export default StripePaymentMethodForm;
