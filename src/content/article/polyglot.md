---
title: 'hello polyglots: one program, eight languages'
description: A program three of us wrote in 1991 that compiles and runs in eight languages, and what became of it.
pubDate: 1991-03-18
---

_Filed under the date we posted it to Usenet. Most of what happened to it happened later._

Kevin Bungard, Peter Lisle and I wrote a program in 1991 that compiles and runs in eight
languages. Seven of them were there from the start and the eighth arrived ten years later. It
is probably the first code I ever published.

Compile it and run it and it prints a single line:

```text
hello polyglots
```

The same file, not one byte different between them, compiles as COBOL, as Pascal, as Fortran
and as C, runs as a Perl script and as a Unix shell script, prints when it is handed to a
PostScript interpreter, and, renamed to `.COM`, runs under MS-DOS directly as machine code.

## Where it came from

In 1990 there was a running conversation in the rec.puzzles newsgroup about programs that work
in more than one language at a time. Someone posted one that ran in two, someone else managed
three. So the three of us tried it. My part was the shell script, which took an afternoon. The
file we ended up with was dated 15 February 1991 in its own header and had seven languages in
it. We posted it to the newsgroup on 18 March,
from `metro`, a machine at Sydney University, back when Australian addresses still ended in
`.oz.au`. I had that connection because I had broken into the university's password file, which
is [a story in its own right](/spotlite/article/crypt-usenix91/#postscript-thirty-five-years-on).

## How the trick works

The code that is not meant for a particular compiler is commented out in that language. That is
the whole idea. It works because every language has its own way of marking a comment, and no
two of them quite agree. So if you are careful enough, you can write a line that is a genuine
instruction in one language while every other compiler reads the same characters as a comment.

| Language    | What it ignores                                             |
| ----------- | ----------------------------------------------------------- |
| Fortran     | Any line with `C` in the first column                       |
| COBOL       | The first six columns, and any line with `*` in the seventh |
| C           | Anything between `/*` and `*/`                              |
| Pascal      | Anything between `(*` and `*)`                              |
| PostScript  | Everything after a `%` on the line                          |
| Shell, Perl | Everything after a `#` on the line                          |

You can watch it happening along the left edge of the listing below. Almost every line begins
with a `C`, which tells Fortran to skip it. Just to the right sits a `#`, which does the same
for the shell and Perl, and then a `*`, which does it for COBOL. The block of text at the top
is a valid comment in all eight languages at once and is also the documentation.

The two blank lines at the very beginning matter. Take them out and it stops working.

## The source

This site normally colours code according to its language. I have set the listing out as plain
text instead, because any highlighter has to pick one language and will then be wrong about the
other seven. It is the current edition, which is why the header carries two dates. The program
is in the public domain, and the page it came from credits the three of us and thanks George
Janczuk.

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
on which compiler you intend to point at it. If you move the file between Unix and Windows,
check that the line endings survive.

The Unix `file` command, asked what this is, answers: FORTRAN program text.

## What happened next

On 26 August 1991 Peter Rigsbee ran it through Cray's own compilers under UNICOS. Fortran
worked best, the C compiler issued a warning and worked anyway, and the Pascal compiler was
"quite unhappy". In 2001 someone wrote in to report that it did not work on their Palm Pilot,
and in 2009 a commenter calling himself DoubtfulBadger got it going on a mainframe by shifting
the `end` of `end program` from column 12 to column 8.

A comment from 2004 says it ran on a digital clock.

In January 2001 the page was linked from Slashdot and several thousand people arrived at once.
A comment on 25 January, signed Richard Stallman, said the proper name was GNU/Polyglot. One on
16 February, signed Larry Wall, asked: "And Perl?"

Kevin answered the question. The tenth anniversary edition, dated 1 December 2001 in the
header, took us from seven languages to eight and fixed the machine code to run on Win32 as
well as DOS. We felt smug about it, so we entered it in the International Obfuscated C Code
Contest. When the results were announced some months later, we were not mentioned.

## Still out there

Rosetta Code keeps an entry for polyglot programs, and it opens by saying that the most famous
example is ours. In 2008 Wolfram Rösler wrote in to say he had linked it from his Hello World
collection. Every so often somebody asks whether they can put it in a Linux distribution, and
the answer has always been yes.

The comments on the original page start two days after we posted it and run through to December
2023, which is thirty-two years of strangers finding it and leaving a note. Some are technical.
Most are a variation on "you are all completely mad", which seems fair enough to me.

One from 16 December 2004, signed Alan, says he rarely makes predictions about software, "but
this will exist and be referenced 100+ years from now". I would not go that far. It has
outlasted nearly everything else I have built since.

## Sources

- [Polyglot](https://ideology.com.au/polyglot/), the original page, with the source, the
  download and thirty-two years of visitor comments.
- [Rosetta Code: Polyglot](https://rosettacode.org/wiki/Polyglot), which reproduces the program and notes that the syntax
  highlighting comes out scrambled.
