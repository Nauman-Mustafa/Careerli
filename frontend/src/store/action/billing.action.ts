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
  UPDATE_SESSION_STATUS,
} from "../type";

export const getStripeConfig = (data: any) => ({
  type: GET_STRIPE_CONFIG,
  payload: data,
});

export const createStripeCheckoutSession = (data: any) => ({
  type: CREATE_STRIPE_SESSION,
  payload: data,
});

export const updateWithSessionStatus = (data: any) => ({
  type: CREATE_STRIPE_SESSION,
  payload: data,
});

export const muatateSucessStripeSession = (data: any) => ({
  type: MUTATE_SUCCESS_STRIPE_SESSION,
  payload: data,
});
export const muatateFailureStripeSession = (data: any) => ({
  type: MUTATE_FAILURE_STRIPE_SESSION,
  payload: data,
});
export const cancelSubsription = (data: any) => ({
  type: CANCEL_STRIPE_SUBSCRRIPTION,
  payload: data,
});
export const getSubscriptionData = (data: any) => ({
  type: GET_SUBSCRIPTION_DATA,
  payload: data,
});
export const updatePaymentMethod = (data: any) => ({
  type: UPDATE_PAYMENT_METHOD,
  payload: data,
});
export const mutateSubscriptionPlanThunk = (data: any) => ({
  type: UPDATE_PAYMENT_METHODS,
  payload: data,
});
export const createSetupIntent = (data: any) => ({
  type: SETUP_INTENTCREATION,
  payload: data,
});
export const getUserInvoicesThunk = () => ({
  type: GET_USER_INVOICES,
});
export const configureCurrentCheckoutSessionID = (data: any) => ({
  type: "CONFIGURE_CURRENT_ID",
  payload: data,
});

export const destroyBilling = () => ({
  type: DESTROY_BILLING,
});

