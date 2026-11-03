/** Better Auth's handler — every /api/auth/* endpoint in one route. */
import { toNextJsHandler } from 'better-auth/next-js';

import { auth } from '@/lib/auth';

export const { GET, POST } = toNextJsHandler(auth);
