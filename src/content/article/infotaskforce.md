---
title: 'The InfoTaskForce and the freeing of the Z-Machine'
description: In 1987 five of us at Sydney University took Infocom's virtual machine apart to see how it worked. We did not expect it to matter to anyone else.
pubDate: 1992-09-01
---

_Filed under the date we finally released the thing properly. The story starts five years
earlier, and what became of it carries on well past both._

In early 1987 five undergraduates at the University of Sydney started pulling apart a piece
of commercial software to see how it worked. We called ourselves the InfoTaskForce, which was
a very grand name for what was really a hobby, and the thing we were pulling apart was the
machinery behind the Infocom text adventures.

The others were David Beazley, George Janczuk, Peter Lisle and Russell Hoare. George put it
best when a historian asked him about it years later: it was "a form of mental calisthenics",
and "this was never meant to be a public exercise".

It did not stay private.

## What Infocom had

To explain why any of this was worth doing, I have to explain what Infocom were.

They began at MIT. A group from the Dynamic Modelling Group wrote a game called Zork in 1977,
in a language called MDL, on a DEC PDP-10 the size of a wardrobe. It was a cave, and a maze,
and a thief who wandered about stealing your things, and it understood English well enough
that talking to it felt like talking to something. Ten of them founded Infocom in June 1979
to sell it.

The problem was the PDP-10. Zork lived on a mainframe, and the people buying home computers
had an Apple II or a TRS-80 with a fraction of the memory. Worse, there were dozens of
incompatible models, and writing the game again for each one was hopeless.

So Joel Berez and Marc Blank designed a computer that did not exist. The Z-Machine was an
imaginary processor, specified precisely enough that a game written for it would behave
identically anywhere, and small enough to be reimplemented on each new micro in a few weeks.
The games were compiled once, for the imaginary machine. Only the interpreter had to be
ported.

It was a lovely piece of engineering, and well ahead of its time. To fit a hundred kilobytes
of game into a machine with far less memory, it paged parts of the story in and out from disk,
which appears to be the first use of virtual memory on a microcomputer. It could save and
restore the entire execution state efficiently, which most real computers of the day could
not. And it ran on as many as twenty-five otherwise incompatible machines at once.

That was Infocom's real advantage over everyone else, and they guarded it. The Z-Machine was
never documented publicly. It was a closed, proprietary format, and it was the reason they
could sell to the whole market while their competitors picked one machine and hoped.

## Taking it apart

By 1987 you could feel the ground moving. Infocom had been bought by Activision the year
before, and the hardware their games shipped on was ageing out from under them. The games
were wonderful and the disks they lived on were not going to last.

We started with an interpreter Infocom had written for Z80 machines running CP/M, and
disassembled it. This is exactly as tedious as it sounds. You get printouts of machine code
with no names, no comments and no structure, and you work out what each fragment must be for
by watching what it touches.

Most of us were doing that part. David did almost all of the actual coding, writing a fresh
interpreter in C, on a first-generation Apple Macintosh. On 25 May 1987 it compiled and ran.
As far as anyone has been able to establish since, it was the first portable Z-Machine
interpreter in history. Within a week it was also running on an MS-DOS machine and on a DEC
VAX, which was pleasing, because the VAX was the descendant of the PDP-10 that Zork had been
trying to escape in the first place.

The choice of C was the thing that mattered, though we did not think of it that way. We were
at a university, connected to the Internet at a time when almost nobody was, and steeped in a
culture where you shipped source code and expected other people to port it somewhere you had
never heard of. Writing it in portable C rather than assembly is the entire reason the story
continues past this point.

## It got out

The first version reached the wider world without our doing it. George gave a copy to a friend
at the university, and the friend put it on a server, and after that it was no longer ours.

There is a genuine disagreement in the record about when. George's account, given to Jimmy
Maher for his history of the period, has the accidental upload on 2 June 1987 and an official
version 1.0 following on 1 August that year. The Infocom Fact Sheet, compiled from archives
rather than memory, has an early version surfacing in March 1991, on a Sydney University FTP
server. Both may be true of different copies, and I would not want to adjudicate between a
participant's memory and an archivist's records at this distance.

What is not in dispute is the response. People wrote from everywhere, which astonished us,
because we had built it for ourselves. We kept adding to it in fits and starts as we finished
our degrees, reaching the larger Interactive Fiction Plus games in 1990 and the last of the
text-only version 5 games in 1992. That last push was prompted by someone else: Paul Smith had
taken our leaked early code and improved it into an interpreter called pinfocom, and seeing it
announced was what finally made us release ours properly.

Version 4.01 went out in September 1992, playing everything from Zork to Trinity to Beyond
Zork with one program. It opened, as the announcement did, with the traditional greeting:

```text
Hello, Sailors!
```

It also shipped with something more useful than the games: a set of debugging switches that
would dump a story file's object tree, its vocabulary, its header and its properties, and
watch attributes being tested as you played. That was not really a feature for players. It was
an X-ray machine for anyone who wanted to understand the format.

## Why it mattered

The interpreter itself was not the legacy. Ours was slower and buggier than what came after,
and by 1992 it was attracting a certain amount of scoffing for lagging behind the state of the
art. That is fair. It was student code, written across five years of spare evenings.

What mattered was that David's C source described the Z-Machine in a language people could
read. Anyone sufficiently motivated could now learn the format from source code rather than
from printouts of disassembled Z80. That is a completely different level of difficulty, and it
is the difference between a format that one group understands and a format the world
understands.

So the Z-Machine escaped into the public domain more or less as Infocom themselves were
collapsing. Mark Howell built a faster, cleaner interpreter called ZIP on the foundation, and
went deeper into the architecture than any of us had. By the mid-nineties Howell and Graham
Nelson had agreed a standard set of names for the opcodes, and in November 1995 the first
Z-Machine Standard was written down: a formal specification of a machine that no company had
ever documented and whose owner no longer existed.

Nelson, who did more than anyone to build what came next, put it in a way I have always
liked. "If I have hacked deeper than them, it is because I stand in their trenches."

## What became of it

The reason any of this is more than nostalgia is what people did with it once they had it.

Nelson wrote Inform, a compiler that let anyone write new games for the Z-Machine. Since 1993
it has produced vastly more story files than Infocom ever did; only about 130 of the original
Infocom ones survive. An entire amateur literature grew up in the nineties on a virtual
machine designed for a company that no longer traded, and kept going. New games were still
being released for the Z-Machine after 2010, and it is still in use as a legacy format today,
running on e-readers and phones and consoles and machines nobody had imagined in 1979.

Interactive fiction itself is quietly healthy. It has annual competitions, an archive that has
preserved almost everything, newer tools like Inform 7 and Twine that have brought in writers
who would never have called themselves programmers, and a standard that is still maintained.
It is not a mass-market form and has not been since Infocom, but it never went away, which for
a genre declared dead in 1989 is not a bad outcome.

I have kept a hand in, as it happens. A little while ago I
[ported Colossal Cave Adventure to TypeScript](/spotlite/article/adventure/), the game that
started all of this before Zork did, and rather more recently I put
[Rogue and its expert-system player in a browser](/spotlite/article/rogoweb/). Forty years on,
the instinct is the same one that got five of us disassembling a CP/M interpreter: these
things are worth keeping runnable.

## A footnote about who wrote what

I should be precise about my own part, because it is easy to let a story like this drift.
David Beazley wrote the interpreter. The rest of us worked out what the Z-Machine actually
did so that he could write it, which is why, when I say elsewhere that a
[program in eight languages](/spotlite/article/polyglot/) was probably the first code I ever
published, I still think that is right. The InfoTaskForce published a great deal earlier, and
the code in it was not mine.

Two of the names above turn up in that story as well. Peter Lisle and George Janczuk were both
part of the polyglot, which we posted from the same Sydney University machine, `extro`, that
the InfoTaskForce used for its bug reports. It was a small department, and it was a very good
few years.

`extro` is worth a footnote of its own, as it happens. The university gave me an account on it
by way of thanks for
[breaking into their password file](/spotlite/article/crypt-usenix91/#postscript-thirty-five-years-on),
which is not a sentence that would survive a modern security review.
