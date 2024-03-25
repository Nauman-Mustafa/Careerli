import { applyRawBodyOnlyTo } from "@golevelup/nestjs-webhooks";
import { MailerModule } from "@nestjs-modules/mailer";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { StripeModule } from "nestjs-stripe";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { CoverLetterModule } from "./modules/coverLetter/coverLetter.module";
import { DatabaseModule } from "./modules/database/database.module";
import { ResumeModule } from "./modules/resume";
import { SubscriptionModule } from "./modules/subscription/subscription.module";
import { ToolsModule } from "./modules/tools/tools.module";
import { UserModule } from "./modules/user/user.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./modules/TaskService/task.module";

const envPath = join(__dirname, "..", ".env");
require("dotenv").config({ path: envPath });
@Module({
  imports: [
    // The .forRoot() call initializes the scheduler and registers any declarative cron jobs, timeouts and intervals that exist within your app
    ScheduleModule.forRoot(),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_SEC_KEY,
      apiVersion: "2022-08-01",
    }),
    AuthModule,
    ResumeModule,
    CoverLetterModule,
    DatabaseModule,
    UserModule,
    TasksModule,
    ToolsModule,
    SubscriptionModule,
    ServeStaticModule.forRoot({
      rootPath: join("public"),
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ekkel.ai.test@gmail.com",
          pass: "dsyhxkrghepewcot",
        },
      },
    }),

    MulterModule.register({
      dest: "./upload",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: "subscription/stripe/webhook",
    });
  }
}
