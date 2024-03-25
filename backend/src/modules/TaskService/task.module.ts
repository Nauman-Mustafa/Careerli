import { Module } from "@nestjs/common";
import { TasksService } from "./task.service";
import { UserModule, UserService } from "../user";
import { SubscriptionsService } from "../subscription/subscription.service";
import { SubscriptionModule } from "../subscription/subscription.module";

@Module({
  imports: [UserModule, SubscriptionModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
