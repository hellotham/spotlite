#!/usr/bin/env python3
"""Measure a draft against the voice corpus.

This catches only what is countable: sentence and paragraph length, punctuation habits, and a
list of phrases that never appear in the corpus but appear constantly in machine-written prose.
Passing every check does not mean a draft sounds like her, because the things that matter most
(personal experience carrying the argument, concrete specifics, candour) cannot be counted. Use
this to clear the mechanical faults quickly so the reading pass can spend its attention on the
things that need judgement.

Baselines are computed from the corpus at run time rather than hard-coded, so adding another
article to --corpus reshapes the targets automatically.

    style_check.py draft.md
    style_check.py draft.md --register technical
    style_check.py draft.md --corpus src/content/article/unix-50-celebration.md
"""

import argparse
import glob
import os
import re
import statistics as st
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ARTICLES = os.path.normpath(os.path.join(HERE, '../../../../src/content/article'))

CORPUS = {
    'essay': ['how-to-avoid-folo-fear-of-losing-out-and-have-a-satisfying-career-and-life.md',
              'why-i-consider-myself-to-be-retired-and-why-you-should-too.md'],
    'technical': ['unix-50-celebration.md'],
}

# Phrases and constructions absent from the corpus and typical of machine-written prose. The
# point is not that any one is forbidden, but that a draft carrying several is not in her voice.
TELLS = [
    (r'—', 'em dash (she uses a spaced en dash or hyphen, never this)'),
    (r"\bit'?s not just\b.{0,40}\bit'?s\b", '"it\'s not just X, it\'s Y"'),
    (r'\bnot only\b.{0,40}\bbut also\b', '"not only X but also Y"'),
    (r"\blet'?s dive in\b", '"let\'s dive in"'),
    (r'\bin today\'?s\b.{0,30}\bworld\b', '"in today\'s ... world"'),
    (r'\bgame[- ]chang', '"game-changing"'),
    (r'\brevolutionis|\brevolutioniz', '"revolutionise"'),
    (r'\bseamless(ly)?\b', '"seamless"'),
    (r'\bdelve\b', '"delve"'),
    (r'\bleverag(e|ing)\b(?! them)', '"leverage" as a verb'),
    (r'\bunlock(ing)? the (power|potential)', '"unlock the power"'),
    (r'\bat the end of the day\b', '"at the end of the day"'),
    (r'\bit is worth noting that\b', '"it is worth noting that"'),
    (r'\bin conclusion\b', '"in conclusion"'),
    (r'\bto summari[sz]e\b', '"to summarise"'),
    (r'\bincredibly powerful\b', '"incredibly powerful"'),
    (r'\bthis is where\b.{0,30}\bcomes? in\b', '"this is where X comes in"'),
]

# Modern articles use Australian spelling. Reported as a warning rather than a failure, because
# proper nouns, quoted material and the 1987 thesis all legitimately keep American forms.
#
# Every pattern here matches ONLY the American form. Writing them as [sz] classes would match the
# Australian spelling too and flag correct prose, which is a mistake this file has already made
# once. Words that are -ise in both varieties (advertise, exercise, surprise, comprise) are
# deliberately absent, and so is anything where -ize is not the suffix (size, capsize, prize).
AMERICAN = [
    # -ize / -yze
    (r'\b\w*(?:organiz|realiz|recogniz|minimiz|maximiz|customiz|emphasiz|specializ|summariz|'
     r'apologiz|criticiz|prioritiz|standardiz|optimiz|utiliz|categoriz|visualiz|digitiz|'
     r'moderniz|normaliz|authoriz|memoriz|characteriz)\w*\b', '-ise'),
    (r'\b\w*(?:analyz|paralyz|catalyz|paralyz)\w*\b', '-yse'),
    # -or / -our
    (r'\bcolors?\b', 'colour'), (r'\bfavor(s|ed|ing|ite)?\b', 'favour'),
    (r'\bbehaviors?\b', 'behaviour'), (r'\bhonors?\b', 'honour'),
    (r'\blabors?\b', 'labour'), (r'\bhumor\b', 'humour'),
    (r'\bneighbors?\b', 'neighbour'), (r'\brumors?\b', 'rumour'),
    (r'\bflavors?\b', 'flavour'), (r'\bendeavors?\b', 'endeavour'),
    # -er / -re
    (r'\bcenters?\b', 'centre'), (r'\btheaters?\b', 'theatre'),
    (r'\bliters?\b', 'litre'), (r'\bfibers?\b', 'fibre'),
    # single l where Australian doubles it
    (r'\btraveled\b|\btraveling\b|\btraveler\b', 'travelled / travelling / traveller'),
    (r'\bcanceled\b|\bcanceling\b', 'cancelled / cancelling'),
    (r'\bmodeled\b|\bmodeling\b', 'modelled / modelling'),
    (r'\blabeled\b|\blabeling\b', 'labelled / labelling'),
    (r'\bmarvelous\b', 'marvellous'),
    # -ll where Australian uses one
    (r'\bskillful\b', 'skilful'), (r'\bfulfill\b', 'fulfil'), (r'\benroll\b', 'enrol'),
    # noun/verb split and assorted
    (r'\bdefense\b', 'defence'), (r'\boffense\b', 'offence'), (r'\bpretense\b', 'pretence'),
    (r'\bpracticing\b|\bpracticed\b', 'practising / practised'),
    (r'\bgray\b', 'grey'), (r'\baging\b', 'ageing'), (r'\bskeptic', 'sceptic'),
    (r'\baluminum\b', 'aluminium'), (r'\bmaneuver', 'manoeuvre'), (r'\bmold(s|ed|ing)?\b', 'mould'),
]


def body(text):
    """Strip frontmatter, fenced code and inline HTML anchors, keeping the prose."""
    if text.startswith('---\n'):
        parts = text.split('---\n', 2)
        text = parts[2] if len(parts) > 2 else text
    text = re.sub(r'(?s)```.*?```', '', text)
    text = re.sub(r'<a id="[^"]*"></a>', '', text)
    return text


def prose_paragraphs(text):
    """Paragraphs that are running prose: not headings, lists, quotes, images or tables."""
    out = []
    for p in text.split('\n\n'):
        p = p.strip()
        if not p or p.startswith(('#', '-', '*', '>', '!', '|', '1.')):
            continue
        out.append(p)
    return out


def sentences(paragraph):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+', paragraph) if s.strip()]


def words(s):
    return len(re.findall(r'\w+', s))


def measure(text):
    t = body(text)
    paras = prose_paragraphs(t)
    sents = [s for p in paras for s in sentences(p)]
    if not sents:
        return None
    openers = re.findall(
        r'(?:^|(?<=[.!?] ))(And|But|So|Or|Also|However|Indeed|Besides|Yet|Perhaps|'
        r'Eventually|Finally|Then|Now)\b', t)
    return {
        'paragraphs': len(paras),
        'sentences': len(sents),
        'median_sentence': st.median([words(s) for s in sents]),
        'median_paragraph': st.median([words(p) for p in paras]),
        'longest_sentence': max(words(s) for s in sents),
        'opener_pct': 100.0 * len(openers) / len(sents),
        'single_sentence_paras': sum(1 for p in paras if len(sentences(p)) == 1),
        'parentheticals': len(re.findall(r'\([^)]{4,}\)', t)),
        'exclamations': t.count('!') - len(re.findall(r'!\[', t)),
        'questions': t.count('?'),
        'bold_runs': len(re.findall(r'\*\*[^*]+\*\*', t)),
        'text': t,
        # Spelling is judged on prose only. Inline code carries identifiers and CSS
        # properties (color, center) that are not misspellings of anything.
        'prose': re.sub(r'`[^`]*`', ' ', t),
    }


def band(values, pad=0.25):
    lo, hi = min(values), max(values)
    span = max(hi - lo, hi * pad) or 1
    return lo - span * 0.5, hi + span * 0.5


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('draft')
    ap.add_argument('--register', choices=['essay', 'technical'], default='essay')
    ap.add_argument('--corpus', nargs='*', help='override the reference articles')
    args = ap.parse_args()

    refs = args.corpus or [os.path.join(ARTICLES, f) for f in CORPUS[args.register]]
    refs = [f for r in refs for f in glob.glob(r)]
    ref_stats = [measure(open(f, encoding='utf-8').read()) for f in refs]
    ref_stats = [r for r in ref_stats if r]
    if not ref_stats:
        print(f'no corpus found (looked in {ARTICLES})', file=sys.stderr)
        return 2

    d = measure(open(args.draft, encoding='utf-8').read())
    if not d:
        print('draft has no prose paragraphs', file=sys.stderr)
        return 2

    print(f'{os.path.basename(args.draft)}  vs  {args.register} corpus '
          f'({len(ref_stats)} article{"s" if len(ref_stats) > 1 else ""})\n')

    problems = 0
    for key, label in [('median_sentence', 'median sentence length'),
                       ('median_paragraph', 'median paragraph length')]:
        vals = [r[key] for r in ref_stats]
        lo, hi = band(vals)
        got = d[key]
        ok = lo <= got <= hi
        problems += not ok
        ref = '/'.join(f'{v:.0f}' for v in vals)
        print(f'  {"ok  " if ok else "OFF "} {label:42} {got:6.1f}   corpus {ref} '
              f'(band {lo:.0f}-{hi:.0f})')

    openers = "/".join(f"{r['opener_pct']:.1f}" for r in ref_stats)
    print(f'       {"conjunction openers (%)":42} {d["opener_pct"]:6.1f}   corpus {openers}')
    print(f'       {"longest sentence":42} {d["longest_sentence"]:6}   corpus '
          f'{"/".join(str(r["longest_sentence"]) for r in ref_stats)}')
    print(f'       {"single-sentence paragraphs":42} {d["single_sentence_paras"]:6}   corpus '
          f'{"/".join(str(r["single_sentence_paras"]) for r in ref_stats)}')
    print(f'       {"parentheticals":42} {d["parentheticals"]:6}   corpus '
          f'{"/".join(str(r["parentheticals"]) for r in ref_stats)}')
    print(f'       {"bold runs":42} {d["bold_runs"]:6}   corpus '
          f'{"/".join(str(r["bold_runs"]) for r in ref_stats)}')

    print('\n  machine-prose tells')
    hits = 0
    for pat, label in TELLS:
        found = re.findall(pat, d['text'], re.I)
        if found:
            hits += len(found)
            print(f'    x{len(found):<3} {label}')
    if not hits:
        print('    none')
    problems += bool(hits)

    print('\n  spelling')
    sp = 0
    for pat, want in AMERICAN:
        found = [m.group(0) for m in re.finditer(pat, d['prose'], re.I)]
        if found:
            sp += len(found)
            shown = ', '.join(sorted(set(found))[:3])
            print(f'    x{len(found):<3} {shown} -> {want}')
    if not sp:
        print('    Australian throughout')

    bare = len(re.findall(r'(?<!\\)\$', re.sub(r'`[^`]*`', '', d['text'])))
    if bare:
        print(f'\n  WARNING: {bare} unescaped $ — this repository parses $...$ as maths')
        problems += 1

    print(f'\n  {"looks mechanically clean" if not problems else str(problems) + " area(s) to look at"}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
