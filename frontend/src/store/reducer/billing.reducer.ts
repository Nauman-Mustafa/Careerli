import {
  CANCEL_STRIPE_SUBSCRRIPTION,
  CREATE_STRIPE_SESSION,
  DESTROY_BILLING,
  GET_STRIPE_CONFIG,
  GET_SUBSCRIPTION_DATA,
  GET_USER_INVOICES,
  MUTATE_FAILURE_STRIPE_SESSION,
  MUTATE_SUCCESS_STRIPE_SESSION,
  SETUP_INTENTCREATION,
  UPDATE_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHODS,
} from "../type";

export interface IBilling {
  prices: Array<any>;
  current_checkout_session_id: string;
  current_price_id: string;
  loading: string;
  session_url: string;
  stripe_checkout_session_status: Boolean;
  curr_price_id: String;
  payment_method_type: String;
  payment_method_details: String;
}

const initialState: IBilling = {
  loading: "",
  prices: [{}],
  current_checkout_session_id: "",
  current_price_id: "",
  session_url: "",
  stripe_checkout_session_status: false,
  curr_price_id: "",
  payment_method_type: "card",
  payment_method_details: "",
};

export const billingReducer = (state = initialState, action: any) => {
  // console.log(action.type, action.payload, "subscirption");
  switch (action.type) {
    case GET_STRIPE_CONFIG:
      return { ...state, prices: action.payload };
    case CREATE_STRIPE_SESSION:
      return { ...state, user: action.payload };
    case MUTATE_SUCCESS_STRIPE_SESSION:
      return { ...state, user: action.payload };
    case MUTATE_FAILURE_STRIPE_SESSION:
      return { ...state, user: action.payload };
    case CANCEL_STRIPE_SUBSCRRIPTION:
      return { ...state, user: action.payload };
    case GET_SUBSCRIPTION_DATA:
      return { ...state, user: action.payload };
    case UPDATE_PAYMENT_METHOD:
      return { ...state, user: action.payload };
    case SETUP_INTENTCREATION:
      return { ...state, user: action.payload };
    case GET_USER_INVOICES:
      return { ...state, user: action.payload };
    case UPDATE_PAYMENT_METHODS:
      return { ...state, user: action.payload };
    case "CONFIGURE_CURRENT_ID":
      return { ...state, user: action.payload };
    case DESTROY_BILLING:
      return { ...initialState };
    default:
      return state;
  }
};
