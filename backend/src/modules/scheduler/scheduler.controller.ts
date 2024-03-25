import { Controller, Post, HttpStatus } from "@nestjs/common";
import { SchedulerService } from "./scheduler.service";

@Controller("scheduler")
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post("start")
  async startScheduler() {
    try {
      console.log("hehre");

      await this.schedulerService.checkSubscriptionStatus();
      return { message: "Scheduler started successfully" };
    } catch (error) {
      return { message: "Failed to start scheduler", error };
    }
  }

  // Add more endpoints as needed

  // @Post('stop')
  // async stopScheduler() {
  //   // Implement logic to stop scheduler
  // }
}
