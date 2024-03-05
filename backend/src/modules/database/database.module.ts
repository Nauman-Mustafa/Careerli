import { Module } from "@nestjs/common";
import { coverLetterProviders } from "../coverLetter/coverLetter.provider";
import { resumeProviders } from "../resume";
import { subscriptionProvider } from "../subscription/subscription.provider";
import { toolsProvider } from "../tools/tools.provider";
import { usersProviders } from "../user/users.provider";
import { databaseProviders } from "./database.provider";

const props = [
  ...databaseProviders,
  ...usersProviders,
  ...resumeProviders,
  ...subscriptionProvider,
  ...coverLetterProviders,
  ...toolsProvider,
];
@Module({
  providers: props,
  exports: props,
})
export class DatabaseModule {}
