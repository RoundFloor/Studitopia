import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EnvironmentService, type EnvironmentIO } from '../environment.service.js';

describe('EnvironmentService', () => {
  const key = 'STUDITOPIA_TEST_KEY';
  const originalEnv = { ...process.env };
  const originalTTY = Object.getOwnPropertyDescriptor(process.stdin, 'isTTY');
  let directory: string;
  let file: string;

  function createIO(answers: string[]) {
    const writes: string[] = [];
    const reads: string[] = [];
    let index = 0;
    const io: EnvironmentIO = {
      write: (message) => writes.push(message),
      read: async (prompt) => {
        reads.push(prompt);
        return answers[index++] ?? '';
      },
    };
    return { io, writes, reads };
  }

  function stored(): Record<string, string> {
    return JSON.parse(readFileSync(file, 'utf8')) as Record<string, string>;
  }

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'studitopia-env-'));
    file = join(directory, '.env.json');
    process.env = { ...originalEnv };
    delete process.env[key];
    delete process.env.NO_ENV_PROMPT;
    process.env.NODE_ENV = 'development';
    Object.defineProperty(process.stdin, 'isTTY', {
      value: true,
      configurable: true,
    });
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
    process.env = { ...originalEnv };
    if (originalTTY) {
      Object.defineProperty(process.stdin, 'isTTY', originalTTY);
    } else {
      delete (process.stdin as { isTTY?: boolean }).isTTY;
    }
    vi.restoreAllMocks();
  });

  it('shows a saved value and keeps it by default', async () => {
    writeFileSync(file, JSON.stringify({ [key]: 'old' }));
    const io = createIO(['']);
    const service = new EnvironmentService({ file, io: io.io });

    await expect(service.get(key, 'Test key')).resolves.toBe('old');
    expect(io.writes).toContain(`[env] Test key (${key}) = old`);
    expect(stored()).toEqual({ [key]: 'old' });
  });

  it('replaces a saved value when the user declines it', async () => {
    writeFileSync(file, JSON.stringify({ [key]: 'old' }));
    const service = new EnvironmentService({ file, io: createIO(['n', 'new']).io });

    await expect(service.get(key, 'Test key')).resolves.toBe('new');
    expect(stored()).toEqual({ [key]: 'new' });
    expect(process.env[key]).toBe('new');
  });

  it('asks for a missing value and autosaves it', async () => {
    const service = new EnvironmentService({ file, io: createIO(['fresh']).io });

    await expect(service.get(key, 'Test key')).resolves.toBe('fresh');
    expect(stored()).toEqual({ [key]: 'fresh' });
    expect(process.env[key]).toBe('fresh');
  });

  it('autoloads a saved value on a new service instance', async () => {
    writeFileSync(file, JSON.stringify({ [key]: 'persisted' }));
    process.env.NODE_ENV = 'test';
    const service = new EnvironmentService({ file, io: createIO([]).io });

    await expect(service.get(key, 'Test key')).resolves.toBe('persisted');
  });

  it('uses a fallback when the answer is empty', async () => {
    const service = new EnvironmentService({ file, io: createIO(['']).io });

    await expect(service.get(key, 'Test key', 'default')).resolves.toBe('default');
    expect(stored()).toEqual({ [key]: 'default' });
  });

  it('does not prompt in non-interactive environments', async () => {
    process.env.NODE_ENV = 'test';
    const io = createIO([]);
    const service = new EnvironmentService({ file, io: io.io });

    await expect(service.get(key, 'Test key', 'default')).resolves.toBe('default');
    expect(io.reads).toHaveLength(0);
  });

  it('serializes concurrent requests', async () => {
    const service = new EnvironmentService({ file, io: createIO(['first', 'second']).io });

    const values = await Promise.all([
      service.get(key, 'Test key'),
      service.get('STUDITOPIA_TEST_OTHER_KEY', 'Other key'),
    ]);

    expect(values).toEqual(['first', 'second']);
    delete process.env.STUDITOPIA_TEST_OTHER_KEY;
  });
});
