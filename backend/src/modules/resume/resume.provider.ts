import { Connection } from "mongoose";
import { RESUME, RESUME_REPOSITORY } from "src/constants";
import { ResumeSchema } from "./resume.schema";

export const resumeProviders = [
  {
    provide: RESUME_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model(RESUME, ResumeSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
