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
from pathlib import Path

PAIR = {'spotlite': 'cv', 'cv': 'spotlite'}
# Only content and source travel between the repos. Build output and local notes do not.
WATCHED = ('src/', 'public/', 'scripts/', '.claude/')
SKIP = ('dist/', 'node_modules/', '.astro/', 'coverage/')


def normalise(text):
    """Collapse each repo's own base path so only real differences remain."""
    return re.sub(r'/(?:spotlite|cv)/', '/BASE/', text)


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

    if not twin.exists():
        print(f'{rel} exists in {this_repo} but not in {twin_repo}.', file=sys.stderr)
        return 2

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

    print(
        f'{rel} differs between {this_repo} and {twin_repo}, ignoring base paths. '
        f'The two repositories have no merge path, so port the change across before '
        f'committing:\n  {twin}',
        file=sys.stderr,
    )
    return 2


if __name__ == '__main__':
    sys.exit(main())
