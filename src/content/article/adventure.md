---
title: 'Colossal Cave Adventure, rebuilt over breakfast'
description: Colossal Cave Adventure ported to strictly typed TypeScript over a few breakfasts, and checked against the original's own ninety-five test transcripts. Then a second model laid out the cave map the first one could not.
pubDate: 2026-07-04
---

I have always loved text adventures. I was one of the five in the [InfoTaskForce](/spotlite/article/infotaskforce/), the group at the University of Sydney that worked out how Infocom's virtual machine ran their games.

This is the game those games came from. Colossal Cave Adventure is the first well-known text adventure, and when it reached MIT in the spring of 1977 the group who played it there answered it by writing Zork and founding Infocom. For the five years to 1982, almost every game anyone wrote was another Advent.

I never played it. It was too big. No student was getting a program that size onto a shared university machine, for reasons that are further down this page.

So this is not nostalgia. Rebuilding it cost me a few prompts each morning over breakfast, for a few days, and at the end of that I finally got to play it.

![Adventure at the starting location, with AI-generated art, the message panel, the compass and the inventory](../../assets/adventure.png)

My version forward-ports Eric Raymond's faithful [`open-adventure`](https://gitlab.com/esr/open-adventure) edition into strictly typed TypeScript, running on Next.js.

## The cave was real

Will Crowther wrote the first version in FORTRAN in 1975 and 1976, for his daughters. He was a caver as well as a programmer, on Cave Research Foundation expeditions, and in 1975 he drew a survey of the Bedquilt region of Colossal Cave in Kentucky. The game is that survey, with small changes made to improve the play. Dennis Jerz, comparing the code against the cave itself, found the passages where Crowther had put them, and an iron rod and an axe head besides. Don Woods expanded it in 1977 and added the dwarves and the magic word `XYZZY`.

It was also enormous, although I cannot pin the numbers down. The figures that circulate put Crowther's version at about 60,000 words of core, near enough to 300 kilobytes, on PDP-10 machines that had 128,000 words in all, and Woods' at 42,000 despite tripling the source. They come from an edit to Wikipedia that has since been removed, and I have not found them in the source listings it cited. Take them as the story people tell rather than as measurements. If they are right, one person playing took close to half the memory of a machine a whole department was sharing.

## Minimalist prompting

The first version was built with Gemini CLI, and the method was barely a method at all.

I did as little prompting as possible, and left the agent free to decide what to build and how. What I gave it was one sentence: port Colossal Cave to a modern TypeScript web app. I asked that the original game data stay canon and that the whole thing be written in Australian English. Then the checks did the real work: every value fully typed with no escape hatches, and nothing merged until the tests and the linter pass. Next.js, React and a Zustand state machine were its answers, not mine.

I used up all my remaining credits in Gemini CLI doing it, as it happens, just before Google decommissioned the thing.

## Ninety-five transcripts

The check that did the most work was parity. The engine replays the original's own regression suite, ninety-five recorded transcripts, and diffs its output against them line by line. That is a brutally strict test, because a change that merely consumes the game's random number stream in the wrong order will fail it immediately. To satisfy it the agent kept the canonical game data in its historic `adventure.yaml` file and wrote a custom, type-safe parser to load it, preserving the odd legacy structures and folding the word synonyms together as it went.

It passes, and that is the whole of my claim to have made a faithful port.

## The map, and where the models differed

The rest of it is features I hinted at and never specified. The hardest single one in any project I built this year was the interactive cave map: all 151 rooms laid out as a clean metro-style diagram you can click to walk the player there.

![The interactive map, with the current room highlighted and the route drawn back to it](../../assets/adventure-map.png)

A metro map runs every line horizontally, vertically or on a diagonal, and laying a graph out that way is an academic problem with no maintained JavaScript implementation. Gemini, which had built most of the game perfectly happily, could not do it. It worked at the problem for days. Its best attempt was a physics simulation computed in the browser, which came out differently every time and ran its connecting lines straight through the rooms.

I handed exactly the same intent to Anthropic's Fable 5. It came back inside thirty minutes with something that worked straight away: a compass grid refined by hill-climbing, then orthogonal routing through the `libavoid` library. The map appears instantly and never crosses a room. The intent and the check never changed.

## Everything else

Once Fable had the map working I kept going, on what turned out to be my third day of a Claude 20x max plan, by the end of which I had hit my session limit.

The game now has:

- Location images for every room, courtesy of Nano Banana.
- Guided-play buttons that light up only the moves that are legal this turn.
- Direction controls you can tune to whatever level of spoilers you are comfortable with.
- Save and restore.
- A map you can hover to see the route from wherever you are, or click to be teleported.
- A complete walkthrough.

That last one is my favourite. Just press the Solve button and the game will play itself through to conclusion, a perfect 430-point game, while you watch.

## Have a go

[Play it here](https://christham.net/adventure/), and the code is on [GitHub](https://github.com/ChristineTham/adventure). The method behind this one, [Hello Calc](/spotlite/article/hellocalc/) and [Rogoweb](/spotlite/article/rogoweb/) is in [chapter three of my book](https://christham.net/aidou/software.html).

Fifty-one years ago Crowther walked the Bedquilt passages and drew them on paper. Nothing in rebuilding his game was harder than getting a machine to draw that cave back, and it took two of them to manage it.

## Sources

- [adventure](https://github.com/ChristineTham/adventure), the source, and Eric Raymond's [open-adventure](https://gitlab.com/esr/open-adventure), the edition this port is built from.
- Dennis G. Jerz, [Somewhere Nearby is Colossal Cave: Examining Will Crowther's Original Adventure in Code and in Kentucky](https://www.digitalhumanities.org/dhq/vol/1/2/000009/000009.html), Digital Humanities Quarterly, 2007, for Crowther's 1975 survey of Bedquilt, how closely the game follows it, and for what happened when the game reached MIT: "one group of players reacted by creating _Zork_ and the company Infocom".
- [Colossal Cave Adventure](https://en.wikipedia.org/wiki/Colossal_Cave_Adventure), Wikipedia, for its standing as the first well-known adventure game, and for the five years to 1982 in which almost every game written was another Advent. The core memory figures are not from the current article. They come from a revision of August 2020, since removed, which gave 60k words for Crowther's version against the 128k of a PDP-10/KA and 42k for Woods'. It attributed them to the two original source listings, but I have not been able to verify them there, and the article carries them as hearsay for that reason.
- [Chapter 3 of AI-dō](https://christham.net/aidou/software.html), on the intent, the checks, and the map that one model could not lay out and another could.
