# jav-site

Astro + Sanity template. Content is authored in Sanity Studio, the site prerenders at build time and
deploys to Cloudflare Workers.

Working conventions live in [`CLAUDE.md`](CLAUDE.md).

## Layout

| Path               | What it is                                           |
| ------------------ | ---------------------------------------------------- |
| `apps/site`        | Astro site, deployed to Cloudflare                   |
| `apps/studio`      | Sanity Studio, deployed to `*.sanity.studio`         |
| `packages/content` | GROQ queries, generated types, Sanity client factory |

## Setup

1. Create a Sanity project — `pnpm dlx sanity login --provider sanity`, then create one at
   [sanity.io/manage](https://www.sanity.io/manage) and copy its project ID.
2. Fill in the environment:

   ```bash
   cp .env.example apps/site/.env             # PUBLIC_SANITY_PROJECT_ID=<id>
   cp apps/studio/.env.example apps/studio/.env  # SANITY_STUDIO_PROJECT_ID=<id>
   ```

3. Install and run:

   ```bash
   pnpm install
   pnpm --filter site cf-types   # apps/site/worker-configuration.d.ts (gitignored)
   pnpm codegen                  # generated Sanity types
   pnpm dev                      # site on :4323, Studio on :3334
   ```

4. In the Studio, fill in **Site Settings** and publish it. Every page reads it, so the site build
   fails with a clear error until it exists.

Add `http://localhost:3334` to the project's CORS origins in the Sanity dashboard.

## Commands

| Command                       | What it does                                         |
| ----------------------------- | ---------------------------------------------------- |
| `pnpm dev`                    | Site and Studio dev servers                          |
| `pnpm build`                  | Production build of every package                    |
| `pnpm lint` / `pnpm fix`      | Biome check / write                                  |
| `pnpm typecheck`              | `astro check` for the site, `tsc --noEmit` elsewhere |
| `pnpm codegen`                | Extract Sanity schema, regenerate TypeGen types      |
| `pnpm --filter studio deploy` | Publish the Studio to `*.sanity.studio`              |

## Content model

| Type           | What it is                                                          |
| -------------- | ------------------------------------------------------------------- |
| `siteSettings` | Singleton (id `siteSettings`). Name, tagline, description, hero, socials |
| `page`         | Content-managed page, served at `/<slug>`                           |
| `faqItem`      | One question and answer, listed on `/faq`                           |
| `blockContent` | Shared Portable Text (body copy, answers)                           |

Header navigation is code, not content — edit `nav` in `apps/site/src/lib/site.ts`. It points at
`/about` by default, which expects a `page` document with that slug.

## TypeScript

One version for the whole workspace: **TypeScript 6**, pinned at the root. TypeScript 7 (the
Go-native compiler) does not yet expose the programmatic API that `astro check` needs via
`@astrojs/language-server`.

## Generated files

`apps/studio/schema.json` and `packages/content/src/generated/sanity.types.ts` are **committed**.
CI has no Sanity credentials, and committing them makes schema drift visible in review. Run
`pnpm codegen` after any Studio schema or GROQ query change and commit the result.

`apps/site/worker-configuration.d.ts` is _not_ committed — CI regenerates it with
`pnpm --filter site cf-types`, which needs no credentials.

## Dependency pins

`pnpm-workspace.yaml` pins `wrangler`, `workerd` and `miniflare`. Cloudflare publishes daily; bump
these deliberately once a release has aged out.

## Before launch

- [ ] Set `site` in `apps/site/astro.config.mjs` to the real domain.
- [ ] Replace the placeholder design tokens and font stacks in `apps/site/src/styles/global.css`,
      and the favicon in `apps/site/public/`.
- [ ] Set `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` as repo **variables** so CI can build.
- [ ] Connect the repo to Cloudflare Workers Builds (build command `pnpm build`, root `apps/site`,
      `NODE_VERSION` from `.nvmrc`) — not creatable from the CLI.
- [ ] Sanity webhook → Cloudflare deploy hook, or editors publish and the live site never changes.
- [ ] Add the production origin to the Sanity project's CORS origins.
