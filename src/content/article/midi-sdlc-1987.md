---
title: 'A 6809 board that recorded MIDI and spoke SDLC'
description: Five of us built one microprocessor board in 1987 and submitted it for two courses at once. It bridged a synthesiser and a VAX, and it was meant to be where Rubato came out.
pubDate: 1987-05-21
categories:
  - 'Written for this site'
  - 'Computing history'
tags:
  - 'Music'
  - 'University of Sydney'
  - 'Assembly language'
  - 'Networking'
---

_Recovered from a floppy I archived in December 1992 and written up here from the project report itself._

There is a particular kind of student economy in building one thing and handing it in twice. In 1987, five of us built a single microprocessor board and submitted it as the project report for two Computer Science Honours courses at once: Computer Networks, taught by Dr Robert Kummerfield, and Microprocessor Systems, taught by Dr Doan Hoang. The board did two entirely unrelated jobs, one for each marker.

The five were Michael Barr-David, who led the project and designed and built the hardware, Fred Holmberg on construction and debugging, Jason Lo documenting the SDLC station, Jarryl Wirth on the MIDI software, and me. My part was the layer underneath: modifications to the monitor for the serial controllers, the interrupt handlers and low-level device software, the test-out software used to prove the board worked at all, and the MIDI half of the documentation.

## What was on it

A Motorola MC6809 running at 1 MHz, with 8K of ROM and 32K of RAM. Two Zilog Z8530 SCCs (Serial Communications Controllers, two channels each) gave us four serial ports: one for a terminal, one for the link to the host, one asynchronous channel wired to the MIDI 1.0 specification, and one synchronous channel for SDLC. A Motorola MC6840 PTM (Programmable Timer Module) did the timing for both halves, and, because it was sitting there anyway, also drove a metronome.

The board did not work alone. It hung off a minicomputer — a PDP-11/84 or the Basser department's VAX 11/780 — through the Satellite Coprocessor system Kummerfield had built, which is what gave it somewhere to put the data.

## The MIDI half

As a MIDI recorder it sat between a synthesiser and the host, capturing whatever came down the MIDI cable into files on the minicomputer in real time, and streaming it back out again on demand. The report calls it the digital equivalent of a tape recorder, which is right about what it did and wrong about what it stored.

A tape recorder stores sound. This stored the notes: which key, how long, how hard, and when. That difference is the whole point of MIDI and it has three consequences, all of which we put in the user guide because they surprised people. A piece could be played back on a different instrument, or with a different sound, from the one it was recorded on. The tempo could be changed on playback without the pitch sliding the way it does when you speed up a tape. And because the recording was a file on a host computer rather than magnetised oxide, any program at all could read it, write it, edit it, or generate it from nothing.

## The SDLC half

The other channel spoke SDLC, and here the design was deliberately unfinished. Rather than implement a particular station, we wrote an open-ended set of low-level functions for sending and receiving frames, out of which somebody could assemble a primary or secondary station themselves, in whatever HDLC-family mode they needed. A toolkit rather than a product, which is a reasonable thing to hand a networks lecturer.

It ran NRZI at 1953.125 baud. Nobody chooses that number. It falls out of a 10 MHz crystal divided down by the baud rate generator inside the SCC and fed through the chip's digital phase-locked loop, and it is what the arithmetic gives you.

## Where it was pointing

The user guide, which Jarryl wrote, works through what you might feed the board, and reaches for an example close to hand: a compiler for Rubato, the musical description language I was writing as my own honours project that year, which with a suitable back end could turn pieces of arbitrary complexity into MIDI data files and play them on any number of instruments.

So the two projects were built facing each other. [Rubato](/spotlite/article/rubato/) was the language and the front end — a way of writing music down that read like music. This board was the path from a description of music to instruments actually making a noise. One was mine alone and the other was five of us; between them they were a complete idea.

The join was never made. Rubato's player was written and the compiler was not, so nothing was ever compiled to feed down the MIDI cable this board was waiting on. The board recorded synthesiser players instead, which it did well.

Thirty-eight years later the archive holds both halves, and neither one has anything to talk to.
