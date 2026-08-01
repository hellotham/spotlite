---
title: 'Rogoweb: Rogue and Rog-O-Matic, alive in the browser'
description: The 1980 game Rogue and the expert system built to play it, both compiled to WebAssembly and running side by side in a browser tab. The original C, not a rewrite.
pubDate: 2026-07-05
---

I was halfway through my degree at the University of Sydney when Rogue appeared on the Unix
machines in the Basser Department of Computer Science. It was an immediate hit with the
students, and the university banned it from being played during the day. So we played after
hours instead, at sessions we called Rogue parties. I was never much good at it compared with
the others.

Then we got hold of Rog-O-Matic, a program that played Rogue for you. Naturally we all started
running it, and it ate so much processor time that the university banned it outright. We used to
say we wished we had Unix computers of our own, so that we could play Rogue and Rog-O-Matic all
day long.

Forty years later, here they both are, running in a browser tab.

![Rogoweb running Rog-O-Matic in the browser: the VT100 terminal beside the live telemetry panel](../../assets/rogoweb.png)

## The game, and the program that played it

Rogue is the 1980 dungeon crawler by Michael Toy, Glenn Wichman and Ken Arnold, and it is the
game the roguelike genre is named after. The dungeon is drawn in punctuation. Rooms are dashes
and pipes, corridors are rows of hashes, monsters are letters, and you are the `@`. There are
twenty-six levels down to the Amulet of Yendor, the whole thing is generated fresh every game,
and the monsters get nastier faster than you get better, which is why hardly anybody ever sees
the Amulet.

Rog-O-Matic was begun at Carnegie Mellon in October 1981 by Michael Mauldin, Guy Jacobson,
Andrew Appel and Leonard Hamey, as what they called a simple project, and it grew into 12,000
lines of C against Rogue's 8,900. But it never saw inside the game at all. It watched the
characters Rogue drew on the terminal, rebuilt the dungeon from them and typed keystrokes back,
with its rules grouped into about a dozen "experts" in a fixed order of priority, so that the
melee expert's decision to fight always overrode the object expert's call to pick something up.

It beat the humans. Between January and February 1983 it played 106 games of Rogue 5.2 at
Carnegie Mellon, and against the fifteen best human players there it came out with the highest
median score of the lot. Its best game scored 7,730, and in that one it found the Amulet and was
killed carrying it back up to the surface.

It ran on a VAX 11/780, the same model of machine the Basser Department had hundreds of us
sharing, which managed about a million instructions a second and was hundreds of times slower
than the least capable Raspberry Pi. The paper puts Rog-O-Matic's cost at about thirty seconds
of processor time for every dungeon level, with Rogue adding another fifteen for its side of the
simulation, and that is one player on a machine of its own. Multiply it by every student who has
just discovered the thing, and our ban explains itself.

## Not a reimplementation

On Unix, `rogue` and `rogomatic` ran as two separate processes, with `rogomatic` launching
`rogue` and talking to it through the standard input and output pipes. A browser has none of
that machinery. There are no processes, no `fork`, and no pipes.

When I [rebuilt every HP calculator](/spotlite/article/hellocalc/) I wrote every function again from
scratch. Nothing of the sort has happened here. Both programs were compiled to WebAssembly with
Emscripten and given a port of curses to talk to, `emcurses`, which is a port of `pdcurses`,
which is itself a reimplementation of the original curses library. What changed is the plumbing
underneath them.

In place of the Unix pipe there is a ring buffer living in a `SharedArrayBuffer`, which is
simply a fixed block of memory that two background workers can read and write in turn. The game
runs in one worker, the bot runs in the other, and they talk to each other exactly as they
always did, without either of them realising anything has changed.

The telemetry comes out the other way about. Rog-O-Matic plays by scraping characters off the
terminal, which was the only way to watch a game it was not allowed to modify. The dashboard is
under no such restriction, so rather than scrape the screen for numbers that are slow and
error-prone to recover, the C code writes its internal state straight into a corner of that
shared memory and the dashboard reads it from there.

## How it was built

It took five days. I have written about the method at length in
[chapter three of my book](https://christham.net/aidou/software.html), but the whole of my brief
here was one sentence: port `rogue` and `rogomatic` to run in the browser. To that I attached one
constraint, that the original C should keep working, and one check, that the bot could still
play a game through to the end. Everything above, the two workers and the ring buffer and the
shared memory, came back as the answer to those three lines. I would never have thought of any
of it.

It passed the check. It kept the constraint too, right up until I decided to break it.

Shared array buffers brought race conditions with them, and the symptom was always the same. The
game simply stopped, with one worker sitting waiting on the other for no reason I could see. Now
and then I could point the agent at one. Mostly it found them itself, once I had asked it to go
looking.

The one thing I did not delegate was the look. It is a VT100, in the putty-coloured case DEC
actually shipped, with the `digital` badge still in the corner.

## Teaching the bot to be better

Once the port worked, I got greedy and asked the agent to improve the bot itself. This is the
point at which the original code stopped being original, and it was on purpose.

Rog-O-Matic learns. It keeps a genetic pool of strategy weights and a long-term memory of how
dangerous each monster has proven to be, and it evolves both across games, saving the results in
your browser. A fresh install therefore plays badly and gets better the more it plays.

To hand new players a bot that is already competent, the agent built an offline pretrainer and
spread it across every CPU core, running separate populations that evolve in isolation and then
merge under a rule that never lets the result come out worse. That trained about ten times
faster than evolving one population on one core.

Then it went into the Rog-O-Matic source itself and retuned a set of judgements the original had
left mis-set: when the bot heals, when it runs away, when it eats, and how much danger it
credits each monster with, which is the one that stops it cheerfully under-rating a dragon. All
of them had been sitting in that source since the eighties.

Because Rogue is a game of chance, none of this could be judged on a single run. Each change had
to hold up on win rate and average depth across a batch of games, so the agent spent most of its
time playing Rogue a few hundred times over to find out whether it had improved a bot from the
eighties.

What came out of it plays rather better than I ever did, which I admit was never a demanding
test.

## Have a go

[Play it here.](https://christham.net/rogoweb/) The source is on
[GitHub](https://github.com/ChristineTham/rogoweb).

We wanted Unix machines of our own so that nobody could stop us playing. What we have instead is
a browser that will fake enough of Unix to run both programs at once.

Nobody is going to ban it this time.

## Sources

- [rogoweb](https://github.com/ChristineTham/rogoweb), the source, which carries the merged
  Rogue 5.4 and Rog-O-Matic XIV codebases and the notes on the port.
- Michael Mauldin, Guy Jacobson, Andrew Appel and Leonard Hamey,
  [Rog-O-Matic: A Belligerent Expert System](https://kilthub.cmu.edu/articles/journal_contribution/Rog-O-Matic_a_belligerent_expert_system/6609137/1), Carnegie Mellon University
  technical report CMU-CS-83-144, 1983, for the architecture, the 106 games, the running cost
  and the Amulet.
- [Rogue](<https://en.wikipedia.org/wiki/Rogue_(video_game)>), Wikipedia, for the game's origins and its authors.
- [Chapter 3 of AI-dō](https://christham.net/aidou/software.html), which describes how the
  port was built and what went wrong along the way.
