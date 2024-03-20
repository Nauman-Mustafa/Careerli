import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { COVER_LETTER_REPOSITORY } from "src/constants";
import { v4 } from "uuid";
import { BaseService } from "../shared/base.service";
import { UserService } from "../user";
import { ICoverLetterDocument } from "./coverLetter.schema";
import { FirstCoverLetter, SecondCoverLetter } from "./coverLetterGenerator";
import { uploadService } from "src/helpers/storage.helper";
const options = require("../../helpers/options");
const fs = require("fs");
const pdf = require("pdf-creator-node");

@Injectable()
export class DocumentsService extends BaseService {
  constructor(
    @Inject(COVER_LETTER_REPOSITORY)
    private readonly coverLetterRepository: Model<ICoverLetterDocument>,
    protected readonly userService: UserService
  ) {
    super(coverLetterRepository);
  }
  async createCoverLetter(body: any, id: string) {
    try {
      const data = {
        coverLetterTitle: "Untitled",
        coverLetterType: "First Template",
        userId: id,
        ...body,
      };
      const response = await this.coverLetterRepository.create(data);

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Cover Letter saved",
        data: response,
      };
    } catch (e: any) {
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }
  async updateCoverLetter(body: any, id: string) {
    try {
      const doc = await this.coverLetterRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Cover Letter found! by this Id",
          data: null,
        };

      const response = await this.coverLetterRepository.updateOne(
        { _id: id },
        {
          ...body,
        }
      );

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Cover Letter updated",
        data: response,
      };
    } catch (e: any) {
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }
  async deleteCoverLetter(payload: any, id: string) {
    try {
      const doc = await this.coverLetterRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Document found! by this Id",
          data: null,
        };
      const response = await this.coverLetterRepository.deleteOne({ _id: id });

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Cover Letter Deleted",
        data: response,
      };
    } catch (e: any) {
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }
  async getMyCoverLetter(userId: any, id: string) {
    try {
      const user = await this.userService.findByID(userId);
      if (!user)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No user found!",
          data: null,
        };
      const doc = await this.coverLetterRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No CoverLetter found! by this Id",
          data: null,
        };

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "My CoverLetter",
        data: doc,
      };
    } catch (e: any) {
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }
  async getMyAllCoverLetter(userId: any, condition?: {}, page = 1, limit = 5) {
    try {
      const skip = (page - 1) * limit;
      const totalCount = await this.coverLetterRepository.countDocuments({
        userId: userId,
      });
      const totalPages = Math.ceil(totalCount / limit);
      const user = await this.userService.findByID(userId);
      if (!user)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No user found!",
          data: null,
        };
      const doc = await this.coverLetterRepository
        .find({ userId: userId })
        .populate("userId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Cover Letter found! by this Id",
          data: null,
        };

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "My Cover Letter",
        data: { doc, page, limit, totalPages, totalCount },
      };
    } catch (e: any) {
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }

  async downloadPdf(id: any) {
    let doc = await this.coverLetterRepository.findOne({ _id: id });

    const data = doc.toObject();
    console.log(data?.coverLetterType, " data?.coverLetterType");
    var document = {
      // html: SecondCoverLetter(data),
      html:
        data?.coverLetterType == "First Template"
          ? FirstCoverLetter(data)
          : data?.coverLetterType == "Second Template"
          ? SecondCoverLetter(data)
          : null,
      data: {
        // data: data,
      },
      type: "buffer",
    };

    const buffer = await pdf.create(document, options).catch((error) => {
      console.log(error);
    });

    let filename = `${v4()}.pdf`;
    await uploadService.uploadPdf(filename, buffer);
    // const resp = `https://careerli.s3.amazonaws.com/${filename}`;
    const resp = await uploadService.getS3Data(
      `https://aws-s3-bucket-careerli.s3.amazonaws.com/${filename}`
    );
    return {
      url: resp,
    };
  }
}
