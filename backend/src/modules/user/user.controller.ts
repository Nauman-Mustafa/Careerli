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
import { Response } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller("user")

@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * My Profile
   * @param req Request Body
   */
  @Get("me")
  async getProfile(@Req() req, @Res() res: Response) {
    const user = await this.userService
      .byEmail(req?.user?.email)
      .populate("interests");
    return res.json({ status: "success", message: "Found!", data: user });
  }

  @Post("update-profile")
  async updateProfile(@Req() req, @Res() res: Response, @Body() body: any) {
    
    const user = await this.userService.byId(req?.user?.userId);
    if (!user) {
      return res.json({
        status: "fail",
        message: "No User Found!",
        data: user,
      });
    } else {
      user.firstName = body?.firstName;
      user.lastName = body?.lastName;
      // if (body?.email) {
      //   user.email = body?.email;
      // }

      await user.save();
      return res.json({
        status: "success",
        message: "Profile Updated!",
        data: user,
      });
    }
  }
  /**
   * My Profile
   * @param req Request Body
   */
  @Get("/:id")
  async userProfile(
    @Req() req,
    @Param() param: { id: string },
    @Res() res: Response
  ) {
    const user = await this.userService.byId(param.id).populate("interests");
    return res.json({ status: "success", message: "Found!", data: user });
  }

  /**
   * My Profile
   * @param req Request Body
   */
  // @Put("me")
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: "cover", maxCount: 1 },
  //     { name: "avatar", maxCount: 1 },
  //   ])
  // )
  // async updateProfile(
  //   @UploadedFiles() files,
  //   @Req() req,
  //   @Body() body: any,
  //   @Res() res: Response
  // ) {
  //   if (!body.interests) body.interests = [];
  //   if (files?.cover) {
  //     const file = (await uploadService.upload(files.cover[0])) as any;
  //     if (file && file.Location) body.cover = file.Location;
  //   }
  //   if (files?.avatar) {
  //     const file = (await uploadService.upload(files.avatar[0])) as any;
  //     if (file && file.Location) body.avatar = file.Location;
  //   }
  //   delete body.email;
  //   const findAndUpdate = await this.userService.findByIdAndUpdate(
  //     req.user.userId,
  //     body
  //   );
  //   this.userService.response(
  //     res,
  //     HttpStatus.OK,
  //     findAndUpdate,
  //     "File updated"
  //   );
  // }
}
