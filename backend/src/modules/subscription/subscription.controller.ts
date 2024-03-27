import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  muatateSubscriptiondDTO,
  updatePaymentMethodDTO,
} from "./dto/subscription.dto";
import { SubscriptionsService } from "./subscription.service";
import { UserService } from "../user";

@Controller("subscription")
@ApiTags("Users /v1")
// @ApiSecurity("JWT")
@ApiBearerAuth()
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionsService,
    private readonly userService: UserService
  ) {}

  @Post("stripe/webhook")
  async stripeWebhook(@Req() req, @Body() body: any, @Res() res) {
    const sig = req.headers["stripe-signature"];
    // const body = Buffer.from(JSON.stringify(_body), "base64");
    // console.log(body);
    console.log("webhook");
    const response = await this.subscriptionService.processEventFromWebhook(
      sig,
      body
    );
    res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("list-invoices")
  async getUserInvoices(@Req() req, @Res() res: Response) {
    const { userId } = req.user;
    const response = await this.subscriptionService.getUserInvoices(userId);

    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("subscription-data")
  async getSubscriptionData(@Req() req, @Res() res: Response) {
    const { userId } = req.user;
    const response = await this.subscriptionService.getSubscriptionData(userId);

    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("update-payment-method")
  async updatePaymentMethod(
    @Req() req,
    @Body() body: updatePaymentMethodDTO,
    @Res() res: Response
  ) {
    const { userId } = req.user;
    const response = await this.subscriptionService.updatePaymentMethod(
      userId,
      body
    );

    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("mutate-subscription")
  async mutateSubscriptionPlan(
    @Req() req,
    @Body() body: muatateSubscriptiondDTO,
    @Res() res: Response
  ) {
    const { userId } = req.user;
    const { priceID } = body;
    const response = await this.subscriptionService.mutateSubscriptionPlan(
      userId,
      priceID
    );
    return res.status(response.code).json(response);
  }

  @Get("stripe-config")
  async getStripeConfig(@Req() req, @Res() res: Response) {
    const response = await this.subscriptionService.getStripeConfig();
    return res.status(response.code).json(response);
  }
  @UseGuards(JwtAuthGuard)
  @Get("subscription-lastDate")
  async getLastDate(@Req() req, @Res() res: Response) {
    const { userId } = req.user;
    const response = await this.subscriptionService.getLastDate(userId);
    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("create-setup-intent")
  async createSetupIntent(@Req() req, @Res() res: Response) {
    const { userId } = req.user;
    const response = await this.subscriptionService.createSetupIntent(userId);
    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("checkout-session")
  async createCheckoutSession(@Req() req, @Body() body, @Res() res: Response) {
    const { userId } = req.user;
    // console.log(req.user, "userId");
    const { priceId } = body;
    const response = await this.subscriptionService.createCheckoutSession(
      priceId,
      userId
    );
    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post("cancel-subscription")
  async cancelSubscription(@Req() req, @Res() res: Response) {
    const { userId } = req.user;
    console.log("req user is", req.user);

    const response = await this.subscriptionService.cancelSubscription(userId);
    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("stripe-success/:checkout_session_id")
  async stripeSucessAfterCheckout(
    @Req() req,
    @Res() res: Response,
    @Param() params
  ) {
    const { userId } = req.user;
    const { checkout_session_id } = params;
    const response = await this.subscriptionService.persistCheckoutSessionID(
      checkout_session_id,
      userId
    );

    const id: string = userId;
    const data: any = {
      roles: ["Paid Member"],
    };

    const updateUserRole = await this.userService.findByIdAndUpdate(id, data);

    return res.status(response.code).json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("stripe-failure/:checkout_session_id")
  async stripeFailureAfterCheckout(
    @Req() req,
    @Res() res: Response,
    @Param() params
  ) {
    const { userId } = req.user;
    const { checkout_session_id } = params;
    const response =
      await this.subscriptionService.persistCheckoutSessionIDOnFailed(
        checkout_session_id,
        userId
      );
    return res.status(response.code).json(response);
  }
}
