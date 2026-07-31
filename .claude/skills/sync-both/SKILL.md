---
name: sync-both
description: Port the current change across to the sibling repository, verify both, then commit, push and confirm both deploys. Use when a change is complete in one of spotlite or cv and needs to land in the other.
disable-model-invocation: true
---

# Sync both repositories

`hellotham/spotlite` and `ChristineTham/cv` are the same site deployed twice, from
repositories with **no shared history and no merge path**. A change that lands in one and not
the other diverges silently and stays diverged.

|          | path                               | `site`                  | `base`       |
| :------- | :--------------------------------- | :---------------------- | :----------- |
| spotlite | `~/Repositories/Websites/spotlite` | `https://hellotham.com` | `/spotlite/` |
| cv       | `~/Repositories/Websites/cv`       | `https://christham.net` | `/cv/`       |

## 1. Establish what changed

```bash
git -C ~/Repositories/Websites/spotlite status --short
git -C ~/Repositories/Websites/cv status --short
```

Work out which repository holds the change and which is the target. Everything below calls
them SOURCE and TARGET.

## 2. Copy, then rewrite the base path — anchored

Copy each changed file, then rewrite **anchored on the link opener**:

```bash
sed -i '' 's#](/spotlite/#](/cv/#g' <file>      # spotlite -> cv
sed -i '' 's#](/cv/#](/spotlite/#g' <file>      # cv -> spotlite
```

A blanket `s#/spotlite/#/cv/#g` is wrong. `spotlite` is also an article slug, so it turns
`/spotlite/article/spotlite/` into `/cv/article/cv/` and breaks the link. Anchoring on `](`
rewrites only the start of a URL.

**Never copy `astro.config.mjs` wholesale.** It differs in `site` and `base`, and the two
repositories word some comments differently. Port the specific lines by hand. The same
caution applies to any root config you did not write in this change.

## 3. Verify they now match

```bash
diff <(sed 's#/spotlite/#/BASE/#g' SOURCE/<file>) <(sed 's#/cv/#/BASE/#g' TARGET/<file>)
```

Normalising both sides is what makes this meaningful — a raw diff always differs on the base
path alone. Expect one legitimate exception: a link to the `spotlite` article normalises
asymmetrically (`/BASE/article/BASE/` against `/BASE/article/spotlite/`) and is correct.

## 4. Check both, separately

In each repository:

```bash
pnpm lint && pnpm astro check && pnpm test && pnpm build
```

`pnpm lint` **writes** — it is `prettier --write .` then `eslint --fix .`. If the change
added vendored or generated files, they must be in `.prettierignore` and the eslint `ignores`
_before_ this runs.

If content, `src/cv.json` or `src/utils/cv.ts` changed, also run `pnpm run pdf` in both — the
PDFs are committed and go stale silently.

## 5. Commit and push, one repository per command

```bash
cd ~/Repositories/Websites/spotlite && git add -A && git commit -F - <<'EOF'
...
EOF
git push origin main
```

Then the same for cv, as a **separate** command. A `cd` earlier in a compound command
persists, so a push written as if it targeted spotlite can land in cv twice. Confirm with:

```bash
git -C ~/Repositories/Websites/spotlite log origin/main..HEAD --oneline
git -C ~/Repositories/Websites/cv log origin/main..HEAD --oneline
```

Both must be empty.

## 6. Confirm both deploys carry the right commit

```bash
gh run list --limit 1 --json status,conclusion,headSha
```

Per repository, waiting until `status` is `completed` **and** `headSha` matches that
repository's HEAD. A green run against the previous commit means nothing.

## Report

State both SHAs, both deploy results, and anything deliberately left unsynced with the reason.
