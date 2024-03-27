import { Cron, CronExpression } from "@nestjs/schedule";
import { SubscriptionsService } from "../subscription/subscription.service";
import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly userService: UserService,
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  // handleCron() {
  //   console.log("hi");

  //   this.logger.debug("Hello Hamza was here =============>>>>");
  // }
  async checkSubscriptionStatus() {
    try {
      this.logger.log("running scheduler");
      const users = await this.userService.getAllUsers(); // Implement this method to fetch all users
      this.logger.log("All users are", users);

      const updateUserRolesPromises = users.map(async (user) => {
        try {
          // Fetch subscription data (if needed)
          const userID = user._id;
          const subscription =
            await this.subscriptionsService.findUserSubscription(userID);
          this.logger.log("subscription of each user is", subscription);

          // Update user role
          // await this.userService.updateUserRole(user._id, "Free Member");
          this.logger.log("cancel at is", subscription.canceled_at.valueOf());
          if (
            subscription.canceled_at &&
            subscription.canceled_at != 0 &&
            Date.now() / 1000 > subscription.canceled_at.valueOf()
          ) {
            await this.userService.updateUserRole(user._id, "Free Member");
            this.logger.log(
              `User ${user._id} has been downgraded to Free Member.`
            );
          } else {
            this.logger.log(`No role update needed for user ${user._id}`);
          }
          // this.logger.log(
          //   `User ${user._id} has been downgraded to Free Member.`
          // );
        } catch (error) {
          // Handle individual user errors
          this.logger.error(`Error processing user ${user._id}:`, error);
        }
      });

      await Promise.all(updateUserRolesPromises);

      // for (const user of users) {
      //   // const subscription = await this.subscriptionsService.getSubscription(
      //   //   user._id
      //   // ); // Implement this method to fetch subscription data
      //   // this.logger.log("subscription of each user is", subscription);

      //   const res = await this.userService.updateUserRole(
      //     user._id,
      //     "Free Member"
      //   );
      //   this.logger.log(`User ${user._id} has been downgraded to Free Member.`);

      //   // this.logger.log("res is ", res);
      // }
    } catch (error) {
      this.logger.error("Error checking subscription status:", error);
    }
  }
}
