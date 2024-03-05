import { Connection } from "mongoose";
import { COVER_LETTER, COVER_LETTER_REPOSITORY } from "src/constants";
import { CoverLetterSchema } from "./coverLetter.schema";

export const coverLetterProviders = [
  {
    provide: COVER_LETTER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model(COVER_LETTER, CoverLetterSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
