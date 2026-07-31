#!/usr/bin/env python3
"""Pull Windows Metafiles out of a Word .DOC or PowerPoint .PPT.

Word 2.0 cached a vector rendering of every embedded OLE object so it could draw the figure
without launching the application that owned it. Those caches are the figure as the document
printed it, and they survive intact in the binary.

A metafile is found by its header rather than by walking the OLE directory, because the caches
sit inside object streams rather than as streams of their own. Every candidate is validated on
two independent signals — the declared length has to be sane, and the file has to end on a
terminating EOF record — so a chance byte sequence cannot pass as a picture.

    extract_wmf.py paper.DOC -o wmf/
    extract_wmf.py paper.DOC --list
"""

import argparse
import os
import re
import struct
import sys

# Type=1 (memory), header size 9 words, version 0x0300. Placeable metafiles start d7cdc69a
# instead and are not what Word caches, but are handled if they turn up.
STANDARD = re.compile(rb'\x01\x00\x09\x00\x00\x03')
PLACEABLE = re.compile(rb'\xd7\xcd\xc6\x9a')
EOF_RECORD = b'\x03\x00\x00\x00\x00\x00'


def candidates(data):
    """Yield (offset, length) for every structurally valid metafile in the blob."""
    for m in PLACEABLE.finditer(data):
        # A placeable header is 22 bytes in front of a standard one.
        if STANDARD.match(data, m.start() + 22):
            yield from _check(data, m.start() + 22)
    for m in STANDARD.finditer(data):
        yield from _check(data, m.start())


def _check(data, off):
    if off + 18 > len(data):
        return
    size_words, n_objects, max_record, n_params = struct.unpack_from('<IHIH', data, off + 6)
    length = size_words * 2
    if not (0 < length <= len(data) - off):
        return
    # n_params is defined as zero, and no single record can exceed the file.
    if n_params != 0 or max_record * 2 > length:
        return
    if data[off + length - 6:off + length] != EOF_RECORD:
        return
    yield off, length, n_objects


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('source')
    ap.add_argument('-o', '--outdir', help='write .wmf files here')
    ap.add_argument('--min-size', type=int, default=1024,
                    help='skip anything smaller; tiny metafiles are usually bullets (default 1024)')
    ap.add_argument('--list', action='store_true', help='report only, write nothing')
    args = ap.parse_args()

    data = open(args.source, 'rb').read()
    stem = os.path.splitext(os.path.basename(args.source))[0]
    found = list(candidates(data))
    if not found:
        print('no metafiles found', file=sys.stderr)
        return 1

    # Word keeps a copy in the object stream and another inline, so the same picture appears
    # more than once. Identical bytes are the same picture; keep the first of each.
    seen, kept = {}, []
    for off, length, n_objects in found:
        blob = data[off:off + length]
        if length < args.min_size:
            continue
        if blob in seen:
            seen[blob].append(off)
            continue
        seen[blob] = [off]
        kept.append((off, length, n_objects, blob))

    print(f'{len(found)} valid metafiles, {len(kept)} distinct at >= {args.min_size} bytes')
    for i, (off, length, n_objects, blob) in enumerate(kept):
        dupes = len(seen[blob])
        note = f'  ({dupes} copies)' if dupes > 1 else ''
        print(f'  {i:02d}  offset {off:>8}  {length:>8} bytes  {n_objects:>3} objects{note}')
        if args.outdir and not args.list:
            os.makedirs(args.outdir, exist_ok=True)
            path = os.path.join(args.outdir, f'{stem}-{i:02d}.wmf')
            open(path, 'wb').write(blob)
    if args.outdir and not args.list:
        print(f'written to {args.outdir}/')
    return 0


if __name__ == '__main__':
    sys.exit(main())
