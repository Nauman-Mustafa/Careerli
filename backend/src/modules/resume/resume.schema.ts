import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { USERS } from "src/constants";
export interface IResumeDocument extends Document {
  title: String;
  profileImage: String;
  resumeType: String;
  profile: Schema.Types.Mixed;
  workHistory: Schema.Types.Mixed;
  education: Schema.Types.Mixed;
  skills: Schema.Types.Mixed;
  summary: Schema.Types.Mixed;
  hobbies: Schema.Types.Mixed;
  certification: Schema.Types.Mixed;
  languages: Schema.Types.Mixed;
  achievements: Schema.Types.Mixed;
  references: Schema.Types.Mixed;
  publications: Schema.Types.Mixed;
  customSection: string;
  templateCategory: string;
  resumeStyle: Object;
  users: mongoose.Schema.Types.ObjectId;
}

const ResumeSchema = new Schema(
  {
    resumeTitle: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    resumeType: {
      type: String,
    },
    templateCategory: {
      type: String,
    },
    resumeStyle: {
      fontFamily: String,
      fontWeight: String,
      fontSize: String,
      lineHeight: String,
      color: String,
      backgroundColor: String,
    },
    profile: {
      type: Schema.Types.Mixed,
    },
    workHistory: {
      type: Schema.Types.Mixed,
    },
    education: {
      type: Schema.Types.Mixed,
    },
    skills: {
      type: Schema.Types.Mixed,
    },
    summary: {
      type: Schema.Types.Mixed,
    },
    hobbies: {
      type: Schema.Types.Mixed,
    },
    certification: {
      type: Schema.Types.Mixed,
    },

    languages: {
      type: Schema.Types.Mixed,
    },
    achievements: {
      type: Schema.Types.Mixed,
    },
    references: {
      type: Schema.Types.Mixed,
    },
    publications: {
      type: Schema.Types.Mixed,
    },
    customSection: {
      type: Schema.Types.Mixed,
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USERS,
      // required: true,
    },
  },
  { timestamps: true }
);

ResumeSchema.pre("save", (next: any, done: any) => {
  console.log(JSON.stringify(this));
  return next();
});

export { ResumeSchema };
