// eslint-security-config.js
//
// Shared ESLint flat-config fragment for security rules.
// Drop this file at the root of any Next.js project, then import it into
// your existing eslint.config.mjs (or eslint.config.js).
//
// Usage in eslint.config.mjs:
//
//   import securityConfig from './eslint-security-config.js'
//   import { defineConfig } from 'eslint/config'
//   import nextVitals from 'eslint-config-next/core-web-vitals'
//
//   export default defineConfig([
//     ...nextVitals,
//     ...securityConfig,   // <-- add this
//   ])
//
// Install the plugin first:
//   bun add -D eslint-plugin-security
//
// Rule reference: https://github.com/eslint-community/eslint-plugin-security

import securityPlugin from 'eslint-plugin-security'

/** @type {import('eslint').Linter.Config[]} */
const securityConfig = [
  {
    // Apply to all JS/TS source files. Adjust globs to match your project layout.
    files: ['src/**/*.{ts,tsx,js,jsx}', 'app/**/*.{ts,tsx,js,jsx}', 'pages/**/*.{ts,tsx,js,jsx}'],

    plugins: {
      security: securityPlugin,
    },

    rules: {
      // ── Injection ─────────────────────────────────────────────────────────

      // Disallow eval() and implied eval (setTimeout/setInterval with string args).
      // eval() on any user-controlled input is a code injection vulnerability.
      'security/detect-eval-with-expression': 'error',

      // Warn when require() is called with a non-literal path (e.g. require(userInput)).
      // An attacker who controls this value can load arbitrary modules.
      'security/detect-non-literal-require': 'error',

      // Warn when RegExp() is constructed with a non-literal pattern.
      // User-supplied regex patterns can trigger ReDoS (catastrophic backtracking).
      'security/detect-non-literal-regexp': 'warn',

      // Detect fs module calls with non-literal path arguments.
      // Path traversal attacks become possible when file paths are user-controlled.
      'security/detect-non-literal-fs-filename': 'warn',

      // ── Timing ────────────────────────────────────────────────────────────

      // Detect string comparisons that may be vulnerable to timing attacks.
      // Use crypto.timingSafeEqual() for secrets, tokens, and HMAC comparisons.
      'security/detect-possible-timing-attacks': 'warn',

      // ── Injection (object/prototype) ──────────────────────────────────────

      // Disallow object[key] access where key is a variable — prototype pollution risk
      // when key comes from user input (e.g. JSON body with __proto__ key).
      'security/detect-object-injection': 'warn',

      // ── Middleware ordering ────────────────────────────────────────────────

      // Warn if CSRF protection middleware is not applied before method-override.
      // Method override bypasses CSRF checks if applied in the wrong order.
      'security/detect-no-csrf-before-method-override': 'warn',

      // ── Miscellaneous ─────────────────────────────────────────────────────

      // Disallow use of new Buffer() — it does not zero memory and can expose
      // prior heap contents. Use Buffer.alloc() or Buffer.from() instead.
      'security/detect-new-buffer': 'error',

      // Warn when child_process.exec() (or spawn) is called with a variable argument.
      // Shell injection is possible if the argument is user-controlled.
      'security/detect-child-process': 'warn',

      // Warn on pseudoRandom number generators (Math.random).
      // Crypto operations require crypto.getRandomValues() or crypto.randomBytes().
      'security/detect-pseudoRandomBytes': 'warn',

      // Warn on unsafe use of regular expressions that could match unexpected input
      // due to the absence of anchors or overly broad character classes.
      'security/detect-unsafe-regex': 'warn',
    },
  },
]

export default securityConfig
