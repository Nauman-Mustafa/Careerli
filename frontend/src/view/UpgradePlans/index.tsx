import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import Header from "../../components/Header/Header";
const UpgradePlan = () => {
  const { response, post, get, loading, data: repos } = useFetch();
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
  const billingSelector = useSelector((state: any) => state.billing);
  const curr_plan_index = useRef(0);

  const planData =
    pricesData &&
    pricesData?.map((plan: any, index) => {
      if (plan.id === billingSelector?.user?.curr_price_id) {
        curr_plan_index.current = index;
        return {
          id: plan.id,
          using: true,
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
      } else {
        return {
          id: plan.id,
          using: false,
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
    });

  const muatateCheckoutPlan = async (priceID: string) => {
    const res = await post("subscription/mutate-subscription", { priceID });
    // console.log(res,"res")
    toast.success(res?.message);
    setTimeout(() => {
      window.location.href = "/upgrade-plan";
    }, 800);
  };
  const handleModalClose = () => setModalShow(false);
  return (
    <>
      <Header />
      <main>
        <div className="pricing-wrapper">
          <div className="pricing-top-container">
            <div className="top-container">
              <h1>
                Different plans for
                <br /> different needs
              </h1>
            </div>
          </div>
          <div className="pricing-container">
            <div className="container">
              <div className="row flex-row-reverse">
                {planData?.map((item, i) =>
                  item.using ? (
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
                            disabled
                            style={{
                              backgroundColor: "#cccccc",
                            }}
                          >
                            Current Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
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
                              setAllowedId(item.id);
                              setModalShow(true);
                            }}
                          >
                            <span>
                              {i > curr_plan_index.current
                                ? "Downgrade to this plan"
                                : "Upgrade to this Plan"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={modalShow}
          onHide={handleModalClose}
          centered
          className="resumeModal"
        >
          <div className="resume-modal-body">
            <Modal.Header closeButton>
              <div className="d-flex align-items-center">
                <h4>Are you sure you want to Change Your Plan</h4>
              </div>
            </Modal.Header>
            <Modal.Body style={{ minHeight: "90px" }}>
              <div className="d-flex align-items-center justify-content-around">
                <button
                  style={{ minWidth: "200px" }}
                  className="btn btn-linen"
                  onClick={(e) => {
                    e.preventDefault();
                    muatateCheckoutPlan(allowedId);
                    setModalShow(false);
                  }}
                >
                  <span>Yes </span>
                </button>
                <button
                  style={{ minWidth: "200px" }}
                  className="btn btn-linen"
                  onClick={(e) => {
                    e.preventDefault();

                    setModalShow(false);
                  }}
                >
                  <span>NO </span>
                </button>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </main>
    </>
  );
};

export default UpgradePlan;
