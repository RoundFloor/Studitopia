import { Client, DatabaseError } from "pg";
import * as fs from "fs";
import * as readline from "readline";
import { Env } from "./env.js";
import { resolve } from "dns";


export class PostgresClient {
    constructor(private autoAuth: boolean = false) {}
    public client?: Client
    
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    private ask(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        })
    }
    async connect() {
        let env = Env.load()
        if (env && !this.autoAuth) {
            const opt = await this.ask("Old authentication data find, do you want to use it? (y/n)")
            if (opt == 'n') env = undefined 
        }
        if (env == undefined) {
            env = new Env(
                (await this.ask("PostgreSQL Host [localhost]: ") || "localhost"),
                Number.parseInt(await this.ask("PostgreSQL Port [5432]: ") || "5432"),
                await this.ask("Database Name: "),
                await this.ask("PostgreSQL Username: "),
                await this.askPassword("PostgreSQL Password: ")
            )
            env.save()
        }
        if (!this.autoAuth) {
            const confirm = await this.ask("\nExecute all SQL files? (yes/no) [yes]: ");

            if (confirm.toLowerCase() === "no") {
                console.log("Execution cancelled.");
                this.rl.close();
                return false;
            }
        }
    
        this.client = new Client(
            { host: env.host, port: env.port, database: env.database, user: env.username, password: env.password, connectionTimeoutMillis: 10000 })

        console.log("\nConnecting to PostgreSQL...");
        await this.client.connect();
        console.log("Connected successfully!\n");
        
    }
    
    dispose() {
        if (this.client)
            this.client.end().catch(() => {});
        this.rl.close();
    }

    async askPassword(question: string): Promise<string> {
        return new Promise((resolve) => {
            const stdin = process.stdin;

            process.stdout.write(question);
            stdin.setRawMode?.(true);
            stdin.resume();

            let password = "";

            const onData = (char: Buffer) => {
                const value = char.toString();

                if (value === "\r" || value === "\n") {
                    stdin.setRawMode?.(false);
                    stdin.pause();
                    stdin.removeListener("data", onData);
                    process.stdout.write("\n");
                    resolve(password);
                } else if (value === "\u0003") {
                    process.exit(1);
                } else if (value === "\u007f") {
                    password = password.slice(0, -1);
                } else {
                    password += value;
                }
            };

            stdin.on("data", onData);
        });
    }
    async run(file: string): Promise<boolean> {
        if (!this.client) return false;
        if (file.length == 0) return true;
        const sql = fs.readFileSync(file, "utf8");
        if (!sql.trim()) {
            console.log(`Skipped (empty file): ${file}`);
            return true;
        }
        try {
            await this.client.query("BEGIN");
            await this.client.query(sql);
            await this.client.query("COMMIT");
            console.log(`${"[SUCCESS]".padEnd(10)} ${file}`);
            return true;
        } catch (error) {
            if (error instanceof DatabaseError) {
                await this.client.query("ROLLBACK");
                console.error(`${"[FAILED]".padEnd(10)} ${file}`);
                console.error("".padEnd(11) + error.message);

            }
            return false;
        }
    }
}
