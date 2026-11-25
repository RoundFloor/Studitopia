import { Module } from "@nestjs/common";
import { ReCaptchaService } from "./recaptcha.service.js";

@Module({
    providers: [ReCaptchaService],
    exports: [ReCaptchaService]
})
export class ReCaptchaModule { }