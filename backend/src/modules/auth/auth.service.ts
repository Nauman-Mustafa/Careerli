import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { InjectStripe } from "nestjs-stripe";
import { env } from "process";
import { FORGET_PASSWORD_REPOSITORY, jwtConstants } from "src/constants";
import Stripe from "stripe";
import { v4 } from "uuid";
import { SubscriptionsService } from "../subscription/subscription.service";
import { IForgetPasswordDocument } from "../user/user.schema";
import { UserService } from "../user/user.service";
@Injectable()
export class AuthService {
  constructor(
    @Inject(FORGET_PASSWORD_REPOSITORY)
    private readonly passwordRepository: Model<IForgetPasswordDocument>,
    private readonly userService: UserService,
    private jwtService: JwtService,
    protected readonly subscriptionService: SubscriptionsService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmailOrUsername(identifier);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user.toJSON();
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  async googleAuth(req: any) {
    try {
      const googleDetails = req?.user;

      if (!googleDetails) {
        return {
          failed: true,
          status: "failed",
          message: "User not found",
        };
      }

      let user = await this.userService.findByEmail(googleDetails.email);

      if (!user) {
        // const customer = await this.stripeClient.customers.create({
        //   email: googleDetails.email,
        //   description: "Registered Careerli Client",
        //   name: `${googleDetails.firstName} ${googleDetails.lastName}`,
        // });

        const data = {
          email: googleDetails.email,
          firstName: googleDetails.firstName,
          lastName: googleDetails.lastName,
          password: bcrypt.hashSync(new Date().toString(), jwtConstants.salt),
          emailVerified: true,
        };
        // @ts-ignore
        user = await this.userService.create(data);

        await this.subscriptionService.createModel({
          userID: user._id,
          // customer_id: customer.id,
        });
      }
      console.log(user, "user");
      const payload = {
        email: user.email,
        userId: user._id,
        role: user.roles,
      };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async forgetPassword(email: any) {
    const code = v4();

    const check = await this.passwordRepository.findOne({ email: email });
    if (check) {
      await this.passwordRepository.updateOne(
        { email: email },
        { code, createdAt: new Date() }
      );
    } else {
      await this.passwordRepository.create({
        email: email,
        code,
      });
    }
    this.userService.sendEmail(
      email,
      `Here is your link to reset password <a href="${env.FRONTEND_BASE_URL}/auth/reset-password/${email}/${code}">Click here</a>.`
    );
    return {
      status: "success",
      message: "Email with reset link is sent to user email",
    };
  }

  async checkCode(email, code) {
    console.log(code, "code");
    const verify = await this.passwordRepository.findOne({
      email: email,
      code,
      createdAt: { $gt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    });
    if (verify) {
      return { status: "success", message: "Link is Verified" };
    } else {
      return { status: "error", message: "Link Expired" };
    }
  }
  async updatePassword(email, password) {
    const pass = bcrypt.hashSync(password, jwtConstants.salt);
    await this.userService.updatePassword({ email, password: pass });
    return {
      status: "success",
      message: "password updated",
    };
  }
}
