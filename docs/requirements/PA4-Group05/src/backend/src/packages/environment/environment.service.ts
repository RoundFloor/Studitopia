import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import { stdin } from 'node:process';

@Injectable()
export class EnvironmentService {
  private readonly file: string;
  private readonly store: Record<string, any>;
  private queue: Promise<any> = Promise.resolve()

  private ask(question: string): Promise<string> {
    return new Promise(async (resolve) => {
      process.stdout.write(question)
      process.stdin.resume();
      
      process.stdin.once('data', (data) => {
        process.stdin.pause();
        resolve(data.toString().trim());
      });
    })
  }
  private async read<T = string>(question: string, fallback: T, convert: (vaue: string) => T): Promise<T> {
    const result = await this.ask(question)
    try {
      const r = (result.length) ? convert(result) : fallback;
      return r;
    }
    catch (e) {
      process.stdout.write(String(e))
      return await this.read(question, fallback, convert)
    }
  }

  constructor() {
    this.file = "env"
    this.store = this.load();
  }
  async get<T>(name: string, description: string, fallback: T, convert: (value: string) => T): Promise<T>
  async get(name: string, fallback: string, description: string): Promise<string>;
  async get<T>(name: string, description: string, fallback: T, convert?: (value: string) => T): Promise<T> {
    const current = this.queue.then(async _ => {
        if (convert)
          return await this.resolve<T>(name, description, fallback, convert);
        return await this.resolve<T>(name, description, fallback, (value) => value as T)
    })
    this.queue = current;
    return await current;
  }

  private isInteractive(): boolean {
    return (
      Boolean(stdin.isTTY) &&
      process.env.NODE_ENV !== 'test' &&
      process.env.NO_ENV_PROMPT !== '1'
    );
  }

  private load(): Record<string, string> {
    try {
      const parsed = JSON.parse(readFileSync(this.file, 'utf8')) as Record<string, unknown>;
      const values: Record<string, string> = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'string') values[key] = value;
      }
      return values;
    } catch {
      return {};
    }
  }

  private save(): void {
    writeFileSync(this.file, `${JSON.stringify(this.store, null, 2)}\n`);
  }

  private async resolve<T>(
    name: string,
    description: string,
    fallback: T,
    convert: (value: string) => T
  ): Promise<T> {
    const current = this.store[name] ?? process.env[name];
    const label = `${description} (${name})`;

    if (!this.isInteractive()) {
      const value = current ?? fallback;
      if (value) process.env[name] = value;
      return value;
    }

    const answer = await this.read(`[env] Enter ${label}[${current ?? fallback}]: `, current ?? fallback, convert);
    const value = answer || current || fallback;

    this.store[name] = value;
    this.save();
    process.env[name] = value;
    return value;
  }
}
