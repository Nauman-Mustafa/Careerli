import { Module, forwardRef } from "@nestjs/common";
import { SchedulerService } from "./scheduler.service";
import { SchedulerController } from "./scheduler.controller";
import { UserService } from "../user";
import { SubscriptionsService } from "../subscription/subscription.service";
// import { SchedulerRegistry } from "@nestjs/schedule";

@Module({
  providers: [
    SchedulerService,
    UserService,
    SubscriptionsService,
    // SchedulerRegistry,
  ],
  controllers: [SchedulerController],
  exports: [SchedulerService],
})
export class SchedulerModule {}
