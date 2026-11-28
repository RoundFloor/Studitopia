import { Module } from "@nestjs/common";
import { SecurityGenerationService } from "./sg.service.js";
import SecretService from "./sg.config.js";

@Module({
    providers: [
        SecretService,
        SecurityGenerationService
    ],
    exports: [SecurityGenerationService, SecretService]
})
export class SecurityGenerationModule { }