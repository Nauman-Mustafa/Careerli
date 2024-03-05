import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user/user.module";
import { SubscriptionsService } from "./subscription.service";
import { SubscriptionController } from "./subscription.controller";

@Module({
  imports: [forwardRef(() => DatabaseModule), UserModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionModule {}
