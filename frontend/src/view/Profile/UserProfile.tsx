import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Collapse, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import * as yup from "yup";
import { ValidationError } from "../../components/form/validation.component";
import Header from "../../components/Header/Header";
import { saveProfile, updateSessionStatus } from "../../store/action";
import StripePaymentMethodForm from "../setting/StripePaymentMethodForm";
import "./profileStyle.scss";
const schema = yup.object().shape({
  firstName: yup.string().label("First name").required(),
  lastName: yup.string().label("Last name").required(),
  email: yup.string().label("Email").email(),
});
const UserProfile = () => {
  const [activeCredit, setActiveCredit] = useState("10,000");
  const [activeTab, setActiveTab] = useState("Profile");
  const [selectSection, setSelectSection] = useState(false);
  const [periodEndDate, setPeriodEndDate] = useState();
  const [invoiceListRef, setinvoiceListRef] = useState([]);
  const [invoiceListLoad, setinvoiceListLoad] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [subscription, setSubscription] = useState<any>();
  const [card, setCard] = useState(false);
  const createIntentResponse = useRef(null);
  const [sErrors, setSErrors] = useState({});
  const [pricesData, setPricesData] = useState([]);
  const { response, post, get, loading, data: repos } = useFetch();
  const billingSelector = useSelector((state: any) => state.billing);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");
    const subscriptionData = await get("subscription/subscription-data");
    setSubscription(subscriptionData);
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

  const initiateCancelation = () => {
    const CancelPlan = async () => {
      const res = await post("subscription/cancel-subscription");
      // console.log(res.data.cancel.cancel_at)
      // dispatch(updateSessionStatus(false));
      // toast.success(res?.message);
    };
    CancelPlan();

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  const handleModalClose = () => setModalShow(false);
  useEffect(() => {
    getUserInvoices();
  }, []);
  const getUserInvoices = async () => {
    const res = await get("subscription/list-invoices");

    setinvoiceListRef(res?.data?.data);
    setinvoiceListLoad(false);
  };
  useEffect(() => {
    fetchConfig();
  }, []);

  const creditData = [
    {
      totalCredit: "10,000",
    },
    {
      totalCredit: "30,000",
    },
  ];
  const tabData = [
    {
      icon: <Icon icon="ph:user-circle-light" />,
      text: "Profile",
    },
    {
      icon: <Icon icon="ph:receipt" />,
      text: "Billing",
    },
  ];
  const invoiceData = [
    {
      no: "999999",
      date: "22/08/2022",
      payment: "Pro (Yearly)",
      amount: "$39",
    },
    {
      no: "999999",
      date: "22/08/2022",
      payment: "Pro (Yearly)",
      amount: "$39",
    },
    {
      no: "999999",
      date: "22/08/2022",
      payment: "Pro (Yearly)",
      amount: "$39",
    },
  ];

  var timestamp = subscription?.data?.canceled_at * 1000;

  // Create a new Date object using the timestamp
  var date = new Date(timestamp);

  // Extract day, month, and year components
  var day = date.getDate();
  var month = date.getMonth() + 1; // Month starts from 0, so add 1 to get the correct month
  var year = date.getFullYear();

  // Ensure that day and month are formatted with leading zeros if necessary
  //@ts-ignore
  day = day < 10 ? "0" + day : day;
  //@ts-ignore
  month = month < 10 ? "0" + month : month;

  // Format the date as dd-mm-yyyy
  var formattedDate = day + "-" + month + "-" + year;

  function epochToJsDate(ts: any): String {
    return new Date(ts * 1000).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const initiateSetupIntent = (e: any) => {
    e.preventDefault();
    CreateSetupIntent();
  };
  const CreateSetupIntent = async () => {
    const res = await post("subscription/create-setup-intent");

    createIntentResponse.current = { ...res?.data };
    setCard(true);
  };
  const tableData = useMemo(() => {
    if (invoiceListRef?.length < 1) {
      return [];
    } else {
      return invoiceListRef?.map((billing: any) => {
        const card = billing?.payment_intent?.payment_method?.card;
        return {
          id: 1,
          Invoice: `${billing.id.substring(0, 12)}`,
          date: `${epochToJsDate(billing.created)}`,
          amount: `${formatter.format(billing.amount_paid / 100)}`,
          status: billing.paid ? "Approved" : "Declined",
          receipt_url: billing.hosted_invoice_url,
          paymentString: `${card?.brand.toUpperCase()} ending in ${
            card?.last4
          }`,
        };
      });
    }
  }, [invoiceListRef]);
  const updateProfile = async (value: any) => {
    const res = await post("user/update-profile", value);

    if (res.status === "success") {
      const res = await get("user/me");
      dispatch(saveProfile(res?.data));
      toast.success("Profile updated");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="user-profile">
      <Header />
      <div className="profile-wrapper">
        <div className="profile-tabs">
          <ul>
            {tabData.map((tab, tabIn) => (
              <li
                className={activeTab === tab.text ? "active-tab" : ""}
                key={tabIn}
                onClick={() => setActiveTab(tab.text)}
              >
                <figure>{tab.icon}</figure>
                <p>{tab.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-container">
          <div className="buy-credits">
            <div className="content">
              <h4>Buy AI Credits</h4>
              <p>valid for a month</p>
              <div className="creditSwitch">
                <ul>
                  {creditData.map((item, i) => (
                    <li
                      className={
                        activeCredit === item.totalCredit ? "active-tab" : ""
                      }
                      key={`credit-${i}`}
                      onClick={() => setActiveCredit(item.totalCredit)}
                    >
                      {item.totalCredit} AI Credits
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-yellow" disabled>
                <span>
                  Buy Now - {activeCredit === "10,000" ? "$10" : "$30"}
                </span>
              </button>
            </div>
            <figure>
              <img src="/images/buy-credits.png" />
            </figure>
          </div>
          {activeTab === "Profile" ? (
            <>
              <div className="profile-box">
                <div className="box-header d-flex justify-content-between">
                  <div className="header-left d-inline-flex align-items-center">
                    <div className="figure-icon">
                      <Icon icon="ph:user-circle-light" />
                    </div>
                    <h5>Account Info</h5>
                  </div>
                  <div className="header-right d-flex align-items-center">
                    <button
                      className="btn btn-edit"
                      aria-controls="profile"
                      aria-expanded="true"
                      onClick={() => {
                        setSelectSection(!selectSection);
                      }}
                    >
                      <Icon icon="eva:edit-2-outline" />
                      <span>Edit Details</span>
                    </button>
                    <button
                      onClick={handleSubmit(updateProfile)}
                      className="btn btn-save"
                    >
                      <span>Save Edit</span>
                    </button>
                  </div>
                </div>
                <Collapse in={selectSection} className="box-body">
                  <div id="profile">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={
                              auth?.user?.firstName
                                ? auth?.user?.firstName
                                : "Amaka"
                            }
                            {...register("firstName")}
                          />
                          <ValidationError
                            name="firstName"
                            errors={errors}
                            sErrors={sErrors}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={
                              auth?.user?.lastName
                                ? auth?.user?.lastName
                                : "pascal"
                            }
                            {...register("lastName")}
                          />
                          <ValidationError
                            name="lastName"
                            errors={errors}
                            sErrors={sErrors}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            disabled
                            type="email"
                            className="form-control"
                            placeholder={
                              auth?.user?.email
                                ? auth?.user?.email
                                : "ammiedesigns@gmail.com"
                            }
                            {...register("email")}
                          />
                          <ValidationError
                            name="email"
                            errors={errors}
                            sErrors={sErrors}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
              {billingSelector?.user?.stripe_checkout_session_id && (
                <div
                  className="profile-box"
                  style={card ? { display: "none" } : { display: "block" }}
                >
                  <div className="box-header d-flex justify-content-between">
                    <div className="header-left d-inline-flex align-items-center">
                      <div className="figure-icon">
                        <Icon icon="ph:credit-card" />
                      </div>
                      <h5>Card Info</h5>
                    </div>
                    <div className="header-right d-flex align-items-center">
                      <button
                        onClick={initiateSetupIntent}
                        className="btn btn-edit"
                      >
                        <Icon icon="eva:edit-2-outline" />
                        <span>Update Card</span>
                      </button>
                      <button
                        className="btn btn-save"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span>Save Update</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div
                style={
                  card
                    ? { display: "block", padding: "30px" }
                    : { display: "none" }
                }
                className="profile-box"
              >
                <div className="profile-card newCard">
                  <StripePaymentMethodForm {...createIntentResponse?.current} />
                </div>
              </div>

              {/* <div className="profile-box delete-box">
                <div className="box-header d-flex justify-content-between align-items-center">
                  <div className="header-left">
                    <div className="delete-content">
                      <figure>
                        <Icon icon="ph:trash" />
                      </figure>
                      <span>Account Deletion</span>
                    </div>
                    <p>
                      Once you delete your account, it cannot be undone. This is
                      permanent.
                    </p>
                  </div>
                  <div className="header-right">
                    <button className="btn btn-delete" disabled>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div> */}
              {billingSelector?.user?.stripe_checkout_session_id && (
                <div className="profile-box delete-box">
                  <div className="box-header d-flex justify-content-between align-items-center">
                    <div className="header-left">
                      <div className="delete-content">
                        <figure>
                          <Icon icon="ph:trash" />
                        </figure>
                        {subscription?.data?.canceled_at ? (
                          <span>Plan Cancelled</span>
                        ) : (
                          <span>Cancel Plan</span>
                        )}
                      </div>

                      {!subscription?.data?.canceled_at ? (
                        <p>
                          Once you Cancel your Plan, it cannot be undone. This
                          is permanent.
                        </p>
                      ) : (
                        <p>you subscription is valid till {formattedDate}</p>
                      )}
                    </div>
                    <div className="header-right">
                      <button
                        onClick={() => {
                          setModalShow(true);
                        }}
                        //@ts-ignore
                        disabled={
                          subscription?.data?.canceled_at ? true : false
                        }
                        className="btn btn-delete"
                      >
                        Cancel Plan{" "}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="customer-support">
                <p>
                  Need help? Our team would love to hear from you.{" "}
                  <b>Contact Customer Support.</b>
                </p>
              </div>
            </>
          ) : (
            billingSelector?.user?.stripe_checkout_session_id && (
              <>
                <div className="profile-box">
                  <div className="box-header d-flex justify-content-between">
                    <div className="header-left d-inline-flex align-items-center">
                      <div className="figure-icon">
                        <Icon icon="ph:repeat" />
                      </div>
                      {!billingSelector?.user?.stripe_checkout_session_id ? (
                        <h5>Subscription Renewal Date</h5>
                      ) : (
                        <h5>Subscription Expiry Date</h5>
                      )}
                    </div>
                    <div className="header-right d-flex align-items-center">
                      <p>{epochToJsDate(periodEndDate)}.</p>
                    </div>
                  </div>
                </div>
                {/* <div className="profile-box">
                <div className="box-header d-flex justify-content-between">
                  <div className="header-left d-inline-flex align-items-center">
                    <div className="figure-icon">
                      <Icon icon="ph:receipt" />
                    </div>
                    <h5>Invoice</h5>
                  </div>
                  <div className="header-right d-flex align-items-center">
                    <button className="btn btn-linen">
                      <Icon icon="material-symbols:headphones-outline-rounded" />
                      <span>Contact Support</span>
                    </button>
                  </div>
                </div>
                <div className="box-body">
                  {invoiceData.map((item, i) => (
                    <div className="single-invoice" key={`single-invoice-${i}`}>
                      <ul>
                        <li>
                          <label>#</label>
                          <p>{item.no}</p>
                        </li>
                        <li>
                          <label>Date</label>
                          <p>{item.date}</p>
                        </li>
                        <li>
                          <label>Payment</label>
                          <p>{item.payment}</p>
                        </li>
                        <li>
                          <label>Amount</label>
                          <p>{item.amount}</p>
                        </li>
                        <li>
                          <button className="btn btn-download">
                            <Icon icon="material-symbols:download-rounded" />
                            <span>Download Invoice</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div> */}
                <div className="profile-box">
                  <div className="box-header d-flex justify-content-between">
                    <div className="header-left d-inline-flex align-items-center">
                      <div className="figure-icon">
                        <Icon icon="ph:receipt" />
                      </div>
                      <h5>Invoice</h5>
                    </div>
                    <div className="header-right d-flex align-items-center">
                      <button className="btn btn-linen" disabled>
                        <Icon icon="material-symbols:headphones-outline-rounded" />
                        <span>Contact Support</span>
                      </button>
                    </div>
                  </div>
                  <div className="box-body">
                    {/* <div className="responsive-table single-invoice">
                    <table>
                      <tbody>
                        {tableData?.map((item, i) => (
                          <tr key={`single-invoice-${i}`}>
                            <td>
                              <label>#</label>
                              <p>{item?.Invoice}</p>
                            </td>
                            <td>
                              <label>Date</label>
                              <p>{item.date}</p>
                            </td>
                            <td>
                              <label>Payment</label>
                              <p>{item.paymentString}</p>
                            </td>
                            <td>
                              <label>Amount</label>
                              <p>{item.amount}</p>
                            </td>
                            <td>
                              <button
                                onClick={() => window.open(item.receipt_url)}
                                className="btn btn-download"
                              >
                                <Icon icon="material-symbols:download-rounded" />
                                <span>Download Invoice</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
                    {tableData?.map((item, i) => (
                      <div
                        className="single-invoice"
                        key={`single-invoice-${i}`}
                      >
                        <ul>
                          <li>
                            <label>#</label>
                            <p>{item?.Invoice}</p>
                          </li>
                          <li>
                            <label>Date</label>
                            <p>{item.date}</p>
                          </li>
                          <li>
                            <label>Payment</label>
                            <p>{item.paymentString}</p>
                          </li>
                          <li>
                            <label>Amount</label>
                            <p>{item.amount}</p>
                          </li>
                          <li>
                            <button
                              onClick={() => window.open(item.receipt_url)}
                              className="btn btn-download"
                            >
                              <Icon icon="material-symbols:download-rounded" />
                              <span>Download Invoice</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )
          )}
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
              <h2>Are you sure you want to Cancel Your Plan</h2>
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
    </div>
  );
};

export default UserProfile;
