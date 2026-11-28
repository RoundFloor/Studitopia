import { existsSync, readFileSync, writeFileSync } from "node:fs"

export class Env {
    constructor(
        public readonly host: string,
        public readonly port: number,
        public readonly database: string,
        public readonly username: string,
        public readonly password: string
    ) {}

    save() {
        writeFileSync("./build/env.json", JSON.stringify(this))
    }
    static load(): Env | undefined {
        if (existsSync("./build/env.json"))
            return JSON.parse(readFileSync("./build/env.json").toString()) as Env
    }
}