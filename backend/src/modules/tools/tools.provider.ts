import { Connection } from 'mongoose';
import { ToolSchema } from './tools.schema';
import { TOOLS_REPOSITORY, TOOLS } from 'src/constants/index';
export const toolsProvider = [
    {
        provide: TOOLS_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.model(TOOLS, ToolSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
