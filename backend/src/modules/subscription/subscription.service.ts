import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { InjectStripe } from "nestjs-stripe";
import { SUBSCRIPTION_REPOSITORY } from "src/constants";
import { generateResponse } from "src/utils";
import Stripe from "stripe";
import { BaseService } from "../shared/base.service";
import { updatePaymentMethodDTO } from "./dto/subscription.dto";
import { ISubscriptionSchema } from "./schema/subscription.schema";

/**
 *  FLOW OF THE MODULE
 *
 *
 *  The flow of this modules is below:
 * 1- Admin Create Prices and Products on the stripe Dashboard
 * 2- Admin Uses getStripeConfig in the backend to show current Prices and Products to users.
 * 3- User selects the price to subscribe and calls createCheckoutSession using a route.
 * 4- We create the user subscription in createCheckoutSession and sends the user session url
 * 5- User Redirects to Session URL on the Frontend and inputs its Card.  Stripe handles the
 * payment.
 *
 * 6. Payment Verification Flow
 * 6.1 Upon Successfull payment, stripe redirects user to Frontend Success url, then
 *  Frontend calls,
 * persistCheckoutSessionID to persist the changes.
 *
 * 6.2 Upon Failure, The Frontend Redirect user to Subscription Route Again.
 */

@Injectable()
export class SubscriptionsService extends BaseService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    protected subscriptionRepo: Model<ISubscriptionSchema>,

    @InjectStripe()
    private readonly stripeService: Stripe
  ) {
    super(subscriptionRepo);
  }

  /**
   *
   * @returns the prices, products and current publishable created in the current
   * stripe account
   *
   * On the Frontend, this is used to show pricing table.
   * Polling can be perform on the frontend, if you are changing meta-data of
   * the products too much
   */
  async getStripeConfig() {
    try {
      const prices = await this.stripeService.prices.list({
        expand: ["data.product"],
      });

      const data = {
        publishableKey: process.env.STRIPE_PUB_KEY,
        prices: prices.data,
      };

      return generateResponse(
        false,
        HttpStatus.OK,
        "Stripe Config Generated",
        data
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not get Stripe config",
        error
      );
    }
  }

  /**
   *
   *  This handles the True case for Checkout Session, and Redirect the user to Dashboard
   *
   * @param sessionID Fetched from the body of the request, it is the checkout session ID
   * that we created in createCheckoutSession
   * @param userID Fetched from the headers
   */
  async persistCheckoutSessionID(sessionID, userID) {
    try {
      const sub = await this.subscriptionRepo.findOne({
        userID: userID,
      });

      await this.subscriptionRepo.findByIdAndUpdate(sub._id, {
        stripe_checkout_session_id: sessionID,
        stripe_checkout_session_status: true,
      });

      const data = {
        redirectURL: `${process.env.FRONTEND_BASE_URL}`,
      };

      return generateResponse(
        false,
        HttpStatus.OK,
        "Redirecting to Plans",
        data
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not Persist Checkout Session ID",
        error
      );
    }
  }

  async persistCheckoutSessionIDOnFailed(sessionID, userID) {
    try {
      const sub = await this.subscriptionRepo.findOne({
        userID: userID,
      });
      await this.subscriptionRepo.findByIdAndUpdate(sub._id, {
        curr_price_id: "",
      });
      const data = {
        redirectURL: `${process.env.FRONTEND_BASE_URL}`,
      };

      return generateResponse(
        false,
        HttpStatus.OK,
        "Redirecting to Plans",
        data
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not Persist Checkout Session ID",
        error
      );
    }
  }

  /**
   *
   * @param priceId
   * @param userID
   * @return the first phase of the subscription of ther user, as this configures the
   * user subscription,
   * and redirects the user to session url where stripe handles the payment.
   *
   */
  async createCheckoutSession(priceId, userID) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });
      console.log("Subscription:", subscription);
  
      const session = await this.stripeService.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer: subscription.customer_id as string,
        success_url: `${process.env.FRONTEND_BASE_URL}/stripe-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_BASE_URL}/stripe-failure/{CHECKOUT_SESSION_ID}`,
      });
      console.log("Stripe Session:", session);
  
      await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
        stripe_checkout_session_id: session.id,
        curr_price_id: priceId,
      });
  
      console.log("Checkout Session created successfully.");
  
      return generateResponse(
        false,
        HttpStatus.ACCEPTED,
        "Created Checkout Session",
        {
          session_url: session.url,
        }
      );
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not create Session",
        error
      );
    }
  }
  
  /**
   *
   * @param userID Fetched from the header,
   * @returns This method is used to cancel the subscription of the user By default,
   * the cancellation takes effect immediately.
   * But we can setup prorating and useage-based cancellations
   *
   *
   * We are using the second example here
   * For Example:
   *
   * Example 1:
   *
   * this.stripeService.subscriptions.update('sub_49ty4767H20z6a', {cancel_at_period_end: true});
   *
   * Above code will cancel the user subscription at the subscription end period.
   *
   * Example 2:
   *
   * this.stripeService.subscriptions.del('sub_49ty4767H20z6a'))
   *
   *
   * The Benifit of using the first version is, Subscription is deactivated and it can be
   *  re-activated again.
   *
   * but in the 2nd example case, a new subscription needs to be created as previous one
   * is deleted
   */
  async cancelSubscription(userID) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });

      const session_id = subscription.stripe_checkout_session_id;

      const checkout = await this.stripeService.checkout.sessions.retrieve(
        session_id as string
      );

      const cancel_subscription = await this.stripeService.subscriptions.update(
        checkout.subscription as string,
        {
          cancel_at_period_end: true,
        }
      );

      const subscriptionRepo = await this.subscriptionRepo.findByIdAndUpdate(
        subscription._id,
        {
          stripe_checkout_session_id: "",
          stripe_checkout_session_status: false,
          curr_price_id: "",
          billing_table_details: [],
          invoice_pdf: "",
          payment_method: "",
          payment_method_details: {},
        }
      );

      return generateResponse(
        false,
        HttpStatus.ACCEPTED,
        "Checkout Cancelled",
        {
          stripe_checkout_session_id:
            subscriptionRepo.stripe_checkout_session_id,
          cancel: cancel_subscription,
        }
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not Cancel Subscription",
        error
      );
    }
  }

  /**
   *
   * @param userID Fetched from the header
   * @returns the Subscription Modal Data because incoming webhooks can have billings,
   * so frontend can keep pooling this service to get latest changes i.e billing , next_actions
   * etc
   */

  async getSubscriptionData(userID) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });
      const { data: sbs } = await this.getActiveSubscription(
        subscription.customer_id
      );
      let info = {
        stripe_checkout_session_status: sbs.length > 0,
        details: null,
        plan: {} as any,
      };
      if (sbs.length > 0) {
        const [active] = sbs as any;
        const {
          data: { prices },
        } = (await this.getStripeConfig()) as any;
        const plan = prices.find((p) => p.id === active.plan.id);
        info.plan = plan.product;
        info.details = active;
      }
      return generateResponse(false, HttpStatus.ACCEPTED, "Subscription Data", {
        ...subscription.toJSON(),
        ...info,
      });
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not fetch subscription",
        error
      );
    }
  }

  async getLastDate(userID) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });

      const session_id = subscription.stripe_checkout_session_id;
      const checkout = await this.stripeService.checkout.sessions.retrieve(
        session_id as string
      );

      const subscriptionDataFromStripe =
        await this.stripeService.subscriptions.retrieve(
          checkout.subscription as string
        );

      let endDate = subscriptionDataFromStripe?.current_period_end;
      return generateResponse(false, HttpStatus.ACCEPTED, "Subscription Data", {
        endDate,
      });
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.BAD_REQUEST,
        "Could not fetch subscription",
        error
      );
    }
  }

  /**
   *
   * @param userID Fetched from headers
   * @param body Card Details (TODO: aes-256 encrption)
   * @upgrade the Payment Method i.e card of the user, if there is
   * any card number error or cvc checks error it will throw 500.
   */
  async updatePaymentMethod(userID, body: updatePaymentMethodDTO) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });

      const session_id = subscription.stripe_checkout_session_id;

      const checkout = await this.stripeService.checkout.sessions.retrieve(
        session_id as string
      );

      const setup_intent_data = await this.stripeService.setupIntents.retrieve(
        body.setup_intent as string
      );

      await this.stripeService.paymentMethods.attach(
        setup_intent_data.payment_method as string,
        {
          customer: subscription.customer_id,
        }
      );

      await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
        payment_method: setup_intent_data.payment_method as string,
      });

      const updatedSubscription = await this.stripeService.subscriptions.update(
        checkout.subscription as string,
        {
          default_payment_method: setup_intent_data.payment_method as string,
        }
      );

      const payment_method_data =
        await this.stripeService.paymentMethods.retrieve(
          setup_intent_data.payment_method as string
        );

      await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
        payment_method: setup_intent_data.payment_method as string,
        payment_method_details: {
          ...payment_method_data.card,
        },
      });

      return generateResponse(
        false,
        HttpStatus.OK,
        "Updated Payment Method",
        updatedSubscription
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Could not update the Payment Method",
        error
      );
    }
  }

  /**
   * This is service function that is used for managing webhooks for stripe
   * service
   * @param sig The Signature of the webhook from its header
   * @param body The Raw Body that is also get from the header
   * @returns 200 OK If all the desired operation are done , 500 If there is any error occures
   * with the error response send to stripe. so that you can view it in the dashboard
   */

  async processEventFromWebhook(sig: any, body: Buffer) {
    try {
      const event: any = this.stripeService.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET_KEY
      );

      const data = event.data.object;
      const type = event.type;

      // If else is used because I need to do scoped variable
      // switch doesn't provide that functionality
      // console.log({
      //   type,
      //   data: JSON.stringify(data),
      // });
      if (type === "setup_intent.requires_action") {
        const subscription = await this.subscriptionRepo.findOne({
          customer_id: data.customer,
        } as FilterQuery<ISubscriptionSchema>);
        if (subscription === null) {
          return generateResponse(
            false,
            HttpStatus.OK,
            "Event Processed",
            event.data.object
          );
        }
      } else if (type === "payment_method.attached") {
        const subscription = await this.subscriptionRepo.findOne({
          customer_id: data.customer,
        } as FilterQuery<ISubscriptionSchema>);
        if (subscription === null) {
          return generateResponse(
            false,
            HttpStatus.OK,
            "Event Processed",
            event.data.object
          );
        }

        await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
          payment_method: data.id,
          payment_method_details: {
            ...data.card,
          },
        });
      } else if (type === "customer.subscription.deleted") {
        const subscription = await this.subscriptionRepo.findOne({
          customer_id: data.customer,
        } as FilterQuery<ISubscriptionSchema>);

        if (subscription == null) {
          return generateResponse(
            false,
            HttpStatus.OK,
            "Event Processed",
            event.data.object
          );
        }

        await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
          stripe_checkout_session_id: "",
          stripe_checkout_session_status: false,
          canceled_at: data.canceled_at,
        });
      } else if (type === "payment_intent.succeeded") {
        const subscription = await this.subscriptionRepo.findOne({
          customer_id: data.customer as string,
        } as FilterQuery<ISubscriptionSchema>);
        if (subscription === null) {
          return generateResponse(
            false,
            HttpStatus.OK,
            "Event Processed",
            event
          );
        }

        await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
          $push: {
            billing_table_details: {
              ...data.charges.data[0],
            },
          },
        });
      } else if (type === "invoice.paid") {
        const subscription = await this.subscriptionRepo.findOne({
          customer_id: data.customer as string,
        } as FilterQuery<ISubscriptionSchema>);

        if (subscription === null) {
          return generateResponse(
            false,
            HttpStatus.OK,
            "Event Processed",
            event
          );
        }
        await this.subscriptionRepo.findByIdAndUpdate(subscription._id, {
          invoice_pdf: data.invoice_pdf,
        });
      } else {
      }

      return generateResponse(false, HttpStatus.OK, "Event Processed", event);
    } catch (error: any) {
      console.log(error.toString());
      return generateResponse(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Could not Process the event",
        error
      );
    }
  }

  async getCustomerDetail(id) {
    try {
      return await this.stripeService.customers.retrieve(id as string);
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Could not get data",
        error
      );
    }
  }

  async getActiveSubscription(customer: string) {
    return await this.stripeService.subscriptions.list({
      limit: 1,
      customer,
    });
  }

  async getCustomerByid(id) {
    return await this.subscriptionRepo
      .findOne({
        userID: id as string,
      })
      .sort({ createdAt: -1 });
  }

  async getProductMetadata(id) {
    return await this.stripeService.products.retrieve(id as string);
  }

  /**
   *
   * Assuming a customer is currently subscribed to a basic-monthly subscription at 10 USD
   * per month,
   * the following code switches the customer to a pro-monthly subscription at 30 USD per month.
   * When changing a subscription item’s price, quantity is set to 1.
   *
   *  Any proration behavior is automatically calculated and billed by the stripe itself.
   *
   * @@ (https://stripe.com/docs/billing/subscriptions/upgrade-downgrade)
   */
  async mutateSubscriptionPlan(userID, priceId) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });
      const session_id = subscription.stripe_checkout_session_id;
      const checkout = await this.stripeService.checkout.sessions.retrieve(
        session_id as string
      );

      const subscriptionDataFromStripe =
        await this.stripeService.subscriptions.retrieve(
          checkout.subscription as string
        );

      await this.stripeService.subscriptions.update(
        checkout.subscription as string,
        {
          cancel_at_period_end: false,
          proration_behavior: "create_prorations",
          items: [
            {
              id: subscriptionDataFromStripe.items.data[0].id,
              price: priceId,
            },
          ],
        }
      );

      const sub = await this.subscriptionRepo.findByIdAndUpdate(
        subscription._id,
        {
          curr_price_id: priceId,
        },
        {
          new: true,
        }
      );

      return generateResponse(
        false,
        HttpStatus.OK,
        "Subscription mutatatded Sucessfully",
        sub
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Could not Mutate Subscription",
        error
      );
    }
  }

  async createSetupIntent(userID) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });

      const newSetupIntent = await this.stripeService.setupIntents.create({
        payment_method_types: ["card"],
        customer: subscription.customer_id,
      });

      return generateResponse(
        false,
        HttpStatus.OK,
        "Intent Generated",
        newSetupIntent
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Could not Create the intent",
        error
      );
    }
  }

  async getUserInvoices(userID) {
    try {
      const subscription = await this.subscriptionRepo.findOne({
        userID,
      });
      const listedInvoices = await this.stripeService.invoices.list({
        customer: subscription.customer_id as string,
        expand: [
          "data.customer",
          "data.payment_intent",
          "data.payment_intent.payment_method",
        ],
      });
      return generateResponse(
        false,
        HttpStatus.OK,
        "Invoices Fetched",
        listedInvoices
      );
    } catch (error) {
      return generateResponse(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Could not fetch user invoices",
        error
      );
    }
  }
}
