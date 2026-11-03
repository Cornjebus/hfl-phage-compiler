/** Better Auth browser client — what components call instead of Clerk hooks. */
import { createAuthClient } from 'better-auth/react';

import { withBase } from './base-path';

// basePath, not baseURL: baseURL is URL-validated (a bare path throws during
// prerender), while basePath composes with the page origin in the browser —
// which is exactly what the preview's injected basePath needs.
export const authClient = createAuthClient({
  basePath: withBase('/api/auth'),
});
export const { useSession, signIn, signUp, signOut } = authClient;
