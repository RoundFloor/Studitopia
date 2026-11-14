import { Module } from "@nestjs/common";
import { WebController } from "./web.controller.js";

@Module({
  imports: [],
  controllers: [WebController],
  providers: [],
  exports: [],
})
export class WebModule {}
