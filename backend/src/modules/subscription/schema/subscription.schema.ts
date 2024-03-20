import { String } from "aws-sdk/clients/acm";
import { Boolean } from "aws-sdk/clients/securityhub";
import mongoose, { Document, Schema } from "mongoose";

export interface ISubscriptionSchema {
  userID: String;
  stripe_checkout_session_id: String;
  stripe_checkout_session_status: Boolean;
  customer_id: String;
  subscription_id: String;
  curr_price_id: String;
  invoice_pdf: String;
  payment_intent_id: String;
  payment_method: String;
  payment_method_details: any;
  canceled_at: Number;
  billing_table_details: Array<any>;
}

export const SubscriptionSchema = new Schema<ISubscriptionSchema>(
  {
    userID: {
      type: String,
      required: true,
    },
    stripe_checkout_session_id: {
      type: String,
      default: "",
    },
    stripe_checkout_session_status: {
      type: Boolean,
      default: false,
    },
    customer_id: {
      type: String,
      required: true,
    },
    curr_price_id: {
      type: String,
      required: false,
    },
    subscription_id: {
      type: String,
      required: false,
    },
    invoice_pdf: {
      type: String,
      required: false,
      default: "",
    },
    payment_intent_id: {
      type: String,
      default: "",
      required: false,
    },
    payment_method: {
      type: String,
      default: "",
      required: false,
    },
    payment_method_details: {
      type: Object,
      default: {},
      required: false,
    },
    canceled_at: {
      type: Number,
      default: 0,
      required: false,
    },
    billing_table_details: {
      type: [],
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);
