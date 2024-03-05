import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { USERS } from "src/constants";
export interface ICoverLetterDocument extends Document {
  title: string;

  coverLetterType: string;
  profile: Schema.Types.Mixed;
  receipient: Schema.Types.Mixed;
  body: Schema.Types.Mixed;
  coverBody: Schema.Types.Mixed;
  closing: Schema.Types.Mixed;

  users: mongoose.Schema.Types.ObjectId;
}

const CoverLetterSchema = new Schema(
  {
    coverLetterTitle: {
      type: String,
    },
    coverLetterType: {
      type: String,
    },
    coverTemplateCategory: {
      type: String,
    },
    profile: {
      type: Schema.Types.Mixed,
    },
    receipient: {
      type: Schema.Types.Mixed,
    },
    body: {
      type: String,
    },
    introduction: {
      title: String,
      opener: String,
    },
    closing: {
      closingData: String,
      signing: String,
    },

    coverStyle: {
      fontFamily: String,
      fontWeight: String,
      fontSize: String,
      lineHeight: String,
      color: String,
      backgroundColor: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USERS,
      required: true,
    },
  },
  { timestamps: true }
);

export { CoverLetterSchema };
