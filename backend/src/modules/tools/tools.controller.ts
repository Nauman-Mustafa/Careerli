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
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth";
import { ToolsService } from "./tools.service";

@Controller("tools")
@ApiTags("Tools /v1")
@ApiSecurity("JWT")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post("ai-generation")
  async create(@Req() req, @Res() res, @Body() info: any) {
    if (!info) {
      return res.status(400).json("Fields are required");
    }
    const id = req?.user?.userId;

    const response = await this.toolsService.postTool(info, id);
    return res.status(response.code).json(response);
  }

  @Get("get-paid-credit")
  async getFreeCredit(
    @Req() req,
    @Param() param,
    @Res() res,
    @Body() info: any
  ) {
    const id = req?.user?.id;

    const response = await this.toolsService.getFCredits(id);
    return res.status(response.code).json(response);
  }
}
