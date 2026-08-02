---
title: 'Reverse engineering Infocom games - the first open source Z-Machine interpreter'
description: In 1987 five of us at Sydney University took Infocom's virtual machine apart to see how it worked. We did not expect it to matter to anyone else.
pubDate: 1992-09-01
---

_Filed under the date we finally released the interpreter properly, although the story starts five years earlier and what became of it carries on long after._

Who still remembers Infocom? Zork?

Infocom adventures (nowadays the cognoscenti refer to them as "interactive fiction") were enormously popular in the 1980s and the games were sold not only in computer stores but in record stores and sometimes even in supermarkets. They were available on the major home computer platforms of the day: Apple \]\[, TRS-80, Commodore 64 and even the Microbee (an Australian-made microcomputer).

Any computer science student at that time would have realised that these games were multi-platform because they were interpreted. They all were based on a common object format, and a platform-specific interpreter was able to parse the "opcodes" and play the game.

A group of us decided we wanted to play all the games, on every computer we owned, all the time. So we decided to pool our resources and reverse engineer the Infocom interpreter and write our own - a platform-agnostic interpreter that would run on UNIX and MS-DOS - two emerging popular operating systems of the day.

We called ourselves the InfoTaskForce - David Beazley, George Janczuk, Russell Hoare, Peter Lisle and myself. We were all students at the University of Sydney at the time, and we were all avid fans of the games. More importantly, we all understood Z80 machine language.

So we undertook to reverse engineer the CP/M version of the Infocom interpreter and reconstructed how it works. Then we wrote a portable C version of the interpreter. I remember David did most of the rewrite; I was responsible for porting the code to MS-DOS using the Microsoft C Compiler (I had purchased an IBM XT clone to write my honours thesis). I also ensured the code was portable to multiple UNIX flavours and machines (I was also working part time as a UNIX systems administrator and had access to different UNIX systems).

Little did we know the place we would have in the annals of interactive fiction history. By being one of the first to reverse engineer the Infocom interpreter, we created a specification that others followed. Today, almost all Infocom interpreters (and there are many) can trace their roots back to the effort we made as students in our spare time in the 1980s.

George put it best when a historian asked him about it years later: it was "a form of mental calisthenics", and "this was never meant to be a public exercise".

It did not stay private. It became open source.

## The history of Infocom

None of what follows was written down anywhere we could get at it, which is the whole reason there was anything for us to do.

Infocom began at MIT. The Dynamic Modeling Group wrote a game called Zork in 1977, in a language called MDL (a dialect of Lisp), on a DEC PDP-10 minicomputer the size of a wardrobe. It had a cave, a maze and a thief who wandered about stealing your things, and its parser took whole English sentences at a time when most games wanted a verb and a noun. Ten of them founded Infocom in June 1979 to sell it.

But the problem was the size of the game. Zork lived on a minicomputer, and the people buying home computers had machines with tens of kilobytes to play with. Worse, there were many different models using multiple microprocessor architectures, and writing the game fresh for each one was hopeless.

So Joel Berez and Marc Blank designed a virtual machine. The Z-Machine was an idealised computer, powerful enough to run Infocom games, but small enough to enable an interpreter to be reimplemented on each home computer platform, and the game would behave identically everywhere. The games were compiled once, for the virtual machine. Only the interpreter had to be rewritten.

To fit hundreds of kilobytes of game (especially for the later Infocom games) into a machine with far less memory, it paged parts of the story in and out from disk, which appears to be the first use of virtual memory on a microcomputer. It could save and restore the entire execution state efficiently, which most real computers of the day could not. And it ran on as many as twenty-five otherwise incompatible machines at once. It is a lovely piece of engineering.

Infocom never documented the Z-Machine publicly. It was a way of ensuring their games could not be used on multiple platforms - each specific game sold could only work on one computer platform. Infocom itself was bought by Activision, and today some of the assets are thankfully open-sourced by the current owner, Microsoft.

## Reverse Engineering

We started with an interpreter Infocom had written for Z80 machines running CP/M (the operating system almost every eight-bit business microcomputer ran before MS-DOS took the market), and reverse engineered it. This is exactly as tedious as it sounds. It involved disassembling Z80 machine code with no names, no comments and no structure, and we worked out what each fragment must be for by analysing how it affected playing the game.

David did almost all of the actual coding, writing a fresh interpreter in C, on a first-generation Apple Macintosh. On 25 May 1987 it compiled and ran. As far as anyone has been able to establish since, it was the first portable Z-Machine interpreter. My task was to port it to UNIX and MS-DOS. I compiled it with Microsoft C on the IBM XT clone I had bought to write my honours thesis on. I was also the one keeping the C portable: I was working part time as a UNIX systems administrator, so I had access to several different UNIX systems, and ensured the code compiled cleanly on each of them. We ensured it ran not only on the university's DEC VAX 11/780, but also on an early HP 9000 minicomputer (and later on the Pyramid when I was working at State Bank Victoria).

That port is how the `itf-exe` package in the Interactive Fiction Archive came about.

## It got out

The first version reached the wider world without our doing it. George gave a copy to a friend at the university, and the friend put it on a server, and after that it was no longer ours.

The published record is a little muddled about when. George's account, given to [Jimmy Maher](https://www.filfre.net/2019/10/new-tricks-for-an-old-z-machine-part-1-digging-the-trenches/) for his history of the period, has the accidental upload on 2 June 1987 and an official version 1.0 following on 1 August that year. The [Infocom Fact Sheet](http://pdd.if-legends.org/infocom/fact-sheet.txt) instead has an early version surfacing on a Sydney University FTP server in March 1991 (this was probably done by me, at George's request), and that date has been repeated since as though it were the release.

We kept adding to it in fits and starts, reaching the larger Interactive Fiction Plus games in 1990. In 1991 the code was finally enshrined in the Infocom Archive FTP Server, and entered the annals of history. The last of the text-only Z-Machine version 5 story files came in 1992. That last push was prompted by someone else: Paul Smith had taken our leaked early code and improved it into an interpreter called pinfocom.

Version 4.01 of the interpreter went out in September 1992, playing everything from Zork to Trinity to Beyond Zork with one program. It opened, as the announcement did, with the greeting:

```text
Hello, Sailors!
```

Version 4.01 also shipped with a set of debugging switches that would dump a story file's object tree, its vocabulary, its header and its properties, and watch attributes being tested as you played. None of that helps you play Zork. It is what you want if you are trying to work out how a story file is put together, which by then was a subject we knew a good deal about.

## What David's source did

Our interpreter was not the best: it was slower and buggier than what came after, and by 1992 it was lagging behind the state of the art. It was student code, written across five years.

What David's C source did was describe the Z-Machine in a language people could read. Anyone sufficiently motivated could now learn the format from source code rather than from the binary executable.

So the Z-Machine became public knowledge more or less as Infocom themselves were collapsing. Mark Howell built a faster, cleaner interpreter called ZIP on the foundation, and went deeper into the architecture than any of us had. By the mid-nineties Howell and Graham Nelson had agreed a standard set of names for the opcodes, and in November 1995 the first [Z-Machine Standard](https://zspec.jaredreisinger.com/001-preface) was written down: a formal specification of a machine that no company had ever documented and whose owner no longer existed.

## What became of it

Nelson did more than anyone to build what came next, and he put it in a way I have always liked. "If I have hacked deeper than them, it is because I stand in their trenches."

He also wrote Inform, a compiler that let anyone write new games for the Z-Machine. Since 1993 people have written far more story files with it than Infocom ever published, and only about 130 Infocom story files survive in all. New games were still arriving after 2010.

## Postscript

Lately we have come full circle. A little while ago I [ported Colossal Cave Adventure to TypeScript](/spotlite/article/adventure/), the game that started all of this before Zork did. Both David and George commented on LinkedIn that this was cool.

I did it because I wanted to respect the original text adventure game that Zork was inspired by. At the time the Infocom games came out, Colossal Cave was too large to fit on a home computer; from anecdotal sources it consumed almost all the user memory on a PDP-10 minicomputer. So it is pleasing to note the entire game runs fine on a modern computer browser, complete with an interactive map and location images.

## Sources

- Jimmy Maher, [New Tricks for an Old Z-Machine, Part 1: Digging the Trenches](https://www.filfre.net/2019/10/new-tricks-for-an-old-z-machine-part-1-digging-the-trenches/), The Digital Antiquarian, October 2019, which is where George Janczuk's account of the group comes from.
- Paul David Doherty, [the Infocom Fact Sheet](http://pdd.if-legends.org/infocom/fact-sheet.txt), the archivists' record of the interpreters, the games and the company.
- [The InfoTaskForce interpreter and its release announcement](https://www.ifarchive.org/if-archive/infocom/interpreters/old/itf/README), in the Interactive Fiction Archive. The announcement opens "Hello, Sailors! InfoTaskForce is pleased to announce the release of version 4.01 of its popular Infocom datafile interpreter." The plural is theirs, against Zork's singular.
- [The Z-Machine Standards Document](https://zspec.jaredreisinger.com/001-preface), for what became of the format afterwards.
