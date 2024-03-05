import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DocumentsService } from "./coverLetter.service";

@Controller("cover-letter")
@UseGuards(JwtAuthGuard)
export class CoverLetterController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post("create")
  async create(@Req() req, @Res() res, @Body() info: any) {
    const id = req?.user?.userId;

    const response = await this.documentsService.createCoverLetter(info, id);
    return res.status(response.code).json(response);
  }
  @Get("my-cover-letter/:id")
  async getMyResume(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;
    const userId = req?.user?.userId;

    const response = await this.documentsService.getMyCoverLetter(userId, id);
    return res.status(response.code).json(response);
  }

  @Get("my-all-cover-letter")
  async getMyAllResume(
    @Req() req,
    @Res() res,
    @Body() info: any,
    @Param() param
  ) {
    const { page, limit } = req.query;
  const condition = {};
    const userId = req?.user?.userId;

    const response = await this.documentsService.getMyAllCoverLetter(userId,condition, parseInt(page, 10), parseInt(limit, 10));
    return res.status(response.code).json(response);
  }

  @Put("update/:id")
  async updateCover(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;

    const response = await this.documentsService.updateCoverLetter(info, id);
    return res.status(response.code).json(response);
  }
  @Delete("delete/:id")
  async deleteDocs(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;

    const response = await this.documentsService.deleteCoverLetter(info, id);
    return res.status(response.code).json(response);
  }

  @Get("generate/:id")
  async generatePdf(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;
    const response = await this.documentsService.downloadPdf(id);
    console.log(response);
    // const filePath = path.join(process.cwd(), `docs/${response.fileName}.pdf`);
    // if (filePath) {
    //   const data = readFileSync(filePath);
    res.send(response);
    // }
  }
}
