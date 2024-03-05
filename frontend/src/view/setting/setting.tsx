// @ts-nocheck
import React, { useEffect, useState } from "react";
// import Dropzone from "@comp/Dropzone/Dropzone";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import Header from "../../components/Header/Header";
import BillingDetails from "./billingdetails";
import ExistingCard from "./ExistingCard";
// import settingbackground from "@assets/images/setting/settingbackground.svg";
// import placeholder from "@assets/images/setting/placeholder.svg";
import "./style.scss";

const Setting = () => {
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [allowedId, setAllowedId] = useState("");
  const { response, post, get, loading, data: repos } = useFetch();
  const authSelector = useSelector((state: any) => state.auth);
  const billingSelector = useSelector((state: any) => state.billing);
  const [pricesData, setPricesData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [periodEndDate, setPeriodEndDate] = useState();

  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");

    setPricesData(res?.data?.prices);
    const resss = await get("subscription/subscription-lastDate");
    setPeriodEndDate(resss?.data?.endDate);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const price_data: any = pricesData?.filter((price: any) => {
    if (price?.id === billingSelector?.user?.curr_price_id) {
      return true;
    } else {
      return false;
    }
  });
  function epochToJsDate(ts: any): String {
    return new Date(ts * 1000).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const initiateCancelation = (e: any) => {
    setIsCancelLoading(true);
    const CancelPlan = async () => {
      const res = await post("subscription/cancel-subscription");

      toast.success(res?.message);
    };
    CancelPlan();

    setIsCancelLoading(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };
  const handleModalClose = () => setModalShow(false);
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <section className="At-SectionLoginForm">
                <div className="At-LoginLeft" style={{ textAlign: "center" }}>
                  {/* <img src={forgetpasswordImage} alt="" className="images-grounp" /> */}
                </div>
                <div className="At-LoginBoxOuter">
                  <div className="At-LoginBox">
                    <h3 className="welcome mt-3">
                      {" "}
                      Your Current Plan is{" "}
                      {price_data && price_data[0]?.product?.name}
                    </h3>
                    <h4
                      style={{ textAlign: "center" }}
                      className="welcome mt-3"
                    >
                      Next Invoice on {epochToJsDate(periodEndDate)}
                    </h4>
                    {/* <div className="description">
                      If an account exists for abc@gmail.com, you will get an
                      email with instructions on resetting your password. If it
                      doesn’t arrive, be sure to check your spam folder.
                    </div> */}
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={() => {
                          setModalShow(true);
                        }}
                        className="btn btn-yellow"
                      >
                        Cancel Plan
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile">
                <ExistingCard />
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile__details">
                <div className="profileright__content">
                  <BillingDetails />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={modalShow}
          onHide={handleModalClose}
          centered
          className="resumeModal cancel-plan-modal"
        >
          <div className="resume-modal-body">
            <Modal.Header closeButton>
              <div className="d-flex align-items-center">
                <h4>Are you sure you want to Cancel Your Plan</h4>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center justify-content-around">
                <button
                  className="btn btn-linen"
                  style={{ minWidth: "200px" }}
                  onClick={(e) => {
                    e.preventDefault();

                    initiateCancelation();
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

export default React.memo(Setting);
