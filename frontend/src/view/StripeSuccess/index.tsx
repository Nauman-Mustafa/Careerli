import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import { destroyLogin, saveLogin } from "../../store/action";
import { toast } from "react-toastify";
import { StatusCodes } from "http-status-codes";
import { useSelector } from "react-redux";

const StripeSuccess = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { response, post, get, loading, data: repos } = useFetch();
  const [sErrors, setSErrors] = useState({});
  const auth: any = useSelector((store: any) => store.auth.credentials);

  useEffect(() => {
    const { checkout_id } = param;
    console.log(checkout_id, "checkout_id");
    console.log("auth pass is", auth);

    const loginVal = { identifier: auth.identifier, password: auth.password };
    const mutateSuccessStripeSession = async () => {
      const res = await get(`subscription/stripe-success/${checkout_id}`);
      dispatch(destroyLogin());

      // =================here===========================
      const userRes = await post("auth/login", loginVal);
      console.log("loginVal is", loginVal);

      console.log("user res is", userRes);

      if (response.ok) {
        // const identifier = auth.identifier;
        // const pass = auth.password;
        // console.log("email", identifier, "pass", pass);

        dispatch(saveLogin(userRes.data));
        // dispatch(userData(identifier, pass));
        toast.success("Account logged in successfully!");

        // window.location.reload();

        // showModalHandler(false);
      } else {
        switch (response.status) {
          case StatusCodes.UNPROCESSABLE_ENTITY:
            setSErrors(response.data.errors);
            break;
          case StatusCodes.CONFLICT:
            setSErrors({ email: response.data.message });
            break;
          default:
            toast.error(response.data.message);
        }
      }

      // ================HERHEEHRHR=======================

      window.open(res?.data?.redirectURL, "_self");
    };

    mutateSuccessStripeSession();
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

export default StripeSuccess;
