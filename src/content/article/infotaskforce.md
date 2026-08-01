---
title: 'The InfoTaskForce and the freeing of the Z-Machine'
description: In 1987 five of us at Sydney University took Infocom's virtual machine apart to see how it worked. We did not expect it to matter to anyone else.
pubDate: 1992-09-01
---

_Filed under the date we finally released the interpreter properly, although the story starts
five years earlier and what became of it carries on long after._

In early 1987 five of us, all undergraduates at the University of Sydney, started reverse engineering Infocom games to see how they worked. We were all lovers of the games, but we were frustrated that we all individual owned different versions sold for different computer platforms (such as Apple II, TRS-80, Commodore 64, etc.) We knew that the games were all interpreted, so we wanted to write a universal interpreter that could play all the games on all platforms.

We called ourselves the InfoTaskForce,
which was a very grand name for what was really a hobby, and the thing we were pulling apart
was the machinery behind the Infocom text adventures.

The others were David Beazley, George Janczuk, Peter Lisle and Russell Hoare. George put it
best when a historian asked him about it years later: it was "a form of mental calisthenics",
and "this was never meant to be a public exercise".

It did not stay private.

## What Infocom had

None of what follows was written down anywhere we could get at it, which is the whole reason
there was anything for us to do.

Infocom began at MIT. The Dynamic Modeling Group wrote a game called Zork in 1977, in a
language called MDL (a dialect of Lisp), on a DEC PDP-10 the size of a wardrobe. It had a cave,
a maze and a thief who wandered about stealing your things, and its parser took whole English
sentences at a time when most games wanted a verb and a noun. Ten of them founded Infocom in
June 1979 to sell it.

But the problem was the PDP-10. Zork lived on a mainframe, and the people buying home computers
had an Apple II or a TRS-80, machines with tens of kilobytes to play with. Worse, there were
dozens of incompatible models, and writing the game again for each one was hopeless.

So Joel Berez and Marc Blank designed a computer that did not exist. The Z-Machine was an
imaginary processor, specified precisely enough that a game written for it would behave
identically anywhere, and small enough to be reimplemented on each new micro in a few weeks.
The games were compiled once, for the imaginary machine. Only the interpreter had to be
ported.

To fit a hundred kilobytes of game into a machine with far less memory, it paged parts of the
story in and out from disk, which appears to be the first use of virtual memory on a
microcomputer. It could save and restore the entire execution state efficiently, which most
real computers of the day could not. And it ran on as many as twenty-five otherwise
incompatible machines at once. It is a lovely piece of engineering.

Infocom guarded it. They never documented the Z-Machine publicly, and the closed format was the
reason they could sell to the whole market while their competitors picked one machine and
hoped. It also meant that in 1987 there was nothing for us to read.

## Taking it apart

Infocom had been bought by Activision the year before. That had nothing to do with us. We were
not preserving anything. We wanted to know how the trick was done.

We started with an interpreter Infocom had written for Z80 machines running CP/M (the operating
system almost every eight-bit business micro ran before MS-DOS took the market), and
disassembled it. This is exactly as tedious as it sounds. Most of us were on that part. We had
printouts of machine code with no names, no comments and no structure, and we worked out what
each fragment must be for by watching what it touched.

David did almost all of the actual coding, writing a fresh interpreter in C, on a
first-generation Apple Macintosh. On 25 May 1987 it compiled and ran. As far as anyone has been
able to establish since, it was the first portable Z-Machine interpreter in history. Within a
week it was also running on an MS-DOS machine, which was my part, and on a DEC VAX, which was
pleasing, because the whole point of the Z-Machine had been to get Zork off a DEC machine in
the first place.

That port is how the `itf-exe` package in the Interactive Fiction Archive came about. But the
source was David's and not mine, which is why, when I say elsewhere that a
[program in eight languages](/spotlite/article/polyglot/) was probably the first code I ever
published, I still think that is about right. Peter Lisle and George Janczuk turn up in that
story too. It was a small circle.

None of us thought at the time that C was the decision that mattered. There was no Internet in
Australia then. There was ACSnet (the Australian Computer
Science network, a store-and-forward system linked to ARPANET and the UUCP network in the
United States), and a university culture in which you shipped source and expected somebody in a
country you had never visited to port it. Portable C rather than Z80 assembly is why anyone
outside the five of us ever ran the thing.

## It got out

The first version reached the wider world without our doing it. George gave a copy to a friend
at the university, and the friend put it on a server, and after that it was no longer ours.

The published record is a little muddled about when. George's account, given to
[Jimmy Maher](https://www.filfre.net/2019/10/new-tricks-for-an-old-z-machine-part-1-digging-the-trenches/) for his history of the period, has the accidental upload on 2 June 1987 and an official version
1.0 following on 1 August that year. The [Infocom Fact Sheet](http://pdd.if-legends.org/infocom/fact-sheet.txt) instead has an early
version
surfacing on a Sydney University FTP server in March 1991, and that date has been repeated
since as though it were the release.

George is right, and it is worth saying so plainly. The code went out in 1987. What happened in
1991 was that a copy turned up on an archive server, four years after the fact, which is the
point at which it became visible to anyone who went looking for it. In 1987 there was no
Internet in this country for it to be visible on. So the archivists were recording when they
first saw the thing, not when it left our hands.

What is not in dispute is the response. People wrote from everywhere, which astonished us,
because we had built it for ourselves. We kept adding to it in fits and starts as we finished
our degrees, reaching the larger Interactive Fiction Plus games in 1990 and the last of the
text-only Z-Machine version 5 story files in 1992. That last push was prompted by someone else: Paul
Smith had taken our leaked early code and improved it into an interpreter called pinfocom, and
seeing it announced was what finally made us release ours properly.

Version 4.01 of the interpreter went out in September 1992, playing everything from Zork to
Trinity to Beyond Zork with one program. It opened, as the announcement did, with the
greeting:

```text
Hello, Sailors!
```

The announcement gave an address for bug reports on `extro`, the University of Sydney machine
that reached the world outside itself. The university had given me an account on it after I
broke into their password file, on condition that I never did it again, which is
[a story of its own](/spotlite/article/crypt-usenix91/#postscript-thirty-five-years-on).

Version 4.01 also shipped with a set of debugging switches that would dump a story file's
object tree, its vocabulary, its header and its properties, and watch attributes being tested
as you played. None of that helps you play Zork. It is what you want if you are trying to work
out how a story file is put together, which by then was a subject we knew a good deal about.

## What David's source did

Ours was not the interpreter anyone remembers. It was slower and buggier than what came after,
and by 1992 it was attracting a certain amount of scoffing for lagging behind the state of the
art. That is fair. It was student code, written across five years of spare evenings.

What David's C source did was describe the Z-Machine in a language people could read. Anyone
sufficiently motivated could now learn the format from source code rather than from printouts
of disassembled Z80. We had done it the other way.

So the Z-Machine became public knowledge more or less as Infocom themselves were
collapsing. Mark Howell built a faster, cleaner interpreter called ZIP on the foundation, and
went deeper into the architecture than any of us had. By the mid-nineties Howell and Graham
Nelson had agreed a standard set of names for the opcodes, and in November 1995 the first
[Z-Machine Standard](https://zspec.jaredreisinger.com/001-preface) was written down: a formal specification of a machine that no
company had
ever documented and whose owner no longer existed.

## What became of it

Nelson did more than anyone to build what came next, and he put it in a way I have always
liked. "If I have hacked deeper than them, it is because I stand in their trenches."

He also wrote Inform, a compiler that let anyone write new games for the Z-Machine. Since 1993
people have written far more story files with it than Infocom ever published, and only about
130 Infocom story files survive in all. An amateur literature grew up around it in the
nineties, on a machine whose owner had gone out of business, and it never stopped. People were
still releasing new games for the Z-Machine after 2010, and interpreters for it still run on
e-readers, phones and consoles.

I have kept a hand in, after a fashion. A little while ago I
[ported Colossal Cave Adventure to TypeScript](/spotlite/article/adventure/), the game that started
all of this before Zork did, and the next day I put
[Rogue and its expert-system player in a browser](/spotlite/article/rogoweb/). Each of them cost me a
few prompts over breakfast. I do not write code any more and the AI does it for me. So I am not
going to dress that up as the same achievement as five years of spare evenings spent reading
undocumented Z80.

These things are worth keeping runnable.

## Sources

- Jimmy Maher,
  [New Tricks for an Old Z-Machine, Part 1: Digging the Trenches](https://www.filfre.net/2019/10/new-tricks-for-an-old-z-machine-part-1-digging-the-trenches/), The Digital
  Antiquarian, October 2019, which is where George Janczuk's account of the group comes from.
- Paul David Doherty, [the Infocom Fact Sheet](http://pdd.if-legends.org/infocom/fact-sheet.txt), the archivists' record of the
  interpreters, the games and the company.
- [The InfoTaskForce interpreter and its release announcement](https://www.ifarchive.org/if-archive/infocom/interpreters/old/itf/README), in the Interactive
  Fiction Archive. The announcement opens "Hello, Sailors! InfoTaskForce is pleased to announce
  the release of version 4.01 of its popular Infocom datafile interpreter." The plural is theirs,
  against Zork's singular.
- [The Z-Machine Standards Document](https://zspec.jaredreisinger.com/001-preface), for what became of the format afterwards.
