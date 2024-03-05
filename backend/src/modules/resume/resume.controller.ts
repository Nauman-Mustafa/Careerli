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
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ResumeService } from "./resume.service";
const path = require("path");
@Controller("resume")
@UseGuards(JwtAuthGuard)
export class resumeController {
  constructor(private readonly documentsService: ResumeService) {}
  @Get("my-resume/:id")
  async getMyResume(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;
    const userId = req?.user?.userId;

    const response = await this.documentsService.getMyResume(userId, id);
    return res.status(response.code).json(response);
  }
  @Get("my-all-resume")
  async getMyAllResume(
    @Req() req,
    @Res() res,
    @Body() info: any,
    @Param() param
  ) {
    const { page, limit } = req.query;
  const condition = {}; 
    const userId = req?.user?.userId;

    const response = await this.documentsService.getMyAllResume(userId,condition, parseInt(page, 10), parseInt(limit, 10));
    return res.status(response.code).json(response);
  }
  @Post("create")
  async create(@Req() req, @Res() res, @Body() info: any) {
    const id = req?.user?.userId;
    const response = await this.documentsService.createDocument(info, id);
    return res.status(response.code).json(response);
  }

  @Post("ai-generation")
  async generatePara(@Req() req, @Res() res, @Body() info: any) {
    const id = req?.user?.userId;
    const response = await this.documentsService.generatePara(info, id);
    return res.status(response.code).json(response);
  }
  @Post("create-resume")
  async createResume(@Req() req, @Res() res, @Body() info: any) {
    const id = req?.user?.userId;
    const response = await this.documentsService.createResume(info, id);
    return res.status(response.code).json(response);
  }
  @Put("update/:id")
  async updateDocs(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;

    const response = await this.documentsService.updateDocument(info, id);
    return res.status(response.code).json(response);
  }
  @Put("add-remove-section/:id")
  async addRemove(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;

    const response = await this.documentsService.addRemoveSection(info, id);
    return res.status(response.code).json(response);
  }
  @Delete("delete/:id")
  async deleteDocs(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;

    const response = await this.documentsService.deleteDocument(info, id);
    return res.status(response.code).json(response);
  }

  @Get("generate/:id")
  async generatePdf(@Req() req, @Res() res, @Body() info: any, @Param() param) {
    const id = param?.id;
    const response = await this.documentsService.downloadPdf(id);

    // const filePath = path.join(process.cwd(), `docs/${response.fileName}.pdf`);
    // if (filePath) {
    //   const data = readFileSync(filePath);
    res.send(response);
    // }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Put("/avatar/:id")
  async uploadAvatar(
    @Req() req,
    @Res() res: any,
    @Param() param,
    @UploadedFile() file: Express.Multer.File
  ) {
    const id = param?.id;
    const response = await this.documentsService.uploadAvatar(id, file);
    return res.status(response.code).json(response);
  }
}
