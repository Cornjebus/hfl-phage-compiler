/**
 * Boot hook — provision the auth schema before the first request.
 *
 * The import MUST stay inside the `NEXT_RUNTIME === 'nodejs'` branch:
 * NEXT_RUNTIME is inlined per-runtime at build, so the branch is statically
 * dead in the edge compile and pg never gets bundled there.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (process.env.DATABASE_URL) {
      const { ensureSchema } = await import('./lib/ensure-schema');
      await ensureSchema().catch((e) =>
        console.error('Schema provisioning failed (will retry lazily):', e)
      );
    }
  }
}
