import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { Model } from "mongoose";
import { RESUME_REPOSITORY } from "src/constants";
import { TempType } from "src/enums/template.enum";
import { uploadService } from "src/helpers/storage.helper";
import { v4 } from "uuid";
import { BaseService } from "../shared/base.service";
import { UserService } from "../user";
import { newResume } from "./data";
import {
  classicGenerator,
  creativeGenerator,
  templateEleven,
  templateSeven,
} from "./generator.service";
import { IResumeDocument } from "./resume.schema";
const options = require("../../helpers/options");
const fs = require("fs");
const pdf = require("pdf-creator-node");

@Injectable()
export class ResumeService extends BaseService {
  private readonly BASE_URL = process.env.AI_LAMBDA_URL as string;
  constructor(
    @Inject(RESUME_REPOSITORY)
    private readonly resumeRepository: Model<IResumeDocument>,
    protected readonly userService: UserService
  ) {
    super(resumeRepository);
  }

  async createDocument(body: any, id: string) {
    try {
      const data = {
        resumeType: body.resumeType,
        templateCategory: body.templateCategory,
        userId: id,
        ...newResume,
      };

      const response = await this.createModel(data);

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Resume saved",
        data: response,
      };
    } catch (e: any) {
      console.log(e);
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }
  async generatePara(body: any, id: string) {
    try {
      const response: any = await axios.post(`${this.BASE_URL}`, body);
console.log(response,"response")
      if (!response || response?.data?.output?.statusCode==429) {
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "OpenAI Rate limit reached",
          data: null,
        };
      }

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Content generated",
        data: response?.data,
      };
    } catch (e: any) {
      console.log(e);
      const error: Error = e;
      console.log(error.message, "error.message");
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }

  async createResume(body: any, id: string) {
    try {
      const data = {
        resumeType: body.resumeType,
        userId: id,

        ...body,
        // profileImage: s3Response.Location,
      };

      if (body?.profileImage) {
        var Imgonebuf = Buffer.from(
          body?.profileImage?.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const s3Response: any = await uploadService.upload(
          Imgonebuf,
          `${v4()}`
        );

        data.profileImage = s3Response?.Location;
      }

      const response = await this.createModel(data);

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Resume saved",
        data: response,
      };
    } catch (e: any) {
      console.log(e);
      const error: Error = e;
      return {
        failed: true,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }
  async updateDocument(body: any, id: string) {
    try {
      const doc = await this.resumeRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Resume found! by this Id",
          data: null,
        };

      const response = await this.resumeRepository.updateOne(
        { _id: id },
        {
          ...body,
        }
      );
      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Resume update",
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
  async deleteDocument(payload: any, id: string) {
    try {
      const doc = await this.resumeRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Resume found! by this Id",
          data: null,
        };
      const response = await this.resumeRepository.deleteOne({ _id: id }).then(
        (res: any) => {},
        (error) => {}
      );
      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Resume Deleted",
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
  async getMyResume(userId: any, id: string) {
    try {
      const user = await this.userService.findByID(userId);
      if (!user)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No user found!",
          data: null,
        };
      const doc = await this.resumeRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Resumes found! by this Id",
          data: null,
        };

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "My Resumes",
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
  async getMyAllResume(userId: any,condition?: {}, page = 1, limit = 5) {
    try {
      const skip = (page - 1) * limit;
    const totalCount = await this.resumeRepository.countDocuments({ userId: userId });
    const totalPages = Math.ceil(totalCount / limit);
      const user = await this.userService.findByID(userId);
      if (!user)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No user found!",
          data: null,
        };
      const doc = await this.resumeRepository
        .find({ userId: userId })
        .populate("userId").sort({createdAt:-1}).skip(skip)
        .limit(limit);
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Resumes found! by this Id",
          data: null,
        };

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "My Resumes",
        data: {doc, page,
          limit,
          totalPages,
          totalCount,},
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

  async addRemoveSection(body: any, id: string) {
    try {
      const { showComp, sectionId } = body;
      let doc = await this.resumeRepository.findOne({ _id: id });
      if (!doc)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "No Resume found! by this Id",
          data: null,
        };
      Object.keys(doc.toObject()).forEach((key) => {
        if (doc[key]?.id === sectionId) {
          // doc[key].showComp = showComp;
          console.log("uniq");
          doc[key].showComp = showComp;
        }
      });
      // doc.markModified(doc["_doc"]);
      await doc.save();

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "Resume update",
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
  async downloadPdf(id: any) {
    let doc = await this.resumeRepository.findOne({ _id: id });

    const data = doc.toObject();
    const getTemplate = (templateType) => {
      switch (templateType.resumeType) {
        case TempType.TEMPLATE_ONE:
          return creativeGenerator(templateType);
        case TempType.TEMPLATE_TWO:
          return classicGenerator(templateType);
        case TempType.TEMPLATE_SEVEN:
          return templateSeven(templateType);
        case TempType.TEMPLATE_ELEVEN:
          return templateEleven(templateType);
      }
    };
    var document = {
      html: getTemplate(data),

      data: {
        // resume: data,
      },
      type: "buffer",
    };

    const buffer = await pdf.create(document, options).catch((error) => {
      console.log(error);
    });

    let filename = `${v4()}.pdf`;
    await uploadService.uploadPdf(filename, buffer);
    const resp= await uploadService.getS3Data(`https://careerli-prod.s3.amazonaws.com/${filename}`)
    // const resp = `https://careerli.s3.amazonaws.com/${filename}`;
    return {
      url: resp,
    };
  }

  async uploadAvatar(id: string, file: any) {
    // if no file, return error
    if (!file) {
      return {
        failed: true,
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "You have not selected The image!",
        data: null,
      };
    }

    // find user by id
    const doc = await this.resumeRepository.findById(id);
    // if user not found, return error
    if (!doc) {
      return {
        failed: true,
        code: HttpStatus.NOT_FOUND,
        message: "Invalid ID!",
        data: null,
      };
    }

    const data :any= await uploadService.upload(file.buffer, `${v4()}`);
    const resp= await uploadService.getS3Data(data?.Location)
    // save new file path & type in database
    const updatedDoc = await this.resumeRepository.findByIdAndUpdate(
      { _id: id },
      {
        // @ts-ignore
        profileImage: resp,
      },
      { new: true }
    );

    // return success response

    return {
      failed: false,
      code: HttpStatus.OK,
      message: "Your Image has been updated",
      data: updatedDoc,
    };
  }
}
