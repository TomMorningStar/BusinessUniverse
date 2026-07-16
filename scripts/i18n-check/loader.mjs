import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Node resolve hook for `npm run i18n:check`: the dictionaries are written for
 * the Vite bundler (extensionless relative imports), so this hook appends `.ts`
 * where needed. Node then loads them via its built-in type stripping — the
 * project's `erasableSyntaxOnly` tsconfig option guarantees that works.
 */
export async function resolve(specifier, context, next) {
  if (
    (specifier.startsWith('./') || specifier.startsWith('../')) &&
    !/\.[a-z]+$/i.test(specifier)
  ) {
    const candidate = new URL(`${specifier}.ts`, context.parentURL);

    if (existsSync(fileURLToPath(candidate))) {
      return next(`${specifier}.ts`, context);
    }
  }

  return next(specifier, context);
}
