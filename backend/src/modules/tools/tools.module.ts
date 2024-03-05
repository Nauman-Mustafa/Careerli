import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { UserModule } from '../user';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

@Module({
    imports: [forwardRef(() => DatabaseModule), UserModule, SubscriptionModule],
    controllers: [ToolsController],
    providers: [ToolsService],
    exports: [ToolsService],
})
export class ToolsModule {}
