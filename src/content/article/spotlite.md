---
title: 'Spotlite: the modern CV template'
description: The template this site runs on, and what I learnt rebuilding it with two AI platforms.
pubDate: 2026-07-28
---

![screenshot](../../assets/screenshot.png)

Everything on this site comes out of one folder of Markdown files. So do the two CV PDFs you can
download from it.

The template that does it is called [Spotlite](https://github.com/hellotham/spotlite), it is MIT
licensed, and you are welcome to it.

I hand-coded the first version on 23 May 2023, as a personal website and nothing more ambitious
than that. I had something working two days later. I made eleven commits that week and then left
it alone.

Over the next three years I touched it eight times. Seven were dependency bumps or framework
upgrades, Astro 4 in November 2024 and Astro 5 the following February. The eighth fixed a hover
colour.

Then in May 2026 I rebuilt it.

## Why one file for each job?

Because I did not want to keep two copies of my own career.

Each job is a Markdown file, and everything else derives from it: the work history page, the
timeline, the word cloud, the search index and both PDFs. When I change a date, I change it once.

## The one-page CV

One command produces two documents. A one-page CV, and a full one carrying the complete history.

The one-pager measures itself as it renders and scales the type down until the content fits a
single page. I set the floor at 80%. Below that it refuses to write the file and says why, rather
than quietly handing me a second page.

Both documents are single column with selectable text, so the screening software can read them.
They come from the same files as the site, so they cannot disagree with it.

## The charts

I drew three of them with D3. The timeline builds itself from the work entries, and the skills
chart floats each strength as a bubble you can open for the detail behind it.

The word cloud sizes each tag by how many roles carry it. Enterprise architecture sits on six of
my fifteen jobs and comes out largest, which is a fair summary of what I have been doing since 1998.

I put a pause button on anything that moves indefinitely, stopped it when it scrolls out of view,
and switched it off for anyone who asks for reduced motion. That last one needed doing twice. The
CSS preflight tames transitions, but a `requestAnimationFrame` loop runs on regardless, and I had
to stop those by hand.

## Rosely, and the contrast I got wrong

The whole template shares one design system, which I call Rosely. Sixteen colours, warm and low
contrast, built around a rose quartz pink.

Low contrast is a pleasant thing to say and an awkward thing to ship. Morning Glory, the pink I
wanted for links, reaches 2.2:1 on the cream background, and body text needs 4.5:1. So light mode
uses a darker pink, and Morning Glory appears only on the dark background where it clears.

Code blocks were worse. Astro's default `github-dark` renders comments at 3.05:1, and a code
comment is a sentence like any other. Nothing in the build complained, and it only shows on pages
carrying a lot of commented code, so it sat there for a long time.

They now use Rosely palettes in both schemes, and a test recomputes every token against its own
background and fails the build below 4.5:1.

I then wrote a contrast audit that reported 222 failures across the site.

Every one was an artefact.

It had pulled three numbers out of `getComputedStyle().color` with a regular expression and
treated them as RGB, and the theme is authored in `oklch`. The real number was zero. The audit
now paints each colour onto a canvas and reads the pixel back.

## What else is in it

I render the diagrams and the maths at build time, so a page fetches nothing from a CDN to show
them. Search covers the whole site, and I had that wrong for a while: the fallback index drifted
out of step with the real one, and four collections were unsearchable in development while
production worked perfectly.

I moved it to Astro 7 and its new Rust Markdown processor. The suite runs 119 tests across 27
files, and several assert against the built output, so a broken build fails them. I left the
GitHub Actions workflow in, so pushing to your repository deploys the site.

## What you would have to change

I tried to keep this short.

- One Markdown file for each job or qualification.
- `cv.json`, for your name, headline, key achievements and contact details.
- `superpowers.json`, for your skills.
- Your own photos and social links.

That is most of it. My own files are all still sitting there as worked examples, in case you
would rather edit something than start at an empty page.

## What I learnt building it with AI

I rebuilt it with two AI platforms. Google Antigravity took six days in May 2026 and some 460
commits to lay the foundations, and gave me the design system, the test suite, the content
collections and the first of the charts. Claude Code picked it up in late July and built the CV
pipeline on top.

It also read the whole codebase and found things I had been shipping without knowing. A shortcut
I had written as `focus-ring` never fired, because UnoCSS resolves `focus-` as a variant before
it looks for a shortcut of that name. Eleven elements carried a 1px grey focus ring instead of
the 2px one I thought I had given them. A companion shortcut called `hover-accent` emitted no CSS
at all.

Neither of them produced an error.

That is why the most useful question I learnt to ask was "did you actually check that?"

My hand-built site came back better than I would have made it on my own. Spotlite now carries a
file of notes, one entry for each thing that cost me a day.

I left myself no such notes in 2023.
