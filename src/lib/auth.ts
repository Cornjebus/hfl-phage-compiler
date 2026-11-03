/**
 * Better Auth server instance — a library, not a service: the generated
 * secret plus the Postgres the site already has, no third-party account.
 *
 * Single-owner model: sign-up is open ONLY while the user table is empty,
 * so the first account created owns the dashboard and the door closes.
 * (Open it later by removing the databaseHooks gate below.)
 */
import { betterAuth } from 'better-auth';

import { pool } from './db';
import { ensureSchema } from './ensure-schema';

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          await ensureSchema();
          const { rows } = await pool.query<{ n: string }>(
            'SELECT COUNT(*)::text AS n FROM "user"'
          );
          if (Number(rows[0]?.n ?? 0) > 0) {
            throw new Error('Sign-up is closed — this dashboard already has its owner.');
          }
          return { data: user };
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
