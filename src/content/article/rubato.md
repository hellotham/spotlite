---
title: 'Rubato: A Music Input and Performance System'
description: My 1987 honours thesis at the University of Sydney. A language for writing music down that reads like music rather than like code, and a system that performs it.
pubDate: 1987-11-01
---

![The University of Sydney crest: a lion passant above an open book on a white cross, flanked by stars of the Southern Cross, over a scroll reading Sidere Mens Eadem Mutato](../../assets/usyd-crest.svg)

_Chris Tham, Computer Science Honours, 1987. Basser Department of Computer Science, University
of Sydney._

_This is my honours thesis, for which I was awarded the University Medal. It was written in
troff, and in January 1998 I converted it to HTML with a perl script of my own called `m2h`;
this is that HTML turned into Markdown. Two faults in the 1998 conversion are repaired here: an
anchor in the contents whose quote never closed, and several lists opened as one kind and
closed as the other. Its own numbering was off by one throughout, the footnotes and references
being listed from two while cited from one, so both are renumbered against the text. The words
are otherwise as submitted._

> (Italian = robbed)
>
> Over the centuries the cry of _Ancora rubato_ (robbed again) has echoed through the corridors
> of opera-houses as the orchestral musicians opened their pay-packets. In time, the word became
> so associated with the sight of players hanging about the stage door waiting to argue with the
> manager that it seemed natural to apply it to hanging about while playing an expressive melody.
> It is in fact the subtle art of flexing the rhythm in such a way as to enhance its
> expressiveness, sometimes retarding, sometimes accelerating, but always preserving a coherent
> musical shape. Its tasteful use almost invariably depends on an awareness of the relation
> between a melody and its supporting harmony. Questions of rubato should usually not be worked
> out but left to the inspiration of the moment. Abused, it can result in gross distortions of
> the music.
>
> Anthony Hopkins, **Downbeat Music Guide**, Oxford University Press, London (1977)

## Table of Contents

- [1 PRELUDE AND OVERTURE](#Chapter1)
  - [1.1 The Problem of Music Representation and Music Performance on Computers](#H1-1)
  - [1.2 A brief overview of the _Rubato_ system](#H1-2)
    - [1.2.1 The Language](#H1-2-1)
    - [1.2.2 The performance system](#H1-2-2)
  - [1.3 The Rubato Programming Environment](#H1-3)
    - [1.3.1 Compiler](#H1-3-1)
    - [1.3.2 Assembler](#H1-3-2)
    - [1.3.3 Linker](#H1-3-3)
    - [1.3.4 Interpreter](#H1-3-4)
    - [1.3.5 Debugger](#H1-3-5)
    - [1.3.6 Player](#H1-3-6)
- [2 GENESIS AND METAMORPHOSIS](#Chapter2)
  - [2.1 Goals](#H2-1)
  - [2.2 Assumptions](#H2-2)
    - [2.2.1 Locality and Homogeneity](#H2-2-1)
    - [2.2.2 Repetition and Hierarchy](#H2-2-2)
    - [2.2.3 Algorithms and Execution Flow](#H2-2-3)
    - [2.2.4 Alternative representations](#H2-2-4)
  - [2.3 The Approach](#H2-3)
    - [2.3.1 Concept of a note with attributes](#H2-3-1)
    - [2.3.2 Default attributes](#H2-3-2)
    - [2.3.3 Grouping of notes into phrases and chords](#H2-3-3)
    - [2.3.4 Algorithmic control flow](#H2-3-4)
- [3 LITERATURE REVIEW](#Chapter3)
  - [3.1 A Comparative Survey of Music Input Languages and Computer-based Music Performance Systems](#H3-1)
  - [3.2 Music N](#H3-2)
    - [3.2.1 Music V](#H3-2-1)
    - [3.2.2 Summary](#H3-2-2)
  - [3.3 MUSPEC](#H3-3)
    - [3.3.1 Stylistic Control Information Block](#H3-3-1)
      - [3.3.1.1 Tonal System](#H3-3-1-1)
      - [3.3.1.2 Root Tone Scale](#H3-3-1-2)
      - [3.3.1.3 Root Tone Cycles](#H3-3-1-3)
      - [3.3.1.4 Harmonic Structure](#H3-3-1-4)
      - [3.3.1.5 Harmonic Continuity](#H3-3-1-5)
      - [3.3.1.6 Rhythmic Groupings](#H3-3-1-6)
      - [3.3.1.7 Melody](#H3-3-1-7)
    - [3.3.2 Selector Control Function Block](#H3-3-2)
    - [3.3.3 Summary](#H3-3-3)
  - [3.4 MIR](#H3-4)
    - [3.4.1 Note attributes](#H3-4-1)
    - [3.4.2 MIR instructions](#H3-4-2)
    - [3.4.3 Summary](#H3-4-3)
  - [3.5 PILE](#H3-5)
    - [3.5.1 PILE instructions](#H3-5-1)
    - [3.5.2 Summary](#H3-5-2)
  - [3.6 SSSP Score Editing Tools](#H3-6)
    - [3.6.1 ludwig](#H3-6-1)
    - [3.6.2 Scored](#H3-6-2)
    - [3.6.3 sced](#H3-6-3)
    - [3.6.4 scriva](#H3-6-4)
    - [3.6.5 Summary](#H3-6-5)
  - [3.7 INV](#H3-7)
    - [3.7.1 INV Programming](#H3-7-1)
    - [3.7.2 Summary](#H3-7-2)
  - [3.8 Play](#H3-8)
    - [3.8.1 PLAY Components](#H3-8-1)
    - [3.8.2 Summary](#H3-8-2)
  - [3.9 Ford-Columbia Input Language](#H3-9)
    - [3.9.1 Elements of FCL](#H3-9-1)
    - [3.9.2 Summary](#H3-9-2)
  - [3.10 Plaine and Easie & ALMA](#H3-10)
    - [3.10.1 Plain & Easie](#H3-10-1)
    - [3.10.2 ALMA](#H3-10-2)
    - [3.10.3 Summary](#H3-10-3)
  - [3.11 Adagio](#H3-11)
  - [3.12 Conclusions](#H3-12)
- [4 A TUTORIAL TO THE RUBATO LANGUAGE](#Chapter4)
  - [4.1 INTRODUCTION](#H4-1)
  - [4.2 STARTING OUT](#H4-2)
  - [4.3 A SIMPLE EXAMPLE](#H4-3)
  - [4.4 JAZZING IT UP](#H4-4)
  - [4.5 DELAYS AND DURATIONS](#H4-5)
    - [4.5.1 Delays](#H4-5-1)
    - [4.5.2 Arithmetical expressions](#H4-5-2)
    - [4.5.3 Duration](#H4-5-3)
    - [4.5.4 Delays and Tempos](#H4-5-4)
  - [4.6 LOUDNESS (or VELOCITY)](#H4-6)
  - [4.7 SOME OTHER ATTRIBUTES](#H4-7)
  - [4.8 CHANGING DEFAULT ATTRIBUTES](#H4-8)
  - [4.9 WAYS OF COMBINING NOTES](#H4-9)
    - [4.9.1 Phrases](#H4-9-1)
    - [4.9.2 Chords](#H4-9-2)
  - [4.10 NAMING THINGS](#H4-10)
  - [4.11 VARIABLES AND CONTROL FLOW](#H4-11)
    - [4.11.1 Variables](#H4-11-1)
    - [4.11.2 Control Flow](#H4-11-2)
      - [4.11.2.1 if-then-else](#H4-11-2-1)
      - [4.11.2.2 while-do](#H4-11-2-2)
      - [4.11.2.3 do-while](#H4-11-2-3)
      - [4.11.2.4 repeat](#H4-11-2-4)
    - [4.11.3 A control flow example](#H4-11-3)
  - [4.12 PROCEDURES & TEMPLATES](#H4-12)
    - [4.12.1 Procedures](#H4-12-1)
    - [4.12.2 Templates](#H4-12-2)
  - [4.13 TYING IT ALL TOGETHER](#H4-13)
- [5 A SPECIFICATION OF THE RUBATO LANGUAGE](#Chapter5)
  - [5.1 Fundamental objects (types) of the language](#H5-1)
    - [5.1.1 Number](#H5-1-1)
    - [5.1.2 Note](#H5-1-2)
    - [5.1.3 Phrase](#H5-1-3)
    - [5.1.4 Chord](#H5-1-4)
    - [5.1.5 Envelope](#H5-1-5)
    - [5.1.6 Variable](#H5-1-6)
    - [5.1.7 Procedure](#H5-1-7)
    - [5.1.8 Function](#H5-1-8)
    - [5.1.9 Template](#H5-1-9)
    - [5.1.10 Expression](#H5-1-10)
    - [5.1.11 Statement](#H5-1-11)
  - [5.2 Lexical conventions](#H5-2)
    - [5.2.1 Identifiers (Names)](#H5-2-1)
    - [5.2.2 Keywords](#H5-2-2)
    - [5.2.3 Constants](#H5-2-3)
    - [5.2.4 Pitch Values](#H5-2-4)
    - [5.2.5 Special characters](#H5-2-5)
  - [5.3 Arithmetical expressions](#H5-3)
  - [5.4 The Specification of A Note](#H5-4)
  - [5.5 Statements](#H5-5)
    - [5.5.1 if-then-else](#H5-5-1)
    - [5.5.2 repeat-do](#H5-5-2)
    - [5.5.3 while-do](#H5-5-3)
    - [5.5.4 do-while](#H5-5-4)
    - [5.5.5 tempo](#H5-5-5)
    - [5.5.6 default](#H5-5-6)
    - [5.5.7 Assignment](#H5-5-7)
    - [5.5.8 Template and Procedure Calls](#H5-5-8)
    - [5.5.9 return](#H5-5-9)
  - [5.6 Identifiers and Definitions](#H5-6)
  - [5.7 Scoping rules](#H5-7)
    - [5.7.1 Global definitions](#H5-7-1)
    - [5.7.2 External definitions](#H5-7-2)
  - [5.8 conductor](#H5-8)
  - [5.9 Compiler control lines or pragmas](#H5-9)
    - [5.9.1 $key](#H5-9-1)
    - [5.9.2 $default](#H5-9-2)
  - [5.10 Format of a source file](#H5-10)
- [6 A SPECIFICATION OF THE RUBATO MACHINE](#Chapter6)
  - [6.1 Introduction](#H6-1)
  - [6.2 _Rubato_ Machine Organization](#H6-2)
    - [6.2.1 The Code and Data stores](#H6-2-1)
    - [6.2.2 Data types](#H6-2-2)
    - [6.2.3 The Stacks](#H6-2-3)
      - [6.2.3.1 The expression stack](#H6-2-3-1)
      - [6.2.3.2 The environment stack](#H6-2-3-2)
      - [6.2.3.3 The activation stack](#H6-2-3-3)
      - [6.2.3.4 The envelope stack](#H6-2-3-4)
      - [6.2.3.5 Implementation of the stacks](#H6-2-3-5)
    - [6.2.4 Attribute registers](#H6-2-4)
    - [6.2.5 The Instruction Execution Unit(s)](#H6-2-5)
    - [6.2.6 The MIDI queue](#H6-2-6)
  - [6.3 _Rubato_ Machine Instructions](#H6-3)
    - [6.3.1 Relative Procedure Level](#H6-3-1)
    - [6.3.2 Object addressing](#H6-3-2)
    - [6.3.3 Procedure or function calling](#H6-3-3)
    - [6.3.4 Procedure or function calling](#H6-3-4)
    - [6.3.5 Notes and chords](#H6-3-5)
- [7 THE IMPLEMENTATION OF THE RUBATO SYSTEM](#Chapter7)
  - [7.1 The rc compiler](#H7-1)
  - [7.2 The rx executor](#H7-2)
  - [7.3 Note generation](#H7-3)
- [8 FINALE: A ROOM WITH A VIEU](#Chapter8)
- [A1 EBNF GRAMMAR OF THE _Rubato_ LANGUAGE](#Appendix1)
- [A2 INSTRUCTION SET REFERENCE](#Appendix2)
- [A3 Summary and Description of MIDI](#Appendix3)
  - [A3.1 INTRODUCTION TO MIDI](#HA3-1)
  - [A3.2 MIDI NETWORK ARCHITECTURE](#HA3-2)
    - [A3.2.1 The Physical Interconnection](#HA3-2-1)
    - [A3.2.2 The Code Specification](#HA3-2-2)
    - [A3.2.3 MIDI Command Types](#HA3-2-3)
    - [A3.2.4 Format of MIDI commands](#HA3-2-4)
- [A4 SAMPLE PROGRAMS](#Appendix4)
- [Footnotes](#Footnotes)
- [References](#References)

<a id="Figures"></a>

## List of Figures

1. [example1.r - a simple example](#figure1)
1. [Another version of example1.r](#figure2)
1. [example2.r - the C major scale](#figure3)
1. [example3.r - Jumping up octaves](#figure4)
1. [example4.r - the A major scale](#figure5)
1. [example5.r - the A major scale](#figure6)
1. [example6.r - Notes with delays](#figure7)
1. [example7.r - Specifying velocities](#figure8)
1. [example8.r - Patch and channels](#figure9)
1. [Changing Default Attributes](#figure10)
1. [Changing Pitch defaults](#figure11)
1. [example9.r - Chords and Phrases](#figure12)
1. [example10.r - Namings and block structuring](#figure13)
1. [example11.r - Variable declarations and assignments](#figure14)
1. [example12.r - Control flow](#figure15)
1. [over.r - Over The Rainbow](#figure16)
1. [MIDI Status Byte Format](#figure17)

<a id="Tables"></a>

## List of Tables

1. [CHANNEL COMMANDS](#table1)
1. [SYSTEM EXCLUSIVE COMMAND](#table2)
1. [SYSTEM COMMON COMMANDS](#table3)
1. [REAL TIME COMMANDS](#table4)

<a id="Chapter1"></a>

## Chapter 1: PRELUDE AND OVERTURE

Computer music is an interdisciplinary field combining aspects of art, science and technology. Under the aegis of computer science as well as musicology, it has been an actively pursued research topic for some twenty years.[\[1\]](#ref-1)

Some of the currently active areas in computer music research include:

- music input languages and music representation
- music performance and synthesis
- computer music composition
- computer aided music analysis
- digital sound processing

This thesis presents a description of the design and implementation of the _Rubato_ system, which consists of a music input language coupled to a music performance system. _Rubato_ is a set of tools and a programming environment that collectively allow a user to enter music into a computer using a language (called the _Rubato_ language) that is compact, flexible and modelled closely on conventional (common practice) musical notation. Once a piece of music has been entered in this manner, it can be transformed or analysed or performed on a music synthesizer provided suitable hardware and interfacing circuits are available. Current members of the _Rubato_ family are a compiler, an assembler and linker, an interpreter and debugger, and finally a player.

<a id="H1-1"></a>

### 1.1 The Problem of Music Representation and Music Performance on Computers

It was inevitable that the notion of programming languages specifically designed for musical applications developed not long after reseach had begun in the field of computer music. Solving musical problems and music generation with computers involves questions of efficiency, representation and modelling.[\[2\]](#ref-2) While it is possible for a musician or composer to encode a musical composition by embedding it within an existing general purpose programming language[^1], (see _Moxc : real-time programming package_[\[3\]](#ref-3) for more details on a set of library functions that allow musical programs to be written in the C Programming language in a style similar to _Moxie_[^2]) using a computer language which has been specifically designed for musical applications and containing the embodiment of musical paradigms will allow a wide range of compositional strategies to be realized.[\[2\]](#ref-2)

There is currently a widely accepted means of notating music developed by Western musical tradition which will be referred to in this thesis as _Conventional Music Notation_ or _CMN_ for short. This notation was devised as a visual or graphical means of encoding the interrelated properties of musical sound, including pitch, intensity, time, timbre and pace, as pictorial symbols on paper[\[4\]](#ref-4).

CMN encodes a static representation of musical compositions as _note elements_ (note-heads, stems, flags and beams) together with accents, dynamics and phrase marks, upon a _staff_[^3]. It quantizes the continuous musical stream into discrete _event specifications_ (called _notes_) that code parameters such as pitch, onset time and duration. If each of these parameters is regarded as a _perceptual dimension_ in music, then notes may be regarded as points placed on the perception space encompassing the music.

CMN has been criticized for its inadequacy in representation[\[2\]](#ref-2). What is denoted by CMN is but the tip of a much greater body of oral knowledge and tradition in the practices of composition, performance, and analysis. The information lost by the abstraction or quantization process is recovered through a set of implicit rules known as _performance interpretation_ most of which are automatically assumed by trained performers realizing an encoded work.

The foremost observation that can be made about CMN is that it is designed by musicians for musicians. It combines many levels of perceptual dimensions together, resulting in a concise and effective symbolic representation. However, CMN is very difficult to represent in a formal manner due to the implicit rules of interpretation. A computer performance of a musical score omitting the interpretation rules often result in a wooden rendition of the musical piece.

Alternative means of notating music have been proposed, even as early as in the year 1742 by Jean-Jacques Rousseau[\[5\]](#ref-5), but it can be safely asserted that CMN continues to be the dominant means of representing music by musicians.

The above discussion would imply that using CMN as the basis of any specialized computer language for music input or performance would be difficult. Yet it is certainly possible to design and implement graphical editors that display and edit musical scores using a highly stylized subset of CMN.[^4] Such editors have been implemented in the past. However, the extent of CMN embodied by these editors is often minimal, and furthermore the problems generated by the implicit rules are almost always ignored or deferred. Music performance systems that do attempt to recognize the implicit rules often employ concepts and paradigms that differ substantially from CMN. Experience has shown that the design and implementation of a substantially complete music editor or music input system incorporating most of the major features of CMN, in addition to a music performance system that recognizes performance interpretation rules, is a non-trivial exercise in artificial intelligence techniques, i.e. knowledge representation.[\[6\]](#ref-6)

For this reason, it is usual for compromises to be made when designing a music input language. A music input language is often regarded as an intermediary means of allowing musical information to be represented in the computer. The musical information, once represented, may then be used for musical analysis, computer music typesetting, or even music generation and performance. Music input languages may sometimes be an alphanumeric representation of a limited subset of CMN with irregularities removed and simplifications effected, but often they use substantially different representation schemes from CMN which are often idiosyncronistic in appearance and style.

The paradigms employed in the design of music input languages are often derived from the 'model' used to represent the continuous musical stream[^5] and has a profound effect on the subsequent 'style' of the language. Currently, a wide variety of models are used to represent musical data, including mathematical (stochastic, combinatorial and statistic), linguistic, algorithmic, process (object oriented) and models derived from artificial intelligence.[\[2\]](#ref-2)

<a id="H1-2"></a>

### 1.2 A brief overview of the _Rubato_ system

The _Rubato_ system is a partial attempt at solving the music representation problem mentioned in the last section. It seeks not to defy the concepts and abstract principles embodied in CMN but to embrace them. Instead of finding an alternative means of representing music without the limitations imposed by CMN, it shares the same paradigms as CMN in the recognition of CMN's universal acceptance in the musical world. Hence _Rubato_ shares with CMN some of the defects inherent to the model of representation common to both systems of music notation. However, _Rubato_ is more formally consistent than CMN as it does not attempt to duplicate every aspect of CMN, only the concepts and axioms behind the symbolic notation rules.

The main problem of alternative representations of music is the learning curve associated with mastering the representation by the very people who would benefit the most from a music input and performance system - the electronic music synthesist, the casual composer and music analyst. Also, it is inherently difficult to transcribe music written in CMN (which comprises most of Western music!) into an alternative representation scheme. _Rubato_ does not currently solve the problem of implicit performance interpretation rules which are missing from CMN (and hence from the _Rubato_ language), but it is hoped that some of these rules will be encoded into the interpreter and/or player in the future so that the performance of _Rubato_ encoded pieces will be more realistic.

The _Rubato_ system is also an attempt at creating a music input and performance system using established techniques in compiler construction and language design and taking advantage of recent research into parallel computation and the development of concurrent languages. _Rubato_ attempts to draw as many analogies as possible between music performance and the execution of computer software. Hence the components of the _Rubato_ system directly parallels similar tools available in the programming environment for a computer system. Writing music into a computer is a process that can be likened to writing software that will be executed on a computing machine. For example, the music itself can be thought of as a set of algorithms for 'playing' a piece and the computer as a virtual machine designed to 'execute' these algorithms, i.e. 'play' music.

Given these analogies, the _Rubato_ language can therefore be viewed as a computer language for expressing musical algorithms. The _Rubato_ system can be viewed as a virtual computer system that plays music. The compiler will attempt to translate user input in a high level language into a low level language that resembles machine language on physical computers. This machine language will be further translated by the assembler into 'executable' code. Multiple music source files may also be 'linked' or merged together from portions of music compiled and assembled separately into a whole. The interpreter attempts to execute _Rubato_ machine code by simulating a virtual music playing machine using the computer's native code and supporting hardware. If something wrong occurs, the debugger may be used to isolate problems in the music representation. Finally, at the end of the chain, the player takes the output of the interpreter and generate codes that will drive a music synthesizer connected to the computer[^6]. This performance will then be interpreted by human ears as the realization of the musical piece.

The _Rubato_ system has been successively implemented on a DEC VAX 11/780 running Unix Version 8 and an IBM PC/XT running MS-DOS Version 3.30. Currently, music performance is only possible on the IBM PC/XT via a player program called **adagio**(1) (see _The Adagio Language_[\[3\]](#ref-3)) and the Roland MPU-401 MIDI Processing Unit.

The _Rubato_ system is the union of the following subsystems:

<a id="H1-2-1"></a>

#### 1.2.1 The Language

This is the user interface to the system. The _Rubato_ language is an typographic language with features similar to CMN but at the same time less inconsistent. It is highly algorithmic and employs block structuring of declarations to facilitate music analysis. The design of the _Rubato_ language is an extension of the grand tradition of 'structured' computer languages beginning with _Algol_ and continues on today in general purpose computer languages such as _Pascal_ and _Ada_. In addition, the language feature concurrency and syncronization primitives derived from research in process concurrency that resulted in experimental languages such as _Communicating Sequential Processes_(CSP) and _Occam_.

<a id="H1-2-2"></a>

#### 1.2.2 The performance system

This is again subdivided into components which taken as a whole, will accept as an input file musical pieces encoded in the _Rubato_ language by a user and plays them on a music synthesizer. The _compiler_ scans text files written in the _Rubato_ language and generates intermediate assembly code suitable for processing by the _assembler_, which in turn will generate machine code suitable for the _interpreter_. The interpreter simulates the execution of the machine code. This results in a file suitable for input by the _player_. The player performs the music piece on an electronic synthesizer interfaced to the computer.

<a id="H1-3"></a>

### 1.3 The Rubato Programming Environment

The following are the major modules of the _Rubato_ system and what they do:

<a id="H1-3-1"></a>

#### 1.3.1 Compiler

This compiles a source file written in the _Rubato_ language into the assembly language suitable for the assembler. A _Rubato_ source file is created using a text editor on the computer system and is just a normal text file. The _Rubato_ language and compiler is portable and stable across implementations.

<a id="H1-3-2"></a>

#### 1.3.2 Assembler

The _Rubato_ assembler accepts assembly instructions in the one instruction per line format common to most assemblers for computer systems. Each assembler instruction corresponds to a musical event, such as a command to start playing a note or set a particular attribute to a certain value or a command that changes the internal state of the virtual machine. The design of the assembly language is also portable across implementations. It is in fact independent of the language. It is possible to modify the design of either the _Rubato_ language or virtual machine without affecting the other.

<a id="H1-3-3"></a>

#### 1.3.3 Linker

The linker will link up separately compiled and assembled source files into a musical piece that can be 'executed' by the interpreter. External declarations and references can be resolved at this stage. The linker is also portable across implementations.

<a id="H1-3-4"></a>

#### 1.3.4 Interpreter

The interpreter will simulate the execution of the _Rubato_ music performance machine. Essentially, it executes _Rubato_ machine code in the host environment. Currently, the interpreter generates a text file which is then read in by a player program that actually plays the music. Hence it is portable across implementations provided each implementation uses the same format for the player file. Ideally, the interpreter should execute in 'real-time' and play the music directly onto the synthesizer hardware interface. In other words, the functionality of the interpreter and the player should be combined into one unit at the expense of portability. Besides efficiency considerations, merging the interpreter and the player will allow the language and the system to be extended in the future for human/computer interaction during the performance of the music.

<a id="H1-3-5"></a>

#### 1.3.5 Debugger

The Debugger will allow machine code, whether hand-written or output generated by the compiler, to be debugged. Commands typical of a system debugger such as single-step, trace, disassembly and memory examine and state examine are available. At this stage, the debugger is quite useful for debugging both the compiler and interpreter!

<a id="H1-3-6"></a>

#### 1.3.6 Player

Currently, the player is an independent program which is separate from the interpreter. The player used in the current implementation is called **Adagio** and has been developed by Roger Dannenberg[\[3\]](#ref-3) at Carnegie-Mellon University.

<a id="Chapter2"></a>

## Chapter 2: GENESIS AND METAMORPHOSIS

The most important component of the _Rubato_ system is undoubtedly the _Rubato_ language. It is essentially the user interface to the _Rubato_ system. This chapter of the thesis describes the goals, assumptions, design approaches and decisions taken leading to the specification of the _Rubato_ language.

<a id="H2-1"></a>

### 2.1 Goals

The following goals were instrumental in the shaping of the nature of the _Rubato_ language:

The language should be loosely based on the structural organization, abstract concepts and principles of CMN, i.e. it should employ many of the same abstractions (the quantization of the musical stream into notes with psychoacoustical properties such as pitch, rhythm, loudness and timbre being a primary CMN concept that must be retained by the language). The rationale behind this goal is to minimize the effort required to code musical pieces written in CMN. Ideally, there should be an injective relationship between entities and concepts in CMN and their equivalent counterparts in the language and it should be possible to transcribe musical pieces in CMN directly into the language with minimal effort and by following a few simple rules.

The language should allow the encoding of as many CMN concepts as possible, if not in the same style and conventions, then at least in the same principle. In particular, the language should permit easy and painless specification of articulation marks, dynamics (including continuous dynamic specifications such as _crescendo_ and _ritartando_), rhythmic stresses, key, meter and time signatures, barlines and various other notational devices of CMN traditionally ignored by computer music input languages. Any notation in CMN not explicitly handled by the language should be easy to simulate within the language by the user through devices resembling _macros_ or _procedures_ in computer programming languages. The purpose of this goal is to enlarge the class of music specifiable in the language as wide as possible.

In spite of the above goals, the language should be mainly a typographical language, i.e. it should be possible to encode a piece of music as a sequence of alphanumeric and special characters commonly available on a typewriter keyboard. This allows music pieces to be coded on a simple computer terminal without special music input facilities or a graphical user interface. The reason for this is to allow the language to be implementable across a wide variety of computer hardware and operating systems. The benefits of a graphical based language is heavily outweighed by the special hardware and software requirements necessary to support a graphical interface.

The language should encode musical pieces as compactly as possible, to minimize the time required to code musical pieces as well as the number of keystrokes required to represent a particular musical entity. A compact representation is also beneficial in that it requires minimal storage within the computer.

The language should allow a hierarchical organization of components in a musical piece when coded in the language representation. This parallels the (implied) concept of hierarchy in CMN. Traditionally, large pieces of music are broken up into smaller and smaller components such as movements, sections, themes, melodies, motives, phrases down to the individual notes. The representation of a musical piece in the language should mirror the piece's internal hierarchical organization as far as possible. The hierarchical organization should be flexible enough to allow common sections in the hierarchy, e.g. a phrase or melody interspersed throughout the piece across sections, to be represented or stored only once. Future invocations of a previously specified section of a piece should be easy to perform.

Hierarchical levels within a music piece should be nameable in the language, i.e. it should be possible to assign a sequence or characters forming a word to any component of the music. Specifying the name at a later stage should invoke the section of the music assigned to the name. Name assignment in the hierarchical structure should be nestable rather like declaration nesting in block-structured languages such as _Algol_ or _Pascal_. In particular, a local assignment of a name to a musical structure should be visible to all lower layers of the hierarchy but invisible to the higher layers. This allows different sections of a piece to assign the same name to different structures independently without the concern that one assignment may overwrite the other.

The language should be inherently concurrent, i.e. it should be possible to specify sections which will be performed simultaneously. Music is not usually considered as a linear stream of notes but rather a set of note streams operating in parallel. This is exemplified in pieces written for a sympony orchestra. During the performance of a symphony, for example, each member of the orchestra can be considered a process that spews out musical notes independently of the other performers and yet the collection of independent players form a joint entity that can bring pleasure to a listener's ears. Often, performers share a musical part, such as members of the cello section often play a common phrase in unison. This can be likened to processes which are separate instances of a single process specification.

**This is major difference between the new language and most of the other computer music input languages.**

Typically, a computer music input language forces a piece of music with many parts to be encoded into a sequential stream which is processed sequentially. The language should allow each musical part to be specified separately, together with a notation to bind the separate pieces so that they will be performed simultaneously. Hence, the language can take advantage of upcoming parallel computer architectures because of its inherent concurrency. The implementation of the interpreter and player on a typical sequential computer entails time-sharing the computational power of the computer between active entities in the music in a round-robin fashion.

Finally, musical pieces written in the language should be aesthetic and pleasing to look at. To achieve this goal, the language may have to allow free-form input, i.e. spaces and blank lines and the typographical format of elements of the language are not syntactically significant.

<a id="H2-2"></a>

### 2.2 Assumptions

In designing the language, some assumptions about the nature of music and the structure of musical pieces were made and these assumptions guided the approaches taken and the design decisions made. The assumptions may not be correct or even generally valid, but it is hoped that they are at least consistent and prove to be useful.

<a id="H2-2-1"></a>

#### 2.2.1 Locality and Homogeneity

Music is composed of notes which are locally homogeneous. Locally within a piece, all notes typically lie relatively close to one another in pitch, and are usually similar in other attributes. For example, all notes in a phrase or melody are likely to be spaced equally apart in time and have the same duration, loudness, timbre, etc. A language that exploits this feature will simplify the keying in of musical phrases because the attributes of a note which are common across a phrase need only be specified for the phrase rather than for each individual note. Similarly, a group of phrases may possess similar attributes in the same way that notes do. Hence, the savings achieved can be replicated up the hierarchical structure.

<a id="H2-2-2"></a>

#### 2.2.2 Repetition and Hierarchy

Most musical pieces will repeat portions of themselves. Indeed, certains parts or types of music will often repeat endlessly, possibly with variations or in juxtaposition with another section which may not repeat at all. Even in cases where the melody does not repeat, the rhythmic pattern of the notes may be replicated. Repetition of musical sections are often intimately linked with the hierarchical structure of the musical piece. The language should be able to handle repetitions in form as well as content intelligently.

<a id="H2-2-3"></a>

#### 2.2.3 Algorithms and Execution Flow

The performance of a musical piece can be likened to the sequential execution of a computer program. For instance, when a piece of music is being composed or performed, there is often an acute awareness in the mind of the composer or performer of the 'flow' of the musical piece with respect to time. This flow of a musical piece can be diverted within CMN using repetition marks and there are even constructs directly analogous to control flow statements in programming languages such as **goto** or **if**..**then**..**else**! Hence, the flow of music is very similar to the flow of execution within a computer program. A language for representing music should therefore be algorithmic and possess iteration and control flow primitives akin to the control flow statements available in a typical computer programming language.

<a id="H2-2-4"></a>

#### 2.2.4 Alternative representations

The concepts used in _Rubato_ are often just as applicable to other areas of real-time control systems as it is to music representation and performance. While the language should not be designed as a general purpose real-time control language, the design of the language must be flexible enough to allow the language to be used for nonmusical applications. To this end, there must exist alternative means of event specifications that do not correspond to CMN. For example, there should be at least two different ways of specifying the pitch of a note. It can either be specified as a key which is relative to the current key signature and the current octave, or as an absolute pitch number which corresponds to the number that will be sent out by the interface when playing the note. Similarly, the duration of a note can be specified as a time period which is relative to the current musical _tempo_, or as an absolute time interval.

<a id="H2-3"></a>

### 2.3 The Approach

With the previous goals and assumptions at hand, an initial design of the language was completed. The language was then modified and the design phase was reiterated until it was felt that the language was in a stable enough phase for a lexical analyser and parser to be constructed. It was found that the design often had to be modified in order to simplify the lexical analyser and/or parser. However, any modifications made were mostly cosmetic. Hence, by the time the specification of the language was drawn out, a rudimentary parser existed which could traverse through sample music representations written in the grammar of the language.

The following concepts were the result of the approaches examined during the design phase of the language:

<a id="H2-3-1"></a>

#### 2.3.1 Concept of a note with attributes

The language views a musical stream as a sequence of _notes_ possessing _attributes_. Each note must possess a pitch, along with attributes such as _delay_, _duration_, _velocity_, _patch_ and _channel_. These attributes will be fully discussed in the chapter entitled _A Specification of the Rubato_ Language, but it suffices for now to view notes as _event specifications_ with each attribute of a note regarded as a dimension on which the note may be placed.

<a id="H2-3-2"></a>

#### 2.3.2 Default attributes

When defining a note, the only attribute that needs to be specified is the pitch. All other attributes will take on _default_ values if not specified. The use of default attributes is a means of allowing note representations to be more compact then they would normally be. Since the default values do not change from note to note unless done explicitly, note specifications are largely context free and independent of one another.

<a id="H2-3-3"></a>

#### 2.3.3 Grouping of notes into phrases and chords

There are two fundamental groupings of notes. A _phrase_ is a collection of entities (such as notes) that will be played sequentially, one after another. In a sense, the 'execution' of a phrase will yield a melody or a musical phrase. A _chord_ is a collection of entities that will be played simultaneously. These are the two fundamental 'building blocks' of hierarchy in the _Rubato_ language. Phrases and chords may be nested, containing other phrases or chords. The _Rubato_ language also allow phrases and chords to possess attributes which become the default attributes for all entities within the phrase or chord. Phrases in the _Rubato_ language are analogous to subroutine calls in a programming language and chords are analogous to a primitive that spawns new processes in concurrent programming languages.

<a id="H2-3-4"></a>

#### 2.3.4 Algorithmic control flow

Within a phrase, execution proceeds sequentially unless a _control flow statement_ is encountered which may or may not divert the 'execution flow' within the phrase. Control flow statements are similar to those in programming languages. There are iterative control flow statements as well as conditional statements.

<a id="Chapter3"></a>

## Chapter 3: LITERATURE REVIEW

<a id="H3-1"></a>

### 3.1 A Comparative Survey of Music Input Languages and Computer-based Music Performance Systems

There are currently a wide variety of diverse methods of entering music into a computer in a format suitable for musical analysis and/or performance. Conventional music notation has been found to be less than ideal for music input and representation, hence a variety of music input languages have been developed. This chapter of the thesis looks at existing approaches to music notation and input languages and also compares between the features of different designs and the restrictions due to paradigms employed in the designs. A review of music performance systems employing one or more of the above input languages will also be covered. Whenever convenient, a comparison between the _Rubato_ system and the system being reviewed will also be made.

This review will cover existing music input languages, music generation and performing languages, as well as musical programming languages that implements musical data types and operations and allow a representation of time in a musical composition. The languages surveyed will be presented here in a nondeterministic order, although some effort have been made to present languages related to one another in sequence for easy comparison.

<a id="H3-2"></a>

### 3.2 Music N

Early programs developed for computer sound and music synthesis, generation and performance often define a musical note as the "specification of an acoustic event". This is mainly due to the history of acoustic experimentations in electronic music moving into the digital computer domain. The interest on timbre was a primary impetus in the growth of electronic music and, later on, computer music synthesis. The advantage of specifying music as a collection of acoustic parameters that is synthesized into waveforms is the freedom of expression beyond that of conventional musical instruments. However, every detail of a music performance had to be specified in painstaking detail.

The first, and most influential, of these family of programs were a suite of programs, named Music I to Music V, developed under Max Mathews _et al_ at AT&T Bell Laboratories. These programs spawned a whole tree of descendants with similar names such as Music 4B, Music 4BF[\[7\]](#ref-7), Music 10 etc.[\[8\]](#ref-8) I will simply take Music V as a role model and refer to the whole class of programs for the remainder of this essay as MUSIC N.

<a id="H3-2-1"></a>

#### 3.2.1 Music V

The Music V environment is a fast general purpose computer with mass storage and digital-to-analogue converters. Music V takes a set of synthesis algorithms and note specifications as input, and generates waveform samples for the entire musical score onto tape. An auxiliary program then reads the samples off the tape and sends them across to the digital-analogue converters, hence producing music.

Synthesis algorithms are specified by interconnecting _unit generator_ modules resulting in an _instrument_. A series of note statements containing a list of expressions specifying the note parameters are than parsed by Music V and converted into waveforms using the instruments defined previously.

Music V processes its input in three passes: a parameter conversion pass, a note sorting pass, and the actual synthesis pass. Instruments can be _reentrant_ (i.e. the same instrument may be playing more than one note), a feature new to Music V and not present in Music IV.

In pass I, the score is read and data statements are interpreted into operations. Statements are free form in that they are terminated by semicolons and more than one statement may coexist on the same line. The first field is the operation code, the second the _action time_ that specifies when the operation is to be done. Further fields are specific to the operation type. Fields are separated by white space or commas.

The operation code is a three letter mnemonic which is converted to a numeric equivalent.

- **(1) NOT** plays a note using a defined instrument
- **(2) INS** defines an instrument using unit generators
- **(3) GEN** specify generating function for unit generators
- **(4) SV3** Set variable for pass III
- **(5) SEC** End section
- **(6) TER** terminate piece (Music V input score)
- **(7) SV1** Set variable in pass I
- **(8) SV2** Set variable in pass II
- **(9) PLF** Execute subroutine in pass I
- **(10) PLS** Execute subroutine in pass II
- **(11) SI3** Set integer in pass III
- **(12) SIA** Set integer in all passes
- **(13) COM** Comment operation

After pass I, a temporary file is created which is directed on to pass II. Each statement is then sorted by action time in ascending order and a metronome function is applied to change the time scale.

Finally, pass III computes the actual acoustic samples by organizing unit generators into instruments and playing the instruments[\[9\]](#ref-9).

<a id="H3-2-2"></a>

#### 3.2.2 Summary

MUSIC N's complete lack of structure in the event (note) specifications allowed new approaches to composition. However, the acoustical model can sometimes constrain musical composition. Transcribing from CMN to MUSIC N is possible but is quite tedious for humans (A graphical interface to MUSIC IV has been done[\[10\]](#ref-10)). MUSIC N does not operate in real time, and often a 1 minute composition may take up to 20 minutes of computation. Performance interpretation, missing from CMN, is very difficult to code on MUSIC N, and the implicit assumption of notes as static entities that cannot vary once instantiated is not valid for certain types of music.

<a id="H3-3"></a>

### 3.3 MUSPEC

MUSPEC (J. P. Citron, _MUSPEC_ pp. 97 - 111 [\[11\]](#ref-11)) is a high-level tool in musical composition. It may also be used as a music input language. The paradigms employed in MUSPEC are musicological rather than numerical in nature, but MUSPEC is not a true music input language. Input data into MUSPEC is only casually related to musical notation. Instead, the user is expected to think in terms of musical ideas such as pitches in tone systems, chord structures and rhythms.

MUSPEC grew out of research on the use of computers in aural pattern recognition.[\[12\]](#ref-12) As a result, MUSPEC views a musical composition as "... a voiced harmonic continuity and its subsequent melodization."[\[11\]](#ref-11)

The output of MUSPEC is a printed listing of notes and time durations, but not in musical notation. There are currently no means of performing (realizing) MUSPEC output as MUSPEC does not feature supporting hardware for musical performance. The only way of "listening" to MUSPEC output is to transcribe the results into conventional music notation for instrumental performance, or into a computer music performance system.

MUSPEC has been used to generate and compare the musical characteristics of persistent lines of chemical substances, phases of seismic disturbances, electrocardiograms, stellar luminosity plots and other phenomenological recordings[\[11\]](#ref-11). In fact, the name MUSPEC is derived from the projected use of the program as a "MUsical SPECtroscope".

MUSPEC input is divided into two _blocks_: a declarative block and a 'executable' block.

<a id="H3-3-1"></a>

#### 3.3.1 Stylistic Control Information Block

This is the declarative section of the input. Some possible declarations are:

<a id="H3-3-1-1"></a>

##### 3.3.1.1 Tonal System

This is the pitch system of the music, given in user-defined symbols. Note that MUSPEC translates the symbols into numbers for internal processing and reconverts the resultant numbers back into symbols for output. The actual significance of the symbols as pitches in some musical scale is ignored by MUSPEC itself. An example of a tonal system declaration is:

TONSYS C DF D EF E F GF G AF A BF B

which defines the twelve-tone scale.

<a id="H3-3-1-2"></a>

##### 3.3.1.2 Root Tone Scale

This is the allowed set of root tones upon which chords may be constructed. The entries are numeric offsets to the symbols named in the TONSYS statement.

ROOTS 1 3 5 6 8 10 12

<a id="H3-3-1-3"></a>

##### 3.3.1.3 Root Tone Cycles

CYCLES 5 2 3 5 2 5

gives the allowed root progressions according to the root tone scale in ROOTS.

<a id="H3-3-1-4"></a>

##### 3.3.1.4 Harmonic Structure

Structures are numbers which enumerate intervals in the TONSYS scale separating consecutive notes in the structure. For example,

STRCTR 4 3 3

specifies a seventh chord on allowable root tones. Structures are used for harmonic composition as well as melodization.

<a id="H3-3-1-5"></a>

##### 3.3.1.5 Harmonic Continuity

Voicing statements specifies the harmonic continuity of the music and control the voice leading between chords. The entry of a particular voicing position specifies the structure note of the next chord which the note in the current structure component must move to. An example is

VOICNG 1 3 4 2

The first chord is voiced using either CHORD1 or CHORDP. For example,

CHORD1 1 3 4 2

states that the initial reference choird is ordered root, third, fourth and second structure tone. CHORDP will cause structures and root tones to be "phased" in calculations.

<a id="H3-3-1-6"></a>

##### 3.3.1.6 Rhythmic Groupings

Basic Rhythmic Group specifies and overall or "macrorhythmic" control:

BSCGRP 2,6/1,4/1,3,2

establishes 2 units of time with a maximum of 6 attacks, 1 unit of time with a chord change (as indicated by the minus sign) and maximum 4 attacks, and 1 unit of time with a maximum of 3 attacks and a minimum of 2 attacks.

"Microrhythmic" attack patterns are specified as relative duration groups, i.e. duration is an integer with respect to a minimum value. A negative duration value indicates a rest:

RELDUR 3 1 2 2 -1 3 2 2

<a id="H3-3-1-7"></a>

##### 3.3.1.7 Melody

A MELODY statement is a string of integers representing notes selected from interval structures.

<a id="H3-3-2"></a>

#### 3.3.2 Selector Control Function Block

The second data block may contain any set of numbers at all, whether abstractly chosen or purposely contrived. This block begins with a line with the word LINES starting in column one. The numbers in the line data are used to select material from the musical data. First, a root tone cycle is selected from available CYCLE scales, followed by voicing choice, macro- and microrhythmic selection and melody. Hence, each set of numbers of a line triggers a set of selections and corresponds to the 'executable' section of a programming language.

<a id="H3-3-3"></a>

#### 3.3.3 Summary

One of the reasons behind the implementation of MUSPEC was to allow composers and arrangers to communicate musical thoughts in a relatively high level to the computer, and in this respect it is fairly successful. MUSPEC employs a different set of paradigms from CMN hence converting from musical scores into MUSPEC input requires a bit of thought. The biggest disadvantage of MUSPEC (which it shares with some other music input languages) is the lack of ability for the computer to 'play' music written in MUSPEC, but it is not inconceivable to develop a music performance system that plays MUSPEC output. MUSPEC lacks essential musical attributes such as timbre and loudness, and until these features are added to the language it will remain primarily a compositional tool.

<a id="H3-4"></a>

### 3.4 MIR

_MIR_ (Musical Information Retrieval) is a language developed in order to assist musicologists in "... answering internal-evidential questions about ... (musical scores)". (M. Kassler, _MIR - A Simple Programming Language for Musical Information Retrieval_, pp. 299 - 327[\[11\]](#ref-11)) Hence, it is primarily an analysis tool rather than a music input language. In theory, any query relating to the symbols of musical notation such as notes, rests, clefs and so on can be formulated as an MIR program.

MIR is written as a _macro-language_ of FAP (FORTRAN Assembly Program) and individual MIR instructions can be viewed as direct commands to a machine that performs specific operations on musical data. In this respect, MIR programs can be likened to the assembly language instructions for the _Rubato_ virtual machine. At any given time, this virtual machine can hold at most one note and all its related attributes. This is called the _current note_.

<a id="H3-4-1"></a>

#### 3.4.1 Note attributes

The following is representative of the type of data pertaining to a note:

- **LYNENO, MEASNO, NOTENO** line, measure & note number of current note
- **REGCL, NOTECL, SEMITO** denotes the register class (octave), note class (pitch) and semitones above a 'base' note.
- **DURAT, DURINT, DURNUM** specifies the duration of the note.
- **MESINT, SYSINT** specifies the measure and system "attack" time for the note.
- **CLEF, KEYSIG** specifies the clef and key signature of the note.

In addition, a note also contains attributes such as dynamic mark values, timbre, title, author, publisher of composition and so on.

<a id="H3-4-2"></a>

#### 3.4.2 MIR instructions

MIR instructions consists of three fields: _location_ (or symbolic address), _operation_ (or instruction type), and _variable_ (object acted on by operation). Hence MIR programs are very similar in spirit and style to assembly language programs on computers. There are instructions such as TOSECT, TOMEAS, TOLYNE, TONOTE etc. which directs processing to a certain position in the composition, arithmetic instructions, logical instructions and output instructions that allow queries to be made on a musical composition.

<a id="H3-4-3"></a>

#### 3.4.3 Summary

MIR is not a music input language, and hence does not feature a means whereby music is transcribed into the system (this can be done by a suitable music input language).[\[13\]](#ref-13) The companion music input language to MIR is called IML, which is not discussed here.[\[14\]](#ref-14) It is interesting however in that it treats a musical composition as an information database on which inferences may be made and queries can be formulated. A conversion program exists that converts the MIR database to a MUSIC IV program which allows "proof-hearing" of the contents of MIR scores and greatly enhance the usefulness of MIR. The biggest advantage of MIR is its programmability and flexibility, its biggest disadvantage its cumbersome assembly syntax.

<a id="H3-5"></a>

### 3.5 PILE

PILE (P. Berg, _PILE - A Language for Sound Synthesis_, **Computer Music Journal**, 3(1): 30-41 (1979), reprinted[\[15\]](#ref-15)) is a real-time, direct sound synthesis language on the DEC PDP-15 computer. It produces several layers of sounds simultaneously in real-time. It differs from the MUSIC N species of programs in that PILE instructions are based on machine operations rather than an acoustical model. Hence PILE instructions typically represent "structured" assembly languages rather than MUSIC N streams and in this respect PILE is more closely related to MIR and the _Rubato_ virtual machine rather than MUSIC N.

<a id="H3-5-1"></a>

#### 3.5.1 PILE instructions

Each PILE instruction contains the name of an operation on one line and further information on subsequent lines. Instructions are terminated by semicolons and must begin with white space, in order to differentiate instructions from labels (another convention borrowed from the assembly language world). Music is generated from manipulating the contents of an "accumulator" and then sending it to a hardware "channel".

Besides the usual conditional, logical, arithmetic and branch instructions, there are instructions to manipulate 'lists', the accumulator and external devices.

<a id="H3-5-2"></a>

#### 3.5.2 Summary

PILE can be a flexible means of generating music using a low-level machine operations based method. Berg explains (pp. 169-172[\[15\]](#ref-15)), in a hierarchical example, how PILE can be used for FM synthesis [\[16\]](#ref-16).

<a id="H3-6"></a>

### 3.6 SSSP Score Editing Tools

A set of tools for the Structured Sound Synthesis Project (SSSP) at the University of Toronto has been developed which uses interactive computer graphics to allow a composer to edit musical scores in a highly interactive manner. (W. Buxton _et al_, _The Evolution of the SSSP Score-Editing Tools_, **Computer Music Journal**, 3(4): 14-25 (1979), reprinted[\[15\]](#ref-15)) It operates on a DEC PDP-11/45 running under the UNIX system[\[17\]](#ref-17) with vector-drawing graphics displays and digitizing tablets. Musical output is produced through the SSSP Digital Synthesizer (W. Buxton _et al_, "An Introduction to the SSSP Digital Synthesizer" [\[15\]](#ref-15))

<a id="H3-6-1"></a>

#### 3.6.1 ludwig

Ludwig[\[18\]](#ref-18) is a graphical score editor based on conventional music notation. A graphical representation of the score is displayed in conventional music notation (or a subset thereof) and the current display "window" into the music score can be scrolled in the horizontal direction. Editing is performed through the digitizing tablet and editing operations are based on recording tape technology in that the composer can perform a _splice_ and _mix_ of the score which corresponds to the relevant tape recorder operations. In order to eliminate typing as much as possible, timbral colours and filenames can be selected by pointing at the appropriate menu item on the screen through the digitizing tablet.

<a id="H3-6-2"></a>

#### 3.6.2 Scored

_Scored_ is very similar to Ludwig but employs an alternative display paradigm: music is displayed in "piano-roll notation" rather than using conventional music notation symbols. The internal data structure of Scored is similar to Ludwig, the same information is essentially displayed in a different form.

<a id="H3-6-3"></a>

#### 3.6.3 sced

This is yet another representation of the same data structures, but the approach used here is alphanumeric rather than graphical. The primary reason for the development of _sced_ (W. Buxton, _A tutorial introduction to SCED_[\[19\]](#ref-19)) seems to be to allow editing of scores on alphanumeric terminals.

A new idea was introduced in sced which was the concept of _scope._ Ludwig and Scored are essentially "scopeless" editors; the composer either deals with a note by itself or the score as a whole. Sced however allows a group of notes to be manipulated as a whole as a result of the editor interface which resembles the UNIX text editor _ed(1)_.

<a id="H3-6-4"></a>

#### 3.6.4 scriva

This is the cumulative result of previous work in designing the above editors. Scriva (W. Buxton, _A tutorial introduction to SCRIVA_[\[19\]](#ref-19)) is a graphical score editor that can view a common data structure in one of four different notation schemes: conventional music notation, piano-roll, object highlighting and envelope highlighting. Scope is built in by allowing the composer to "lasso" or circle a set of notes and treat them as an object.

<a id="H3-6-5"></a>

#### 3.6.5 Summary

The SSSP score editing tools are an interesting set of programs in that they are all related to one another and run on the same hardware but are substantially different in their user interfaces and sophistication. The conclusion drawn by the authors are firstly, a graphical approach offers a very congenial method of editing musical scores compared to conventional alphanumeric music input languages. Secondly, the concept of _scope_ is an important one and foreshadows the heirarchical concept of music with instances of the same phrase in a musical composition sharing the same location in computer memory. (W. Buxton _et al_, _"The Use of Hierarchy and Instance in a Data Structure for Computer Music",_ **Computer Music Journal**, 2(4), 10-20 (1978) revised and updated[\[15\]](#ref-15))

The biggest disadvantage of a graphical user interface in a musical input language is the lack of programmability. It is difficult to specify that a certain set of notes is to be repeated at various positions in a musical composition except by physically copying the set of notes. Once copied, however, modification done on the original set will no longer affect the copies.

<a id="H3-7"></a>

### 3.7 INV

INV (C. Abbott, _A Software Approach to Interactive Processing of Musical Sound_, **Computer Music Journal**, 2(1): 19-23 (1978), reprinted pp. 512 - 522[\[15\]](#ref-15)) or "Invoke", is a simple interpretive programming language that performs mixing and editing operations to produce pieces of music. It is only casually related to music generation programs as it has no concept of music at all, it simply 'records' (samples a waveform) musical notes onto a hard disk and allows mixing and editing of the waveform samples before producing them on the output ('playback'). The language is a fairly low level language similar in spirit but not in surface appearance to BASIC.

<a id="H3-7-1"></a>

#### 3.7.1 INV Programming

On the lowest level, event structures and integer variables can be written to and accessed. Control flow and functions are called _activities_. There can only be one activity per line, corresponding to statements in a programming language. In addition, the following musically oriented primitives are defined:

- Send data from a disk file to a Digital-to-Analogue Converter. This produces sounds.
- Record sounds via an Analogue-to-Digital Converter into a disk file.
- Scale buffer contents using a scaling constant or function.
- Produce a waveform at normalized amplitude. FM synthesis may be used.
- Add one buffer to another.

User defined activities (called _macros_ or _functions_) are stored in a library. During program execution, the interpreter fetches the macros from disk and executes the macros until the end of the macro. The calling-level stack is organized such that macro symbols are local to the macro.

<a id="H3-7-2"></a>

#### 3.7.2 Summary

INV is unique among all the other languages presented in this review in that it has no concept of music at all. The 'knowledge' of INV is limited to that of recording and playing waveform samples, although a limited waveform generation capability does exist. However, INV _can_ produce music, simply because it is a very fast random-access tape recorder. If all the notes of a grand piano are recorded into INV and then a selected set of notes are played in sequence, music can be produced.

Another unique feature of INV is its capability of dealing with 'events' regardless of their type using an 'event structure'. This, plus programmability, makes INV a flexible tool for generating music but the prospective INV composer would be hampered by INV's lack of musical knowledge.

<a id="H3-8"></a>

### 3.8 Play

PLAY (J. Chadabe, R. Meyers, _An Introduction to the PLAY Program_, **Computer Music Journal**, 2(1): 12-18 (1978), revised and updated pp. 523 - 538[\[15\]](#ref-15)) is a program for music generation that is not rooted in traditional music notation but instead tries to to maximise flexibility in the conceptualization of temporal processes. It functions in two distinct stages:

1. A _design stage_ where it is necessary to specify _data generators_ which output lists of numbers which can determine pitch, rhythm, envelope, loudness etc., i.e. control the technical characteristics of the synthesizer or internal variables. Data generators can be interconnected with each other as modules. The timing of individual modules may vary and one module may use another as a clock rather than the system clock.
1. The _operation stage_ whereby the program plays music while the composer controls a chosen set of variables in real time. The interconnection of modules may be changed during playback.

<a id="H3-8-1"></a>

#### 3.8.1 PLAY Components

PLAY consists of three subprograms which can be called in any order, even during playback:

1. FUNCTION (or data input and editing): this allows numbers (which can be notes) to be entered into the system.
1. PATCH: this allows the data lists specified in FUNCTION to be integrated into modules which can then be interconnected.
1. PLAYBACK: this will operate the music generation component of PLAY. The other two components may also be called while this component is active, allowing real time control over the music generation.

<a id="H3-8-2"></a>

#### 3.8.2 Summary

PLAY is a flexible interactive music generating program that is clearly descended from the MUSIC N model. However, the interactive aspects of PLAY make it easier to use than MUSIC N. It is clearly intended as a music performance language rather than a music input language. Hence, the specification of musical scores within PLAY is rather tedious.

<a id="H3-9"></a>

### 3.9 Ford-Columbia Input Language

The Ford-Columbia Input Language (S. Bauer-Mengelberg, _The Ford-Columbia Input Language_, pp. 48 - 52[\[20\]](#ref-20)) is the result of research to allow printing and typesetting of music under computer control using photo-composition equipment. Hence the emphasis was to develop an alphanumeric means of encoding complete musical works (including indications on how the music "looks" in conventional notation) in such a manner that CMN can be completely recovered from the alphanumeric code language. Rather than encoding just incipits, or tones, or harmonies, the Ford-Columbia language (hereinafter referred to as FCL) is a representation of CMN in alphanumeric form.

Although the initial application of FCL was in phototypesetting specification, FCL has been used successfully for musical analysis and comparative musicology and transcription of tablature to standard notation.

<a id="H3-9-1"></a>

#### 3.9.1 Elements of FCL

Notes in FCL are specified by their positions on the musical staff. Each position (irrespective of clef, key signature etc.) of a note on a staff is encoded numerically. Horizontal displacement between notes are regarded as superfluous and two notes are separated by a single space in FCL.

Initially, information such as clefs, time signatures and key signatures are specified. For example. "25!C" is the notation for the alto clef, where 25 is the staff code of the clef and 'C' is the letter of the clef. Similarly, time signatures are indicated by "!M3:4" for waltz timing, and key signatures by "!K3#" for A-major.

Notes are indicated with one letter mnemonic duration values, and stem indication (normally redundant information, but required for CMN). In addition, dynamic marks, _staccato_, _tenuto_, _staccatissimo_, _marcato_, _fermata_ and other musicological symbols may all be specified. Repeating passages may be specified with a repeat code, or a macro-definition and expansion.

<a id="H3-9-2"></a>

#### 3.9.2 Summary

FCL has proved to be a surprisingly useful and flexible tool for purposes other than which it was designed for. It should not be too difficult to design a music performance system that reads in scores in FCL provided only a subset of the total information presented in FCL is actually used. However, the main disadvantage of FCL is its insistence on representing all aspects of CMN, which makes the input language rather cumbersome for non-typesetting applications.

<a id="H3-10"></a>

### 3.10 Plaine and Easie & ALMA

A similar input language to FCL, but much more compact and easier to key in, is the so called _Plain & Easie_ code (B. S. Brook, _The Plaine and Easie Code_, pp. 53 - 56[\[20\]](#ref-20)) which has been extended into ALMA (M. J. Gould, G. W. Logemann, _ALMA : Alphanumeric Language for Music Analysis_, pp. 57 - 90 [\[20\]](#ref-20))

<a id="H3-10-1"></a>

#### 3.10.1 Plain & Easie

Plaine and Easie (abbreviated to P&E) is a simple means of notating music alphanumerically but has a close relationship to CMN. Pitch and rhythm can be completely specified and extensions are available for dynamics, phrasing, harmony, stemming etc. After identifying the piece and composer, P&E allows specification of clef, instrument, tempo, key signature and meter in a manner similar to FCL. Notes however are given in alphanumeric symbols (A, B, C, ..., G for pitch values with accidentals) with duration expressed as numbers. Rests are indicated by hyphens and ties using the underscore or plus character. Triplets and unusual rhythmic groupings are enclosed in parentheses preceded by total duration e.g. "4(8 C D E)". Additional symbols such as accidentals, bar lines, trills and grace notes can also be specified.

<a id="H3-10-2"></a>

#### 3.10.2 ALMA

ALMA is a much more sophisticated notation system based on P&E. The amount of information to be coded, as well as the ordering of the information and choice of symbols, is ultimately up to the researcher but certain mnemonically convenient symbols are suggested. This allows most music in CMN to be adequately transcribed into ALMA, with special notations and symbols easily added to the extensible language.

In ALMA, the two dimendional CMN is represented as a one dimensional string of alphanumeric characters by multiple _scan lines_, each scan line usually representing one musical voice. The path of the scan is the order of examining music notation. Notes of pitch and duration may be grouped into _groupettes_ which may be manipulated as a single entity. Attributes may give specific musical information about the notes, change the meaning of future symbols (e.g. key signatures) or control the scan. Chords may be specified either by enclosing chord members within the dollar sign ('$') symbol or using the '<' symbol to indicate 'move scan back to start of previous note'. In other respects, ALMA notation is very similar to P&E.

Attributes may be specified for groupettes, and may possess scope. A large variety of suggested attributes ensure that conventional CMN performance symbols are adequately represented. A powerful set of scan control functions are also provided.

<a id="H3-10-3"></a>

#### 3.10.3 Summary

P&E and ALMA are very compact music input languages designed primarily for musical analysis and hence are essentially representations of CMN in a more congenial form suitable for data entry. A variety of music input languages for musical analysis have been developed along the lines of P&E and ALMA. (J. Wenker, _A Computer Oriented Music Notation including Ethnomusicological Symbols_, pp. 91 - 129 [\[20\]](#ref-20)) (R. Jackson, P. Berzott, _A Musical Input Language and a Sample Program for Musical Analysis_, pp. 130 - 150 [\[20\]](#ref-20)) Performance systems for P&E is feasible but limited by the lack of additional notation in P&E. A performance system for ALMA would be difficult due to the wide range of attributes available, the possible paths of scan control, and the extensibility of the language.

<a id="H3-11"></a>

### 3.11 Adagio

Adagio (R. Dannenberg, _The Adagio Language_[\[3\]](#ref-3)) is a very simple nonprocedural notation for scores. Each note is specified on a single line, with additional attributes such as duration, time of next note, dynamics, voice and timbre. Multiple notes may be joined together on a single line by terminating each note with a semicolon (';'). Chords can be represented by specifying that the next note starts on the same time as the current note, or by separating notes by a comma ('.').

In addition, global attributes such as tempo and rate (speed relative to current tempo) as well as control change commands such as portamento can also be set. A useful method of entering multiple voices with dissimilar timings or durations is by means of an easy "rewind time" feature that treats the rest of input as starting at the same time as the previous tempo or rate change or rewind command.

Adagio is different from other languages in that it is reasonably close to musical notation (employs similar models and paradigms) and yet Adagio is mainly a performance language. Adagio scores are not used for musical analysis but are instead read in by the Adagio interpreter which converts the notes into MIDI[^7] commands for performance on suitably equipped conventional commercially available music synthesizers. The primary advantages of Adagio are its flexibility and ease of use as well as the performance aspects of the Adagio interpreter. However, it is sufficiently primitive compared to CMN as to make it unsuitable for musical analysis.

<a id="H3-12"></a>

### 3.12 Conclusions

In the course of this review we have witnessed a surprising large range of music input languages, ranging from primitive low-level sound generating programs like MUSIC N, INV, and PLAY through to musical analysis languages like P&E and ALMA to musical typesetting control languages such as FCL. In between are programmable languages such as PILE and MIR and at the compositional level I have reviewed MUSPEC.

It can be seen that different approaches and models used in developing music languages and music performance systems can lead to radically different designs with different features and limitations. In a sense, the diversity of music input languages parallels the diversity of sound synthesis. What remains to come is a general purpose music language that combines the best features of all the above languages mentioned and allows music performance as well. While this is not difficult, the challenge to preserve simplicity on top of an overall approach may prove to be an interesting problem in computer language design. This is the problem that _Rubato_ attempts to solve.

<a id="Chapter4"></a>

## Chapter 4: A TUTORIAL TO THE RUBATO LANGUAGE

A brief and casual introduction to the _Rubato_ language is presented in this chapter. The _Rubato_ language is a typographical music input language. This language can be used to represent conventional music notation within a computer and allow for the subsequent performance of the music represented through a music synthesizer connected to a computer system via a _MIDI_ (Musical Instrument Digital Interface) connection. Musical pieces represented in the _Rubato_ language are suitable for processing by the _Rubato_ compiler **rc**(1) and bear many resemblances to modern, block-structured computer languages.

<a id="H4-1"></a>

### 4.1 INTRODUCTION

The _Rubato High Level Language_ is a music input language that is closely modeled on conventional music notation. However, it is a typographical language rather than a pictorial language, and contains additional features such as variables, 'templates', functions, procedures, dynamic structured block scoping of declarations and concurrency which are analogous to equivalent features in many other 'modern' computer languages.

This tutorial provides a casual 'hands-on' introduction to the _Rubato_ language, with emphasis on introducing the language structure and other features of the language rather than any conscious attempt at generating music of artistic merit. Not all features of the language are covered, some of the less useful features have been deliberately omitted. The next chapter provides a much more complete description of the language.

The tutorial begins with a simple example. This example will be built up as more and more features of the language are progressively introduced. The target audience will be people familiar with at least one other programming language such as Pascal or C, and possessing a minimal background in reading and writing music in conventional music notation.

<a id="H4-2"></a>

### 4.2 STARTING OUT

First of all, access to a machine with the _Rubato_ compiler **rc**(1) and the _Rubato_ interpreter **rx**(1) while reading this tutorial is highly recommended. Ideally, the machine should also be capable of playing the music entered through a music synthesizer connected via _MIDI_. (MIDI stands for Musical Instrument Digital Interface. The appendix entitled _Summary and Description of MIDI_ provides a summary of the technical aspects of MIDI.)

Currently, **rc** and **rx** will run on a DEC VAX 11/780 running Unix Version 8 and an IBM PC/XT running MS-DOS Version 3.30. Music performance is only possible on the IBM PC/XT via a player program called **adagio**(1)[\[3\]](#ref-3) and the Roland MPU-401 MIDI Processing Unit.

Musical pieces represented in the _Rubato High Level Language_ are referred to as _programs_. A program is simply a text file created using a text editor on the host machine. The text file is stored under a filename with an extension of _.r_ or _.R_. Once a _Rubato_ program has been created, it can be compiled using the command

```text
rc file.r
```

The compiler will compile the source file and generate an output file with the same file name as the program file but with the extension _.r_ replaced with _.m_. The output file can be interpreted using the command

```text
rx file.m
```

which will generate a player file, usually called **rubato.gio**. On a machine equipped with **adagio**, the music may be performed on a synthesizer via the player program using the command

```text
adagio rubato.gio
```

<a id="H4-3"></a>

### 4.3 A SIMPLE EXAMPLE

Below is a simple example, somewhat akin to the 'hello world' examples typical of most computer language tutorials, which we shall call **example1.r**. This example, when performed on a synthesizer, will cause an ascending C major scale starting from middle C to be played on the synthesizer. The individual notes in the scale (seven of them) will be spaced a second apart.

```text
conductor
{
	tempo .1 = 60
	c
	d
	e
	f
	g
	a
	b
}
```

<a id="figure1"></a>**Figure 1:** example1.r - a simple example

The first line in the above example defines an entity known as the _conductor_. Every _Rubato_ program must have at least one _conductor_ definition. The curly brackets (also called 'braces') delimit the lines associated with the _conductor_ and tells the compiler to generate code that will cause each element within the braces to be executed sequentially by the _conductor_.

The first line within the curly braces

```text
	tempo .1 = 60
```

specifies the speed that the following _notes_ shall be played. This line will cause notes played to be separated by an interval of 1/60th of a minute, i.e. one note per second. Suppose the line had been

```text
	tempo .1 = 120
```

then notes will be played at the rate of 120 notes per minute, or two notes per second.

The rest of the lines specify which notes should sound in sequence. In this context, `c` implies Middle C, `d` implies D above Middle C and so on.

It is well worth pointing out at this stage that _Rubato_ programs are free form in nature, i.e. white spaces between characters are not syntactically meaningful to the compiler and only serve to delimit characters. The format of the above example has been carefully designed to maximise human readability. Indeed, the above example could very well have been coded up thus, with resulting loss in readability:

```text
conductor{tempo .1=60 c d e f g a b}
```

<a id="figure2"></a>**Figure 2:** Another version of example1.r

Also note that the _Rubato_ compiler is case sensitive, i.e. _conductor_ and _CONDUCTOR_ mean entirely different things.

<a id="H4-4"></a>

### 4.4 JAZZING IT UP

Suppose we wanted to play the C major scale from middle C to the C above middle C. **example1.r** can be easily extended by adding one more note:

```text
conductor
{
	tempo .1 = 60
	c d e f g a b c'
}
```

<a id="figure3"></a>**Figure 3:** example2.r - the C major scale

Note that we have shortened the example considerably by joining all the notes to be played on one line.

Hence, the last note played, `c'` implies the C above Middle C. The `'` operator (the quote), when specified after a note, will cause that note to be played one _octave_ ABOVE its normal pitch[^8]. Similarly, the `'` operator (the backquote) causes a note to be played one octave BELOW its normal pitch. Given this, we can easily construct **example3.r**, which plays most of the C notes on a piano in ascending order:

````text
conductor
{
	tempo .1 = 60
	c``` c`` c` c c' c'' c'''
}
````

<a id="figure4"></a>**Figure 4:** example3.r - Jumping up octaves

Note the effect of stuttering the quote and backquote operators is to further reduce or augment the pitch of the note in decrements/increments of one octave. In particular, `c''` is equivalent to typing `c` without any trailing operators.

We can also insert _accidentals_, which modify the pitch of a note by one semitone rather than one octave. The `#` operator (sharp) will increment (augment) the pitch of the note by one _semitone_ and the `$` operator (flat) will decrement (diminish) the pitch of the note by one semitone[^9]. There is a third operator, the `%` operator (natural), which restores the note back to an unaugmented or undiminished state.

Be careful when specifying a note containing BOTH accidentals and octave operators to put the accidentals BEFORE the octave operators.

Here is an example playing the scale of A major:

```text
conductor
{
	tempo .1 = 60
	a b c#' d' e' f#' g#' a''
}
```

<a id="figure5"></a>**Figure 5:** example4.r - the A major scale

Of course, there is a much simpler way of specifying the A major scale and that is to change the _default key_ associated with the notes. This can be done with a **$key** statement.

```text
$key a major
conductor
{
	tempo .1 = 60
	a b c' d' e' f' g' a''
}
```

<a id="figure6"></a>**Figure 6:** example5.r - the A major scale

Notice that changing the default key (from C major) to A major will cause the sharps associated with the A major key to be automatically bound to the relevant notes when played. Hence no sharps need to be specified for the actual notes.

One important point with respect to the natural operator must be mentioned here. Suppose the default key is other than C major and it is desired to represent the note `e`. However, there may be an accidental bound to the note that is due to the default key. Specifying, in this instance `e%` will ensure that `e` will be played without bound accidentals.

<a id="H4-5"></a>

### 4.5 DELAYS AND DURATIONS

It would be quite boring if all notes in a piece of music had equal durations and were separated equally. _Rubato_ allows each note to be bound with two _attributes_: _delay_ and _duration_. _Attributes_ are things that can be associated with each note. _Rubato_ has quite a few attributes bound to each note, and most of these will be discussed in turn. The _delay_ attribute is a time interval associated with a note. It specifies that the _next_ note specified will not be played until the time interval represented by the _current_ note's delay has elapsed. On the other hand, the _duration_ attribute is a time interval that specifies how long a note should sound.

<a id="H4-5-1"></a>

#### 4.5.1 Delays

Delays are usually specified relative to a 'known' time interval which, for want of a better term, is called a _unit_. The default delay is usually some multiple of a unit (256). This is somewhat analogous to the specification of notes which are relative to the default key.

Two operators change the delay, the `.` operator (delaymul) and the `:` operator (delaydiv).

```text
conductor
{
	tempo .1 = 60
	c:2 d:4 e:4 c.2
}
```

<a id="figure7"></a>**Figure 7:** example6.r - Notes with delays

In **example6.r**, the first note is played at half the default delay, the next two notes are played at a quarter of the default delay, and the last note is played at twice the default delay.

Hence, the delaymul operator causes a note to have a delay that is equal to the default delay multiplied by the argument that follows the operator. Similarly, the delaydiv operator specifies a delay equal to the default delay divided by the argument following the operator.

<a id="H4-5-2"></a>

#### 4.5.2 Arithmetical expressions

We can form arithmetical expressions with the arguments of the delay operators (indeed, an arithmetical expression can substitute a number whenever a number is required). For example,

```text
c :2+:(4 * 3)-:8*3
```

causes a note to be played with the following duration:

```text
default / 2 + default / (4 * 3) - default / 8 * 3
```

Note the use of parenthesis to enforce precedence. arithmetical operators recognized by _Rubato_ include most of the common ones familiar to programmers well versed in traditional computer programming languages.

The following is a list of binary operators in _Rubato_ specified in order of increasing precedence:

- **`or`** binary OR
- **`and`** binary AND
- **`==`** Return 1 if operands are equal, 0 otherwise
- **`<>`** Return 1 if operands are not equal, 0 otherwise
- **`<`** Return 1 if first operand is less than second operand
- **`>`** Return 1 if first operand is greater than second operand
- **`<=`** Return 1 if first operand is less than or equal to second operand
- **`>=`** Return 1 if first operand is greater than or equal to second operand
- **`+`** Addition
- **`-`** Subtraction
- **`*`** multiplication
- **`/`** division
- **`mod`** modulus (remainder of first operand divided by second)

In addition, the following unary operators are recognized

- **not** binary complement
- **~** unary minus

<a id="H4-5-3"></a>

#### 4.5.3 Duration

The default duration of a note is slightly less than the delay of a note. This is because on most musical instruments, there is a perceptible interval between the playing of one note and the playing of the next. Two operators can change the duration relative to the current note delay.

The `^` operator (decdur) causes the duration of the note to decrease with respect to the current delay. Stuttering the decdur operator will cause the duration to become progressively less and less with respect to the delay and the effect is to cause the playing of notes to become more and more 'disjointed'. This is called _staccato_.

The `_` operator (incdur) causes the duration of the note to increase the duration of the note closer to the delay. A duration that is equal to or very close to the delay causes an effect known as _legato_ or 'smooth-playing' which is commonly associated with bowed stringed musical instruments such as the violin.

<a id="H4-5-4"></a>

#### 4.5.4 Delays and Tempos

The **tempo** statement, as seen in **example1.r**, consists of two arguments separated by an equals sign (`=`). The first argument is the quantity, measured in delay units, and the second argument is the number of times this quantity should count in the period of one minute. Hence,

```text
tempo :4 = 80
```

means the quantity represented by the current default delay divided by 4 should occur 80 times per minute.

Suppose the current default delay is 256 units. Then the above statement is equivalent to saying

```text
tempo 64 = 80
```

as 256 / 4 = 64. Hence the rate of flow of units with respect to time is 64 * 80 = 5120 units per minute or around 85.3 units per second.

<a id="H4-6"></a>

### 4.6 LOUDNESS (or VELOCITY)

Yet another attribute associated with a note is the note's _velocity_. This can be visualized(?!) as the loudness or intensity of the note. The term 'velocity' comes from the action of a pianist hitting the keys on a piano. Obviously, the harder the pianist strikes the keys (the faster the keys move as a result of being struck) the louder and more intense the notes that result. Similarly, the higher the velocity of the note, the louder (or brighter) it will sound on a synthesizer suitably equipped with velocity circuits (Not all synthesizers will respond to the velocity data sent by a player while playing a _Rubato_ program.)

The main velocity operator is `;`. It can be used in many ways:

```text
conductor
{
	c;80
	d;+20
	e;-20
	f; 20 + ;;
}
```

<a id="figure8"></a>**Figure 8:** example7.r - Specifying velocities

In the above example, the first note is played with an absolute velocity value of 80. The second note is played at a velocity which is 20 greater than the _current velocity_. Similarly, the third note is played at a velocity of 20 below the current velocity. The last note is played at a velocity 20 greater than the current velocity, hence it has the same velocity value as the second note. The different syntax simply illustrates how arithmetical expressions can be used when specifying attribute values. Note that stuttering the `;` operator returns a number equivalent to the default velocity value, this is then added to 20. The final result is then used as the velocity value.

<a id="H4-7"></a>

### 4.7 SOME OTHER ATTRIBUTES

Some other attributes which may seem a bit obscure but can be quite useful are the _patch_ and _channel_ attributes. These are specified by the **patch** and **channel** operators respectively.

```text
conductor
{
	c patch 5 channel 2
}
```

<a id="figure9"></a>**Figure 9:** example8.r - Patch and channels

In the above example, the note when played will be on Patch 5 Channel 2.

The patch attribute specifies the _timbre_ of a note, or how a note will sound. As an example, the sound of a note on a piano is obviously very different from the sound of a note on a bassoon or cello. This can be attributed to (with apologies to the unintentional pun) the different timbres of the instruments. Patch numbers are usually assigned to distinctive timbres within a synthesizer. Each patch number corresponds to some setting of the synthesizer voice generation controls or voice generation algorithms within a synthesizer.

The channel number of a note can be used to identify which synthesizer a note should be played on, if more than one synthesizer is connected to a computer. Even though all the synthesizers may be connected together by a common line to the computer, synthesizers can usually be set up to respond to only selected _MIDI channels_.

Absolute pitch, delay and duration values of a note can also be specified in a manner similar to the specification of velocity values. The pitch number can be specified with the **pitch** or `&` operator. The delay value can be specified with the **delay** or `\` operator. The duration value is specified with the **duration** or `!` operator. Hence, the following notes

```text
&100 \e500 !42
&+5 \e-20
```

specifies a note with a pitch number of 100 with a delay of 500 units and a duration of 42 units. The next note has a pitch number 5 greater than the default pitch number and a delay 20 less than the default delay. Absolute attribute specifications are useful when the 'note' to be played is actually directed to an instrument not actually designed as a musical instrument but has a MIDI interface. Examples of MIDI controlled equipment include stage-light controllers, effects generators and other paraphernalia associated with a concert hall. These instruments accept note commands but, instead of playing a note, will respond to the note command by turning on lights or starting a tape recorder.

<a id="H4-8"></a>

### 4.8 CHANGING DEFAULT ATTRIBUTES

So far, all the above descriptions of note attributes have made mysterious references to things called _default attribute values_. What are default attribute values and how are they changed?

Default attribute values are values taken by attributes of a note unless the attributes are changed using methods outlined previously. Initially, here are the default values for some of the attributes:

- **Delay** 256 units
- **Duration** 10 units less than the delay
- **Velocity** 64
- **Patch** 0
- **Channel** 0

Default values can be changed using the **default** statement. For example,

```text
conductor
{
	default \\\\512
	default !20
	default ;80
	default patch 42
	default channel 13
	c d e f g a b
}
```

<a id="figure10"></a>**Figure 10:** Changing Default Attributes

will change the default delay to 512 units, the default duration to 20 less than the current delay, the default velocity to 80, the default patch to 42 and the default channel to 13.

Pitch number defaults are changed using a different method:

```text
$default a = a''
conductor
{
	c d e f g a b
}
```

<a id="figure11"></a>**Figure 11:** Changing Pitch defaults

This will cause the default pitch of the note C to be the note C two octaves above Middle C rather than Middle C and so on.

There are actually two sets of pitch defaults:

```text
$default a = a'
$default A = A`
conductor
[
	{ c d e f g a b }
	{ B A G F E D C }
]
```

The note 'a' is distinguished from the note 'A'. Initially, both uppercase notes and lowercase notes are set to the same default pitch number, and hence will produce the same pitch when specified. The previous example changes the lowercase pitch default to be one octave higher and the uppercase pitch default to be one octave lower.

<a id="H4-9"></a>

### 4.9 WAYS OF COMBINING NOTES

How can notes be combined together?

<a id="H4-9-1"></a>

#### 4.9.1 Phrases

So far, in all the previous examples, notes have been joined together sequentially, separated by the delay values of each note, into a melodic line or **phrase**.

The **phrase** constructor in _Rubato_ is the pair of curly braces. Any note within a pair of curly braces will be played in sequential order in the manner outlined in the previous examples. It is important to note that phrases may contain other phrases within themselves. For example, the following two phrases are identical, i.e. they produce the same line of melody.

```text
{ c d e f c d e f g c d e f c }
{ { { c d e f } { c d e f } g } { c d e f } c }
```

Phrases are entities rather like notes and may possess attributes. Any attributes belonging to a phrase will automatically be inherited as the default attributes of each note within a phrase. Hence,

```text
{ c d e:2 }:4 f
```

all the notes within the phrase will have a default delay equivalent to the default delay _outside_ the phrase divided by 4. Note that the last note within the phrase will have a delay equivalent to the current default delay divided by 8, as the result of dividing the delays are cumulative. The note outside the phrase, on the other hand, is unaffected by the phrase delay attribute. This is in keeping with the concept of each note (or phrase) being unaffected by entities before or after it.

<a id="H4-9-2"></a>

#### 4.9.2 Chords

Another entity much like phrases or notes is the **chord**. A chord is a collection of entities delimited by square brackets '\[' and '\]'. Each entity within a chord is played simultaneously. The delay of a chord is then equivalent to the _shortest_ delay of any one of its entities.

The following is the specification of a chord that plays the C major triad

```text
[ c e g ]:4
```

Note that chords, like phrases, may possess attributes which are passed to entities within themselves.

Chords may contain other chords within itself, or even phrases.

```text
conductor
[
	{ c d e f g a b c }:8
	[ c e g ]
	{ c c c c }:4
]
```

<a id="figure12"></a>**Figure 12:** example9.r - Chords and Phrases

In **example9.r**, the two phrases and a chord within the chord tagged to the conductor all play simultaneously, forming three separate melodic lines.

<a id="H4-10"></a>

### 4.10 NAMING THINGS

Everything in Rubato can be assigned a name, which is a string of alphanumeric characters forming a distinct word. Once an entity is assigned to a name, it is considered to be _bound_ to the name until some other assignment is made to the name. Invoking the entity can be accomplished by simplying typing the name which the entity is bound to.

For example, the following example defines a phrase called _ditty_ which contains the chord definition _cmajor_ which is played at the beginning and the end of the phrase. Also, a note called _funny_ is defined outside the conductor. Note that that when an entity is bound to a name, it does _not_ get 'played'. However, the entity will be played when it is invoked by the name it is bound to.

```text
note funny = e#'':16;20
conductor
{
	phrase ditty =
	{
		chord cmajor = [ c e g ]:2
		cmajor
		{
			c d e f funny g a b funny.2
			cmajor
		}:8
		cmajor:2
	}
	ditty
}
```

<a id="figure13"></a>**Figure 13:** example10.r - Namings and block structuring

**example10.r** is also an excellent example of a concept called _block scoping_. The phrase _ditty_ is defined _within_ the phrase associated with the conductor. Similarly, the chord _cmajor_ is defined within the phrase _ditty_.

The point of all these nested definitions is _Rubato_ employs _identifier scoping rules_ when binding entities to names. The chord

```text
[ c e g ]:2
```

is _locally bound_ to the string _cmajor_ only within the phrase _ditty_. Outside _ditty_, such as elsewhere within the conductor, the binding of _cmajor_ is undefined. However, within the anonymous phrase within _ditty_, the binding of _cmajor_ is still active as the phrase is contained entirely within _ditty_, which 'holds' the binding of _cmajor_.

The note _funny_ is defined or bound to outside the conductor. It is therefore technically known as a _global binding_ and will be active for the rest of the Rubato program.

Block scoping is a powerful concept employed in many modern programming languages. _Rubato_ uses block scoping rules in order to 'hide' bindings outside areas where they are useful.

In the context of 'block scoping', a block is simply an entity which may contain other entities, i.e. a phrase or a chord. A note is not considered a block because a note cannot contain other notes or phrases or chords. Bindings can only occur either 'externally', such as in the case of the note _funny_, or within a block. In a phrase or chord, all bindings must be specified _before_ any specification of entities within the block. Note that in the phrase _ditty_, the binding of _cmajor_ is done _before_ the specification of phrases and chords within _ditty_.

<a id="H4-11"></a>

### 4.11 VARIABLES AND CONTROL FLOW

<a id="H4-11-1"></a>

#### 4.11.1 Variables

_Rubato_ allows yet another sort of binding, called _variable binding_. Variables are names associated with an integer. They can be considered as a 'location' that can hold an integer for later use. If a new integer value is bound to a variable that was previously bound (this is called _variable assignment_), the old binding is discarded.

Variables can also be _declared_ with no initial binding. In this case, a storage location is allocated for the name of the variable, but the contents of the storage location is left unbound. If an assignment occurs in some later stage, the storage location will then be bound to the new value.

The following example will make this clear.

```text
conductor
{
	var highnote = key c'''
	var longdelay
	longdelay = 10
	&highnote .longdelay
}
```

<a id="figure14"></a>**Figure 14:** example11.r - Variable declarations and assignments

Two variables are declared in **example11.r**. _highnote_ has an initial binding of the pitch number associated with the note c'''. _longdelay_ has no initial binding but is later assigned to the value 10. A note is then played using the contents of both variables.

Variable declarations are also subject to the scoping rules mentioned above.

<a id="H4-11-2"></a>

#### 4.11.2 Control Flow

Variables are really useful in directing _control flow_ within a phrase. As mentioned previously, entities within a phrase are executed sequentially. Sometimes, however, it may be desired to break the flow of execution within a phrase. Control flow statements are entities whose sole purpose is to modify the control flow within a phrase.[^10]

The following are a brief summary of control flow statements available in _Rubato_. In the context of the syntax descriptions an _expression_ is simply an arithmetical expression that evaluates to an integer value and a _statement_ is either a control flow statement, a variable assignment, or an entity (e.g. note, phrase or chord). A statement can also be a _procedure_ or _template_ call. Procedures and templates will be introduced later.

<a id="H4-11-2-1"></a>

##### 4.11.2.1 if-then-else

```text
Syntax:
if expression then statement1
if expression then statement1 else statement2
```

The _expression_ is evaluated. If the result is true (nonzero value) _statement1_ is executed. If the result is false (zero value) control flow will pass on to the next entity or statement in sequence or, if the **else** keyword is present, _statement2_ is executed.

<a id="H4-11-2-2"></a>

##### 4.11.2.2 while-do

```text
Syntax:
while expression do statement
```

The _expression_ is evaluated. If the result is true, then _statement_ is executed. The _expression_ is then reevaluated. _Statement_ will be rexecuted until the _expression_ evaluates to false (0), at which point control will be passed onto the next statement after the **while-do** statement.

<a id="H4-11-2-3"></a>

##### 4.11.2.3 do-while

```text
Syntax:
do statement while expression
```

The _statement_ is executed. The _expression_ is then evaluated. If the result is true, the _statement_ is reexecuted. This continues until the _expression_ evaluates to false. Control then passes to the next statement.

<a id="H4-11-2-4"></a>

##### 4.11.2.4 repeat

```text
Syntax:
repeat expression do statement
```

The _statement_ is repeated _expression_ number of times.

<a id="H4-11-3"></a>

#### 4.11.3 A control flow example

The following simple example will hopefully make the flavour of the above control flow statements clarified. Try and figure out what it does. If in doubt, key it in and then play it!

```text
conductor
{
	var aa = 1
	while aa < 32 do
	{
		aa = aa * 2
		if aa == 32 then
			repeat 4 do { c:aa d:aa }
		else
			c:aa
	}
}
```

<a id="figure15"></a>**Figure 15:** example12.r - Control flow

<a id="H4-12"></a>

### 4.12 PROCEDURES & TEMPLATES

<a id="H4-12-1"></a>

#### 4.12.1 Procedures

A _procedure_ is analogous to a subroutine call in a computer programming language. A procedure binding is similar to a phrase or chord binding, except during the invocation of the procedure, entities and values may be passed to the _procedure body_ which is the entity bound to the procedure name.

The invocation of the procedure is called a _procedure call_, and the values and entities passed to the procedure body are called _procedure parameters_.

Parameters may be values, variables, notes, chords phrases or even other procedure names. A procedure binding (also called 'declaration') binds its parameters to local names and act as if the entities passed to the procedure has been bound locally within the procedure. If a parameter binding is subsequently changed within a procedure, this change is invisible to the outer block that invoked the procedure.

```text
Syntax:
procedure name(parameters) procedure_body
procedure name() procedure_body
```

The _name_ of a procedure is the string by which the procedure is bound to. The _parameters_ are simply variables, notes, chords or phrases declarations[^11] separated by the ',' character. The _procedure_body_ is a block (either a phrase or a chord) that will be executed by the procedure when invoked.

For example,

```text
procedure playtwice(phrase p)
{
	p
	p
}
```

will play a phrase twice in succession. This procedure can be invoked by passing a name bound to a phrase or an actual phrase:

```text
	playtwice(phrasename)
	playtwice({c d e f g a b})
```

A more general procedure could be written to play a phrase a certain number of times:

```text
procedure playmany(phrase p, var n)
{
	repeat n do p
}
```

This can be called by passing either a variable or an expression as the second parameter:

```text
	playmany(phrasename, i)
	playmany({c d e f g a b}, 23+4*7)
```

We can also define the previous procedure using a **while-do** statement in the procedure body:

```text
procedure playmany2(phrase p, var n)
{
	var i = 0
	while i < n do
	{
		p
		i = i + 1
	}
}
```

A procedure with no parameters is declared with nothing in between the parentheses, but the parentheses must still be included in the definition.

<a id="H4-12-2"></a>

#### 4.12.2 Templates

_Templates_ are conceptually similar to procedures but much easier to use. A template is simply a procedure with an implied procedure body. An example will make this clear:

```text
template mybar { :8, :4, :4;20, :8 }
```

If this is invoked as

```text
mybar(c, d:2, e, f)
```

this would be equivalent to the phrase

```text
{
	c:8
	d:2:4
	e:4;20
	f:8
}
```

<a id="H4-13"></a>

### 4.13 TYING IT ALL TOGETHER

This tutorial of _Rubato_ concludes with an example featuring many of the features that has been introduced in the previous pages. It actually plays a 'real' (!) piece of music. The transcription of this piece into the syntax accepted by _Rubato_ is deliberately stylized in order to show off as many features in Rubato as possible. Note that comments in the code are delimited by the strings `/*` and `*/`.

```text
/*
 *	over.r
 *
 *	OVER THE RAINBOW
 *	From the M-G-M Picture "THE WIZARD OF OZ"
 *	by E.Y. Harburg & Harold Arien
 *
 * Transcribed to Rubato by Chris Tham (christie@basser.cs.su.oz)
 */
$key f major
$default a = a'
conductor
{
	procedure alternate(note lo, note hi)
	{
		{ lo:8 hi:8 lo:8 } hi:8^
		repeat 2 do { lo:8^ hi:8^ }
	}
	phrase song =
	{
		/* this plays the melody of the song from start to end */
		phrase common =
		{
			template motif(:4, :8, :8, :4, :4)
			phrase theme =
			{
				/* Plays the main theme of the song
				 * This is repeated at least 6 times
				 * in the song */
				f`:2 f:2
				motif(e, c, d, e, f)
				f`:2 d:2
				c
				d`:2 b`:2
				motif(a`, f`, g`, a`, b`)
				motif(g`, e`, f`, g`, a`)
			}
			/* common part, song has structure common common */
			theme f`:2 r:2
			theme f`:2+:4 r:8 c:8^
			alternate(a, c) alternate(b, c)
			d:2 d:4*5 r:8 c:8^
			alternate(a, c) alternate(b%, d)
			e:2_ e:2_ g:2 d:2
			theme
		}
		common f`:2 r:2
		common f`:4*3 r:8 c:8^
		alternate(a, c)
		{ b:8 c:8 b:8 } c:8^ { b:8 c:8 d:8 e:8 }
		f:4*(4+2+1)
		r:4
	}
	/* set up global (absolute) values */
	tempo :4=80
	song
}
```

<a id="figure16"></a>**Figure 16:** over.r - Over The Rainbow

<a id="Chapter5"></a>

## Chapter 5: A SPECIFICATION OF THE RUBATO LANGUAGE

This chapter attempts to define the _Rubato_ language with respect to the major syntactic and semantic components of the language.

A EBNF grammar[\[21\]](#ref-21) for the language is presented in _Appendix A_. The grammar gives a reasonably precise syntactic definition of the language, although it is deliberately less precise and much more forgiving in the semantics of the language. If the grammar is used to implement a compiler for the language, the semantic analysis phase should weed out questionable constructs which are syntactically acceptable to the grammar.

This chapter will not attempt to describe the semantics of the language in a formal or rigorous manner, i.e. using the techniques of denotational semantics. An interesting follow-up to this thesis would be a rigorous denotational semantic specification of the _Rubato_ language coupled with axiomatic and fixed point analysis of the semantics of programs written in the language.

<a id="H5-1"></a>

### 5.1 Fundamental objects (types) of the language

The _Rubato_ language has the following fundamental types or objects:

<a id="H5-1-1"></a>

#### 5.1.1 Number

A number is a whole (signed integer) value ranging from MININT to MAXINT[^12]. A number is not a true object in the language but more like a fundamental type. It cannot exist independently but must always be bound to an object. It is used as a component of the various other types in the language and is the type which is the result of an arithmetical expression within the language.

<a id="H5-1-2"></a>

#### 5.1.2 Note

Notes are the most basic building blocks of the language. A note corresponds to a musical note in a written score. In the _Rubato_ language, a note is composed from its individual _attributes_. If the note is regarded as an event specification in a multidimensional perception space, then its attributes are the principal dimensions of the space.

The attributes of a note are:

- **pitch** a number corresponding to the frequency in which the note will sound in the audio spectrum. The relationship between the pitch number to the note frequency is determined by the synthesizer controlled by the _Rubato_ system. If the target performance system is based on the MIDI specification, then the pitch number will range from 1 (lowest) to 127 (highest).
- **delay** the time interval between the note and the next note in sequence. This is given as a positive number from 0 to MAXPOS[^13]. This number is a multiple of a time interval known as a _unit_, which is relative to the current _tempo_ or speed of the performance.
- **duration** the time interval in which the note will sound. This is a number similar to the delay value, i.e. a multiple of a unit.
- **velocity** the loudness or dynamic value of a note. On a performance system using MIDI, this is a number ranging from 1 to 127.
- **patch** the timbre of the note. This is a number ranging from 0 to 127 on MIDI systems.
- **channel** the output channel of the note. This is a number ranging from 0 to 15 on MIDI systems.
- **pressure** This is also related to the dynamics of the note and is usually related to the note's acoustic loudness. This is currently not implemented by the system.

Each note in a program written in the language will have all the above attributes, even if they are not specified explicitly by the user. Note attributes which are not specified will default to a value which depends on the lexical context of the note in the program.

<a id="H5-1-3"></a>

#### 5.1.3 Phrase

A phrase is a collection of _block objects_[^14] which will be invoked sequentially. A phrase can contain _object definitions_ which must occur in the beginning of the phrase, before the actual objects contained in the phrase.

<a id="H5-1-4"></a>

#### 5.1.4 Chord

A chord is a collection of _block objects_ which will be invoked simultaneously or concurrently. A chord can also contain object definitions which must occur in the beginning of the chord, before the actual objects contained in the chord.

<a id="H5-1-5"></a>

#### 5.1.5 Envelope

An envelope is a specification of a sequence of linear functions to be applied in sequence to objects within a phrase. The specification of envelopes have not been finalised and envelopes are not currently implemented within the system.

<a id="H5-1-6"></a>

#### 5.1.6 Variable

A variable is an object that may hold a number. It is simply a read and write storage location which initially contains an undefined number. Once written to, future reads from the storage location will yield a number equivalent to the last number stored in the location. Variables may be used in the language wherever a number may be used.

<a id="H5-1-7"></a>

#### 5.1.7 Procedure

A procedure is either a phrase or chord which accept _parameters_[^15] when invoked and pass these parameters onto the phrase or chord.

<a id="H5-1-8"></a>

#### 5.1.8 Function

A function is a procedure that returns a number back to the environment of the invoker. Functions also accept parameters when invoked and pass on these parameters to the phrase or chord. The number returned by a function can be used in the language wherever a number may be used.

<a id="H5-1-9"></a>

#### 5.1.9 Template

A template is a procedure with note parameters. It has an implicit phrase associated with it which is simply the phrase consisting of each note specified in the parameter in sequence from the first parameter of the template to the last parameter of the template.

<a id="H5-1-10"></a>

#### 5.1.10 Expression

An arithmetical expression is a group of numbers joined by either unary or binary _arithmetical expression operators_ forming an expression tree when parsed. An expression has a _result_ value which is equivalent to the number returned when the expression is evaluated. An expression may substitute for a number whenever one is required.

<a id="H5-1-11"></a>

#### 5.1.11 Statement

A statement is an object that may be contained within a phrase or a chord other than a chord or a phrase. There are many types of statements, including **default** statements, control flow statements, assignment statements, call statements which invoke a procedure or a template and other statements relating to music performance such as the **tempo** statement.

<a id="H5-2"></a>

### 5.2 Lexical conventions

Programs written in the language are composed of _tokens_. Blanks, tabs, newlines, and comments (collectively, "white space") are ignored except as they serve to separate tokens. Some white space is required to separate otherwise adjacent identifiers, keywords and constants. If the input stream has been parsed into tokens up to a given charater, the next token is taken to include the longest string of characters which could possibly constitute a token. Upper case and lower case characters are considered significant when parsing a token.

The character sequences `/*` and `*/` introduce and terminate a comment, respectively. Comments do not nest.

The following classes of tokens are distinguished in the language:

<a id="H5-2-1"></a>

#### 5.2.1 Identifiers (Names)

An identifier is a sequence of letters and digits. The first character must be a letter. An identifier corresponds to a storage location either containing an object, i.e. a variable, or containing a _pointer_ to an object, i.e. everything else. All characters in an identifier are considered significant.

<a id="H5-2-2"></a>

#### 5.2.2 Keywords

The following identifiers are reserved for use as keywords, and may not be used otherwise:

```text
and             channel         chord           conductor
default         delay           do              duration
else            envelope        extern          function
identifier      if              key             major
measure         minor           mod             not
note            or              patch           phrase
pitch           pressure        procedure       repeat
return          scale           template        tempo
then            to              var             velocity
while
```

Some reserved words are not currently implemented, but they are still recognized by the parser.

<a id="H5-2-3"></a>

#### 5.2.3 Constants

Constants are tokens returning a number. This can either be a sequence of digits `0` to `9`, or an arithmetical expression of constant values which evaluate to a number.

<a id="H5-2-4"></a>

#### 5.2.4 Pitch Values

Pitch values are special constants returning a _key_. A key is a letter from the set of {`A,B,C,D,E,F,G,a,b,c,d,e,f,g,r,R`} together with a sequence of _accidentals_ bound to the key. An accidental is one of

- **`#`** sharp
- **`$`** flat
- **`%`** natural

<a id="H5-2-5"></a>

#### 5.2.5 Special characters

Some special characters are accepted by the language in the same way as keywords are. These characters are given the following symbolic names.

- **`{`** BEGIN_PHRASE
- **`}`** END_PHRASE
- **`\[`** BEGIN_CHORD
- **`\]`** END_CHORD
- **`(`** BEGIN_PAREN
- **`)`** END_PAREN
- **`=`** ASSIGN
- **`|`** BAR
- **`&`** pitch
- **`\`** delay
- **`;`** velocity
- **`!`** duration
- **`@`** pressure
- **`'`** INCPIT
- **`'`** DECPIT
- **`_`** INCDUR
- **`^`** DECDUR
- **`.`** DELAYMUL
- **`:`** DELAYDIV
- **`,`** COMMA
- **`==`** EQUALS
- **`<>`** NOTEQUALS
- **`<`** LESS
- **`>`** GREATER
- **`<=`** LE
- **`>=`** GE
- **`+`** ADD
- **`-`** SUBTRACT
- **`*`** MULTIPLY
- **`/`** DIVIDE
- **`~`** UMINUS

<a id="H5-3"></a>

### 5.3 Arithmetical expressions

These are usually written in infix notation, with precedence of operators enforced by a superset of algebraic precedence rules. The following binary operators are accepted in order of increasing precedence:

- **`or`** binary OR
- **`and`** binary AND
- **`==` and `<>`** Return 1 if operands are equal (not equal), 0 otherwise
- **`=`** Return 1 if the first operand is less than (greater than) or equal to the second operand, 0 otherwise
- **``** Return 1 if the first operand is less than (greater than) the second operand, 0 otherwise
- **`+` and `-`** Integer addition (subtraction)
- **`*` and `/` and `mod`** Integer multiplication (division) (modulus or remainder)

In addition, the following unary operators are available, in order of increasing precedence:

- **`not`** Binary complement
- **`~`** unary minus
- **`.` and `:`** delaymul and delaydiv operators

The following may also be treated like a number in an arithmetical expression, these are collectively termed _number equivalents_.

- **variable** This is an identifier bound to a number
- **key factor** This is the keyword `key` followed by a pitch constant. It is numerically equal to the pitch number corresponding to the pitch constant.
- **current value** this is the _default_ or nominal value of the attribute of a note. The current value is obtained by stuttering the attribute keyword, e.g. `!!` gives the current (default) value of the duration attribute.
- **function call** This is numerically equal to the value returned by invoking the function. A function call is specified by _function_identifier_ `(`_parameter_list_`)` A parameter list is a list of numbers, notes, phrases, chords, templates, procedures, functions or envelopes separated by COMMA.

<a id="H5-4"></a>

### 5.4 The Specification of A Note

A Note can be:

1. A pitch constant
1. The keyword `pitch` or the symbol `&` followed by an arithmetical expression.
1. An identifier defined as a note followed by an arbitrary number of INCPIT and DECPIT operators.

An arbitrary number of _attributes_ may be tacked on to the end of a note specification and forms part of the note. Attributes may be tacked on in any order and will be evaluated from left to right. In other words, if two attributes tacked on the note have the same type, the effect is either cumulative or the rightmost attribute will have precedence over the leftmost attribute.

Attributes are specified as either an attribute operator followed by an expression, an attribute operator with a _relative expression_, or an attribute operator with no trailing expressions. The following attributes are currently recognized:

- **`delay` or `\`** followed by an expression or relative expression
- **`.` or `:`** followed by a factor or a factor and a relative expression.
- **`duration` or `!`** followed by an expression or relative expression
- **`^` or `_`** not followed by anything
- **`velocity` or `;`** followed by an expression or relative expression
- **`pressure` or `@`** followed by an expression or relative expression
- **`patch`** followed by an expression
- **`channel`** followed by an expression

A relative expression is one of the following operators:

- `+`
- `-`
- `*`
- `/`
- `mod`

followed by an expression. An attribute specified with a relative expression can always be transformed semantically to an attribute specified with an expression by the following rule.

```text
attribute rel_operator expression
can be transformed to
attribute current_value rel_operator ( expression )
```

For example, `;+20*3` is semantically equivalent to `;(;;+(20*3))`.

DELAYMUL and DELAYDIV attribute specifications are special cases. A _factor_ is a number or a number equivalent which is not specified as an arithmetical expression. A number equivalent is a key factor, an identifier bound to a number, the current value of an attribute, or the value returned by a function call. However, an arithmetical expression enclosed within parentheses is regarded as a factor. A DELAYMUL and DELAYDIV attribute specification can be semantically to a `delay` attribute specification.

```text
. factor
is transformed to
delay ( current_value * factor )
and
: factor rel_operator expression
is transformed to
delay ( ( current_value / factor )  rel_operator expression )
```

<a id="H5-5"></a>

### 5.5 Statements

The following types of statements are currently valid within a phrase or chord body. Notice that within this section, a _statement_ is a term referring to either a statement, note, phrase, chord, or envelope.

<a id="H5-5-1"></a>

#### 5.5.1 if-then-else

```text
if expression then statement1
if expression then statement1 else statement2
```

Evaluate _expression_. If result is nonzero, execute _statement1_, else execute _statement2_, if specified.

<a id="H5-5-2"></a>

#### 5.5.2 repeat-do

```text
repeat expression do statement
```

Evaluate _expression_. If result is nonzero, execute _statement_ iteratively the number of times specified by _expression_.

<a id="H5-5-3"></a>

#### 5.5.3 while-do

```text
while expression do statement
```

Evaluate _expression_. If result is nonzero, execute _statement_ and reevaluate _expression_ repeatedly until _expression_ evaluates to zero.

<a id="H5-5-4"></a>

#### 5.5.4 do-while

```text
do statement while expression
```

Execute _statement_ and evaluate _expression_ repeatedly until _expression_ evaluates to zero.

<a id="H5-5-5"></a>

#### 5.5.5 tempo

```text
tempo expression1 = expression2
```

_expression1_ must evaluate to the number of units used as a counting quantity. _expression2_ evaluates to the number of times the counting quantity must occur in one minute.

<a id="H5-5-6"></a>

#### 5.5.6 default

```text
default pitch1 = pitch2
default attribute
```

Changes the default value associated with note pitches or attributes. The first form of the statement implies a transposition of all notes up or down given by the offset of _pitch2_ relative to _pitch1_. The second form sets the default value of the note attribute to the value specified.

<a id="H5-5-7"></a>

#### 5.5.7 Assignment

```text
identifier = object
```

Assigns (binds) object to identifier. Identifier assignments are 'strongly-typed', i.e. an object of a given type can only be assignmed to an identifier of the same type.

<a id="H5-5-8"></a>

#### 5.5.8 Template and Procedure Calls

```text
identifier (parameter_list)
```

Invoke a template or procedure, depending on the type of the identifier. The syntax of a template or procedure call is deliberately made identical to the syntax of a function call.

<a id="H5-5-9"></a>

#### 5.5.9 return

```text
return expression
```

Only valid within the context of a function body, this statement returns the value of the expression to the invoker of the function.

<a id="H5-6"></a>

### 5.6 Identifiers and Definitions

Identifiers may be defined within the body of a phrase or a chord and 'typed' to an object type. Definitions must occur before the executable body of the phrase or chord. The definition of an identifier may also bind the identifier to an object. If a binding is not effected in the definition, the identifier can be bound later on within the phrase or chord through an assignment statement.

The syntax of an identifier definition is:

```text
type identifier
type identifier = object
procedure identifier(parameter_defs) block
function identifier(parameter_defs) block
template identifier(template_defs)
```

A _type_ is either a note, phrase, chord or envelope. _parameter_defs_ is a list of definitions with no initial bindings separated by COMMA. A _block_ is either a phrase or a chord. _template_defs_ is a list of attribute lists separated by COMMA.

<a id="H5-7"></a>

### 5.7 Scoping rules

The _Rubato_ language employs static or lexical scoping rules on nested definitions. Definitions may be nested in the same way phrases or chords may be nested. Lexical scoping implies that the scope of an identifier is delimited by the phrase or chord that encloses the definition. The identifier is considered undefined outside the phrase or chord. Hence, the deeper the nesting of a phrase or chord, the more identifiers are defined within it (as it can access all its local variables plus variables belonging to its lexical environment). Conversely, a phrase or chord is not allowed to access variables belonging to phrases and chords nested within it. If an identifier declared within a phrase or a chord possesses the same name as an identifier declared outside the phrase or chord, the locally defined identifier hides or suspends the definition of the previous definition until the end of the phrase or chord.

<a id="H5-7-1"></a>

#### 5.7.1 Global definitions

Definitions may also occur outside the body of a phrase or chord, within the main source file. Such identifiers have global scope for the rest of the source file.

<a id="H5-7-2"></a>

#### 5.7.2 External definitions

External definitions are like global definitions, except that they are preceeded by the keyword `extern`. Also, they may not be initialized, i.e. bound to an object in the definition. External definitions also have global scope for the rest of the source file, but the actual definition of the (global) identifier lies within another source file. References to the same external or global identifier name are references to the same object.

<a id="H5-8"></a>

### 5.8 conductor

```text
conductor block
```

Every complete _Rubato_ program (merger of the individual source files linked together) must have one `conductor` definition. It represents the phrase or chord that is executed by the _Rubato_ machine when initially started up.

<a id="H5-9"></a>

### 5.9 Compiler control lines or pragmas

These 'statements' control the action of the compiler when parsing the source file and are not actually part of the program proper.

<a id="H5-9-1"></a>

#### 5.9.1 $key

```text
$key pitch major
$key pitch minor
$key accidental_list
```

This controls the key signature that notes coded in the file should be interpreted in. Currently, only major keys are implemented. The _pitch_ specified may include accidentals.

The alternative `$key` specification takes an _accidental_list_, which is a list of pitches with accidentals separated by COMMA.

<a id="H5-9-2"></a>

#### 5.9.2 $default

```text
$default pitch1 = pitch2
```

This controls the default octave or initial transposition of note pitches coded up for the rest of the language. It forces the compiler to transpose all notes coded up by an offset equal to the pitch number of _pitch1_ subtracted from the pitch number of _pitch1_. Uppercase pitches and lowercase pitches can be transposed independently, allowing two octaves to be readily accessible without the use of INCPIT or DECPIT operators.

<a id="H5-10"></a>

### 5.10 Format of a source file

A source file in the language is simply a list of global or external definitions together with a `conductor` definition. Compiler control lines may intersperse the definitions.

<a id="Chapter6"></a>

## Chapter 6: A SPECIFICATION OF THE RUBATO MACHINE

<a id="H6-1"></a>

### 6.1 Introduction

The _Rubato machine_ is a computing machine (whether real or simulated) which is designed to execute object code generated by the _Rubato_ language compiler. The architecture of the _Rubato_ machine has been carefully tuned to the design of the _Rubato_ Language. Although many concepts, basic objects and design paths in the _Rubato_ Language have been mirrored or have an equivalent counterpart in the _Rubato_ machine, the two designs are actually independent of each other. It is possible to vary the design of either the language or the machine without significantly affecting the other. It is also possible to write standalone machine code for the _Rubato_ machine which uses machine instructions seldom or never generated by the compiler, or write code which has a different 'feel' to output generated from the compiler.

In this chapter, a basic description of the _Rubato_ machine will be given.[^16] Possible correspondences between statements and data types in the _Rubato_ language to instructions and objects in the _Rubato_ machine will be pointed out, as well as design decisions taken to resolve differences between the two levels of languages. Possible implementations of the _Rubato_ machine will also be mentioned.

<a id="H6-2"></a>

### 6.2 _Rubato_ Machine Organization

The architecture of the _Rubato_ machine has the following conceptual components. Remember that the following components have been separated only in the design. An _implementation_ of the _Rubato_ machine may choose to combine many components into one.

- multiple instruction execution units, or one multiplexed instruction execution unit designed to execute several virtual execution units
- code store
- data store
- expression stack(s)
- environment stack(s)
- activation stack(s)
- envelope stack(s)
- MIDI queue(s)
- attribute registers

<a id="H6-2-1"></a>

#### 6.2.1 The Code and Data stores

The code and data stores are random access vectors used for storing _Rubato_ machine instructions and any data that needs to be accessed in the execution of _Rubato_ machine _programs_.

A _program_ is a list of instructions and data which is preloaded into the _Rubato_ machine when it is first started up. Conceptually, the code store is a read only random access vector which is preloaded into the _Rubato_ machine, and the data store is a read and write storage area which can be modified in the course of an execution of a _Rubato_ program. The execution of a _Rubato_ program is the sequenced execution, or concurrent sequenced executions, of a segment or segments of _Rubato_ instructions in the code store.

It is possible that an implementation of the _Rubato_ machine may choose to combine the code and data stores into a single store. A combined code and data store will allow the possibility of writing self modifying code. However, if the two stores are implemented as separate entities, then it is patently impossible for _Rubato_ instructions to be self modifying as there are no means of storing values into the code store.

<a id="H6-2-2"></a>

#### 6.2.2 Data types

The _Rubato_ machine knows of the following data types.

- machine instructions
- integers
- addresses

_Machine instructions_ are entities stored in the code store. Each instruction may occupy one or more locations in the code store, depending on the number of operands associated with the instruction.

_Integers_ are numbers manipulated by the machine instructions in the execution of a _Rubato_ program. _Rubato_ integers are signed whole numbers bounded above and below. I. e. it is possible for an integer to be interpreted as a positive or a negative whole number and there exist two numbers which we shall call MININT and MAXINT. No _Rubato_ integer can be smaller than MININT or larger than MAXINT in value. The values of MININT and MAXINT are determined by the implementation.[^17]

_Addresses_ are pointers to elements in either the code or data stores. Knowing the address of a location within the two stores allows access to that particular location in the store.

Each location in the code and data store must be large enough to contain an integer or address or part or all of an instruction. In fact, an implementation of the _Rubato_ machine may choose to represent the three data types identically within the machine. The machine will then not make a distinction between the three data types internally.

<a id="H6-2-3"></a>

#### 6.2.3 The Stacks

The _Rubato_ Machine is basically a stack oriented architecture. A _stack_ is a data type that can hold a number of data items such as addresses or _Rubato_ integers. Values are placed on the stack and retrieved from the stack in a **Last in First Out (LIFO)** order.

The _Rubato_ Machine associates the following stacks with each instruction execution unit.

<a id="H6-2-3-1"></a>

##### 6.2.3.1 The expression stack

is used for expression evaluation. Each item in the expression stack can hold either an address or an integer.

<a id="H6-2-3-2"></a>

##### 6.2.3.2 The environment stack

is a stack of _environment records_. Each environment record contains a list of pointers to locations within the code or data store. The pointers in the environment record can be used to indirectly refer to actual storage locations on the code or data store.

The _Rubato_ High Level Language compiler uses environment records and the environment stack to implement block scoping of variables. The complete environment stack contains pointers to all the non-global variables that can be referenced by the instruction corresponding to the currently 'executing' _Rubato_ statement in the _Rubato_ High Level Language.

Each procedure or function in the _Rubato_ High Level language may possess local declaration and the environment record holds all the declarations within a procedure or function. The environment stack contains an environment record for each procedure or function which statically encloses the point of execution. The topmost environment record contains declarations local to the currently executing procedure or function, and the other environment records are stacked in the order in which their corresponding procedures and functions nest the current procedure or functions.

<a id="H6-2-3-3"></a>

##### 6.2.3.3 The activation stack

is used to store control information for all currently activated procedures and functions. The activation information is known as an activation record and it is stacked in the most recent order of activation. An activation record contains

- a _dynamic link_ which is a reference to the activation record of the calling procedure or function.
- a _return address_ which is a pointer to the location in the code store to which execution of the caller should return when the current procedure or function exits.
- the _environment stack_ of the activated procedure.

<a id="H6-2-3-4"></a>

##### 6.2.3.4 The envelope stack

is used to hold the list of currently active envelopes. Each envelope corresponds to the notion of an envelope in the _Rubato_ High Level Language and contains an address of a list of integers on the data store which form the envelope. Envelopes affect the values of the attribute registers.

<a id="H6-2-3-5"></a>

##### 6.2.3.5 Implementation of the stacks

can mirror the conceptual design of the stacks or an implementor may choose to combine some or all of the stacks. The design of the _Rubato_ machine does not assume any particular implementation of the stacks. For example, if implemented literally, the implementation of the environment and activation stacks would imply copies of environment records are kept in separate environment stacks in each activation record. It is far more efficient to implement environment records in a common list and environment stacks can then point to elements of this list.

The activation and environment stacks may be merged together into a single stack with the following within each activation record

- a dynamic link
- a _static link_ referring to the activation record of the calling procedure or function.
- a return address
- an environment record

<a id="H6-2-4"></a>

#### 6.2.4 Attribute registers

Each instruction execution unit is associated with a set of attribute registers. These registers are used to store default values for _Rubato_ note attributes. These registers may be read from and written to by _Rubato_ machine instructions.

There are registers for the following attributes of a note:

- Pitch (N)
- Delay (Y)
- Velocity (V)
- Pressure (P)
- Duration (D)
- Patch (A)
- Channel (C)

There are actually two sets of registers, the _default_ set and the _next note_ set. The default set can be read from and written to. Currently, the next note set can only be written to because there are no instructions that can access the contents of the next note registers. The following sequence occurs in the playing of a _Rubato_ note

1. Immediately after the playing of the previous note, the contents of the default register set are copied to the next note register set.
1. Some, all, or none of the next note attribute registers may be modified by intervening instructions.
1. The note is then played. The values used for the attributes are taken from the next note registers.

<a id="H6-2-5"></a>

#### 6.2.5 The Instruction Execution Unit(s)

Depending upon the implementation, there may be multiple concurrent units executing _Rubato_ machine instructions or one instruction execution unit multiplexed to simulate many virtual instruction execution units. The implementation may enforce a fixed limit to the number of active real or virtual execution units that may operate concurrently. In the context of a _Rubato_ program, each execution unit is a separate instance of the execution of a _Rubato_ program. Each execution unit is a separate entity with its own set of stacks and registers. However, the code and data stores are shared by all execution units.

An execution unit can be brought to life by other execution units. The parent execution unit will then continue executing the next instruction. The newly created or child execution unit will originally have copies of the attribute registers, environment stack and envelope stack. It will have new activation and expression stacks.

If a 'return from procedure or function' instruction is encountered by an instruction execution unit when it is executing at the very bottom level, then the instruction execution unit will cease to exist.

Hence, instruction execution units are 'virtual' in the sense that they are created and destroyed dynamically. Allocation of instances of these virtual instruction execution units (each <em>V</em>irtual <em>I</em>nstruction <em>E</em>xecution <em>U</em>nit will be referred to as a **VIEU** from now on) to real execution units are made by the _Rubato_ machine dynamically.

<a id="H6-2-6"></a>

#### 6.2.6 The MIDI queue

This is the queue of notes and control information to be sent across a MIDI network to an external MIDI device(s), e.g. a synthesizer. This queue is added to by VIEUs when playing a note or a chord and depleted by the section of the _Rubato_ machine responsible for piping MIDI commands across to the MIDI device or devices.

<a id="H6-3"></a>

### 6.3 _Rubato_ Machine Instructions

Instructions for the VIEU are a mixture of 0 operand, 1 operand and 2 operand instructions. Hence, an instruction may take 1, 2 or 3 code store locations. Instructions may also take implicit operands from the expression stack.

<a id="H6-3-1"></a>

#### 6.3.1 Relative Procedure Level

This is used in references to the environment stack. The relative procedure level is given by

```text
relative procedure level = level of reference - level of declaration
```

where _level of reference_ is the level of the procedure (or function) in which the object is referenced and the _level of declaration_ is the level of the procedure in which the object is declared.

<a id="H6-3-2"></a>

#### 6.3.2 Object addressing

Objects declared local to a procedure or function are addressed by the pairs _m_ and _n_. The first component of the pair is the relative procedure level of the declaration of the object and the second component is the ordinal of the variable within that procedure. Hence "0, 0" refers to the first object declared in the current procedure or function, "0, 1" to the second and so on. "1, 0" refers to the first object declared in the statically enclosed procedure or function. If a procedure or function has arguments, then they will be referred by negative _n_ numbers. Hence, "0, -1" refers to the first argument to the current procedure or function, "0, -2" to the second, and so on.

<a id="H6-3-3"></a>

#### 6.3.3 Procedure or function calling

The effect of a "call" instruction is to build a new environment stack, place arguments of the procedure or function onto the new environment record, place a new activation record on the activation stack, and then jump to the first instruction of the called procedure or function.

The new environment stack consists of a new environment record on top followed by environment records obtained from the current environment stack after deleting the topmost _m_ records from the stack.

The new activation record will contain the address of the instruction following the procedure or function call as the return address and the newly constructed environment stack.

<a id="H6-3-4"></a>

#### 6.3.4 Procedure or function calling

There are two possible calling sequences. The first and simplest does not build a new environment stack at all but simply uses the old one. This is executed by the _jsub_ and _jsubs_ instructions. A return from a _jsub_ or _jsubs_ instructions is effected using a _retsub_ instruction.

The second calling sequence will build a new environment stack and allow the passing of parameters. It is done as follows

```text
\&... push all arguments, in order of last to first
push	addr
call	m, n
\&...
```

_m_ refers to the number of environment records to delete from the current environment stack when creating the new environment stack. _n_ refers to the number of arguments that have been pushed onto the expression stack that will be passed to the called procedure or function. _addr_ is the address of the invoked procedure or function.

The return from a called procedure or function can be effected by a _ret_, _retf_ or , _retfs_ function. A _ret_ instruction will return back to the caller after deleting the activation record. The _retf_ and _retfs_ instructions return a value back to caller which is pushed down the caller's expression stack.

<a id="H6-3-5"></a>

#### 6.3.5 Notes and chords

The _note_ or _notes_ instructions will queue a note on the MIDI queue. Notice that a note is specified by a pitch and the attribute values taken from the next note attribute registers. A note with a pitch of 0 is equivalent to a rest of specified delay and duration.

The _chord_ or _chords_ instructions are very similar to the _note_ or _notes_ instructions except that the note queued will be played at the same time as the previous note queued.

<a id="Chapter7"></a>

## Chapter 7: THE IMPLEMENTATION OF THE RUBATO SYSTEM

The implementation of the _Rubato_ system was broken into two halves which are essentially independent. The first half was the _Rubato_ compiler, while the second half was a combined assembler, linker, interpreter and debugger (an executor). In addition, a player is available to perform music generated by the compiler-executor pair. The compiler translates source files written in the _Rubato_ language into assembly files. Assembly files are essentially text files containing one _Rubato_ machine instruction per line. In addition, some pseudo instructions were generated by the compiler which are intercepted by the assembler. The assembler will also allow labelling of instructions and data, and will attempt to resolve forward label references generated by the compiler. Similarly, the interpreter generates a player file containing a list of notes to be played during the music performance. This player file is read in by the player.

The compiler is called **rc** (which stands for _Rubato_ <em>C</em>ompiler<em>)</em> and the other half of the implementation is called **rx** (_Rubato_

The main reason for the separation of the compiler and executor was to isolate the _Rubato_ language from the _Rubato_ machine. As these are actually independent designs, they should be implemented independently. Furthermore, since the _Rubato_ language uses the CMN model of music representation and does not have implicit performance rules built into the model of representation, it was decided that the performance rules should be encoded in the executor.[^18]

The current version of the interpreter will not actually drive the music performance hardware directly. Instead, the details of actual music performance were left to yet another program called the player. Although the player is not technically part of the _Rubato_ system proper, it is however essential for music performance. This separation is done so that the executor can be implemented as quickly and as painlessly as possible. Ideally, the player should be incorporated into the interpreter so that real-time performance can be achieved by the interpreter. Rather than attempting to design a player from scratch, an existing player was used and the interpreter was designed to generate files that can be read in by the player for music performance. The player chosen for this task was the **Adagio** player developed at Canegie-Mellon University as part of the CMU MIDI Toolkit.[\[3\]](#ref-3) The reasons Adagio was chosen were mainly due to:

- the simplicity of the format of its input file,
- the similarities between Adagio note attributes and _Rubato_ note attributes,
- the availability of Adagio on the system and hardware that _Rubato_ was implemented on. (IBM PC/XT running MS-DOS 3.30)

<a id="H7-1"></a>

### 7.1 The rc compiler

This was the first part of the _Rubato_ system to be implemented. A parser for the _Rubato_ language was developed jointly with the design of the language from the EBNF grammar. The **yacc**(1) parser generator in Unix Version 8 was used to generate an LALR(1) parser for the _Rubato_ language. However, the lexical analyser was written by hand in C. Although the Unix lexical analyser generator **lex**(1) could have been used to generate a lexical analyser for the _Rubato_ language as it is currently specified, when the language was in its initial stage, a hand-written lexical analyser was necessary due to an early condition that required the lexical analyser to be context sensitive and also emit more than one token for certain characters seen on input depending on context. Fortunately, when the language was finalised, most of these context-dependent irregularities were removed.

The compiler used the strategy of generating a parse tree for semantic analysis and code generation. As it currently stands, the compiler will attempt to build a parse tree for each global definition. It then walks through the parse tree performing semantic analysis. Some semantic transformations may be effected by either the parser or the semantic analyser to reduce relative expressions to normal expressions and to convert delaymul and delaydiv attributes to normal delay attributes. Identifier typing is done by the parser and flagged to the lexical analyser. Hence the lexical analyser is still to some degree context sensitive, but the context sensitivity is limited to identifier typing. This was done in order that the grammar of the language be less ambiguous and to reduce the number of conflicts reported by the parser generator.

One drawback of the parse tree approach is the handling of nested object definitions with the same name. Currently, the compiler has a bug that disallows nested definitions to reuse an identifier. Also, building a complete parse tree for each definition takes up a lot of memory, so the compiler can run out of memory if the definition is too large.

Code generation was relatively straightforward, partly because the design of the _Rubato_ machine was optimized for easy code generation by the compiler. A decision was taken to make the compiler generate assembly code rather than true machine code. Generating assembly code relieves the compiler from maintaining an image of the code and data stores in memory and keep track of code and data locations and addresses. By generating labels as a substitute for store locations, the compiler is no longer responsible for keeping track of forward jumps or references, leaving it to the assembler or linker to fix up forward label referencing. Also, generating assembly code allows the compiler output to be human readable and this is an aid to debugging the compiler.

The compiler makes only a single pass through the source file, hence it is relatively quick. It also makes only a single traversal of the parse tree in most instances in order to improve efficiency. Memory for the parse tree is allocated dynamically.

Identifiers are kept on a hash table of singly linked lists. This is the symbol table. As the level of nesting of definitions get deeper, new entries are inserted into the hash table into the head of the linked list. This makes the insertion of symbols into the symbol table a cheap operation. In addition, during symbol table searches, the closer the level of definition of the identifier is to the current level of definition, the faster the identifier can be retrieved from the symbol table. Global identifiers end up at the tail of the linked lists, hence searching for global identifiers is a slow operation. All symbols in the current block of nesting may be deleted by a single function call which is relatively cheap since all symbols belonging to the current block will always be at the head of each linked list in the symbol table.

Keywords are not kept on the symbol table. Instead, they are stored in a fixed array. Keyword searching is accomplished using a binary search algorithm.

The following optimizations are performed by the compiler:

- Pitch numbers are mostly calculated at compile time in order to make note generation in the interpreter as fast as possible. The compiler maintains a table of key to pitch values indexed by the current key signature of the source file.
- Partial constant folding is attempted. Constant expressions are evaluated to a constant. However, the compiler does not attempt to prune the parse tree in order to find the optimal constant folding or to factorise common subexpressions.
- The compiler attempts to use the direct addressing mode of the instruction set of the _Rubato_ machine rather than the implied stack addressing mode in order to minimize the number of values pushed onto the expression stack.

Currently, the grammar for the parser generator does not include error productions, so no error recovery is attempted should a syntax error occur in the source file. This is not nearly as bad as it sounds, as the compiler is reasonably fast as to not preclude the time honoured strategy of one-error fixes followed by a recompile. Furthermore, the parser generator version available on Unix Version 8 gives excellent diagnostics should a syntax error occurs. It attempts to print out the current state in a production rule within the grammar as well as the offending token.

The implementation of the compiler is portable across two different system environments. Currently, the **rc** compiler runs on the IBM PC/XT on MS-DOS as well as the DEC VAX 11/780 on Unix Version 8.

<a id="H7-2"></a>

### 7.2 The rx executor

The executor, in comparison to the compiler, was much easier to implement than the compiler, even though it had to combine the functionality of an assembler, a linker, an interpreter and a debugger.

The assembler only makes a single pass through the assembly files specified on the command line. It assembles instructions and data directly onto the interpreter's code and data stores.[^19] Forward label references are handled by keeping a linked list of locations in the code store that has to be fixed once the label is defined. The assembler maintains a symbol table which is a hash table of linked lists. The assembler symbol table is very similar to the compiler's symbol table except that the symbol table has no concept of scope or nesting. Also, the mnemonics for the assembly language instructions as well as the pseudo instructions are also kept on the symbol table for quick searches. The function that deletes all labels in the symbol table is careful enough not to delete symbols which are really assembler mnemonics and public labels.

Pseudo instructions are recognized by the assembler and acted upon. The pseudo instructions recognized by the assembler are:

- **"const** Attach a constant value to a label
- **"data** Put value _n_ into the next available location in the data store
- **"udata** Reserve the next _n_ locations in the data store
- **"public** Declare label to be public (i.e. available for reference by other assembly files)
- **"extern** Declare label as being defined in some other assembly file (as a `public`)

The linker is an extremely simple linker. All it does is resolve external and public labels between assembly files. It is really an extension of the assembler.

The interpreter is the most complex part of the executor. The code and data stores are simply arrays holding code instructions and data values. In the IBM PC/XT implementation, these arrays were declared as `far` arrays[^20] so that the compiler will allocate the arrays in a different segment. Hence the implementation will allow up to 16K of code and 16K of data using up a total of 128K of bytes in the host system, even though the IBM PC/XT has only a 16-bit addressing capability. On the DEC VAX 11/780, these arrays were simply declared normally as the VAX has 32-bit addressing.

The main body of the interpreter is a execution loop that fetches an instruction from the code store, obtains the address of the function corresponding to that instruction via a jump table and then executes the instruction. If more than one VIEU is currently active, each VIEU will execute one instruction before passing control to the next VIEU in a round-robin fashion. All active VIEUs are kept on a doubly-linked circular list. If a VIEU is unable to execute an instruction (because it is waiting for child VIEUs to die) control passes on to the next VIEU in the circular list. If no VIEU can execute an instruction, then a deadlock situation occurs and the interpreter will terminate execution and enter the debugger. VIEUs are allocated dynamically, so the maximum number of active VIEUS that can execute concurrently is bounded by the amount of memory available to the interpreter.

The interpreter maintains the following data structures, all allocated dynamically:

- A VIEU data structure. This holds all the state information possessed by a VIEU, such as:
  - the VIEU identification number
  - pointers to the next and previous VIEU as well as the VIEU parent
  - pointers to the activation and expression stacks
  - the number of childs spawned by the VIEU
  - the instruction pointer
  - the next note registers
  - the 'time' elapsed for notes played by the VIEU
- The activation record. This holds information pertaining to the activation of a procedure or function or subroutine:
  - pointer to the next activation record
  - the return address of the activated procedure or subroutine
  - pointer to the environment stack associated with the activation
  - the number of VIEUs sharing this activation record
- The environment record. This holds all the local definitions in the current block:
  - the dynamic and static link within the environment stack
  - number of arguments in the current procedure
  - pointers to a block of memory containing the values of local definitions
  - the default note registers
  - the current tempo
  - a flag indicating whether the record can increase its local definitions block size
  - number of VIEUs sharing the environment record
- Register set data structure. There is one register for each note attribute.
- The expression record. It holds a value of an item in the expression stack, as well as a pointer to the next item in the stack.
- The free list of memory available for allocation to local definitions. This is a doubly linked list of free location ranges rather like the Unix free block list.

The debugger is a late addition to the executor. It basically emulates the facilities provided by debuggers available in most programming environments. It debugs at the machine level. The following commands are recognized by the debugger:

- **g \[_addr_\]** execute VIEU at address _addr_
- **s \[_n_ \[_addr_\]\]** step _n_ (default 1) VIEU instruction at _addr_
- **t \[0|1\]** turn trace mode off/on
- **c \[_start_ \[_end_\]\]** disassembles code from _start_ to _end_
- **d \[_start_ \[_end_\]\]** show data from _start_ to _end_
- **e \[_n_\]** examine VIEU _n_
- **a \[_n_\]** show activation stack _n_ levels
- **x \[_n_\]** show expression stack _n_ levels
- **n \[_n_\]** show environment stack _n_ levels
- **b \[_addr_\]** set breakpoint at _addr_
- **l** list breakpoint
- **k** kill breakpoint
- **z** show free list
- **q** Quit debugger

<a id="H7-3"></a>

### 7.3 Note generation

Each note generated by the interpreter into the output file has the following format, on one line of the player file:

```text
ttime ppitch uduration lloudness vchannel zpatch
```

The _time_ of the note is the onset time, i.e. the time the note should start sounding given by the number of centiseconds into the piece. The _pitch_ of the note is the pitch number - 12. The _duration_ of the note is the length of time in which the note will sound, in centiseconds. The _loudness_ of the note corresponds to the note velocity. The _patch_ and _channel_ of the note corresponds with the equivalent attribute in the _Rubato_ language.

<a id="Chapter8"></a>

## Chapter 8: FINALE: A ROOM WITH A VIEU

In this thesis, a substantially complex and powerful music input language and performance system has been presented. The _Rubato_ system is, however, by no means a completed design. It is still a fast evolving design. As an example, the specification of the language mentions 'envelopes', which allow continuous incremental changes to be made to an attribute over a set of notes. However, the design of envelopes have not been completed yet in both the _Rubato_ language and the _Rubato_ machine. Also, attributes should be able to be scaled or transposed _en masse_ once entered into a set of notes.

The major advantages of the _Rubato_ system over similar music input and performance systems can be gleaned by comparing the features offered by the systems discussed in the literature review against the features inherent in the language. (The performance of music in the _Rubato_ system is as yet too simplistic for a fair comparison with other performance systems.). The following are perceived to be the strong areas of the language:

- _It is easy to transcribe pieces written in CMN to Rubato._ Since both systems of notation share the same model, transcriptions of musical pieces to and from both systems are relatively straightforward. As the _Rubato_ language have concurrent capabilities, multiple lines of music can be easily coded as separate phrases which are later joined together using the chord constructor. These phrases will be performed concurrently. Hence, no serialization of the musical streams into one stream needs to be done during transcription. There is usually a direct correspondence between musical scores and _Rubato_ programs.
- _Rubato offers powerful algorithmic control on the note stream._ Since the _Rubato_ system is a virtual machine, it possesses the ability to change the flow of note generation. Constructs like iteration and selection, which are clumsy to notate in CMN, are easily specified in _Rubato_.
- _Rubato programs are compact._ Writing a _Rubato_ program is just like writing a program in a normal high level programming language. On some scores, the _Rubato_ representation is often more compact than the musical score. See the appendix entitled _SAMPLE Rubato_ PROGRAMS for examples of musical scores and their transcription into _Rubato_ programs. Most of the programs are quite small (on the order of a few Kbytes). The assembly file generated by the compiler on most of these files are in the order of tens of Kbytes. In contrast, the player files generated by even small _Rubato_ programs can often be large, player files up to 80 KBytes in size resulting from a 5 Kbyte _Rubato_ program are quite common. This substantiates the claim that _Rubato_ programs are compact. The transcription of Jean-Michel Jarre's _Equinoxe_ into the _Rubato_ system is much more concise than the musical score on paper due to repetitions within the musical score being factored out during the transcription process.
- _Rubato programs are fast and easy to code._ Coding pieces in the _Rubato_ language take time, but not nearly as much time as it would take in most other music input languages. On average, coding up a small piece of music directly into a player file takes 4 hours or more, the same piece of music only takes between half an hour to one hour to transcribe as a _Rubato_ program. Coding pieces with a high degree of repetition, such as canons or rounds, require only a fraction of the time necessary to code the piece in most of the other music input languages discussed in the literature review.
- _Rubato isolates independent sections of the music._ A well transcribed music piece into _Rubato_ is like a well written program in a high level block-structured programming language. Phrases in a section not used in any other section can be defined locally within the section. The hierarchical nature of _Rubato_ programs parallel the hierarchical organization of musical thought.

The _Rubato_ system currently have the following shortcomings. Most of the shortcomings are due to the system being an evolving design rather than a finished product. Few of the shortcomings are inherent in the overall design of the system and most are correctable.

- Dynamic changes in attributes such as <em>crescendo</em>s are hard to code in the language. This problem will only be solved once envelopes are defined and implemented properly.
- The _Rubato_ language does not as yet allow the encoding of performance directives such as phrasing.
- The representation of CMN is not as complete as it can be. _Rubato_'s model of music is not nearly as sophisticated as CMN's model and is hopelessly inadequate at expressing new musical ideas developed in the twentieth century by the experimentalist or _avant_-_garde_ school of composers.
- _Rubato_ currently does not attempt to do sound synthesis as opposed to music synthesis. The hardware interface is just as fully capable of transmitting sound control information as note control information. However, this facility is not realised by _Rubato_.
- The performance system desperately needs to have performance rules encoded within it in order that it can deliver more convincing music performances.
- The implementation of the existing _Rubato_ system can be improved.

The list of shortcomings in the _Rubato_ system is a good pointer to future extensions that can be made to the language as well as the performance system. The system as it stands currently is an interesting experiment in how music input and performance systems can develop in the near future.

<a id="Appendix1"></a>

## Appendix 1: EBNF GRAMMAR OF THE _Rubato_ LANGUAGE

```text
source_file = { definition } .
definition = conductor_def
	| "$" key_stmt
	| "$default" key_default
	| "extern" prim_defines
	| defines .
conductor_def = "conductor" block .
prim_defines = note_def
	| phrase_def
	| chord_def
	| var_def
	| template_def
	| procedure_def
	| function_def
	| envelope_def .
prim_defines = note_def [ ASSIGN note ]
	| phrase_def [ ASSIGN phrase ]
	| chord_def [ ASSIGN chord ]
	| var_def [ ASSIGN expression ]
	| template_defset
	| procedure_defset
	| function_defset
	| envelope_def [ ASSIGN envelope ] .
note_def = "note" IDENTIFIER .
phrase_def = "phrase" IDENTIFIER .
chord_def = "chord" IDENTIFIER .
var_def = "var" IDENTIFIER .
template_def = "template" IDENTIFIER .
procedure_def = "procedure" IDENTIFIER .
function_def = "function" IDENTIFIER .
envelope_def = "envelope" IDENTIFIER .
template_defset = template_def [ ASSIGN TEMPLATE_IDENT |
		"(" temp_params ")" ] .
temp_params = { attribute } { "," { attribute } } .
procedure_defset = procedure_def [ ASSIGN PROCEDURE_IDENT
		| "(" [ param { "," param } ] ")" block ] .
function_defset = function_def [ ASSIGN FUNCTION_IDENT
		| "(" [ prim_defines { "," prim_defines } ] ")" block ] .
block = phrase | chord .
attribute = delay [ expression | rel_expr ]
	| velocity [ expression | rel_expr ]
	| duration [ expression | rel_expr ]
	| pressure [ expression | rel_expr ]
	| patch [ expression | rel_expr ]
	| channel [ expression | rel_expr ]
	| "." factor [ rel_expr ]
	| ":" factor [ rel_expr ]
	| "^"
	| "_" .
rel_expr = ( "+" | "-" | "*" | "/" | "mod" ) expression .
note = ( key_factor | pitch expression | NOTE_IDENT )
		{ attribute } .
phrase = ( BEGIN_PHRASE statement_list END_PHRASE | PHRASE_IDENT )
	{ attribute } .
chord = ( BEGIN_CHORD statement_list END_CHORD | CHORD_IDENT )
	{ attribute } .
envelope = /* unimplemented */ .
statement_list = [ statement { [ BAR ] statement } ] .
statement = defines
	| note
	| phrase
	| chord
	| envelope
	| key_stmt
	| tempo_stmt
	| default_stmt
	| set_stmt
	| call_stmt
	| repeat_stmt
	| while_stmt
	| do_stmt
	| return_stmt .
key_stmt = "key" ( KEYNAME ( "major" | "minor" )
	| "(" KEYNAME { "," KEYNAME } ")" ) .
tempo_stmt = "tempo" expression ASSIGN expression .
default_stmt = "default" ( key_default | attribute ) .
key_default = KEYNAME ASSIGN ( key_factor | expression ) .
set_stmt = NOTE_IDENT ASSIGN note
	| PHRASE_IDENT ASSIGN phrase
	| CHORD_IDENT ASSIGN chord
	| ENVELOPE_IDENT ASSIGN envelope
	| VAR_IDENT ASSIGN expression .
call_stmt = PROCEDURE_IDENT "(" [ call_param { "," call_param } ] ")"
	| TEMPLATE_IDENT "(" note { "," note } ")" .
call_param = note | phrase | chord | envelope | expression
	| procedure | template | function .
repeat_stmt = "repeat" expression "do" statement .
while_stmt = "while" expression "do" statement .
do_stmt = "do" statement "while" expression .
return_stmt = "return" expression .
expression = expression binop expression |
	unop expression |
	factor .
binop = "+" | "-" | "*" | "/" | "mod"
	| "and" | "or" | "==" | "<>"
	| "<" | ">" | "<=" | ">=" .
unop = "~" | "not" | "." | ":" .
factor = NUMBER | VAR_IDENT
	| KEY key_factor |
	"(" expression ")" |
	CURRENT
	| FUNCTION_IDENT "(" [ call_param { "," call_param } ] ")" .
key_factor = KEYNAME { INCPIT | DECPIT } .
KEYNAME = ( "a" | "b" | "c" | "d" | "e" | "f" | "g"
	| "A" | "B" | "C" | "D" | "E" | "F" | "G" )
	{ "#" | "$" | "%" } .
pitch = "pitch" | "&" .
delay = "pitch" | "\" .
duration = "duration" | "!" .
velocity = "velocity" | ";" .
pressure = "pressure" | "@" .
patch = "patch" .
channel = "channel" .
```

<a id="Appendix2"></a>

## Appendix 2: INSTRUCTION SET REFERENCE

The following lists the instruction set of the _Rubato_ machine and a brief description of what each instruction does. The following semantic functions may prove useful in decoding the descriptions

- **_push_(a)** pushes the value a onto the expression stack
- **_pop_(a)** pops the topmost value of the expression stack onto the variable a
- **_contents_(a)** contents of the location in the data store pointed by address a
- **_deref_(m,n)** dereferences (get the address of) the object addressed by pair m,n
- **_write_(a,n)** writes n to the location in the data store pointed by address a

- **INSTRUCTION** DESCRIPTION
- **nop** No Operation, does not do anything
- **halt** Halts execution of a program on the _Rubato_ machine
- **wait** Wait for child VIEUs to die before continuing
- **vieu n** Create a new VIEU to execute at address n
- **vieus** _pop_(n); create a new VIEU to execute at address n
- **alloc n** Allocate n objects on the current environment stack
- **push n** _push_(n)
- **pushi n** _push_(_contents_(n))
- **pusha m,n** _push_(_deref_(m,n))
- **pushv m,n** _push_(_contents_(_deref_(m,n)))
- **pushe** Creates a new environment record
- **pop** _pop_(a), i. e., the value a is ignored
- **popi a** _pop_(n); _write_(a,n)
- **popis** _pop_(a); _pop_(n); _write_(a,n)
- **popv m,n** _pop_(v); _write_(_deref_(m,n),v)
- **pope** Destroys environment record
- **jump a** jump to address a on the code store
- **jumps** _pop_(a); jump to address a on the code store
- **jumpt a** _pop_(f) jump to address a on the code store if f <> 0
- **jumpts** _pop_(a); _pop_(f); jump to address a on the code store if f <> 0
- **jumpf a** _pop_(f) jump to address a on the code store if f == 0
- **jumpfs** _pop_(a); _pop_(f); jump to address a on the code store if f == 0
- **jsub a** call subroutine at address a
- **jsubs** _pop_(a); call subroutine at address a
- **subret** return from subroutine
- **call m,n** (do a procedure or function call) _pop_(a); for i = 1 to n do _pop_(arg\[i\]); destroys m environment records; create new activation stack; jump to address a
- **ret** return from procedure
- **retf n** return from function with value n
- **retfs** _pop_(n); return from function with value n
- **tempo n** set tempo of current VIEU to n
- **tempos** _pop_(n); set tempo of current VIEU to n
- **note n** play a note with pitch n
- **notes** _pop_(n); play a note with pitch n
- **chord n** play a chord with pitch n
- **chords** _pop_(n); play a chord with pitch n
- **delay n** Set next note delay register to n
- **delays** _pop_(n); Set next note delay register to n
- **vel n** Set next note velocity register to n
- **vels** _pop_(n); Set next note velocity register to n
- **dur n** Set next note duration register to n
- **durs** _pop_(n); Set next note duration register to n
- **pres n** Set next note pressure register to n
- **press** _pop_(n); Set next note pressure register to n
- **patch n** Set next note patch register to n
- **patchs** _pop_(n); Set next note patch register to n
- **chan n** Set next note channel register to n
- **chans** _pop_(n); Set next note channel register to n
- **loadn** Read default pitch register into v; _push_(v)
- **loady** Read default delay register into v; _push_(v)
- **loadv** Read default velocity register into v; _push_(v)
- **loadp** Read default pressure register into v; _push_(v)
- **loadd** Read default duration register into v; _push_(v)
- **loada** Read default patch register into v; _push_(v)
- **loadc** Read default channel register into v; _push_(v)
- **storens** _pop_(v); Write v into default pitch register
- **storeys** _pop_(v); Write v into default delay register
- **storevs** _pop_(v); Write v into default velocity register
- **storeds** _pop_(v); Write v into default duration register
- **storeps** _pop_(v); Write v into default pressure register
- **storeas** _pop_(v); Write v into default patch register
- **storecs** _pop_(v); Write v into default channel register
- **dups** _pop_(a); _push_(a); _push_(a);
- **nots** _pop_(a); _push_(not a)
- **negs** _pop_(a); _push_(-a);
- **incs** _pop_(a); _push_(a+1)
- **decs** _pop_(a); _push_(a-1)
- **adds** _pop_(b); _pop_(a); _push_(a+b)
- **subs** _pop_(b); _pop_(a); _push_(a-b)
- **muls** _pop_(b); _pop_(a); _push_(a*b)
- **divs** _pop_(b); _pop_(a); _push_(a/b)
- **mods** _pop_(b); _pop_(a); _push_(a mod b)
- **less** _pop_(b); _pop_(a); _push_(a<b)
- **gtrs** _pop_(b); _pop_(a); _push_(a>b)
- **ands** _pop_(b); _pop_(a); _push_(a and b)
- **ors** _pop_(b); _pop_(a); _push_(a or b)
- **eqs** _pop_(b); _pop_(a); _push_(a == b)
- **neqs** _pop_(b); _pop_(a); _push_(a <> b)
- **les** _pop_(b); _pop_(a); _push_(a <= b)
- **ges** _pop_(b); _pop_(a); _push_(a >= b)

<a id="Appendix3"></a>

## Appendix 3: Summary and Description of MIDI

<a id="HA3-1"></a>

### A3.1 INTRODUCTION TO MIDI

MIDI stands for Musical Instrument Digital Interface. It is a specification of a communications scheme for digital music devices and represents a formal set of hardware and software rules for sending and receiving musical-event data between computers and synthesizers. MIDI is currently the _de facto_ standard for the interconnection of musical devices. Musical data such as notes or other performance parameters such as pitch-bending are typically input by the musician using a keyboard synthesizer equipped with a MIDI hardware interface. This MIDI hardware encodes the key depressions and transmits them serially over the MIDI port. The output of this port may be connected to the input of another MIDI port that is either attached to a computer or another synthesizer.

<a id="HA3-2"></a>

### A3.2 MIDI NETWORK ARCHITECTURE

The basic idea behind MIDI is a two-layer network consisting of a physical interconnection scheme and a code to communicate information across the channel.

<a id="HA3-2-1"></a>

#### A3.2.1 The Physical Interconnection

The physical layer of MIDI is a simple point-to-point opto-isolated 5 mA current loop using a 5-pin DIN connector in which three of the pins are used. The cable is made of a shielded twisted pair with the shield being grounded at the source end only. Each twisted pair implements a one-direction transmission line. Hence two cables are needed to implement a two-way communication path between MIDI stations. An instrument implementing the interface must have MIDI input and output jacks, to be labelled MIDI IN and MIDI OUT. A MIDI THRU jack may also be provided, which simply provides a buffered electrical copy of the input signal. Information is transmitted across as asynchronous serial data at a baud rate of 31250 baud with 1 start bit, 8 data bits and 1 stop bit.

Some interconnection schemes for the interconnection of musical instruments:

- **Unidirectional** master talks to slave
- **Bidirectional** two masters drive each other as slaves
- **Ring** an extension of bidirectional connection to three or more devices
- **Daisy Chain** one master drives several slaves using MIDI THRU
- **Star** one master has several unidirectional or bidirectional links.

Note that a single MIDI cable is a unidirectional single-talker / single-listener network. Using a MIDI THRU connection allows it to become a multilistener network.

<a id="HA3-2-2"></a>

#### A3.2.2 The Code Specification

The code specification consists of three elements: _modes_, _channels_, and _commands_.

There are three modes and sixteen channels, which provide for multisynthesizer control within a single MIDI network. The modes establish the relationship between the channels and voice assignment methods within a synthesizer. MIDI commands with a field for channel number are called _channel commands_. The MIDI mode configures synthesizers to receive or ignore channel commands depending on the channel number. The three modes are

- **Omni** causes a MIDI unit to accept commands on all channels
- **Poly** causes a synthesizer to assign voices polyphonically, i.e. sequential MIDI commands to turn notes on will generate a chord.
- **Mono** configures the synthesizer to respond to only one voice per channel. However, the synthesizer may receive on more than one channel, so sequential note on commands on different channels may still generate a chord in the synthesizer.

The modes may be grouped into four states:

1. _Omni On_ and _Poly_ allows all commands regardless of channel to be recognized by the receiver and voices are assigned polyphonically.
1. _Omni On_ and _Mono_ allows all commands regardless of channel to be recognized by the receiver and assigned to just one voice. Only one voice may sound.
1. _Omni Off_ and _Poly_ allows only channel commands matching the receiver channel number to be recognized and voices are assigned polyphonically.
1. _Omni Off_ and _Mono_ allows only channel commands matching a range of receiver channel numbers (possibly one) to be recognized and voices are assigned one per channel recognized.

<a id="HA3-2-3"></a>

#### A3.2.3 MIDI Command Types

There are five categories of MIDI commands:

- **Channel** communicates event data such as _note on_ and _note off_ and status of device controllers such as pitch-bend and breath controllers as well as continuous modulation controls.
- **System common** deals with sequence selection and positioning within a sequence. These commands are useful for instruments recording MIDI data (i.e. a MIDI data recorder).
- **System realtime** synchronizes a network of MIDI devices to a common clock.
- **Reset** terminates activity in progress and reinitializes devices to power on condition.
- **System exclusive** is manufacturer dependent commands for sending device-specific information such as voice parameters.

System realtime commands have the highest priority (can interrupt multibyte commands) followed by System exclusive. All other commands have equal priority.

<a id="HA3-2-4"></a>

#### A3.2.4 Format of MIDI commands

A typical MIDI command byte is as follows:

```text
	Status byte
	10010010
	1XXXYYYY
	1	Leading Sentinel bit
	XXX	Command ID
	YYYY	Channel ID
```

<a id="figure17"></a>**Figure 17:** MIDI Status Byte Format

The sentinel signals the start of a new command (status byte). Data bytes must have this bit reset. The Command ID identifies the MIDI command. If the command ID identifies the command to be a _channel command_ then the Channel field contains the channel number of the command, otherwise the channel field is used as an extension of the command field.

Each command type contains a specified number of trailing data bytes. The only exception is System exclusive, which may contain an unspecified number of trailing data bytes (with sentinel bit reset) terminated by an EOX (End of Exclusive) command. Some commands have no trailing data bytes at all.

If a subsequent command have a status byte identical to the command prior to it, then the status byte need not be sent and will be assumed by the receiver. This feature is called _MIDI running status_ and reduces the amount of information that has to be passed through the MIDI interface.

| Status | Arg 1    | Arg 2    | Mnemonic                |
| ------ | -------- | -------- | ----------------------- |
| 8Y     | Key      | Velocity | Key off                 |
| 9Y     | Key      | Velocity | Key on                  |
| AY     | Key      | Pressure | Polyphonic Key Pressure |
| BY     | Index    | Value    | Control Change          |
| CY     | Index    |          | Program Change          |
| DY     | Pressure |          | Pressure (combined)     |
| EY     | LSB      | MSB      | Pitch Wheel change      |

<a id="table1"></a>**Table 1:** CHANNEL COMMANDS

| Status | Arg 1   | Arg 2 | Mnemonic                 |
| ------ | ------- | ----- | ------------------------ |
| F0     | Mfg. ID | ...   | System Exclusive Command |

<a id="table2"></a>**Table 2:** SYSTEM EXCLUSIVE COMMAND

| Status | Arg 1 | Arg 2 | Mnemonic                      |
| ------ | ----- | ----- | ----------------------------- |
| F2     | LSB   | MSB   | Program Position Select       |
| F3     | Index |       | Program Select                |
| F6     |       |       | Tune request                  |
| F7     |       |       | End of System Exclusive (EOX) |

<a id="table3"></a>**Table 3:** SYSTEM COMMON COMMANDS

| Status | Arg 1 | Arg 2 | Mnemonic       |
| ------ | ----- | ----- | -------------- |
| F8     |       |       | Timing Clock   |
| F9     |       |       | Undefined      |
| FA     |       |       | Start          |
| FB     |       |       | Continue       |
| FC     |       |       | Stop           |
| FD     |       |       | Undefined      |
| FE     |       |       | Active sensing |
| FF     |       |       | System reset   |

<a id="table4"></a>**Table 4:** REAL TIME COMMANDS

<a id="Appendix4"></a>

## Appendix 4: SAMPLE PROGRAMS

This appendix contains some musical scores and their transcriptions to _Rubato_ programs. The pieces included have been chosen for their diversity in form and musical style. The style of coding of the pieces into _Rubato_ programs varies from piece to piece. This is intentional.

<a id="Footnotes"></a>

<a id="References"></a>

## References

1. <a id="ref-1"></a><a id="defRef2"></a> C. Abbott, _Guest Editor's Introduction to the Special Issue on Computer Music_, **ACM Computing Surveys**, Vol. 17 No. 2, June 1985
2. <a id="ref-2"></a><a id="defRef3"></a> G. Loy, C. Abbott, _Programming Languages for Computer Music Synthesis, Performance, and Composition_, **ACM Computing Surveys**, Vol. 17 No. 2, June 1985
3. <a id="ref-3"></a><a id="defRef4"></a> R. B. Dannenberg, **The CMU MIDI Toolkit**, Charles Ives Edition, Center for Art and Technology, Carnegie-Mellon University (1986)
4. <a id="ref-4"></a><a id="defRef5"></a> G. Read, **Music Notation**, _A Manual of Modern Practice_, Allyn & Bacon, Inc. (1964)
5. <a id="ref-5"></a><a id="defRef6"></a> Jean-Jacques Rousseau, **Project Concerning New Symbols for Music**, translated by Bernarr Rainbow, Boethius Press, Ireland (1982)
6. <a id="ref-6"></a><a id="defRef7"></a> C. Roads, _Research in Music and Artificial Intelligence_, **ACM Computing Surveys**, Vol 17 No. 2, June 1985
7. <a id="ref-7"></a><a id="defRef8"></a> H. S. Howe Jr., _Detailed Description of a Computer Sound Generating Program: MUSIC 4BF_, **Electronic Music Synthesis**, "Concepts, Facilities, Techniques", J. M. Dent & Sons (1975) pp. 175 - 248
8. <a id="ref-8"></a><a id="defRef9"></a> J. E. Rogers, _The Uses of Digital Computers in Electronic Music Generation_, **The Development and Practice of Electronic Music**, Prentice-Hall, Inc. (1975) pp. 189 - 285
9. <a id="ref-9"></a><a id="defRef10"></a> M. V. Mathews, _Music V Manual_, **The Technology of Computer Music**, The MIT Press (1969) pp. 116 - 122
10. <a id="ref-10"></a><a id="defRef11"></a> M. V. Mathews, L. Rosler, _Graphical Language for the Scores of Computer-generated Sounds_, **Music By Computers**, H. V. Foerster, J. W. Beauchamp (eds), John Wiley & Sons, Inc. (1969) pp. 84 - 116
11. <a id="ref-11"></a><a id="defRef12"></a> H. B. Lincoln (ed), **The Computer and Music**, Cornell University Press (1970).
12. <a id="ref-12"></a><a id="defRef13"></a> J. Citron & A. Hurwitz, **Use of computers in aural pattern recognition**, IBM Los Angeles Scientific Center Report 35.017 (1966)
13. <a id="ref-13"></a><a id="defRef14"></a> A. Mendel, _Some Preliminary Attempts at Computer Assisted Style Analysis in Music_, **Computers and the Humanities** Vol 4 No 1 Sept 1969 pp. 41-52
14. <a id="ref-14"></a><a id="defRef15"></a> T. Robison, _IML - MIR : A Data-Processing System for the Analysis of Music_, H. Heckmann (ed), **"Elektronische Datenverarbeitung in der Musikwissenschaft",** Regensburg, Gustav Bosse Verlag (1967)
15. <a id="ref-15"></a><a id="defRef16"></a> C. Roads, J. Strawn (eds.), **Foundations of Computer Music**, The MIT Press (1985).
16. <a id="ref-16"></a><a id="defRef17"></a> J. Chowning, _The Synthesis of Complex Audio Spectra by Means of Frequency Modulation_, **Journal of the Audio Engineering Society**, 21(7) (1973).
17. <a id="ref-17"></a><a id="defRef18"></a> D. Ritchie & K. Thompson, _The UNIX Time-Sharing System_, **Communications of the Association of Computing Machinery**, 17(7), pp. 365-375
18. <a id="ref-18"></a><a id="defRef19"></a> W. Reeves _et al_, _Ludwig : An example of interactive computer graphics in a score editor_, C. Roads (ed), **Proceedings of the 1978 International Computer Music Conference**, vol 2, Northwestern University Press (1978)
19. <a id="ref-19"></a><a id="defRef20"></a> W. Buxton, **Music Software User's Manual**, 2nd edition, Computer Systems Research Group, University of Toronto.
20. <a id="ref-20"></a><a id="defRef21"></a> B. S. Brook (ed), **Musicology and the Computer**, _Musicology 1966 - 2000 : A Practical Program_, "Three Symposia", American Musicological Society, Greater New York Chapter (1965-1966), The City University of New York Press (1970).
21. <a id="ref-21"></a><a id="defRef22"></a> Wirth, N., _What Can We Do about the Unnecessary Diversity of Notations for Syntactic Definitions?_, **Communications of the ACM**, 20, 11 (Nov 1977)

[^1]: <a id="defFN2"></a> This can be done by either using or writing a set of library routines that implement common operations on musical data structures, or successively modifying an existing program that plays music by direct manipulation of appropriate hardware.

[^2]: <a id="defFN3"></a> Moxie is a system devised by Douglas Collinge of the University of Victoria. It runs on a Synclavier I music synthesizer, although a version exists in the Forth language.

[^3]: <a id="defFN4"></a> This thesis will not attempt to describe or even explain the meanings of many words associated with musical theory or performance. An 'intuitive' or practical understanding of music is sufficient for one to be able to grasp the concepts underlying the thesis. If the reader finds the meaning of any word relating to music obtuse, a dictionary of musical terminology may prove useful.

[^4]: <a id="defFN5"></a> The chapter entitled **Literature Review** discusses at least one such example.

[^5]: <a id="defFN6"></a> The model of representation often governs the method used in quantizing the musical stream into symbols. Even a model that attempts to treat music continuously rather than discreetly quantizes music into continuous subcomponents.

[^6]: <a id="defFN7"></a> Currently, the player takes a text file containing note specifications and converts these into a stream of MIDI (Musical Instrument Digital Interface) byte codes which are sent to a MIDI interface. Refer to to the Appendix entitled _Summary and Description of MIDI_ for a guide to the format and specifications of the digital interface.

[^7]: <a id="defFN8"></a> see Appendix entitled **Summary and Description of MIDI**

[^8]: <a id="defFN9"></a> An _octave_ is musical terminology for a arithmetical operation on the pitch of a note. Increasing a note by one octave will cause a doubling of the frequency of the pitch of a note. Similarly, decreasing a note by one octave will cause a halving of the frequency of the pitch.

[^9]: <a id="defFN10"></a> An octave within the audio frequency spectrum is divided (not quite) equally into 12 semitones. Most Western musical instruments divide an octave using a method called _equal temperament_. It is important to note that _Rubato_ does not assume pitches of notes specified. It assigns each individual note to a specific _pitch number_. Each pitch number is known to be mapped to a given frequency on a typical music synthesizer. If a synthesizer with a different mapping of pitch numbers to actual pitches is connected to a computer equipped with the _Rubato_ system, _Rubato_ is none the wiser.

[^10]: <a id="defFN11"></a> Control flow statements may also be employed within a chord, but they are less useful in this context due to the fact that all entities within a chord are 'executed' or performed simultaneously.

[^11]: <a id="defFN12"></a> A note, chord or phrase declaration is simply a 'null' binding, e.g. `note notename`, `phrase phrasename`, or `chord chordname`, which associates a name with an entity but does not actually make a binding.

[^12]: <a id="defFN13"></a> These are implementation defined values. Currently, MININT == -32768 and MAXINT == 32767.

[^13]: <a id="defFN14"></a> This is an implementation defined value. In the current implementation, MAXPOS == 32767.

[^14]: <a id="defFN15"></a> block objects are either notes, phrases, chords, envelopes or statements.

[^15]: <a id="defFN16"></a> Parameters are either numbers (including variables and function values), notes, phrases, chords, templates, envelopes, functions or procedures.

[^16]: <a id="defFN17"></a> In designing the _Rubato_ machine, I am heavily indebted to the design of the _Plus machine_ which is due to Ken Robinson of the Department of Electrical Engineering and Computer Science at the University of New South Wales (UNSW). My reference to the Plus machine is taken from pp. 23-9 of the **Supplementary Notes for CS3 Compiler Construction**, Lent Term 1986, Basser Department of Computer Science, University of Sydney.

[^17]: <a id="defFN18"></a> The current implementation has MININT == -32768 and MAXINT == 32767.

[^18]: <a id="defFN19"></a> Of course, the current implementation does not encode any performance rules at all. However, should the implementation be extended in the future ...

[^19]: <a id="defFN20"></a> In this implementation, the code and data stores are separate.

[^20]: <a id="defFN21"></a> The Microsoft C Compiler Version 4.00 used to generate the executable files allows a program to access the full 1 Mbyte address space of the processor despite the 16-bit address limitation. Whenever an area of memory outside the current addressing limits is accessed, the compiler generates code that manipulates the processor's segment registers. The `far` keyword indicates to the compiler to reserve 32 bits for the address of an object rather than the usual 16 bits.
