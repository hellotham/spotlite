---
title: 'Spotlite: the modern CV template'
description: A free Astro template that turns a folder of Markdown files into a beautiful website and a polished one-page CV. Fork it and make it yours.
pubDate: 2026-07-28
---

![screenshot](../../assets/screenshot.png)

Your CV is probably a Word document. Mine is a website that prints itself.

This site is built with [Spotlite](https://github.com/hellotham/spotlite), a template I first hand-coded over a weekend in 2023. Back then it was a simple personal website. In 2026 I rebuilt it with the help of two AI platforms, and it grew into something much more interesting: a modern CV template.

Everything you see here is the demo. My own CV is the exemplar. The work history, the charts, the PDFs you can download, all of it comes from one small folder of Markdown files.

## Write it once

Here is the idea at the heart of Spotlite.

Most people keep their CV in one file and their online profile somewhere else. The two drift apart. You update one, forget the other, and six months later they disagree about your own career.

In Spotlite, each job is a single Markdown file. From that one file the template builds the work history page, the career timeline, the word cloud, the search index, and two PDF versions of your CV. Change a date once and everything updates together. Nothing can drift, because there is nothing to drift from.

## A CV that lays itself out

Run one command and Spotlite produces two documents: a one-page CV for recruiters, and a full CV with your complete history.

The one-pager is my favourite feature. It measures itself, and if the content will not fit on a single page, it scales the type down until it does. If it would have to shrink below a legibility floor, it refuses to build at all rather than hand you something unreadable. No more fighting Word margins at midnight.

Both documents are single column with selectable text, which means the automated systems that companies use to scan CVs can actually read them. And because they are generated from the same files as the site, they are correct by construction.

## Charts that feel alive

A CV is a story, and Spotlite tells it visually:

- A career timeline that draws itself from your work history.
- A skills chart where your strengths float and drift like molecules, each one clickable for the detail.
- A word cloud built from tags on your roles. A skill that appears in six jobs floats larger than one that appears in one, so the cloud shows where your career actually concentrated. It drifts gently, like a badge wall come to life.

The motion is polite. Every animation pauses when off screen, offers a pause button, and switches itself off for people who prefer reduced motion.

## Beautiful in the details

The whole template uses one design system, called Rosely: a warm, low-contrast palette that works in light and dark mode. And I do mean the whole template. Code samples, diagrams and even mathematical equations are themed to match, in both modes.

Some of it goes further than any template I know of. The syntax highlighting colours are checked by an automated test that fails the build if any colour drops below the contrast that accessibility guidelines require. The pages score 100 for accessibility in Lighthouse, and that number was checked in dark mode too, not just light.

There is also full-site search, photo galleries with a lightbox, smooth page transitions, social sharing cards, and an RSS feed. Diagrams work out of the box, and so do maths equations, rendered at build time with nothing fetched from a CDN.

## Fast, tested, free

Spotlite runs on Astro 7 with its new Rust-based Markdown engine, so builds are quick and pages are static and fast. A test suite of 119 tests keeps it honest. A GitHub Actions workflow is included, so pushing to your repository deploys the site automatically.

It is open source under the MIT licence. Fork it, gut my content, and make it yours.

## Make it yours in an afternoon

The customisation surface is deliberately small:

- One Markdown file per job or qualification, in the work and education folders.
- One file, `cv.json`, for your name, headline, key achievements and contact details.
- One file, `superpowers.json`, for your skills.
- Your photos and social links.

That is essentially it. The template does the rest, and my own files are all there as worked examples.

## What I learnt building it with AI

Two AI platforms did the heavy lifting of the 2026 rebuild. Google Antigravity laid the foundations: the design system, the test suite, the content collections and the first charts. Claude Code then turned it into the CV machine described above, and along the way reviewed the whole codebase and fixed bugs I had been shipping for months without noticing.

Three lessons, all happy ones. First, AI is remarkably good at improving what already exists; my hand-built site came back better than I could have made it alone. Second, the magic question is "did you actually check that?", which turns a confident answer into a verified one. Third, write notes for your AI the way you would for a new team member. Spotlite now carries a file of hard-won tips, and every session that reads it starts smarter than the last.

The result is a template I am genuinely proud of, built faster and finished better than I could have managed by hand.

Your CV deserves better than a Word document. [Help yourself.](https://github.com/hellotham/spotlite)
