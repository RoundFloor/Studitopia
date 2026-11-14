import { CookieOptions } from "express"

type CookiesItem = {
    value: string, 
    options: CookieOptions
}

export class Response {
    statusCode: number
    cookies?: Map<string, CookiesItem>
    data?: any

    constructor(statusCode: number, data?: any, cookies?: { name: string, value: string, options: CookieOptions }[]) {
        return {
            statusCode,
            cookies: new Map(
                cookies?.map(
                    value =>
                        [
                            value.name,
                            {
                                value: value.value, options: value.options       
                            }
                        ] as [string, CookiesItem]
                )
            ),
            data
        }
    }
}