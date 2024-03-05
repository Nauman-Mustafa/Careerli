import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { DocumentsService } from "./coverLetter.service";
import { CoverLetterController } from "./coverLetter.controller";
import { UserModule } from "../user";

@Module({
  imports: [forwardRef(() => DatabaseModule), UserModule],
  providers: [DocumentsService],
  exports: [DocumentsService],
  controllers: [CoverLetterController],
})
export class CoverLetterModule {}
