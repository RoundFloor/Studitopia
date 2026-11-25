import { Controller, Get, Header, Param } from "@nestjs/common";
import { WebBased } from "./web.guard.js";
import { Response } from "../../common/response.dto.js";
import { readFileSync } from "fs";

@Controller()
export class WebController {
    constructor() { }

    @Get('*path.js')
    @Header('Content-Type', 'text/javascript')
    async GetJS(@Param('path') path: string[]): Promise<Response> {
        const url = path.join('/')
        return new Response(200, readFileSync(`./frontend/${url}.js`).toString());
    }

    @Get('*path.css')
    @Header('Content-Type', 'text/css')
    async GetCSS(@Param('path') path: string[]): Promise<Response> {
        const url = path.join('/')        
        return new Response(200, readFileSync(`./frontend/${url}.css`).toString());
    }

    @Get('{*path}')
    @Header('Content-Type', 'text/html; charset=utf-8')
    async getPage(@Param('path') path: string[]): Promise<Response> {
        return new Response(200, readFileSync("./frontend/index.html").toString());
    }
}
