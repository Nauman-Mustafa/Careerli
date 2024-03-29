import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { isValidObjectId, Model } from "mongoose";
import { MailerService } from "@nestjs-modules/mailer";
import { USER_REPOSITORY } from "src/constants";
import { IUserDocument } from "./user.schema";
import { BaseService } from "../shared/base.service";

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Model<IUserDocument>,
    private readonly mailerService: MailerService
  ) {
    super(userRepository);
  }

  public sendEmail(to, text): void {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: "ekkel.ai.test@gmail.com", // sender address
        subject: "Testing Email Service ✔", // Subject line
        text: text, // plaintext body
        html: `<b>welcome<br><p>${text}</p></b>`, // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findOneByEmailOrUsername(
    identifier: string
  ): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
  }

  async findByEmail(email: string): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({ email: email });
  }

  // async byId(id: string): Promise<IUserDocument | undefined> {
  //   return this.userRepository.findById(id);
  // }

  async findByUsername(username: string): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({ username: username });
  }
  async findByID(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "Invalid ID provided",
          data: null,
        };
      }

      const userInfo = await this.userRepository.findById(id);

      if (!userInfo) {
        return {
          failed: true,
          code: HttpStatus.NOT_FOUND,
          message: "No user found with ID",
          data: null,
        };
      }

      return {
        failed: false,
        code: HttpStatus.OK,
        message: "",
        data: userInfo,
      };
    } catch (e) {
      const error: Error = e;

      return {
        failed: true,
        code: HttpStatus.OK,
        message: error.message,
        data: null,
      };
    }
  }

  async create(body: any) {
    return this.userRepository.create(body);
  }

  async updatePassword(body: any) {
    await this.userRepository.updateOne(
      { email: body.email },
      { password: body.password, emailVerified: true }
    );
  }
}
