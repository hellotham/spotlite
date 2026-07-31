#!/usr/bin/env python3
"""After any git push, report where both repositories actually stand.

`cd` persists between Bash calls, so a push written as if it targeted one repository can
land in the other — twice in one session here, and both times the deploy check that
followed watched the repository that had not moved. Rather than guess which directory the
command ran in, report both: if either is still ahead of its remote, the push did not do
what it looked like it did.
"""

import json
import subprocess
import sys
from pathlib import Path

REPOS = ('spotlite', 'cv')
ROOT = Path.home() / 'Repositories' / 'Websites'


def git(repo, *args):
    out = subprocess.run(
        ['git', '-C', str(repo), *args], capture_output=True, text=True, timeout=15
    )
    return out.stdout.strip() if out.returncode == 0 else None


def main():
    try:
        event = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0

    command = (event.get('tool_input') or {}).get('command', '')
    if 'git push' not in command:
        return 0

    lines, behind = [], False
    for name in REPOS:
        repo = ROOT / name
        if not (repo / '.git').exists():
            continue
        head = git(repo, 'rev-parse', '--short', 'HEAD')
        ahead = git(repo, 'log', '--oneline', 'origin/main..HEAD')
        dirty = git(repo, 'status', '--porcelain')
        if head is None:
            continue
        n = len(ahead.splitlines()) if ahead else 0
        state = 'in sync with origin' if n == 0 else f'{n} commit(s) NOT pushed'
        if n:
            behind = True
        if dirty:
            state += f', {len(dirty.splitlines())} uncommitted'
        lines.append(f'  {name:<9} {head}  {state}')

    if not lines:
        return 0
    report = 'Push state across both repositories:\n' + '\n'.join(lines)
    if behind:
        print(report, file=sys.stderr)
        return 2
    print(report)
    return 0


if __name__ == '__main__':
    sys.exit(main())
