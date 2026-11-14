import { Module } from "@nestjs/common";
import { PostgresService } from "./pg.service.js";

@Module({
    providers: [PostgresService],
    exports: [PostgresService]
})
export class PostgresModule{ }