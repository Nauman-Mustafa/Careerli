import { Connection } from "mongoose";
import { SubscriptionSchema } from "./schema/subscription.schema";
import { SUBSCRIPTION_REPOSITORY, SUBSCRIPTION } from "src/constants/index";
export const subscriptionProvider = [
  {
    provide: SUBSCRIPTION_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model(SUBSCRIPTION, SubscriptionSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
