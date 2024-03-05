import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import LoginModal from "../../components/Login/LoginModal";
import { createStripeCheckoutSession } from "../../store/action";
const Pricing = () => {
  const { response, post, get, loading, data: repos } = useFetch();
  const auth: any = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const [plan, _] = useState(false);
  const [pricesData, setPricesData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [allowedId, setAllowedId] = useState("");
  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");

    setPricesData(res?.data?.prices);
  };

  useEffect(() => {
    fetchConfig();
  }, []);
  const handleModalClose = () => setModalShow(false);
  const billingSelector = useSelector((state: any) => state.billing);
  const curr_plan_index = useRef(0);

  const planData =
    pricesData &&
    pricesData?.map((plan: any, index) => {
     
        return {
          id: plan.id,
          // using: false,
          // imagePath: svgIcons.triangleIcon,
          planName: plan.product?.name,
          planDesc: plan.product?.description,

          planPrice: [`$${plan.unit_amount / 100}`],
          forContent: "",
          recommended: "",
          downloads: [
            {
              credits: plan?.product?.metadata?.Credits,
              downloadResume: plan?.product?.metadata?.downloadResume,
              downloadCover: plan?.product?.metadata?.downloadCover,
            },
          ],
          serviceItems: [
            plan?.product?.metadata?.service1,
            plan?.product?.metadata?.service2,
            plan?.product?.metadata?.service3,
            plan?.product?.metadata?.service4,
            plan?.product?.metadata?.service5,
          ],
        };
      }
    );

  const initiateCheckoutSession = async (priceID: string) => {
    if (auth.isLoggedIn) {
      const res = await post("subscription/checkout-session", {
        priceId: priceID,
      });

      window.open(res?.data.session_url, "_self");

      dispatch(createStripeCheckoutSession(priceID));
    } else {
      setModalShow(true);
    }
  };
  const muatateCheckoutPlan = async (priceID: string) => {
    const res = await post("subscription/mutate-subscription", { priceID });

    toast.success(res?.message);
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

 
  return (
    <>
      <div className="pricing-container">
        <div className="container">
          <div className="row flex-row-reverse">
            {planData?.map((item, i) =>
            
                <div className="col-lg-4" key={`single-plan-${i}`}>
                  <div className="single-price">
                    <div className="single-price-child">
                      <div className="price-child">
                        <h2>{item.planName}</h2>
                        <h4>{item.planName} subscription</h4>
                        <h1>{item.planPrice}</h1>
                        {item.downloads.map((meta: any) => (
                          <>
                            <h3>
                              <b>{meta.downloadResume}</b>
                              Resume Downloads{" "}
                              {item.planName === "Free" && " / Per Month"}
                            </h3>
                            <h3>
                              <b>{meta.downloadCover}</b>
                              Cover Letter Downloads
                              {item.planName === "Free" && " / Per Month"}
                            </h3>
                            <h3>
                              <b>{meta.credits}</b>
                              AI Credits
                            </h3>
                          </>
                        ))}

                        <ul>
                          {item.serviceItems.map((service, iService) => (
                            <li key={iService}>
                              {service && (
                                <Icon icon="teenyicons:tick-circle-outline" />
                              )}
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        className="btn btn-yellow"
                        onClick={(e) => {
                          e.preventDefault();
                          initiateCheckoutSession(item.id);
                        }}
                      >
                       
                        <span>Get Started</span>
                     
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default Pricing;
