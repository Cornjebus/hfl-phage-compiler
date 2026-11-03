/** Postgres pool — Better Auth's storage. App data here is mock; the pool
 *  exists for auth (and for whatever real tables the site grows later). */
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
