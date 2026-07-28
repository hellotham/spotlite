---
title: 'hello polyglots: one program, eight languages'
description: In 1991 three of us wrote a program that compiles and runs in eight languages. It is probably the first code I ever published, and it is still out there.
pubDate: 1991-03-18
---

_Filed under the date we posted it to Usenet. Everything from "What happened next" onwards
is what became of it in the years since._

Here is a program. Compile it, run it, and it prints one line:

```text
hello polyglots
```

That is not the interesting part. The interesting part is that you can compile the same file
as COBOL. Or as Pascal. Or Fortran, or C, or Perl. You can feed it to a PostScript
interpreter. You can run it as a Unix shell script. You can rename it to `.COM` and let
MS-DOS run it as raw machine code.

Eight languages. One file, not a byte different between them. Same line of output every time.

Kevin Bungard, Peter Lisle and I wrote it in 1991, with thanks to George Janczuk. It is
probably the first code I ever published, and thirty-five years later it is still the piece
of my work that the most people have seen.

## Where it came from

In 1990 there was a conversation in the rec.puzzles newsgroup about programs that work in
more than one language. Somebody posted one that ran in two languages, somebody else managed
three, and we thought that was wonderful.

So we had a go ourselves. It was meant to be an evening of fun. It got out of hand, in the
way these things do, and we ended up with seven languages.

We posted it back to the newsgroup on 18 March 1991. The machine it went out from was at
Sydney University, back when Australian addresses still ended in `.oz.au`.

## How the trick works

One commenter on our page summed it up better than we ever did: the code that is not meant
for a particular compiler is commented out in that language.

That is the whole idea. Every language has its own way of marking a comment, and no two
agree. So you can write a line that is a real instruction in one language while every other
compiler looks at the same characters and decides there is nothing there.

| Language    | What it ignores                                             |
| ----------- | ----------------------------------------------------------- |
| Fortran     | Any line with `C` in the first column                       |
| COBOL       | The first six columns, and any line with `*` in the seventh |
| C           | Anything between `/*` and `*/`                              |
| Pascal      | Anything between `(*` and `*)`                              |
| PostScript  | Everything after a `%` on the line                          |
| Shell, Perl | Everything after a `#` on the line                          |

Look at the left edge of the listing below and you can see it happening. Nearly every line
starts with `C`, which is why Fortran skips the lot. Just to the right of that sits `#`, so
the shell and Perl skip it too. Then `*`, which puts COBOL to sleep. The comment block at the
top is the part we were proudest of, because it is a valid comment in all eight languages at
once, and it is also the documentation.

The blank lines at the very start are not decoration. Take them out and it stops working.

## The source

A note on how this is printed. Normally this site colours code by language, but there is no
sensible way to do that here. A highlighter has to pick one language, and whichever it picks
it will be wrong about the other seven. Rosetta Code, which reproduces the program, ran into
the same thing and warns readers that the colouring comes out rather scrambled.

So it is set below as plain text, exactly as the file is. That is the honest way to show it.
The program is in the public domain.

One thing to explain before you read it. This is the current edition, the one with Perl in
it and with two dates in the header. We started with seven languages in 1991. How the eighth
arrived is a story for further down.

```text


                                                                         (*O/*_/
Cu  #%* )pop mark/CuG 4 def/# 2 def%%%%@@P[TX---P\P_SXPY!Ex(mx2ex("SX!Ex4P)Ex=
CuG #%*                                                                  *+Ex=
CuG #%*------------------------------------------------------------------*+Ex=
CuG #%*   POLYGLOT - a program in eight languages      15 February 1991  *+Ex=
CuG #%*   10th Anniversary Edition                      1 December 2001  *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*   Written by Kevin Bungard, Peter Lisle, and Chris Tham          *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*   Polyglot suports the following languages:                      *+Ex=
CuG #%*     1. COBOL (ANSI)                                              *+Ex=
CuG #%*     2. Pascal (ISO)                                              *+Ex=
CuG #%*     3. Fortran (ANSI, f77)                                       *+Ex=
CuG #%*     4. C (ANSI-ish)                                              *+Ex=
CuG #%*     5. PostScript                                                *+Ex=
CuG #%*     6. Linux/Unix shell script (bash, sh, csh)                   *+Ex=
CuG #%*     7. x86 machine language (MS-DOS, Win32, Linux)               *+Ex=
CuG #%*     8. Perl (version 5)                                          *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*   Usage:                                                         *+Ex=
CuG #%*     1. Rename this file to polyglot.[cob|pas|f77|c|ps|sh|com|pl] *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*     2. Compile and run with your favorite compiler and operating *+Ex=
CuG #%*        system.                                                   *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*   Notes:                                                         *+Ex=
CuG #%*     1. We have attempted to use only standard language features. *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*     2. Without the -traditional flag gcc will issue a warning.   *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*     3. When transferring from Unix to DOS make sure that a LF    *+Ex=
CuG #%*        is correctly translated into a CR/LF.                     *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*     4. Keep the blank lines at the start of the program. They    *+Ex=
CuG #%*        are important.                                            *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*     5. This text is a comment block in all eight languages.      *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*   Please mail any comments, corrections or additions to          *+Ex=
CuG #%*   polyglot@ideology.com.au                                       *+Ex=
CuG #%*                                                                  *+Ex=
CuG #%*------------------------------------------------------------------*QuZ=
CuG #%*                                                                  *+Ex=
CuG #%*!Mx)ExQX5ZZ5SSP5n*5X!)Ex+ExPQXH,B+ExP[-9A-9B(g?(gA'UTTER_XYZZXX!X *+
CuG #(*                                                                  *(
C   # */);                                                              /*(
C   # *)  program        polyglot (output);                             (*+
C   #     identification division.
C   #     program-id.    polyglot.
C   #
C   #     data           division.
C   #     procedure      division.
C   #
C   # * ))cleartomark   /Bookman-Demi findfont 36 scalefont setfont     (
C   # *                                                                 (
C   #
C   # *                  hello polyglots$
C   #     main.
C   #         perform
C  /# * ) 2>_$$; echo   "hello polyglots"; rm _$$; exit;
C   # * (
C   #
C     *0 ) unless print "hello polyglots\n"; __END__
              print
C             stop run.
     -*,                'hello polyglots'
C
C         print.
C             display   "hello polyglots".                              (
C     */  int i;                                                        /*
C     */  main () {                                                     /*
C     */      i=printf ("hello polyglots\n"); O= &i; return *O;         /*
C     *)                                                                (*
C     *)  begin                                                         (*
C     *)      writeln  ('hello polyglots');                             (*
C     *)                                                                (* )
C     * ) pop 60 360                                                    (
C     * ) pop moveto    (hello polyglots) show                          (
C     * ) pop showpage                                                  ((
C     *)
           end                                                          .(* )
C)pop%     program       polyglot.                                      *){*/}
```

If you want to run it, [download the original](https://ideology.com.au/polyglot/) and rename
it to `polyglot.cob`, `.pas`, `.f77`, `.c`, `.ps`, `.sh`, `.com` or `.pl` depending on which
compiler you are pointing at it. One warning from the notes still applies: if you move it
between Unix and Windows, make sure the line endings survive the trip.

My favourite detail is that the Unix `file` command, asked what this is, still answers
without hesitation: FORTRAN program text.

## What happened next

The replies started two days after we posted it, and they never really stopped.

People compiled it on things we had no access to. It went through a Cray running UNICOS in
August 1991, where the Fortran was happy, the C compiler grumbled but worked, and the Pascal
compiler was described as "quite unhappy". Somebody ran it on a mainframe and only had to
nudge one word into a different column. Somebody ran it on a digital clock. Somebody, at
some point, tried it on a Palm Pilot and reported the sad news that it did not work.

In January 2001 the page was linked from Slashdot and thousands of people arrived at once.
Among the comments left that day were a few signed with names that were probably not their
owners. One, signed Richard Stallman, insisted the proper name was GNU/Polyglot. Another,
signed Larry Wall, asked simply: "And Perl?"

Kevin took that as a challenge. For the tenth anniversary he added Perl, which took it from
seven languages to eight, and fixed the machine code so it would run on Win32 as well as
DOS. Then, feeling rather pleased with ourselves, we entered it in the International
Obfuscated C Code Contest. Months later the results came out and we were not mentioned
anywhere.

## Still out there

Rosetta Code has an entry for polyglot programs, and it opens by saying the most famous
example is ours. It is included in the Hello World collections that people maintain. It
turns up in Linux distributions now and then, which is fine, because we put it in the public
domain and asked for nothing except an acknowledgement.

The comments on the original page run from March 1991 to December 2023. Thirty-two years of
strangers finding it, working out what it does, and leaving a note. Some are technical. Most
are some version of "you are all mad", which is fair.

There is a comment from 2004 that says the writer rarely makes predictions about software,
but that this one will still be referenced in a hundred years. I would not go that far. What
I will say is that we wrote it for no reason other than that it seemed funny at the time, we
gave it away, and it has outlasted nearly everything else I have built since.

If you write something small and strange and put it where people can find it, you have no
idea how long it will keep going.
