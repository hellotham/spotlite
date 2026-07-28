---
title: 'hello polyglots: one program, eight languages'
description: In 1991 three of us wrote a program that compiles and runs in eight languages. It is probably the first code I ever published, and it is still out there.
pubDate: 1991-03-18
---

_Filed under the date we posted it to Usenet, although the story of what became of it carries
on well past that._

I would like to show you a program that three of us wrote back in 1991. It has had a far longer
life than any of us imagined, and it is probably the first code I ever published.

When you compile it and run it, it prints a single line:

```text
hello polyglots
```

Which is not terribly impressive on its own, so here is the part that makes it worth writing
about. You can compile that same file as COBOL, or as Pascal, or as Fortran, or C, or Perl, and
you can also hand it to a PostScript interpreter, run it as a Unix shell script, or rename it
to `.COM` and let MS-DOS run it directly as machine code. Eight languages in all, from a single
file that does not change by so much as a byte between them, and it prints the same cheerful
line every time.

Kevin Bungard, Peter Lisle and I wrote it together, with thanks to George Janczuk, and
thirty-five years later it is still the piece of my work that the most people have seen.

## Where it came from

Back in 1990 there was a lovely, rambling conversation in the rec.puzzles newsgroup about
programs that manage to work in more than one language at a time. Someone posted one that ran
in two, someone else managed three, and we thought the whole idea was wonderful.

So we decided to have a go ourselves, imagining it might fill an evening. It filled a good deal
more than that, in the way these things tend to, and by the time we came up for air we had
seven languages working.

We posted it back to the newsgroup on 18 March 1991, from a machine at Sydney University, back
when Australian addresses still ended in `.oz.au`.

## How the trick works

One of the commenters on our page summed it up more neatly than we ever managed: the code that
is not meant for a particular compiler is simply commented out in that language.

That really is the whole idea. It works because every language has its own way of marking a
comment, and no two of them quite agree. So if you are careful enough, you can write a line
that is a genuine instruction in one language, while every other compiler looks at the same
characters and decides there is nothing there worth reading.

| Language    | What it ignores                                             |
| ----------- | ----------------------------------------------------------- |
| Fortran     | Any line with `C` in the first column                       |
| COBOL       | The first six columns, and any line with `*` in the seventh |
| C           | Anything between `/*` and `*/`                              |
| Pascal      | Anything between `(*` and `*)`                              |
| PostScript  | Everything after a `%` on the line                          |
| Shell, Perl | Everything after a `#` on the line                          |

You can watch it happening along the left edge of the listing below. Almost every line begins
with a `C`, which is Fortran's cue to skip over it, and just to the right of that sits a `#`,
which sends the shell and Perl on their way, followed by a `*` that quietly puts COBOL to
sleep. The block of text at the top is the part we were proudest of, because it manages to be a
valid comment in all eight languages at once while also serving as the documentation.

As for the two blank lines at the very beginning, they are not there for the look of the thing.
Take them out and it stops working.

## The source

Before you read it, a word about how it is printed here. This site normally colours code
according to its language, but there is no sensible way to do that here. Any highlighter has to
choose a single language, and it will then be wrong about the other seven. Rosetta Code, which
also reproduces the program, ran into exactly the same difficulty and gently warns its readers
that the colouring comes out rather scrambled.

So I have set it out below as plain text, just as the file is, which seemed the more honest way
to show it. The program itself is in the public domain, so you are very welcome to it.

One last thing worth mentioning: what follows is the current edition, the one with Perl in it
and two dates in its header. We began with seven languages in 1991, and the story of how the
eighth arrived comes a little further down.

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

If you would like to run it, you can [download the original](https://ideology.com.au/polyglot/)
and rename it to `polyglot.cob`, `.pas`, `.f77`, `.c`, `.ps`, `.sh`, `.com` or `.pl`, depending
on which compiler you intend to point at it. One warning from the original notes still holds:
if you move the file between Unix and Windows, do check that the line endings survive the
journey.

My favourite detail, and one that still makes me smile, is that the Unix `file` command, asked
what this thing is, answers without a moment's hesitation: FORTRAN program text.

## What happened next

The replies began two days after we posted it, and they have never entirely stopped.

People started compiling it on machines we could only have dreamt of getting near. In August
1991 it went through a Cray running UNICOS, where the Fortran was perfectly happy, the C
compiler grumbled a little but worked, and the Pascal compiler was reported to be "quite
unhappy". Someone ran it on a mainframe and needed only to nudge a single word into a different
column to get it going. Someone else cheerfully reported running it on a digital clock. One
kind soul tried it on a Palm Pilot and wrote in with the sad news that it did not work.

Then in January 2001 the page was linked from Slashdot and several thousand people arrived at
once. A few of the comments left that day were signed with names that almost certainly did not
belong to the people typing them. One, signed Richard Stallman, insisted that the proper name
was GNU/Polyglot. Another, signed Larry Wall, asked simply, "And Perl?"

Kevin took that last one as a challenge. For the tenth anniversary he added Perl, taking us
from seven languages to eight, and fixed the machine code so it would run happily on Win32 as
well as DOS. Feeling pleased with ourselves by then, we entered it in the International
Obfuscated C Code Contest. When the results were finally announced some months later, we had
not been mentioned anywhere at all.

## Still out there

Rosetta Code keeps an entry for polyglot programs, and it opens by saying that the most famous
example is ours, which I still find a little startling to read. It has found its way into the
Hello World collections that people lovingly maintain, and it turns up in Linux distributions
every now and again. That is quite all right by us, since we put it into the public domain and
asked for nothing in return beyond a kind word.

The comments on the original page run from March 1991 all the way through to December 2023,
which is thirty-two years of strangers stumbling across it, working out what on earth it does,
and leaving a note behind them. Some are properly technical, though most are some variation on
"you are all completely mad", which seems fair enough to me.

There is one from 2004 in which the writer says they rarely make predictions about software,
but that this one will still be referenced in a hundred years' time. I would not go anywhere
near that far. What I will say is that we wrote it for no better reason than that it seemed
funny at the time, we gave it away without a second thought, and it has quietly outlasted very
nearly everything else I have built since.

If you make something small and strange, and put it somewhere people can find it, there is
really no telling how long it might keep going.
