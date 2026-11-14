import { Module } from "@nestjs/common";
import { SecretProvider } from "./sg.config.js";
import { SecurityGenerationService } from "./sg.service.js";

@Module({
    providers: [
        SecretProvider,
        SecurityGenerationService
    ],
    exports: [SecurityGenerationService, SecretProvider]
})
export class SecurityGenerationModule { }