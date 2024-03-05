import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { json, urlencoded } from "express";
import { join } from "path";
import { env } from "process";
import { AppModule } from "./app.module";
import { ValidationFormatter } from "./helpers/validation-formatter.helper";
//dotEnvConfig();
const envPath = join(__dirname, "..", ".env");
require("dotenv").config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: any) =>
        new UnprocessableEntityException(ValidationFormatter(errors)),
    })
  );
  app.use(
    "/api/v1/subscription/stripe/webhook",
    express.raw({ type: "application/json" })
  );
  app.enableCors();
  await app.listen(env.PORT || 8005);
}
bootstrap();
