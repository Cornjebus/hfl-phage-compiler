/**
 * basePath-aware URL helper for raw fetch()/href targets. In the Sontara
 * live preview the app runs under an injected basePath; next.config.ts
 * republishes it as NEXT_PUBLIC_BASE_PATH. Standalone it's "" — a no-op.
 */
export function withBase(path: string): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? '') + path;
}
