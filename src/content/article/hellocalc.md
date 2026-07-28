---
title: 'Hello Calc: a homage to every HP calculator'
description: I have rebuilt thirty-five HP calculators, from the 1972 HP-35 to the HP Prime, as a single web app. Not an emulator, but a reimplementation in TypeScript.
pubDate: 2026-07-20
---

A little while ago I wrote about [the HP 48 and the two programs I wrote for it](/spotlite/article/hp48/),
which was a happy piece to put together because it let me go back through things I had not
looked at in thirty years. It also left me wanting to do something rather more ambitious, and
this is what came of it.

[Hello Calc](https://christham.net/hellocalc/) is a homage to Hewlett-Packard calculators,
past and present. It covers thirty-five models, from the HP-35 that started it all in 1972
through to the HP Prime, and it runs in your browser for nothing.

## The calculators of my life

I should explain why a person would do this.

The first program I ever wrote was on my father's HP-67 when I was twelve years old. It was a
machine that read its programs off little magnetic cards, so you would key your program in,
run the card through the slot, and carry your work around in your pocket as a strip of brown
tape. I was completely captivated by it, and I think everything I have done since started
there.

After that the machines rather followed me around. When I began my first proper job at Bain &
Company in 1986 they issued me with an HP-12C, which is the small brown financial calculator
that still, more than forty years after it was introduced, refuses to die. When I moved to
State Bank Victoria in 1990 I was given an HP-19B. In between and afterwards I bought my own,
and I still have them: an HP 48SX, then an HP 48GX, later an HP 35s, and eventually an HP
Prime.

There is a footnote to all this that still amuses me, which is that between 1995 and 1998 I
went to work for Hewlett-Packard itself, as an architecture consultant. I was nowhere near
the calculator division, and nobody there was much interested in my views on the 48GX, but I
did enjoy the badge.

## Not an emulator

Here is the part I want to be precise about, because it is the whole point of the project.

Hello Calc is not an emulator. An emulator takes the original ROM from the physical machine
and runs it on a software model of the original processor, so what you are really using is
1972's code, faithfully preserved, driven by a simulation of 1972's chip. That approach is a
wonderful thing and several people have done it beautifully.

This is the other approach. Every function has been reimplemented from scratch in TypeScript,
working from the published behaviour in the owner's manuals, and every model runs on one
shared modern engine. Nothing of the original code is in there. The HP-15C's solver and the
HP-48's RPL object stack and the HP-12C's bond pricing are all new implementations that
happen to behave the way the originals did.

That choice costs something and buys something. What it costs is the last few percent of
obscure edge-case fidelity, the sort of thing where a real machine has a documented quirk in
the seventh decimal place. What it buys is rather a lot:

- The arithmetic is exact where it matters, because the engine sits on a decimal number tower
  rather than binary floating point. Nought point one plus nought point two is exactly nought
  point three, which is more than the original hardware could always promise.
- You can switch models and keep your work. Move from the HP-15C to the HP-48 and your stack
  and memory come with you, because underneath they are the same engine.
- You can use a real keyboard, a mouse and a large screen, instead of hunting for tiny virtual
  keys with your thumb.
- Everything is one app, so the financial functions from the Voyagers and the symbolic algebra
  from the RPL machines are all available to the same expression.

There is also a native mode, which throws the faceplate away entirely and gives you the whole
engine as a typed expression evaluator, with a history, variables and a library of saved
expressions.

## What is actually in it

Thirty-five faceplates, in families: the Classic and Woodstock machines, the programmable
HP-67 and HP-97, the HP-41 series, the Voyagers, the Pioneer scientifics and financials, the
RPL clamshells and graphers, and the modern HP-35s and Prime.

Behind them sits everything those machines could collectively do. The fixed four-level RPN
stack with `LAST X`, keystroke programmability, statistics, the financial engine with time
value of money and internal rate of return and bond pricing, complex numbers, matrices,
numerical solving and integration, the HP-16C's integer and bitwise world, and then the whole
RPL side with its dynamic object stack, directories, units and softkey menus. Symbolic algebra
comes in two tiers, a light one that loads instantly and a heavy one built on Python and SymPy
compiled to WebAssembly, which is only fetched if you ask for something hard.

Some details I enjoyed more than I should have. Each keyboard's proportions are derived from
the real machine's key grid, so the Voyagers sit landscape and the HP-35 sits portrait and
nothing is stretched to fit. The classic models get a seven-segment display like the real
hardware, the RPL machines get a fine dot-matrix one in the proportions of the actual HP-48
screen, and the Prime is treated as what it is, a colour touchscreen, rendered with real fonts
rather than pretend pixels. The slide switches work. History prints to a paper tape.

When you arm a shift key, every key on the board changes its face to show what it will now do,
which is a thing the physical machines could never do and which I would have loved as a
twelve-year-old.

## The reference material is part of the product

The thing that made it tractable was deciding early that the reference data was not
documentation but input.

There is a directory in the repository holding the keyboard layout of every model, the
function catalogue of every model, a unified table mapping every key and shift combination to
an engine operation, and the scanned owner's manuals used to verify behaviour. The app reads
those files directly. Adding a model is mostly a matter of getting its reference data right,
because the faceplate and the key dispatch are generated from it rather than hand-written.

## How it was built

I built it with Claude Code between February and July of this year, which came to about a
hundred and twenty commits, most of them co-authored with Claude Opus 4.8 and the rest with
Fable 5.

The structure is what made it work. Rather than building the engine and then the calculators,
I put every faceplate on screen from the start and then worked through the models in the order
Hewlett-Packard released them, twenty-three phases of it. Each phase took the next machine in
history, implemented whatever the engine still lacked to support it, and wired it through the
keys that were already sitting there. The finish line for each phase was simple and easy to
check: no inert keys on that model. A test for each machine confirms every key does something.

That gave the work a natural order, because the history of these calculators is itself a
sensible curriculum. The HP-35 needs the stack and the transcendental functions. The HP-65
needs programmability. The HP-12C needs the financial engine. The HP-28 needs RPL and units
and the beginnings of symbolic algebra. Each machine asks for the next capability, in the
order the engineers originally faced the same problems.

There is a file of build rules that every session reads before touching anything, and a rule
that lint, tests and a clean build must pass before a change is finished. There is also an
end-to-end suite that checks each keyboard renders within two percent of its correct aspect
ratio across a matrix of device sizes, which sounds fussy until you have seen an HP-41 squashed
into a phone screen.

A few things are honestly short of complete, and the README says so rather than hiding it. The
HP-32SII's newer key positions are inferred, because its manual ships without a keyboard
diagram. Some leaf functions in the menu-driven financial machines are navigable but not yet
wired. The HP-12C Platinum borrows the HP-12C's keyboard, on the grounds that its differences
are mostly not on the keyboard at all.

## Have a play

It is free and open source under the MIT licence, it installs as an app if you want it to, and
it works offline apart from the heavy symbolic tier.

Thirty-five years ago I taught an HP 48 about the foreign exchange market because the machine
was open enough to let me. This is the same instinct, pointed at the whole family, and I am
fairly sure my twelve-year-old self would approve.

[Try it here](https://christham.net/hellocalc/), or look at
[how it is put together](https://github.com/ChristineTham/hellocalc).
