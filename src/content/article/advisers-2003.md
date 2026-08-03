---
title: 'Getting technology right for advisers'
description: A September 2003 talk on National Wealth Management's technology for financial advisers — the shift to holistic advice, the business system behind it, and AdviserCentral.
pubDate: 2003-09-18
categories:
  - 'Conference papers'
  - 'Career'
tags:
  - 'Wealth management'
  - 'Technology strategy'
  - 'MLC'
---

_This is a talk given in September 2003 on behalf of Geoff Wenborn, then Chief Information Officer of National Wealth Management, whose name is on the title slide. Geoff could not attend and asked me to deliver it; I built the deck from his ideas, so it is best read as a joint effort with me presenting for him. I was Manager, Architecture at [MLC](/spotlite/work/mlc/) at the time._

_**The deck names no conference, and nothing in it records which event it was.** I recall it as the case study I gave to the Open Group's Enterprise Architecture Special Interest Group in Sydney that year, which my 2005 résumé lists as "Case Study: National Wealth Management" — a different title from this one. The file carries no speaker notes and no mention of the Open Group, a special interest group, a seminar or a conference anywhere in its binary, so the identification is recollection rather than something the document supports. It is filed among my conference material, it is the right year and the right subject, and that is as far as the evidence goes._

_Two versions survive, both begun on 1 September 2003. This is the later one: seventeen slides, four hundred and forty-three revisions, finished and printed on 18 September. The earlier state of 9 September has twelve slides, and the fortnight between them was a rewrite rather than an edit — six slides went, eleven arrived, and only six survived unchanged. What went was the technology-department framing: "Driving value from technology", "Our greatest IT challenges", "Supporting our business and advisers", "Building critical tools to manage advice relationships" and "Helping to integrate bankers & planners". What arrived was the business: the industry under scrutiny, the strategic intent, the business system, and AdviserCentral._

_Set out here as prose in the deck's own order. Most of its diagrams are built from licensed clip art — cartoon advisers, an iceberg, a racing driver, jigsaw pieces — so those I describe rather than redraw, and the deck is archived so anyone can see them. The one figure reproduced is the holistic advice chart, which is plain vector and carries the argument. Two conversion notes: LibreOffice re-wraps text to its own metrics and breaks a word mid-way, so "practice managemen t" and "Enhanced Investmen t Offer" in the extracted text are artefacts and read "management" and "Investment" in the original; and, as in other decks of this vintage, each title and bullet is drawn twice as a drop shadow, which doubles the extracted text._

_The slide titled "The \[trend\] to holistic advice" carries those square brackets in the original — a placeholder that was never taken out._

_Checked line by line against the deck afterwards: all 314 of its distinct lines appear here or in the figure, 299 of them word for word and 15 reworded where a slide bullet became a sentence. The check is what caught the four things the first draft had dropped, among them a whole divider slide and the "LeadIT" badge above._

## The National Group

National Wealth Management sat alongside Corporate & Institutional Banking, Financial Services Australia, Financial Services New Zealand, Financial Services Europe, Finance, People & Culture, Risk Mgmt, National Technology and Corporate Development. It had 5,500 employees across Australia, Europe, Asia and New Zealand.

## Overview of National Wealth Management

A broad portfolio of financial services across Australia, New Zealand, Europe and Asia.

For retail and corporate customers: financial planning and advice services; wealth creation through investments, financial planning and the private bank; wealth protection through insurance; and succession solutions through superannuation. For corporate and institutional customers: outsourced investment, superannuation and employee benefit solutions.

It had been created through the integration of National's financial service and funds management businesses with the MLC Group. Internationally, as at 31 March 2003, Wealth Management had over 2.8 million customers worldwide; \$65.1 billion funds under management, for both retail and corporate customers; 3,300 aligned and salaried advisers, in addition to external advisers who choose to partner with Wealth Management; and 5,500 permanent employees.

## Building professional technology services

- In 1994, the MLC IT function was outsourced to IBM GSA.
- In 1999, MLC re-established strategy control and management of IT. Architecture was seen as one of the key areas to be in-sourced.
- Now in Business Technology: more than 550 people, excluding outsourced functions and external service providers; infrastructure largely outsourced; applications development done through a combination of internal resources and external partners.

That second line is the one I was hired into. Re-establishing strategic control over a fully outsourced operation is what the architecture function at MLC was for.

## Our journey so far

A timeline ran a rising arrow from 2000 to 2005, a theme to each year, with "20% each Year" alongside it and a cycle of Feedback, Lessons Learned and Refine Process turning underneath. A starburst read "It's the Journey of … Continuous Improvement".

| Year | Theme                                    |
| :--- | :--------------------------------------- |
| 2000 | Operations Focus                         |
| 2001 | Standardisation — the BT Operating Model |
| 2002 | Transforming the iceberg                 |
| 2003 | Innovation & Leadership                  |
| 2004 | Digging deeper                           |

A badge on the 2004 artwork reads "LeadIT", set at 2.6 point and effectively invisible on the slide itself.

## Our continual 'stretch'

Whilst our goals and objectives are refined every year, they focus on a vision of being the Partner of Choice, across culture, operational efficiency, value add, relationships and innovation:

- Getting more value from the same or less investment.
- Reducing the effort required for non-discretionary work.
- Doing more discretionary work from the same pool of resources.
- Skills development.
- Efficiency improvement.
- Empowerment and growth.
- Releasing capability.
- Creating bandwidth.

## So what makes technology in Wealth Management different?

Business relationship model. Culture. "More to come — from the strategy", the slide added, which is what a deck being written a fortnight before delivery looks like.

## How does technology help drive our organisation's success?

A divider, and then the answer in three parts: the scrutiny the industry was under, the strategic intent, and the business system built to serve it.

## Like it or not this industry is under scrutiny

- 3 years of negative investment returns.
- ACA/ASIC survey + media attention.
- Senate Select Committee investigation.
- Regulators becoming more active — FSRA.
- On the "war path": IFSA, APRA, ASIC, ACA, FPA.
- Political lobbying re: Choice legislation.

## Wealth Management's strategic intent

"To be a leading international financial services company which is trusted by you and renowned for getting it right."

How will we do this? Three ways: leading the evolution towards holistic advice; delivering an integrated financial services experience for our customers; and leveraging our core capabilities into selected international markets.

Holistic advice means delivering appropriate financial solutions to clients depending on their current needs and goals. The argument for it was a straight inversion — the industry's mix of work turned upside down, product recommendations falling from more than 40% of advice to under 5%, and holistic financial planning rising the same distance the other way:

![Two opposed triangles. On the left, Industry Now, a blue triangle widest at the bottom: Holistic Financial Planning under 5 per cent, Strategic Advice 20 per cent, Investment Advice 35 per cent, Product Recommendations over 40 per cent. On the right, Industry Future, an olive inverted triangle over a large question mark, with the same four bands in the opposite order: Holistic Financial Planning over 40 per cent, Strategic Advice 35 per cent, Investment Advice 20 per cent, Product Recommendations under 5 per cent.](../../assets/advisers2003-holistic.svg)

## Our enterprise goal is to be the preferred business partner for quality advice practices

A diagram of the business system laid an adviser's process — Prospecting, 1st Appointment, Plan Preparation, Implementation, Client Review, Ongoing Service — across four layers: integrated financial solutions, practice management, business platforms and dealership infrastructure, with Strategy Planner alongside. Every step was marked COOL.

Three strands ran through it: Business Partner and Outsourcing Provider, 'B2B'; Enhancing the Adviser to Client Experience, 'A2C'; and the Move towards Holistic Financial Planning model, 'HFP'.

The claims made for it:

- A complete and integrated business system where each component is market competitive and sustainable in the long term.
- Building and integrating our business system to lead the evolution to holistic financial planning.
- Focused on improving our business system to support advisers in the delivery of an enhanced Adviser to Client Experience.
- Sets us apart from our competitors who only offer some parts.
- Everything we do helps advisers deliver better client outcomes.
- Our unique and market leading value proposition.

## We are committed to delivering continued improvements

The same diagram again, twice over, with the six process steps marked HOT the second time rather than COOL — the hotspots to be addressed:

- Enhance the pieces and improve the integration of our target business system.
- Enhance the "Adviser to Client Experience" and address current hotspots.
- Evolve the Holistic Financial Planning advice model.

## Enhancing the 'Adviser to Client Experience'

The WM goal restated — "to be the preferred business partner for quality advice practices" — over a picture of the Strategic Advice Platform arching above Enhanced Investment Offer and Foundations, on Common Technology Enablers, with the Journey rising alongside. Around it, what each piece was for:

- Integrated financial planning tools for advisers.
- Market competitive investment offer.
- Consolidated and comprehensive adviser and client information.
- Robust and secure supporting technology infrastructure.
- An adviser force supported by motivated and skilled WM People.

## A positive impact on the key drivers of WM performance

Four core work areas delivering a collection of interdependent projects — Journey, Adviser, WM People and SHAPE — over the same process steps, Common Technology Enablers, the Enhanced Investment Offer, and Foundations of a single adviser and client view and holistic reporting.

Impacting key performance drivers: adviser productivity; number of advisers; percentage of an adviser's business on our platforms; business retention; and impact on expenses.

SHAPE is the project that came out of the "veneer" approach to the adviser workbench, and the one the National Group's first patent application was filed on.

## Our new Advice Platform — AdviserCentral

Financial planning tools to assist our advisers to capture their clients' details, carry out lifestyle modelling, conduct client reviews, write financial plans and select products.

## Transitioning our salaried advice channels

- Streamline the NAFP financial planning process for customers of the Bank.
- Move to the holistic advice model.
- Offer Lifestyle financial planning.

"More to come."

## Sources

- `GettingTechnologyRightforAdvisers.ppt`, seventeen slides, created 1 September 2003, 443 revisions, last printed and last saved 18 September 2003, 3,134 words. Titled "Getting technology right for advisers"; the author field holds the National Wealth Management template's own name rather than a person's.
- `GettingTechnologyRightforAdvisers - old.ppt`, twelve slides, the same file as it stood on 9 September 2003 after 265 revisions and 2,119 words.
- Both were found in August 2026 in the Conferences folder of a backup of my work machine.
