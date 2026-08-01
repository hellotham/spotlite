---
title: 'Hello Calc: a homage to every HP calculator'
description: I have rebuilt thirty-five HP calculators, from the 1972 HP-35 to the HP Prime, as a single web app. Not an emulator, but a reimplementation in TypeScript.
pubDate: 2026-07-20
---

Writing about [the HP 48 and the two programs I wrote for it](/spotlite/article/hp48/) sent me back
through things I had not looked at in thirty years, and left me wanting to do something rather more
ambitious.

[Hello Calc](https://christham.net/hellocalc/) covers thirty-five Hewlett-Packard calculators, from
the HP-35 that retired the slide rule in 1972 through to the HP Prime, and it runs in your browser
for nothing.

## The calculators of my life

The first program I ever wrote was on my father's HP-67, when I was twelve years old. It read its
programs off little magnetic cards, so you would key your program in, run the card through the
slot, and carry your work around in your pocket as a strip of brown tape.

After that the machines rather followed me around. When I took a casual job at Bain & Company in
1986, in my third year at university, they issued me with an HP-12C, the small brown financial
calculator that still, more than forty years after it was introduced, refuses to die. When I moved
to State Bank Victoria in 1990 I was given an HP-19B. In between and afterwards I bought my own,
and I still have them: an HP 48SX, then an HP 48GX, later an HP 35s, and eventually an HP Prime.

Between 1995 and 1998 I went to work for Hewlett-Packard itself, as an architecture consultant. I
was nowhere near the calculator division, and nobody there was much interested in my views on the
48GX, but I did enjoy the badge.

## Not an emulator

An emulator takes the original ROM off the physical machine and runs it on a software model of the
original processor, so what you are using is 1972's code, faithfully preserved, driven by a
simulation of 1972's chip. That is the more faithful of the two approaches. It is not the one I
took.

I wrote every function again from scratch in TypeScript, working from the published behaviour in
the owner's manuals, and put all thirty-five models on one shared modern engine. None of the
original code is in there. The HP-15C's solver, the HP-48's RPL object stack and the HP-12C's bond
pricing are new implementations that happen to behave the way the originals did.

What that costs me is the last few per cent of edge-case fidelity, the sort of thing where a real
machine has a documented quirk in the seventh decimal place. What I get for it:

- The arithmetic is exact where it matters, because the engine sits on a decimal number tower
  rather than binary floating point. Adding 0.1 to 0.2 gives exactly 0.3, which is more than the
  original hardware could always promise.
- You can switch models without losing your work. The stack and the memory follow you across.
- Everything is one app, so the financial functions from the Voyagers and the symbolic algebra from
  the RPL machines are available to the same expression.
- The faceplate comes off altogether if you want it to. Native mode hands you the engine on its
  own, as a typed expression evaluator with a history, variables and a library of saved
  expressions.

## What is actually in it

Thirty-five faceplates, in families: the Classic and Woodstock machines, the programmable HP-67 and
HP-97, the HP-41 series, the Voyagers, the Pioneer scientifics and financials, the RPL clamshells
and graphers, and the modern HP-35s and Prime.

Behind them sits everything those machines could collectively do: the fixed four-level RPN stack
with `LAST X`, keystroke programmability, statistics, complex numbers, matrices, numerical solving
and integration, the HP-16C's integer and bitwise world, and the whole RPL side with its dynamic
object stack, directories, units and softkey menus. Symbolic algebra comes in two tiers, a light
one that loads instantly and a heavy one built on Python and SymPy compiled to WebAssembly, which
is only fetched if you ask for something hard. That tier is the only part that wants the network.
Everything else installs as an app and runs offline.

The financial engine is the one part I did not have to learn out of a manual. Time value of money,
internal rate of return and bond pricing are what the HP-12C was issued to me for at Bain in 1986,
and the HP-19B at State Bank Victoria in 1990, and by the end of 1991 I had
[written bond pricing for the HP 48](/spotlite/article/hp48/) myself. I knew what those answers were
supposed to look like before I wrote a line of it.

Some details I enjoyed more than I should have. I derived each keyboard's proportions from the real
machine's key grid, so the Voyagers sit landscape and the HP-35 sits portrait and nothing is
stretched to fit. The classic models get a seven-segment display like the real hardware, the RPL
machines get a fine dot-matrix one in the proportions of the actual HP-48 screen, and the Prime is
treated as what it is, a colour touchscreen, rendered with real fonts rather than pretend pixels.
The slide switches work. History prints to a paper tape.

When you arm a shift key, every key on the board changes its face to show what it will now do. The
physical machines could never do that, and I would have loved it as a twelve-year-old.

## The reference data

I decided early that the reference data was not documentation but input, and that is what made the
whole thing tractable.

A directory in the repository holds the keyboard layout of every model, the function catalogue of
every model, a unified table mapping every key and shift combination to an engine operation, and
the scanned owner's manuals I used to check behaviour. The app reads those files directly. Adding a
model is mostly a matter of getting its reference data right, because the faceplate and the key
dispatch are generated from it rather than written by hand.

## How it was built

I built it with Claude Code between February and July of this year, 118 commits, most of them
co-authored with Claude Opus 4.8 and the rest with Fable 5.

Rather than build the engine first and the calculators afterwards, I put every faceplate on screen
at the start with all its keys inert, then worked through the models in the order Hewlett-Packard
released them. That took 23 phases. Each phase took the next machine in history, implemented
whatever the engine still lacked to support it, and wired it through the keys that were already
sitting there. The finish line was easy to check: no inert keys on that model. A test for each
machine confirms every key does something.

That gave the work a natural order, because the history of these calculators is itself a sensible
curriculum. The HP-35 needs the stack and the transcendental functions. The HP-65 needs
programmability. The HP-12C needs the financial engine. The HP-28 needs RPL and units and the
beginnings of symbolic algebra.

Every session reads a file of build rules before it touches anything, and nothing counts as
finished until lint, tests and a clean build pass. An end-to-end suite checks that each keyboard
renders within 2 per cent of its correct aspect ratio across a matrix of device sizes, which sounds
fussy until you have seen an HP-41 squashed into a phone screen.

A few things are short of complete, and the README says so. I inferred the HP-32SII's newer key
positions, because its manual ships without a keyboard diagram.
Some leaf functions in the menu-driven financial machines are navigable but not yet wired. The
HP-12C Platinum borrows the HP-12C's keyboard, on the grounds that its differences are mostly not
on the keyboard at all.

## Have a play

It is free and open source under the MIT licence, so you can
[try it](https://christham.net/hellocalc/) or read
[how it is put together](https://github.com/ChristineTham/hellocalc).

Every one of these machines was a sealed thing. My father's HP-67 had no way of handing anything to
the HP-12C, the 12C had none to the 19B, and none of them had any to the 48. They shared a maker
and a way of thinking about a stack, and nothing else. Now a number I leave on the stack of the
HP-15C is still sitting there when I switch to the HP-48, because underneath there is nothing but
the one engine.

They were never quite thirty-five calculators. Underneath, they were one.

## Sources

- [Hello Calc](https://github.com/ChristineTham/hellocalc), the source, which also holds the
  `hp/` reference directory: every model's keyboard layout, function catalogue and the
  owner's manuals used to verify behaviour.
- [HP-35](https://en.wikipedia.org/wiki/HP-35) and
  [HP 48 series](https://en.wikipedia.org/wiki/HP_48_series), Wikipedia, for model dates and
  hardware details.
