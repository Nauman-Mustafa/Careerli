export const generatePin = (): string => Math.random().toString().slice(2, 6);
import { HttpStatus } from "@nestjs/common";
import { Page } from "aws-sdk/clients/securityhub";

import * as mongoose from "mongoose";

export const generateExpiry = (minutes: number): Date =>
  new Date(new Date().getTime() + minutes * 60000);

export const dateValid = (d1: any) => {
  return new Date().getTime() < new Date(d1).getTime();
};

export const getYesterday = () =>
  new Date(Date.now() - 86400 * 1000).toISOString();

export const generateInternalServerError = (e: any) => {
  const error: Error = e;
  return {
    failed: true,
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: error?.message,
    data: null,
  };
};

export const generateInvlalidIDResponse = (message?: string) => ({
  failed: true,
  code: HttpStatus.UNPROCESSABLE_ENTITY,
  message: message || "Invalid ID provided",
  data: null,
});
export const statusValid = (status: string) => {
  const s = status.toLowerCase();

  return (
    s === "approved" ||
    s === "rejected" ||
    s === "pending" ||
    s === "published" ||
    s === "blocked"
  );
};

export interface ResponseType {
  failed: boolean;
  code: number;
  message: string;
  data: object | null;
}

/**
 *
 * @param failed
 * @param code
 * @param message
 * @param data
 * @returns
 */
export const generateResponse = (
  failed: boolean,
  code: number,
  message: string,
  data: object | null
): ResponseType => {
  return {
    failed,
    code,
    message,
    data,
  };
};

export const generateSuccess = (
  data: any,
  code?: number,
  message?: string
): ResponseType => ({
  failed: false,
  code: code || 200,
  message: message || "",
  data,
});

export const validateStatus = (status: string) => {
  return (
    status === "approved" ||
    status === "rejected" ||
    status === "pending" ||
    status === "block"
  );
};

export const compareIDs = (mongoID: string, id: string) =>
  new mongoose.Types.ObjectId(mongoID).toString() === id;

// @ts-ignore
export const stream2buffer = async (stream: Stream): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(`error converting stream - ${err}`));
  });
};
