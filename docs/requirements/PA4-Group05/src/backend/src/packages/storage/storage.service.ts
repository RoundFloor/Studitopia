import { Injectable } from '@nestjs/common';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { STORAGE_ROOT } from './storage.config.js';

@Injectable()
export class StorageService {
  private readonly root = resolve(STORAGE_ROOT);

  private resolveSrc(src: string): string {
    if (!src || !src.trim()) throw new Error('File src is required');

    const path = resolve(this.root, src);
    if (path !== this.root && !path.startsWith(this.root + sep))
      throw new Error('File src escapes the storage root');

    return path;
  }

  async saveFile(src: string, data: Buffer): Promise<void> {
    const path = this.resolveSrc(src);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, data);
  }

  async readFile(src: string): Promise<Buffer> {
    return await readFile(this.resolveSrc(src));
  }

  async deleteFile(src: string): Promise<boolean> {
    try {
      await rm(this.resolveSrc(src));
      return true;
    } catch {
      return false;
    }
  }

  async fileExists(src: string): Promise<boolean> {
    try {
      await stat(this.resolveSrc(src));
      return true;
    } catch {
      return false;
    }
  }
}
