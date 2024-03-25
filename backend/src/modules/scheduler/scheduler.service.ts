import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UserService } from "../user/user.service";
import { SubscriptionsService } from "../subscription/subscription.service";

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly userService: UserService,
    private readonly subscriptionsService: SubscriptionsService // private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM) // Run every day
  async checkSubscriptionStatus() {
    try {
      this.logger.log("running scheduler");
      const users = await this.userService.getAllUsers(); // Implement this method to fetch all users
      this.logger.log("All users are", users);

      for (const user of users) {
        const subscription = await this.subscriptionsService.getSubscription(
          user.id
        ); // Implement this method to fetch subscription data
        this.logger.log("subscription of each user is", subscription);
        if (
          subscription
          //   &&
          //   subscription.canceled_at < Math.floor(Date.now() / 1000)
        ) {
          const res = await this.userService.updateUserRole(
            user.id,
            "Free Member"
          ); // Implement this method to update user role
          this.logger.log(
            `User ${user.id} has been downgraded to Free Member.`
          );

          this.logger.log("res is ", res);
        }
      }
    } catch (error) {
      this.logger.error("Error checking subscription status:", error);
    }
  }
}
