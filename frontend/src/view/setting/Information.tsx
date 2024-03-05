import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//@ts-nocheck
// import { Getuser, UpdateProfile } from "../../store/thunks/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
// import { ValidationError } from "../../components/validation.component";
import { useDispatch } from "react-redux";
import * as yup from "yup";
// import { Spiner } from "../../components/Loader/LoadingSpiner";

import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import Header from "../../components/Header/Header";
const schema = yup.object().shape({
  firstName: yup.string().label("First name").min(3).max(30).required(),
  lastName: yup.string().label("Last name").min(3).max(30).required(),
});

type Inputs = {
  firstName: string;
  lastName: string;
  id: string;
};

const Infromation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [sErrors, setSErrors] = useState({});
  const { response, post, get, loading, data: repos } = useFetch();
  const authSelector = useSelector((state: any) => state.auth);
  const billingSelector = useSelector((state: any) => state.billing);
  const [pricesData, setPricesData] = useState([]);
  const [pricesInfo, setPriceInfo] = useState([]);
  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");
    console.log(res, "price response");
    setPricesData(res?.data?.prices);
  };

  useEffect(() => {
    fetchConfig();
    const price_data: any = pricesData?.filter((price: any) => {
      if (price.id === billingSelector?.user?.curr_price_id) {
        return true;
      } else {
        return false;
      }
    });
    setPriceInfo(price_data);
  }, [billingSelector]);

  const initiateCancelation = (e: any) => {
    e.preventDefault();
    setIsCancelLoading(true);
    const CancelPlan = async () => {
      const res = await post("subscription/cancel-subscription");
    };
    CancelPlan();

    setIsCancelLoading(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const initiateUpgradePlan = (e: any) => {
    e.preventDefault();
    navigate("/upgrade-plan");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  return (
    <>
      <Header />
      <main>
        <div className="infromation">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              {pricesInfo?.length > 0 ? (
                <div
                  className="personal__infromation"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <label>
                    Your Current Plan is {pricesInfo[0]?.product?.name}
                  </label>
                </div>
              ) : null}
            </div>

            <div className="col-md-6">
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="Generate__btn"
                  onClick={initiateUpgradePlan}
                >
                  Upgrade Plan
                </button>
              </div>
            </div>

            <div className="col-md-6"></div>

            <div className="col-md-6">
              <div className="d-flex justify-content-end">
                {isCancelLoading ? (
                  <button
                    disabled={isCancelLoading}
                    className="Generate__btn cancel__button"
                  >
                    loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="Generate__btn cancel__button"
                    onClick={initiateCancelation}
                  >
                    Cancel Plan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Infromation;
