#!/usr/bin/env python3
"""Warn when a file edited here has drifted from its twin in the sibling repository.

spotlite and cv are the same site deployed twice, from repositories with no shared
history and no merge path, so nothing but memory keeps them together. This compares the
file just written against its counterpart, normalising the base path first — a raw diff
would flag every file, every time, on `/spotlite/` versus `/cv/` alone.
"""

import json
import re
import sys
from fnmatch import fnmatch
from pathlib import Path

PAIR = {'spotlite': 'cv', 'cv': 'spotlite'}
# Only content and source travel between the repos. Build output and local notes do not.
WATCHED = ('src/', 'public/', 'scripts/', '.claude/')
SKIP = ('dist/', 'node_modules/', '.astro/', 'coverage/')

# Original historical documents -- manuscripts, decks, scans and the contemporaneous HTML
# exports -- are committed to cv only. cv is a personal CV; spotlite is a public template and
# has no business shipping a personal archive.
CV_ONLY = ('public/*.zip', 'public/*.ZIP', 'public/*.pdf',
           'public/*.DOC', 'public/*.PPT', 'public/*.DOT')
# Belong in both, but the content is each repo's own identity rather than shared material: the
# manifest names and scopes the site, and the CV PDFs are rendered against it and embed absolute
# URLs. Require both to exist and compare no further.
KEEP_IN_BOTH = ('public/cv.pdf', 'public/cv-onepage.pdf', 'public/site.webmanifest')

# These carry the same prose in both repos but no download links in spotlite, because the
# documents they point at are not there. Differences are expected, so warn rather than block --
# which does mean an unrelated drift in one of them will not be caught here.
MAY_DIVERGE = (
    'src/content/article/auug-1993.md',
    'src/content/article/auug-1994.md',
    'src/content/article/openworld-1994.md',
    'src/content/article/crypt-usenix91.md',
    'src/content/article/suntech-1990.md',
    'src/content/page/education.md',
)


def is_cv_only(rel):
    return rel not in KEEP_IN_BOTH and any(fnmatch(rel, pat) for pat in CV_ONLY)


def normalise(text):
    """Collapse each repo's own base path and host so only real differences remain.

    CLAUDE.md's table gives both as per-repo settings, and a file like robots.txt names the
    host as well as the base -- so collapsing the base alone still flags it every time.
    """
    text = re.sub(r'/(?:spotlite|cv)/', '/BASE/', text)
    return re.sub(r'\b(?:hellotham\.com|christham\.net)\b', 'SITE', text)


def main():
    try:
        event = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0

    path = (event.get('tool_input') or {}).get('file_path')
    if not path:
        return 0
    here = Path(path).resolve()

    parts = here.parts
    try:
        i = next(n for n, p in enumerate(parts) if p in PAIR)
    except StopIteration:
        return 0

    rel = str(Path(*parts[i + 1:]))
    if rel.startswith(SKIP) or not rel.startswith(WATCHED):
        return 0

    twin = Path(*parts[:i], PAIR[parts[i]], *parts[i + 1:])
    this_repo, twin_repo = parts[i], PAIR[parts[i]]

    if is_cv_only(rel):
        if this_repo == 'spotlite':
            print(f'{rel} is an original historical document, and those are kept in cv only — '
                  f'spotlite is a public template and does not ship a personal archive. Put it '
                  f'in cv/public/ instead, and give the spotlite copy of any article citing it '
                  f'no download link.', file=sys.stderr)
            return 2
        return 0

    if not twin.exists():
        print(f'{rel} exists in {this_repo} but not in {twin_repo}.', file=sys.stderr)
        return 2

    if rel in KEEP_IN_BOTH:
        return 0

    try:
        a, b = here.read_text(), twin.read_text()
    except UnicodeDecodeError:
        # Binary: compare bytes, no base path to normalise.
        if here.read_bytes() != twin.read_bytes():
            print(f'{rel} differs between {this_repo} and {twin_repo}.', file=sys.stderr)
            return 2
        return 0

    if normalise(a) == normalise(b):
        return 0

    if rel in MAY_DIVERGE:
        print(f'{rel} differs from {twin_repo}. That is expected — spotlite carries this article '
              f'without its download links. Check the difference is only those links.')
        return 0

    print(
        f'{rel} differs between {this_repo} and {twin_repo}, ignoring base paths. '
        f'The two repositories have no merge path, so port the change across before '
        f'committing:\n  {twin}',
        file=sys.stderr,
    )
    return 2


if __name__ == '__main__':
    sys.exit(main())
