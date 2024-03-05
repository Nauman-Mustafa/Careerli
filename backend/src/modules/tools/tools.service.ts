import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { Model } from "mongoose";
import { TOOLS_REPOSITORY } from "src/constants";
import { BaseService } from "../shared/base.service";
import { SubscriptionsService } from "../subscription/subscription.service";
import { UserService } from "../user";
import { ToolDocument } from "./tools.schema";

import * as moment from "moment";

@Injectable()
export class ToolsService extends BaseService {
  private readonly BASE_URL = process.env.AI_LAMBDA_URL as string;

  constructor(
    @Inject(TOOLS_REPOSITORY)
    private readonly toolRepository: Model<ToolDocument>,
    protected readonly userService: UserService,

    protected readonly subscriptionsService: SubscriptionsService
  ) {
    super(toolRepository);
  }

  generateContent = async (
    payload: any,
    user: string,
    freeCreditsUsed: boolean
  ) => {
    const response: any = await axios.post(`${this.BASE_URL}`, payload);

    if (!response)
      return {
        failed: true,
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "Text not generated",
        data: null,
      };

    const output = response?.data;
    const outputs = response?.data?.output;
    this.toolRepository.create({
      toolType: payload.toolType,
      requestPayload: payload,
      freeCreditsUsed,
      user,
      output: outputs,
    });

    return {
      failed: false,
      code: HttpStatus.OK,
      message: "Content generated",
      data: output,
    };
  };

  async postTool(payload: any, id: string) {
    try {
      const user = await this.userService.findByID(id);

      let response: any = {};

      const subscription = await this.subscriptionsService.getCustomerByid(id);
      if (!subscription)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "User has not been subscribed!",
          data: null,
        };

      const subscriptions =
        await this.subscriptionsService.getActiveSubscription(
          subscription.customer_id
        );
      if (subscriptions.data.length < 1)
        return {
          failed: true,
          code: HttpStatus.BAD_REQUEST,
          message: "User has not been subscribed!",
          data: null,
        };

      const [first] = subscriptions.data as any;
      const checklimt = subscriptions.data as any;

      if (first.status !== "active")
        return {
          failed: true,
          code: HttpStatus.BAD_REQUEST,
          message: "Subsrcription has been expired!",
          data: null,
        };
      const productMetaData =
        await this.subscriptionsService.getProductMetadata(
          first?.plan?.product
        );

      const now = moment().startOf("month");

      const data = await this.toolRepository.find({
        user: id,
        freeCreditsUsed: false,
        createdAt: { $gte: now },
      });

      const totalWords = data.reduce((total: number, current: any) => {
        total = total + `${current?.output}`?.split(" ").length;
        return total;
      }, 0);

      const subscriptionLimit = productMetaData?.metadata?.creditLimits || 0;

      if (subscriptionLimit == "Unlimited") {
        response = await this.generateContent(payload, id, false);
        return response;
      } else if (totalWords >= subscriptionLimit)
        return {
          failed: true,
          code: HttpStatus.BAD_REQUEST,
          message: `You have already reached the subscription limit (${subscriptionLimit})`,
          data: null,
        };
      else {
        response = await this.generateContent(payload, id, false);
        return response;
      }
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

  async getFCredits(id: any) {
    try {
      const subscription = await this.subscriptionsService.getCustomerByid(id);
      if (!subscription)
        return {
          failed: true,
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "User has not been subscribed!",
          data: null,
        };

      const subscriptions =
        await this.subscriptionsService.getActiveSubscription(
          subscription.customer_id
        );
      if (subscriptions.data.length < 1)
        return {
          failed: true,
          code: HttpStatus.BAD_REQUEST,
          message: "User has not been subscribed!",
          data: null,
        };

      const [first] = subscriptions.data as any;
      const checklimt = subscriptions.data as any;

      if (first.status !== "active")
        return {
          failed: true,
          code: HttpStatus.BAD_REQUEST,
          message: "Subsrcription has been expired!",
          data: null,
        };
      const productMetaData =
        await this.subscriptionsService.getProductMetadata(
          first?.plan?.product
        );

      const now = moment().startOf("month");

      const data = await this.toolRepository.find({
        user: id,
        freeCreditsUsed: false,
        createdAt: { $gte: now },
      });

      const totalWords = data.reduce((total: number, current: any) => {
        total = total + current.output.split(" ").length;
        return total;
      }, 0);

      const subscriptionLimit: any =
        productMetaData?.metadata?.creditLimits || 0;

      if (subscriptionLimit == "Unlimited") {
        let ReminingCredit = {
          ReminingCredit: "Unlimited",
        };
        return {
          failed: true,
          code: HttpStatus.BAD_REQUEST,
          message: `You remaining Limit is${ReminingCredit}`,
          data: ReminingCredit,
        };
      }
      let ReminingCredit = {
        ReminingCredit: subscriptionLimit,
        totalWords: totalWords,
      };

      return {
        failed: false,
        code: HttpStatus.OK,
        message: `You remaining Limit is`,
        data: ReminingCredit,
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
}
