---
title: 'AI-dō: the way of AI, grounded in practice'
description: I have written a book about working with AI well. It is free to read, and it argues that the model you pick matters far less than the work you do around it.
pubDate: 2026-07-24
categories:
  - 'Written for this site'
  - 'Career'
tags:
  - 'Artificial intelligence'
  - 'Books'
  - 'Working life'
---

I have written a book. It is called AI-dō, it is free to read, and it is about what separates good work with AI from slop.

![The cover: AI-dō in heavy black type over a large outlined AI in mauve, with 道 brushed across it in pink and a small heart-shaped 愛 inside the A](../../assets/aidou.png)

## The model is rarely the difference

Take three of the projects I have written about here this year. [Hello Calc](/spotlite/article/hellocalc/) took 118 commits between February and July, most of them with Claude Opus 4.8 and the rest with Fable 5. [Rogoweb](/spotlite/article/rogoweb/) took five days. [Adventure](/spotlite/article/adventure/) took a few prompts each morning over breakfast.

Different models, and jobs of wildly different sizes. The part I actually did was the same every time: say what I wanted, say how I would know it was right, and check what came back.

I use the same handful of frontier models as everyone else. Which one I pick has rarely been the difference. Method has.

Sometimes it is the model, though. The hardest single thing in any project I built this year was laying out all 151 rooms of Adventure's cave as a clickable metro map. Gemini worked at it for days, and its best attempt was a physics simulation that came out differently every run and drew its connecting lines straight through the rooms. I handed exactly the same intent to Fable 5 and it came back inside thirty minutes with something that worked straight away.

But the intent and the check never changed. Only the model did. That is the part worth writing a book about, because it is the part you keep.

## Where it came from

It grew out of the last year or two of my own work. I had just finished an AI reference architecture for Cochlear, down to the guardrails for agentic AI and the controls that align them to ISO/IEC 42001. At the same time I was teaching information systems at Torrens University, where my students are business students rather than IT students. Consulting gives me the experience, and teaching makes me explain it. The book is the written version of that explanation.

## Who it is for

I assume you have already used these tools and have seen both what they can do and how often they get things wrong. I assume you are numerate, and can read a diagram, a code snippet or a research paper when one helps. I assume you want to use AI, not build it.

You do not have to work in IT. It helps to have enough Python or JavaScript to review code an AI has written for you, and that is the only technical thing I lean on.

## Won't it date?

In places, yes, and I have tried to mark where.

The field moves in weeks, so a book of prompts and tool tips would be stale a model release later. This one is about how the models work rather than about which model leads this quarter.

Where a claim is tied to a 2026 product or figure I say so, so you can see what has an expiry date on it. Every claim is cited inline to a primary source, so you can follow the trail and disagree with me properly. And where the evidence is thin, I say so rather than rounding it up.

## The six chapters

They are meant to be read in order the first time. Then come back for the parts you need.

| Chapter | Theme          | The question it answers                        |
| ------- | -------------- | ---------------------------------------------- |
| 1       | Foundations    | What is AI, what is it not, where do we stand? |
| 2       | Productivity   | How does it change individual knowledge work?  |
| 3       | Software       | How does it change building software?          |
| 4       | Disciplines    | What keeps that work sound at scale?           |
| 5       | Responsibility | How do we govern it safely and fairly?         |
| 6       | Mastery        | What stays distinctly human?                   |

[Chapter three](https://christham.net/aidou/software.html) is where those three projects come back as running examples.

## The name

道, read as dō, is the way: the lifelong disciplined practice behind arts like judō. 愛, read as ai, is love, meaning care for the people the work touches. Put together with the other sense of AI, the title reads as a disciplined way of working with AI, guided by that care. It also rhymes with Play-Doh, which is deliberate. Use AI like clay, shaping and reshaping it one push at a time.

Both characters open every chapter, brushed in the same dragon-stroke hand, over a seigaiha wave pattern from classical Japanese design. Chapter two is subtitled 愛 in practice. That comes out of three years spent learning the language and reading about the culture.

I designed the cover myself with AI helping, drawn directly in SVG because that is a text format a model can write. The title is set in Raleway Black. Below it sits a crumbling, glitching AI in a display face called Rubik Glitch Pop, with the character 道 sweeping across it in KokuryuSou, a brush font of raw dragon-like strokes. There is a heart-shaped 愛 hidden inside the letter A. According to Chinese astrology I am a wood dragon, which explains the brush strokes.

## How it was made

The book is built the way it argues you should work, which seemed only fair.

Every chapter is a single plain-text Markdown file, with the diagrams written in Mermaid. There is one source, and the website, the PDF and the ePub are all generated from it. Nothing is laid out twice by hand. If that sounds familiar it is the same idea behind [this site](/spotlite/article/spotlite/), where one folder of Markdown files produces the pages and the CV.

The look comes from a single file of design tokens. Every colour, type size and per-chapter accent lives in one `theme.yml`, and a small script turns it into the separate stylesheets each format needs, so adjusting a heading weight or a shade of pink is one edit that reaches the website, the PDF and the ePub at once. The palette is Rosely, the same soft Pantone-named set this website uses, chosen to stay calm across a long read. The twelve illustrations are Katerina Limpitsouni's, from unDraw, recoloured to match.

Quarto does the building. It renders the Markdown to a searchable website and, through the Typst typesetting engine, to a six-by-nine-inch PDF laid out like a printed trade book, and to a reflowable ePub for e-readers. The Mermaid diagrams are tinted to the same palette in every format, so a flowchart looks the same on the web, on the page and on an e-reader. Push a change and a GitHub Action publishes the result.

Much of that toolchain was itself built the way the book describes. I said what I wanted, let the tools work out how, and checked what came back. That last step is not optional.

## Read it

The book is [free to read online](https://christham.net/aidou/), and the whole thing, text and toolchain together, is [open on GitHub](https://github.com/ChristineTham/aidou) under a public domain dedication. Take whatever is useful.

Chapter six ends on shuhari, 守破離: keep to the form, break from it, then leave it behind. The forms in the book are my own shu. I expect to have broken half of them by the time you read it.

## Sources

- [AI-dō](https://christham.net/aidou/), the book itself, free to read. The preface is where the account of how it was built comes from, and chapter six is where shuhari closes it.
- [The repository](https://github.com/ChristineTham/aidou), text and toolchain together, under a public domain dedication.
- [Quarto](https://quarto.org/) and [Typst](https://typst.app/), which turn the Markdown into the website, the PDF and the ePub.
