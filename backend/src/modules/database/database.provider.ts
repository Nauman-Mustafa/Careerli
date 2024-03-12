import * as mongoose from "mongoose";
import { env } from "process";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async (): Promise<typeof mongoose> => {
      return mongoose.connect(env.MONGO_URI, { useNewUrlParser: true });
    }
      },
];
