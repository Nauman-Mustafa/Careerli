import { Document, Schema } from "mongoose";

export enum MemberStatus {
  Approved = "approved",
  Pending = "pending",
  Rejected = "rejected",
  Blocked = "blocked",
}

export interface Member {
  id: string;
  status: string;
  date: string;
}

export interface ToolDocument extends Document {
  toolType: any;
  requestPayload: Schema.Types.Mixed;
  status: string;
  output: Array<string>;
  users: string;
  freeCreditsUsed: boolean;
}

export const ToolSchema = new Schema(
  {
    toolType: {
      type: String,
    },
    requestPayload: {
      type: Schema.Types.Mixed,
    },
    output: {
      type: Array<string>,
    },
    freeCreditsUsed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);
