---
name: write-in-my-voice
description: Write a new article or revise an existing one so it reads as Christine's own writing rather than as AI prose, in Australian English, using a draft-critique-revise loop against her published work. Use this whenever asked to write, draft, ghostwrite or rewrite an article, blog post or essay for this site, whenever asked to put something "in my voice", "in my style" or "so it doesn't sound like AI", and whenever revising prose that was generated rather than written. Reach for it even when the request is just "write an article about X" — a draft that is factually right, tonally wrong or spelled American still has to be rewritten, so it is cheaper to write it correctly the first time.
---

# Writing in Christine's voice

The failure this exists to prevent is a specific one. A draft comes out accurate, well organised,
readable, and unmistakably machine-written. It gets published under her name and it does not sound
like her.

Fixing that is not mainly about avoiding AI tics. It is about supplying what only she can supply.
Her prose is carried by her own experience: the machine she sat in front of, the phone call she
took, the thing she got wrong and later understood. A draft with no em dashes and no personal
stake still reads as AI. So the first question for any piece is not "how should this sound" but
"what does she actually know about this that nobody else does".

## Before drafting

**Read `references/voice.md`**, which is the full analysis of her style, and then **read at least
one of her articles in full**. The reference file lists which article suits which register. This
second step matters more than it looks: a description of a voice is much weaker calibration than
the voice itself, and skipping it is the most common reason a draft comes back generic.

Then settle three things.

**Which register.** Personal essay, technical or historical, or formal. Paragraph length,
parenthetical density and formality all follow from this, and they differ enough between her modes
that guessing wrong makes everything else wrong.

**What she knows.** Go and get the specifics before writing a word. If the piece is about work
done in this session, the transcript holds the real numbers, the real failures and the order in
which things were understood. If it is about her past, the existing articles and `src/content/`
hold dates, employers, machines and prices. Vague prose is almost always a research failure rather
than a style failure.

**What she should not claim.** Do not invent an anecdote, a figure, an opinion or a feeling. If a
sentence needs a fact you do not have, either find it or write around it. Putting an invented
memory in someone's mouth is worse than a flat sentence, and it is the one error here that cannot
be fixed by revision.

## The loop

Draft, then run up to five rounds of critique and revision. Stop as soon as a round produces
nothing material, which is usually round two or three.

### Each round

**1. Run the mechanical check.** It is fast and it frees the reading pass to spend attention on
things that need judgement:

```bash
python3 .claude/skills/write-in-my-voice/scripts/style_check.py draft.md --register essay
```

It reports sentence and paragraph length against her actual corpus, counts parentheticals, bold
runs and single-sentence paragraphs, and flags machine-prose phrases and American spellings.
Baselines are computed from her articles at run time, so they stay honest.

**2. Get a fresh reading.** Spawn a subagent with no memory of writing the draft, and give it the
voice reference, one of her articles, and the draft. Ask it for **specific quoted lines** and what
is wrong with each.

The freshness is the point. An agent that just wrote a paragraph is attached to it and will
explain why it is fine. A reader coming to it cold will say it sounds like a press release. Use a
prompt along these lines:

> Read `references/voice.md` and `src/content/article/<a real article>`. Then read the draft at
> `<path>`.
>
> Quote every line that would not survive in one of her articles, and say what is wrong with it.
> Be concrete: "this sentence has no subject who did anything" beats "the tone is off". Then
> answer three questions directly.
>
> 1. Where does this stop being carried by her own experience and become general commentary?
> 2. Which sentences could have been written by anyone about anything?
> 3. Does the ending turn, or does it recap?
>
> If the draft is genuinely close, say so plainly and list nothing. A list of minor quibbles
> produced to look thorough will make the next revision worse, not better.

**3. Revise against the quotes.** Address each quoted line. Where the criticism is that a passage
is generic, the fix is almost never rewording. It is going back for a specific: a name, a number,
a date, a thing that happened.

**4. Decide whether to go again.** Stop when the critique returns nothing material, or when the
same points keep coming back and the revisions are no longer changing the answer.

### Knowing when to stop

Over-revision has its own failure mode, and it is worth watching for because the loop invites it.
Round after round of "shorten this" produces uniformly short sentences, which is a different kind
of wrong: her prose is lumpy, with a six-word sentence next to a forty-word one. If successive
rounds are only smoothing rhythm rather than adding substance, the loop is finished and running it
again will flatten the piece.

The target is not "passes every check". It is "a reader who knows her writing would not stop on
any sentence".

## The things most often wrong in a first draft

These recur, so check them before spending a round on them.

**Nobody does anything.** Machine prose likes constructions where processes occur and things are
observed. She writes about people doing things, usually herself. "The conversion dropped a word"
is better than "a word was found to be missing".

**The specifics are one notch too vague.** "An old minicomputer" where she would write "a VAX
11/780". "Quite cheap" where she would write "\$10 an hour". If a sentence contains a category
where a name would fit, that is a research task, not a writing one.

**The ending recaps instead of turning.** She closes on a short line that compresses the piece into
something plainly said, arrived at rather than announced. A closing paragraph that lists what the
article covered is the strongest single signal of machine authorship.

**Emphasis is over-applied.** Bolded phrases scattered through prose for skimmability are not hers
at all: her articles run to zero or one bold run each. Italics do the emphatic work.

**Structure is over-signposted.** No "in this article we will look at", no numbered preview of the
sections, no summary at the end.

**Everything is the same length.** Vary it. Put a one-sentence paragraph at the turn of a story,
which is exactly where she puts hers.

## Australian spelling, always

She is Australian and writes Australian English. American spelling in a draft is jarring in the
same way a wrong idiom would be, and it is one of the few faults a reader notices consciously.
Write it correctly the first time rather than fixing it in a later pass, because a
search-and-replace at the end is exactly where the over-corrections get introduced.

| Pattern                | Australian                                                                                                                                            |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-ise`, not `-ize`     | realise, organise, recognise, minimise, customise, emphasise, specialise, summarise, apologise, criticise, prioritise, standardise, optimise, utilise |
| `-yse`, not `-yze`     | analyse, paralyse, catalyse                                                                                                                           |
| `-our`, not `-or`      | colour, favour, behaviour, honour, labour, humour, neighbour, endeavour, rumour, flavour                                                              |
| `-re`, not `-er`       | centre, metre, theatre, litre, fibre, calibre, spectre                                                                                                |
| `-ce` noun, `-se` verb | a licence / to license; a practice / to practise; defence, offence, pretence                                                                          |
| doubled `l`            | travelled, travelling, traveller, cancelled, modelled, labelled, marvellous                                                                           |
| single `l`             | skilful, fulfil, enrol                                                                                                                                |
| other                  | grey, ageing, sceptic, storey (of a building), enquiry, mould, manoeuvre, aluminium, programme (an event; a computer _program_ stays short)           |

Three traps worth knowing, because each one bites people who apply the rule mechanically:

**Many `-ise` words are `-ise` everywhere**, so they are not evidence of anything: advertise,
advise, comprise, compromise, despise, devise, exercise, improvise, revise, supervise, surprise,
televise. And plenty of `-ize` strings are not the suffix at all: size, capsize, prize, seize.
Never blanket-replace "ize" with "ise".

**The `-our` ending drops before some suffixes.** Honour but honorary. Humour but humorous.
Labour but laborious. Glamour but glamorous.

**Proper nouns and quotations keep their own spelling.** "Bell Labs research center" inside a
quotation from Wikipedia is correct as it stands, and so is any organisation that spells itself
with a z. Do not correct someone else's name.

The exception to all of this is a historical document. The 1987 thesis uses American `-ize`
forms throughout, so when reproducing or extending work from that era, match the source rather
than the house style.

`scripts/style_check.py` reports American spellings it finds, but treat that as a safety net
rather than the plan.

## Other house rules for this repository

- Frontmatter needs `title`, `description` and `pubDate`. The description is one sentence saying
  what the piece is, in her voice rather than in marketing language.
- A literal `$` must be escaped as `\$`, or the Markdown processor reads a paragraph's dollar
  amounts as an inline equation and silently blows the page width open.
- Articles land in both `spotlite` and `cv`; see `sync-both`.

## Reference

- `references/voice.md` — the full style analysis: the constants, measured baselines per register,
  structural habits, and what is absent from her writing. Read this before drafting, every time.
