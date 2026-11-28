import { Module } from "@nestjs/common";
import { PostgresService } from "./pg.service.js";
import { EnvironmentModule } from "../environment/environment.module.js";
import { EnvironmentService } from "../environment/environment.service.js";

@Module({
    imports: [EnvironmentModule],
    providers: [PostgresService],
    exports: [PostgresService]
})
export class PostgresModule{ }