import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user";
import { resumeController } from "./resume.controller";
import { ResumeService } from "./resume.service";

@Module({
  imports: [forwardRef(() => DatabaseModule), UserModule],
  providers: [ResumeService],
  exports: [ResumeService],
  controllers: [resumeController],
})
export class ResumeModule {}
