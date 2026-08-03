---
title: 'Lessons Learnt from implementing and embedding an enterprise architecture team at National Wealth Management'
description: The talk I gave twice in 2003 — Sydney in July, Wellington in November — at BTELL's Enterprise Architecture Conference, on five years of implementing and embedding the architecture team at National Wealth Management, reproduced from the deck the conference CDs distributed.
pubDate: 2003-07-24
categories:
  - 'Conference papers'
  - 'Career'
tags:
  - 'Enterprise architecture'
  - 'Architecture practice'
  - 'Wealth management'
  - 'MLC'
---

_This is the talk I gave twice in the second half of 2003, on what five years of building an architecture team had taught us. The first delivery was at BTELL's Enterprise Architecture Conference in Sydney — the programme on the conference CD lists it as the 2.00pm case study on day one, the 24th of July 2003, on a bill that also carried John Zachman and Clive Finkelstein. The second was the same conference's Wellington run, held over the 4th to the 6th of November 2003, where the programme lists it as the 3.30 case study on day one. I was at [MLC](/spotlite/work/mlc/), and the deck introduces me as Manager, Architecture at National Wealth Management — NWM being the division of the National that MLC sat inside after the 2000 acquisition. The Sydney programme splits the difference and bills the talk as "at MLC"._

_One deck served both deliveries, and it is reproduced here from the Sydney CD's copy. The file was created and finished in a single Saturday sitting — the 31st of May 2003, 10.27am to 12.54pm, five revisions — seven weeks before Sydney. The Wellington CD's copy carries the same creation timestamp to the second, re-saved that October by "Tell Business", the organiser; its extracted text is character-for-character identical to the Sydney file, so this one reproduction covers both events. Ignore the file's "last printed" stamp of January 2001: it belongs to the NAG corporate template the deck was built from, and PowerPoint carried it forward. As with the other decks reproduced on this site, **what follows is necessarily brief** — a deck is scaffolding for a person standing in front of it, the argument lived in what was said between the slides, and there are no speaker notes in the file._

_All nineteen slides are reproduced, one to a section, at the deck's own numbering. Four carry drawings, converted to vector figures from the deck itself: slides 7, 16, 17 and 18. Where prose sat beside a drawing — the assumptions on slides 17 and 18 — it is set as text after the figure rather than left inside it, and the slide titles are the section headings rather than repeating in the figures. Slides 12 to 15 look like tables but are drawn as positioned shapes; each is re-set as a table whose two columns pair the options being compared, with the full-width bands beneath set as headed lists, and the pairing rebuilt from the shapes' coordinates rather than the file's drawing order. Slide 3's two columns are set left column first. The bullets throughout were Wingdings glyphs, which is a typeface choice rather than content, so they are ordinary list bullets here. The slide page numbers are not carried, and slide 3's photographic banner — a strip of stock photographs captioned "Wealth Management" — is not carried either._

_Two repairs are worth naming, both to conversion faults rather than to the deck. The converter prints the second line of every rotated two-line label on top of the first — it emits that line at its final page position but leaves it inside the rotated frame — which overprinted eight label pairs on slide 7; each second line is put back using the PDF rendering of the same slide as the reference. The same converter draws slide 16's pyramid diagram twice over and condenses its labels to as little as three-fifths of their natural width, badly enough that its own PDF output smears them into illegibility. The doubled drawing overlays itself exactly and is left in place; the labels' wording is confirmed from the file's text layer, and they are left set condensed, which a browser renders cleanly. Separately, slide 18's costing table is part of that slide's drawing, so it appears in the figure as drawn and is set out again as a table beneath it, to be readable as text._

_The words are the deck's own throughout, slips included: "Corporate Devlopment" on slide 5, "perfomed" in slide 9's survey table, "3, 300" advisers on slide 3 — and, on the closing slide, "Zachmann" with two n's, in a deck that shared its Sydney programme with John Zachman himself. Nobody proofreads a deck, and these are what the room saw._

_I gave two later talks that carry this story forward: [the Ark Group SOA talk of March 2005](/spotlite/article/ark-2005/) and [the BankTech.06 talk of July 2006](/spotlite/article/banktech-2006/). This one is where the architecture function those talks take for granted was built._

## 1 Title

**Lessons Learnt from implementing and embedding an enterprise architecture team at National Wealth Management**

Chris Tham \
Manager, Architecture \
National Wealth Management

## 2 Table of Contents

- Introduction
- Evolution of the architecture function from 1998-2003
- Business alignment
- Engaging with other areas of the IT organization
- Enterprise architecture vs project/solution focus
- Architecture governance
  - How to ensure the organization positively advances to the target architecture
- Enterprise architecture framework
- A “federated” approach to enterprise architecture

## 3 Overview of National Wealth Management

- **Broad portfolio of Financial Services across:**
  - Australia
  - New Zealand.
  - Europe
  - Asia
- **Products for Retail and corporate customers:**
  - Financial planning and advice services
  - Wealth creation
    - investments, financial planning, private banking
  - Wealth protection
    - Insurance
  - Succession solutions
    - Superannuation
- **Products for Corporate and Institutional customers:**
  - Outsourced investment
  - Superannuation
  - Employee benefit solutions
- **Created through the integration of**
  - National’s financial service and funds management businesses
  - MLC Group.
- **Internationally, as at 30th September 2002, Wealth Management had over:**
  - 2.8 million customers
  - \$64.5 billion on behalf of retail and corporate customers.
  - 3, 300 aligned and salaried advisers who choose to partner with Wealth Management.
  - 5,400 employees

## 4 History of MLC

- Citizens' Life Assurance Company Ltd established in 1896 at Sydney by a group led by James P Garvan.
- Citizens' Life Assurance took over the Mutual Life Association of Australasia and name changed to MLC in 1908.
- Lend Lease Corporation Limited formed as a public company in 1958 with Civil & Civic being the largest shareholder.
- MLC provided finance for Lend Lease's first project, the North Shore Medical Centre.
- Lend Lease made a successful (50 per cent) partial takeover of MLC, its largest shareholder in 1982.
- MLC became a wholly owned subsidiary of Lend Lease by 1995.
- MLC became part of the National in July 2000 creating Australia’s largest integrated retail fund manager.

## 5 Overview of Information Technology at NWM

- **MLC IT was wholly outsourced to IBM GSA in the mid 1990s**
- **MLC re established strategic control and management of IT in 1999**
  - Architecture was seen as one of the key areas to be “in sourced”
- **Business Technology (IT Function)**
  - Part of Corporate Devlopment and Business Technology which is also responsible for business strategy, mergers and acquisitions and business project services.
  - Staff size of about 550 excluding outsourced functions and external service providers
  - Infrastructure largely outsourced to IBM GSA
  - Application Development done through a combination of internal resources and external partners
- **Additional IT functions associated with overseas joint ventures and subsidiaries:**
  - UK, New Zealand, Hong Kong, Indonesia and Thailand

## 6 Evolution of the architecture team 1998-2003

- **Maturity**
  - Team size has grown from 1 to 12
  - Self-assessed at Level 3 (Architecture Process Management) in META Architecture Improvement Matrix
  - Positive feedback from recent risk audit reports
  - Key Performance Indicator for Architecture includes “% of IT investment that contributes to advancing towards the target architecture” – this is currently measuring around 80%
- **Deliverables/Artefacts**
  - Initial focus on Enterprise Application Architecture and technology standards/preferred products
  - Application Architecture went through at least three iterations over 1999-2001
  - Current focus is on Data Architecture and Security framework/models/guidelines, as well as reference architectures (design patterns)
- **Role**
  - Initial focus on Enterprise Architecture function and delivering enterprise level artefacts (framework, strategy, principles, architectures)
  - Focus in 2000-2001 is in establishing an architecture governance model and Solution Architecture role
  - Current focus is on balancing between enterprise and solution architecture roles

## 7 NWM Enterprise Architecture Framework

![The NWM enterprise architecture framework as five coloured panels joined by grey arrows. WM Business and Technology holds Business Strategy, Business Architecture, Business Unit MTVs, IT Strategy and Migration Roadmap, and aligns with and is supported by the WM Enterprise Architectures panel, whose columns are Application, Data/Information, Security and Infrastructure Architecture over Standards, Buy Lists, Guidelines. Group Enterprise Technology carries its own Application, Information and Infrastructure Architecture columns over Methodologies. The enterprise architectures are designed into WM Reference Architectures, patterns for E-Business, SHAPE, Reporting, Servicing and Product Services, which are implemented by WM Projects — programs such as Amazon carrying program and solution architectures — and re-used by further projects. The WM IT Portfolio of systems and asset lifecycle plans feeds gaps and issues back to the architectures, receives what projects deploy, and exemptions pass between the projects and the architectures](../../assets/btell03-figure-1.svg)

## 8 Definition of key documents

| Document | Definition | Building Analogy |
| :-- | :-- | :-- |
| IT Strategy | Statement of strategic direction for Business Technology aligned to business strategy. | “Vision of the city” |
| Migration Roadmap | A list of projects and changes to the IT environment over the next 3 years that will help us achieve the business and IT vision. | Development stages |
| Application Architecture | A target model of major application functions, their inter-relationships, and how they are perceived by customers, intermediaries, business partners, and staff. | Town plan |
| Data Architecture | A target model of data (including types and sources) required to support business functions and processes | Residential / business zoning |
| Security Architecture | A view of WM security policy will be implemented in WM systems, and types of security services required to support the policy. | Police |
| Infrastructure Architecture | Framework and guidelines for the underlying technology (infrastructure, development and management tools) supporting the application architecture. | Water, electricity, telephone |
| Standards and Buy List | A list of technologies, or approved products and tools, that has been selected to be implemented, supported and used uniformly within WM. To be applied as “building blocks” for IT solutions. | Preferred suppliers |
| Guidelines | Guidelines, tools and coding standards for buying and building applications, including EBF Framework, Secure Application Development Guidelines, J2EE ADF, .NET coding standards, etc. | Building codes and standards |
| Reference Architectures | Implementation “patterns” for deploying subsets of the enterprise architectures. | Model plans |
| IT Portfolio | Key applications and IT infrastructure currently deployed within WM. | Land Title Office |
| Solution Architecture | Description of the components (function, software, infrastructure) of an IT solution and the relationship between the components. | Building design/plan |

## 9 Comparing the architecture function in NWM against other organisations

- The Giga Information Group\* conducted a survey of enterprise architecture groups in organisations.
- The 15-question survey had 26 respondents (Giga clients from around the world, various industries).
- The size, role and positioning of the NWM Architecture team seems to be broadly in line with the majority of survey respondents, as well as best practices.

| Area Surveyed | Results | Giga “Best Practice” | NWM Current Situation |
| :-- | :-- | :-- | :-- |
| Centralisation | 92% have an architecture group, and 90% of these groups are centralised or centralised plus distributed groups / individuals | Small, central group with coordinated participation of distributed individuals to form an extended/virtual team. | NWM has a centralised architecture team, but the National Australia Group has both a central group plus business unit architecture groups. |
| Group Size | 67% has 6 or fewer staff, median size 5 | Typical central architecture groups are small in size, around 4-6 people, supported by network of senior technical staff. | There are 6 architects in core team, performing a mixture of enterprise/project roles, supplemented by an extended team focusing on project solution architectures. |
| Reporting Structure | 68% of groups did not report to a CIO/CTO About 1/3 of groups also were accountable to a steering committee | Architecture groups should report to the CIO level, or to a non-operational group. Architecture should not report to infrastructure or development | Architecture team reports to Head of Business Technology. In addition, there is a Strategic Architecture Forum that reviews/oversees architecture activities |
| Consulting | Tends to be perfomed out of central group, with 60% of central architects spending up to 1/3 of time consulting | Consulting by an enterprise architecture team can bridge political boundaries, provide guidance and best practices and implement architecture governance, however consulting time needs to be managed carefully. | Core architecture team spends up to 30% of time consulting to business and IT. |

_\* Source: Giga Planning Assumption RPA-042001-00002, April 2001_

## 10 Creating the Solution Architecture Role

- A **Solution Architecture** is a document and project deliverable mandated for all projects …
- … it is also a process by which the organisation can agree on the high level design of the solution/project …
- … choosing from a list of potential options …
- … plus a mechanism for ensuring that we do build to the solution in the project.

<!-- -->

- A **Solution Architect** is …
- … a member of project team …
- … resourced through Architecture team
- … drives definition of an agreed and signed off solution architecture
- … ensures solution progresses towards target enterprise architecture
- … ensures solution is implemented in accordance to design
- … covers both application and infrastructure aspects of solution, by working with other parts of the IT organization and partners

**Exemptions to architecture compliance may be granted based on:**

- The Architecture/Standard is not deemed relevant or implementable for valid reasons.
- Project is pioneering new architectures or technologies.
- Compliance is judged to be non-economical (even in the longer term) AND does not compromise ability to integrate across applications.

## 11 Strategic Architecture Forum

- Decision making body, focus is proactive rather than reactive
- Membership consists of senior management across Business Technology and is chaired by the Head of Business Technology
- Agrees on key strategic architecture and solution design decisions focusing on both "what" (conceptual) as well as "how" (physical/<wbr>pragmatic/<wbr>delivery/<wbr>transition)
- Syndication group for enterprise solutions
- Ensure all points of view are covered in decision process, not just architecture
- Link a project/component bottom up view with enterprise/strategic top down view
- Ongoing input from external views/vendors to develop greater awareness and understanding of new offerings
- Outward communication to business and IT on strategic positions including educational aspect
- Escalation point for key issues/exemptions from architecture group
- Takes a leadership role for ‘technology’ position papers

## 12 Solution Architects: Consulting vs Performing (as part of project team)

| Consultant to project performing QA | Part of project team, doing the work |
| :-- | :-- |
| **Pros**<br>More effective utilisation across multiple projects<br>Provides “enterprise” perspective to influence designs<br>Requires broad-based rather than specific technical expertise | **Pros**<br>Ownership and accountable for project delivery<br>Stronger relationships with team members, avoids “us and them” – better able to understand key issues<br>Deliverables/measure of success easier to define |
| **Cons**<br>Lack of clarity on deliverable/measure of success<br>Risk of “ivory tower” perspective<br>Lack of in-depth skills or skills atrophy over time<br>Potential lack of reuse of project not implementing design effectively due to lack of understanding/buy-in | **Cons**<br>Specialised skills hard to find or leverage across projects<br>Risk of non-optimal allocation of resources<br>Need to ensure link to central governance |

**WM Current Situation**

- Strategy and Architecture team play a mixture of consulting/performing roles in projects, depending on situation
- Solution Architects resourced outside team tend to be part of team in a perform role.

**Best Practice/Key Trends**

- Both Meta and Giga recommend a consulting role for enterprise architects, supplemented by an extended team drawn from application development/infrastructure that does the detailed design of various aspects of architecture.

**Recommendation**

- Consulting/review role should be separated from perform role (Solution Architect) – both required, performed by different people
- Consulting/review role should be performed by enterprise architects, supplemented by Design Review Group and ext. consultants.
- Consulting role should have measurable and tangible deliverables/measures of success, eg. achievement of sign-off.
- Formalise an extended architecture team to focus on Solution Architect role
- Rotate people between consulting/performing roles to build balance – need to develop link/governance across both roles

## 13 Solution Architects: Centralised vs Distributed resources

| Centralised | Distributed |
| :-- | :-- |
| **Pros**<br>More effective utilisation across multiple projects<br>Focus, progress and continuity, also career / development management (for permanent staff)<br>Better reuse, knowledge sharing and compliance to enterprise architecture | **Pros**<br>Leverages architecture skills outside centralised group<br>Alignment with business unit allows fostering of specific business/domain expertise over time |
| **Cons**<br>Risk of “ivory tower” perspective<br>Lack of in-depth skills or skills atrophy over time<br>Slower ramp up/down of resources to meet demand | **Cons**<br>Tendency to create silo solutions due to lack of perspective<br>Inhibits knowledge sharing across architects |

**WM Current Situation**

- Full-time permanent Solution Architects currently centralised within Strategy and Architecture team.
- Solution Architects resourced from outside team are distributed by default (no common reporting structure outside project), and may come from different organisations

**Best Practice/Key Trends**

- Both Meta and Giga recommend a hybrid model consisting of centralised architects supplemented by external resources with specialised/focused skills forming a single “virtual” team.

**Recommendation**

- Formalise an extended team (centre of excellence?) of Solution Architects consisting of both Strategy and Architecture team members plus resources from project pool with Solution Architecture expertise – see appendix slide
- Ensure knowledge sharing across extended team
- Rotate people across enterprise and solution architect role (and also to other teams in BT) – to ensure balance between theory and practice and to develop solution architecture expertise outside of architecture team.

## 14 Solution Architects: Dedicated Project Resource vs limited time engagement

| Dedicated (full time?) over life of project | Time limited to initial stages of project |
| :-- | :-- |
| **Pros**<br>Ownership and accountability for delivery, not just design<br>Ensure project build to architecture | **Pros**<br>Leverage skills across multiple projects<br>Role of Solution Architect during build and test not clear (technical team leader?) |
| **Cons**<br>Higher project cost due to dedicated allocation<br>Cannot leverage skills across multiple projects | **Cons**<br>Less accountability for project delivery<br>Risk of solution variances post design<br>Risk of insufficient buy in/understanding of solution |

**WM Current Situation**

- Currently the Solution Architect’s role is limited from Feasibility to end of Detailed Design phase. Many Solution Architects only play a part time role within projects (due to project budgeting constraints, or lack of recognition of value added).

**Best Practice/Key Trends**

- Giga recommends a time-limited consulting role for architects in projects.

**Recommendation**

- Large projects (eg. Superstar) should have dedicated full-time solution architects responsible for overall solution up until detailed design stage, and part time role after that till completion to ensure accountability for delivery
- Large programs (eg. Integra) should have dedicated “lead architect” over life of program (reporting to Program Director) – Solution architects for various projects within program should report to lead architect as well as individual project managers
- Smaller projects should go for limited-time approach, to maximise leverage of skills across projects.
- Amend BT estimation model to ensure solution architect cost included in estimates.

## 15 Solution Architects: In-house vs externally-sourced

| In-house | Externally sourced |
| :-- | :-- |
| **Pros**<br>Better knowledge of business, enterprise architecture<br>Continuity and knowledge capture<br>Lower unit cost | **Pros**<br>Access to and leverage (potentially rare or specialised) skills available in marketplace<br>Easier to manage supply and demand |
| **Cons**<br>Need to be budgeted for (but charged out to projects)<br>Less flexibility in managing supply/demand<br>Specific skills difficult to source/retain | **Cons**<br>Higher unit cost (per project)<br>Lack of continuity and potential loss of knowledge<br>Difficult to enforce enterprise architecture governance, learning curve required |

**WM Current Situation**

- Highly leveraged model consisting of small number of permanent staff/contractors, supplemented by use of resources from external consultants.

**Best Practice/Key Trends**

- Meta and Gartner recommends in-sourcing architects as in-house resources are better placed to understand the business context and endowed with the sense of ownership to make the difficult trade-offs. Giga recommends leveraging the use of external service providers to provide access to specialised skills, industry knowledge and methodologies (where appropriate).

**Recommendation**

- Continue with a leveraged model consisting of both internal and external resources, but build up internal capability for Solution Architects. Use external resources to bring in new ideas/ways of thinking/research.

## 16 Federated Architecture Model

- One size does not fit all - Technology variation across business units within the National, driven by each unit’s specific objectives, resources and priorities.
- Focus of architecture governance - Ensure common standards are defined and successfully applied across the group for elements of ‘common’ or ‘foundation’ building blocks.
- Proposed solutions need to be assessed against the overall architecture to determine if they are leveraging, contributing or duplicating components.
- Standards for the ‘common’ or ‘foundation’ layer are documented and communicated.

![Five pyramids of differing heights, one for each of Business Units A to F, no E among them. Each pyramid has a pale Unique top — Business Unit B's reads Unique Needs — and B, C and D carry a Common (with separate data) band beneath it. A wide Common band runs under pyramids B and C, and every pyramid stands on a hatched Enterprise Foundation base running the full width](../../assets/btell03-figure-2.svg)

## 17 Architecture Domain Model

![The Group Enterprise Architecture Leadership Team as a green band of gold boxes: CT, FSA, CIB, BNZ, WM and FSE Architecture Leads, and Enterprise Architecture Strategy. A grey wedge zooms from the WM box down into a panel of four gold domain boxes — Competency Domain holding Architecture Competency, Business Line Domain holding Business Line, IT Asset Domain holding IT Asset, and Project Delivery Domain holding Solution Architecture. A brace groups the first three as 30% Funded By WM Architecture budget, another marks the fourth as 70% Cost Recovery from Projects, and the panel is captioned Solution Architect](../../assets/btell03-figure-3.svg)

**Assumptions:**

- The business unit architecture leads and the enterprise architecture strategy team make up the Enterprise Architecture leadership team
- Solution architects are aligned to competency domains, e.g. application architecture
- Solution architects are aligned to business line domains, e.g. retail, insurance, distribution
- Solution architects are aligned to IT asset domains in AD/M, e.g. product admin systems, e-business
- The aligned disciplines are expected to require 30% of the solution architects time
- Solution architects are assigned to a project delivery domain, e.g. Amazon, Technology refresh

_Note: percentages will vary across business units_

## 18 Funding and Recharge Model

![A conceptual chart of FTE's against Demand: a bell curve rises through a rectangle five FTE's high. The rectangle is the Core Team, the hump of the curve above it is Additional Resources, an arrow marks the Funding Shortfall where the curve sits below the rectangle's ceiling, and a double-headed arrow marks Temporary Roles across the hump's height. The costing table set out below the figure is drawn beneath the chart inside the same panel](../../assets/btell03-figure-4.svg)

| Role       | FTE’s | Funded | Recovered | Overhead |
| :--------- | :---- | :----- | :-------- | :------- |
| Team Lead  | 1     | 100%   | 0%        | 1        |
| Core Team  | 6     | 30%    | 70%       | 2        |
| Additional | 5     | 0%     | 100%      | 0        |
| Total      | 12    | 25%    | 75%       | 3        |

**Assumptions:**

- Dedicated resource acting as architecture manager
- Core architecture team consisting of dedicated resources independent of demand
- All projects are required to have a solution architect
- 70% of the core team resource costs to be recovered from the projects to which they are assigned
- When demand for architecture resources are in excess of the core team, additional resources are to be added to address the gap
- 100% of the additional resource costs to be recovered from the project that originated the resource request
- Additional resources could be National employees or external consultants

## 19 Summary: Lessons Learnt

- **Be wary of consultants and vendors**
  - Vendor architectures are often proprietary and designed for “lock in”
  - However, if the shoe fits, wear it! (Otherwise you end up having to build everything)
  - Consultants are armed with methodologies, but the end of the day their role is to facilitate, not create
  - Industry models and “canned” architectures are useful … as a starting point
  - Once you have a process and a framework in place, try and avoid consultants “re-inventing the wheel” with a new methodology, but extend what is already there
- **Architecture is a competency, not a function**
  - Ideally, everyone in the IT organization should have architecture skills, like project management or requirements analysis
  - The role of the architecture team is to facilitate and consolidate architecture efforts
- **Start small and grow**
  - Don’t try to solve world hunger and populate every box in the Zachmann framework simultaneously
  - Focus on the key aspects, and continually build on previous work
  - Use iterative or stepwise refinement techniques
  - However, don’t be afraid to throw away and start again
- **Align with everything**
  - Make sure you can relate and trace architecture artefacts to business strategy, industry models, other organizations/divisions, consultant frameworks
  - Alignment can happen both ways, don’t be afraid of telling the business strategy people they are wrong, or have missed something (but do it nicely!)
- **Communicate, communicate, communicate**
  - Designing a model, architecture or solution is the easy bit
  - The hard bit is convincing the organization that you are right
  - The even harder bit is ensuring that what is built is what’s designed

## Sources

- **The deck**, `4 Tham.ppt`, 237 KB, nineteen slides, created and finished on Saturday the 31st of May 2003 between 10.27am and 12.54pm, revision 5, in Microsoft PowerPoint against the NAG Template. Distributed as paper 4 on the Sydney conference CD, whose files are dated the 11th of July 2003. Reproduced above.
- **The Wellington copy**, `Paper 5 Chris Tham MLC.ppt` on the Wellington conference CD, carries the same creation timestamp to the second and was re-saved on the 7th of October 2003 by "Tell Business", the conference organiser. Its extracted text is character-for-character identical to the Sydney file — 18,737 characters compared with punctuation and spacing squashed — and its summary-stream word count of 3,535 against Sydney's 3,449 is an artefact of the organiser's re-save, not a revision. It is not archived separately, because it adds nothing the Sydney file does not already carry.
- **The conference CDs.** Both events distributed their papers behind a browser built as `BTELL.exe`, and the programmes embedded in it date everything: Sydney ran as "The Enterprise Architecture Conference", day one on the 24th and day two on the 25th of July 2003, sponsored by IBM, with this talk as the 2.00 case study on day one; the same CD advertises the Wellington run for the 4th to the 6th of November 2003, and the Wellington CD's own programme lists this talk as the 3.30 case study on day one, billed as Manager Architecture, MLC Australia.
- Slide 9 cites its survey in its own footnote, kept beneath the table above: Giga Planning Assumption RPA-042001-00002, April 2001.
- [The promise and pitfalls of implementing a Services Oriented Architecture](/spotlite/article/ark-2005/), the talk I gave in March 2005, and [Services Oriented Architecture in a Retail Bank](/spotlite/article/banktech-2006/), the talk I gave at BankTech.06 in July 2006 — the two later instalments of the story this deck begins.
