/**========================================================================
 * *                                Redux Action Types
 *========================================================================**/

export const REDUX_ACTION = "[REDUX ACTION]: ";

/**========================================================================
 **                            Authentication
 *========================================================================**/
export const SAVE_LOGIN = `${REDUX_ACTION} Save User login and token to redux`;
export const SAVE_USER = `${REDUX_ACTION} Save User information to redux`;
export const DESTROY_LOGIN = `${REDUX_ACTION} Destroy User token and info from redux`;
export const GET_STRIPE_CONFIG = "Stripe/Config";
export const CREATE_STRIPE_SESSION = "Stripe/SessionCreate";
export const MUTATE_SUCCESS_STRIPE_SESSION = "Stripe/MutateSessionSucess";
export const MUTATE_FAILURE_STRIPE_SESSION = "Stripe/MutateSessionFailure";
export const CANCEL_STRIPE_SUBSCRRIPTION = "Stripe/cancel";
export const GET_SUBSCRIPTION_DATA = "GET_SUBSCRIPTION_DATA";
export const UPDATE_PAYMENT_METHOD = "UpdatePaymentMethod";
export const SETUP_INTENTCREATION = "SetupIntentCreation";
export const GET_USER_INVOICES = "GetUserInvoices";
export const UPDATE_PAYMENT_METHODS = "UpdatePaymentMethods";
export const DESTROY_BILLING = "resetbilling";
