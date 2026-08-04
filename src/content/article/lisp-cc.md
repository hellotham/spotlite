---
title: 'A C compiler in LISP, a LISP in C, and the subject that changed my life'
description: In 1986 I took Compiler Techniques under Bruce Ellis and wrote a C compiler in LISP. I have got it running again, on hardware that did not exist when I wrote it.
pubDate: 2026-08-04
categories:
  - 'Written for this site'
  - 'Software'
  - 'Computing history'
tags:
  - 'Compilers'
  - 'Programming languages'
  - 'Assembly language'
  - 'UNIX'
  - 'University of Sydney'
  - 'Free software'
  - 'Preservation'
  - 'Computer science'
---

In my third year at the University of Sydney I enrolled in an honours subject called Compiler Techniques. It was taught by Bruce Ellis, who a few years later would be at Bell Labs working on Plan 9 and then Inferno, and who had already written the code behind Mark V. Shaney — the Usenet poster that produced plausible nonsense by Markov chain, designed by Rob Pike and coded by Bruce. On the [basser and basset machines I have written about elsewhere](/spotlite/article/unix-50-celebration/) he posted as `brucee`.

The assignment was to write a C compiler in LISP (Franz Lisp, which was the Lisp you used on a VAX in those days, and which is itself a descendant of MacLisp). Bruce had written a LISP interpreter in C, called BruceLisp. To pass, your compiler — which emitted VAX assembly — had to compile his interpreter successfully, and his interpreter, thus compiled, had to run your compiler successfully.

A beautiful case of infinite recursion.

I enjoyed that subject enormously and did very well in it. It is why I proposed the honours topic I did the following year: [Rubato](/spotlite/article/rubato/), a language for writing music down and a system to perform it — which is to say, another compiler, pointed at something I actually cared about. That thesis won me the [University Medal](/spotlite/education/usyd/).

To say the subject changed my life is an understatement. Without it I would not have chosen that topic, and without that topic I would almost certainly not have won the medal. Winning it made me suddenly, unexpectedly employable. Before that I had more or less decided I was going to be a struggling artist, and I was quite serious about it.

So it pleases me, more than it probably should, that the code I wrote for that assignment is running again. It is at [github.com/ChristineTham/lisp-cc](https://github.com/ChristineTham/lisp-cc).

## What survived, and what did not

What survived is about 1,100 lines of LISP: my compiler, or rather the front end of it, written against the framework Bruce supplied. What did not survive is BruceLisp. It never left the university, and I have no copy of it, so the interpreter in this repository is a reconstruction — built from what the surviving code assumes about its host, and from archived bulletin board postings. It is a usable subset of the MacLisp family that Franz Lisp belongs to, and I make no compatibility claim beyond that.

The 1,100 lines are now 5,100. The original handled a deliberately small C: `char`, `int` and `void`, pointers, arrays, structs, unions and enums, with no floating point, no `long`, `short` or `unsigned`, no `goto` and no ternary operator. What is there now is full K&R 1978 with the V7 struct extensions (K&R being the language as the first edition of Kernighan and Ritchie defined it, a decade before the ANSI committee settled the arguments) — floating point, unsigned, bitfields, `goto`, the ternary, structs passed by value. It generates arm64 rather than VAX assembly, which is the one substantive way in which it is not the program I submitted. There was no other choice. I do not have a VAX (about a million instructions a second, which was a great deal then and is now roughly a wristwatch), and neither do you.

## Thirteen bugs it had all along

Getting it to run again mostly meant finding out what had always been wrong with it. Thirteen defects, sitting there undisturbed since I handed it in.

Array decay pointed at the wrong type. Subscript scaling used the wrong sizes. The member access operators `|.|` and `|->|` were never registered at all. Struct alignment happened in the wrong order, and array dimensions were stored as symbols where they should have been numbers. Three of the thirteen turned out to be in the Franz Lisp driver rather than in my own code, a distinction I record because I went looking for it, and you would have too.

I ran everything under two independent interpreters throughout — the reconstruction, and PC-LISP — on the principle that for a bug in either one to hide a bug in the sources, it would have had to be reproduced twice.

## The proof is still the recursion

The test is the same one Bruce set, in the same shape.

The host compiler builds the V7 library and the LISP interpreter. The interpreter runs the coursework compiler, which passes 175 LISP tests and 35 compile-and-run tests. Then the compiler compiles itself, and the output is byte-identical to the compiler that produced it. That is the fixed point, and it holds on macOS 15, Debian 13, Ubuntu 24.04 and Alpine 3.20, all arm64.

The C library it compiles is the real one: 47 files of Seventh Edition Unix from 1979, taken byte-for-byte as they came off the tape, including stdio with `getc` and `putc` as macros, and the original `malloc`. Nothing here is emulated. You write K&R C and it compiles, you write LISP and it runs, and what you are handling in both cases is what the work actually felt like — the two tools I spent that year inside, on a machine built four decades after they were.

There is one thing I would still like to find. The Rubato archive turned up on a floppy I had put away in December 1992, and it holds the troff source of the thesis, three earlier drafts and the assembly for the player. It does not hold the Rubato compiler, and I no longer expect it to.

The compiler I won the medal for is gone. The one that taught me how to write it still runs.
