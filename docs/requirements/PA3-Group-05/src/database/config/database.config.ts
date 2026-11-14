export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export function loadDatabaseConfig(): DatabaseConfig {
  return {
    host: process.env.PGHOST ?? 'localhost',
    port: Number.parseInt(process.env.PGPORT ?? '5432', 10),
    database: process.env.PGDATABASE ?? 'studitopia',
    username: process.env.PGUSER ?? 'studitopia',
    password: process.env.PGPASSWORD ?? '',
  };
}
