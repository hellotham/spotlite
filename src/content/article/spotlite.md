---
title: How two AI agents rebuilt my website
description: I built this site by hand in 2023, then barely touched it for two years. This year I handed it to Google Antigravity, and later to Claude Code.
pubDate: 2026-07-28
---

![screenshot](../../assets/screenshot.png)

I built this website over a weekend in May 2023.

It was a simple thing. Astro for the pages, UnoCSS for the styling, and a bit of Alpine.js to make the menu open and close. I called it Spotlite, and I put it on GitHub so other people could use it too.

Then I mostly left it alone. Over the next two and a half years it got eight commits. A few package updates, an upgrade to Astro 4, an upgrade to Astro 5, and one hover colour I never liked but never fixed. That is what happens to side projects.

This year I gave it to two AI coding agents, a couple of months apart. The site you are reading now is the result, and it is not really the same website any more.

## What it does now

The main change is what the site is for.

It used to be a personal website that happened to list my work history. Now it is a CV generator. I write each job once, as a Markdown file, and the site builds everything else from that one file: the work history page, the career timeline, the search index, and two PDF versions of my CV.

That last part is the bit I actually wanted. If you keep your CV in a Word document and your work history on a website, the two slowly stop agreeing with each other. You update one and forget the other. Six months later they say different things and you have no idea which one is right.

Now there is only one copy of each fact, so they cannot disagree.

## May 2026: Google Antigravity

In May I pointed Google Antigravity, which runs on Gemini, at the code. It worked through a list of tracks, and for each one it wrote a plan before it wrote any code.

It made 463 commits over about eleven days. That number sounds more impressive than it is, because roughly 300 of them were the agent ticking off its own to-do list. The real work was still substantial:

- It removed Alpine.js completely and rewrote the menu and the dark mode switch in plain JavaScript.
- It added tests. The project had none. It also got into the habit of writing the test first and watching it fail, which I did not ask for.
- It designed the colour scheme this site still uses, and wrote it down so it could be applied consistently.
- It sorted out the things search engines care about: page titles, social sharing previews, a sitemap.
- It moved all the content into proper collections, which is what made everything afterwards possible.
- It added site search, image galleries, and page transitions.
- It ran an accessibility audit and fixed what it found.
- It built the three D3 charts: the career timeline, the superpowers chart, and the floating bubbles. The bubbles took about twenty attempts to stop overlapping.
- It generated the first version of the CV PDF.

That last one is where the project quietly changed direction, although I did not notice at the time.

## July 2026: Claude Code

In late July I handed the same code to Claude Code, running Opus 5. About twenty commits over two days, and a very different sort of work. Less building new things, more going back over what was already there.

The CV was the main job. The old PDF was basically a printout of the website, charts and all, which is not what anyone wants to receive as a CV. It came back as two proper documents. A one page version and a full one, both plain enough for the software that companies use to read CVs automatically.

The one page version is my favourite bit. It measures itself, and if it does not fit on one page it shrinks the type until it does. If it cannot shrink far enough to stay readable, it stops and complains rather than quietly giving me a two page CV.

Then I asked it to review the whole codebase. It ran seven reviewers at once, each looking at a different thing, and then argued with its own findings before showing me any. A hundred and nineteen survived. Some were embarrassing.

## The things that were already broken

This is the part I did not expect.

Both agents were most useful when looking backwards. Everything below had been live on the site for months, and I had no idea:

- Two of my styling shortcuts produced no CSS at all. I had named one of them `focus-ring`, and it turned out UnoCSS reads that as an instruction rather than a name. So eleven buttons and links had no visible outline when you tabbed to them, and the dark mode menu had no hover effect. Nothing ever complained.
- On a narrow phone screen, the headline on my home page was cut off in the middle of a word. There was no scrollbar, so there was nothing to hint that anything was missing.
- The code samples in my articles used a grey that was too faint to read properly.
- An old copy of my résumé, with my home address in it, was sitting in a public GitHub repository.

None of that was visible to me. All of it had been shipped.

## Where AI got it wrong

I do not want to give the impression this was magic.

At one point Claude told me, twice and with confident reasoning, that Astro's new Markdown engine could not display mathematical formulas. I had a 1991 paper I wanted to republish, and it is full of equations, so this mattered.

It was wrong. The feature works, but it needed a plugin attached at a different point in the process. The agent had attached one at the wrong point, the software had accepted it and then silently ignored it, and the resulting silence looked like proof.

It only came out because I pushed back and asked whether it had actually checked. It had not. When it did, the answer changed.

The silent part was a genuine bug in someone else's software, and it is now [an open issue](https://github.com/bruits/satteri/issues/180) against that project. But I would never have got there by nodding along.

There was a similar moment with accessibility scores. I was told the site scored 100 out of 100 several times. That was true, but only in light mode. The testing tool follows whatever colour scheme your computer is set to, and every test had happened to run the same way. In dark mode there were two real problems hiding underneath all those perfect scores.

## What I take from it

Three things.

The first is that AI is better at finding your old mistakes than at writing new features. The features were fine. The faint grey, the broken outline, the headline cut in half, those had been sitting there for months and no human was ever going to spot them by reading the code.

The second is that confident and wrong is the thing to watch for. Not wrong and hesitant, which is easy to catch. Confident, well argued, and wrong. The only defence I found was asking, plainly, "did you actually check that?" It is remarkable how often the answer is no.

The third is to write down why, not just what. The two most useful files in the project now are the design notes and a file of traps for future agents, which is really just a list of every mistake anyone made and what it cost. Both agents read it before touching anything.

Spotlite is still free to use, under the MIT licence. If your CV and your website have stopped agreeing with each other, [help yourself](https://github.com/hellotham/spotlite).
