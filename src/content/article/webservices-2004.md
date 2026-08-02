---
title: 'Selling web services to senior management'
description: The case-study talk I gave in July 2004 as Head of Architecture at MLC, on the journey from hard-to-justify EAI business cases to web services and the architecture that became our SOA — given at a conference the deck does not name.
pubDate: 2004-07-13
---

_This is the talk I gave in mid 2004 on how MLC came to adopt web services, reproduced from the
deck. The title slide bills me as Head of Architecture, MLC, and slide 2 states the deck's
purpose in its own words: "a case study of the journey that MLC undertook on the road to
defining and implementing a target architecture based on Services Oriented Architecture (SOA)
and web services" — the architecture practice profiled for an outside audience. Which
conference it was given at is not recorded in anything that survives: the deck names no event,
carries no organiser's branding, and searching the public record turns up nothing, so I will
not guess._

_The file dates itself. It was created on the 5th of July 2004 and last saved on the 13th,
revision 14, in my hands throughout. The MLC template and logo might suggest an earlier date —
MLC became part of the National in July 2000 — but the logo's own "A National Company" tagline
sits under it, and the branding simply outlived the acquisition, as it still did at
[the March 2005 talk](/spotlite/article/ark-2005/). Two of this deck's slides travelled: slide 4's
Strategic Architecture Forum list is the one from [the BTELL talk](/spotlite/article/btell-2003/) the
year before, and slide 16 carries, word for word, the SOA definition that the March 2005 talk
presents as my team's. As with the other decks reproduced on this site, **what follows is
necessarily brief**: a deck is scaffolding for a person standing in front of it, and the
argument lived in what was said between the slides. There are no speaker notes in the file._

_All sixteen slides are reproduced, one to a section, at the deck's own numbering, with each
slide's sentence title as its heading. Slides 3 and 7 are real tables in the file and are set
as tables, with slide 3's cell lists kept as lists within their cells. Six slides carry
drawings, converted to vector figures from the deck itself: 5, 6, 8, 9, 10 and 14. Where prose
sits inside a drawing it is also set out as text — slide 6's two assumption boxes, slide 9's
three scope lists, slide 10's two lists, and slide 14's six panels — so those passages appear
twice by design. The Wingdings bullets are ordinary list bullets here, and two pieces of master
furniture are not carried: the slide page numbers, and a live date field in the footer that
renders as the day of conversion rather than any date the deck holds._

_One repair is worth naming. The conversion re-wraps one label on slide 14 to its own metrics,
breaking "software" into "softwar" and "e" across two lines; the label is rejoined. The words
are otherwise the deck's own, slips included: "Scaleability" and "Reusabilty" among slide 14's
guiding principles, "Require no addition hardware or software" on slide 12, and slide 14's
title, "MLC was then subsequently revisited the need to deploy EAI". Nobody proofreads a deck,
and these are what the room saw._

## 1 Title

**Selling web services to senior management**

Using web services to provide flexibility, competitive advantage and reduced cost

Chris Tham \
Head of Architecture, MLC

## 2 Overview of presentation

- This presentation is a case study of the journey that MLC undertook on the road to defining
  and implementing a target architecture based on Services Oriented Architecture (SOA) and web
  services.
- It illustrates the difficulty of building and justifying a business case for Enterprise
  Application Integration (EAI) and why it is important to be able to clearly articulate
  business benefits and link to real business drivers and requirements.
- It also illustrates the need to continuously educate management about the financial benefits
  and necessity of integration.
- It demonstrates that the right approach will result in an architecture that:
  - Maximises flexibility
  - Provides competitive advantage
  - Allows the integration of legacy systems rather than rebuilding
  - Optimises IT spend
  - Enhances speed to market

## 3 A brief history of MLC's experience with Enterprise Application Integration technologies up till early 2003 and lessons learnt

| Time Period | What Happened                                                                                                                                                                                                                                                                                              | Lesson Learnt                                                                                                                                                                                                                        |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pre-history | Mainly mainframe environment – in-house and heavily customised applications, centralised customer database.<br>Data passed from system to system using dummy customer accounts and transactions<br>CICS transactions were screen-dependent – workflow system had to resort to “screen-scraping” techniques | Single view of customer lost when non-mainframe apps introduced – need an integration strategy!<br>Avoid using applications as a conduit for data/transactions – creates a dependency<br>Separate user interface from business logic |
| 1997-99     | IT Strategy recommended adoption of BEA Tuxedo for enterprise application messaging<br>Tuxedo deployed in new unit pricing system but only used internally within system, interfaces to other applications via batch files                                                                                 | Just choosing a product is not enough without an effective deployment strategy and roadmap and organisational buy in.<br>Deploying EAI technology does not necessarily lead to high benefit realisation                              |
| 2000-01     | Middleware project was initiated but subsequently cancelled due to funding constraints<br>A major project developed a web front end in J2EE. However, integration to back-end systems achieved using a variety of methods, creating some reliability and scalability issues                                | Ensure business benefits of middleware are strongly articulated<br>Dependencies across projects need to be carefully planned and managed                                                                                             |
| 2002-03     | An attempt to justify deploying an EAI hub for data transformation of batch interfaces did not succeed – business case was marginal<br>Debate over whether it was better to rationalise to core systems or build “middleware” across existing systems                                                      | Given that it is always easier to “add one more interface” than to deploy new technology, the scope and timing of when to introduce middleware is critical!<br>Understanding true business drivers is critical!                      |

## 4 MLC's governance of architecture is based on the Strategic Architecture Forum (SAF)

- Decision making body, focus is proactive rather than reactive
- Agrees on key strategic architecture and solution design decisions focusing on both "what"
  (conceptual) as well as "how" (physical/<wbr>pragmatic/<wbr>delivery/<wbr>transition)
- Syndication group for enterprise solutions
- Ensure all points of view are covered in decision process, not just Architecture
- Link a project/component bottom up view with enterprise/strategic top down view
- Ongoing input from external views/vendors to develop greater awareness and understanding of
  new offerings
- Outward communication to business and BT on strategic positions including educational aspect
- Escalation point for key issues/exemptions from architecture group
- Takes a leadership role for ‘technology’ position papers

## 5 The "EAI Business Case Development Tool" was used to help quantify the benefit of EAI versus custom integration. The modeling uses the following process flow:

![A flowchart headed TCO MODEL. From START, Examine Business Plan exports IT related issues as inputs to a calculation panel listing resources, applications, interfaces, architecture, software, hardware, training, project plan and ongoing operations, with a Calculate arrow producing outputs: a stacked bar chart of TCO by scenario and the cash needed to break even. A note lists the scenario inputs — the number of underlying back-end systems decreasing over time, additional interface requirements from other projects, and ongoing operational costs over a three year period — feeding a decision diamond, EAI supports positive business benefit?, with NO ending at Stay Custom and YES at Go EAI](../../assets/ws04-figure-1.svg)

## 6 The resultant business case was not compelling, resulting in marginal benefits, and a higher cost than point-to-point interfaces in the worst case scenario.

![Two stacked bar charts of three-year TCO, EAI against No EAI. The Worst Case Scenario chart stacks Architecture at 4,050,000 dollars, Integration at 3,150,000 and Operation at 4,080,000 for EAI, against 1,650,000, 3,780,000 and 3,030,000 without; the Mid-point Scenario stacks 4,050,000, 2,840,000 and 3,640,000 for EAI against 1,650,000, 5,040,000 and 3,970,000 without. Each chart carries its assumptions box, set out below](../../assets/ws04-figure-2.svg)

Assumptions: Based on 126\* messages, assuming \$25,000 per interface for EAI and \$30,000 for
interface for No EAI, and a 50% reduction in ongoing interface maintenance costs over a three
year period.

Assumptions: Based on 126\* messages, assuming \$22,500 per interface for EAI and \$40,000 for
interface for No EAI, and a 65% reduction in ongoing interface maintenance costs over a three
year period.

## 7 EAI, however, does offer significant value over custom integration through benefits that are harder to quantify.

| Item                                               | Description                                                                                                                                                                               |
| :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Increased application development capacity         | Rapid Development will shorten cycle times for development and free resources to support further integration efforts.                                                                     |
| Faster responsiveness to change                    | Flexible integration allows for changes to the business and technical landscape to occur with minimal rework and impact to production systems.                                            |
| Increased manageability and maintainability        | Manageability and maintainability provide extended technical control of the environment for proactive and reactive management of systems.                                                 |
| Improved access and distribution of information    | Improved access to data provided timely and accurate data across a distributed environment while minimising redundancy.                                                                   |
| Visibility and control over transaction processing | Business process management promotes the management of integration at the business process level and allows for real-time and historical analysis of business conditions and performance. |
| Increased interface integrity                      | Increase interface integrity provides for extended operational control of the enterprise interfaces supporting proactive interface management.                                            |

## 8 This triggered a strategic discussion on the optimal strategy for MLC's application portfolio or suite of systems.

![A three-column matrix — Type of System, Strategy, Resulting Target System — with four rows of system diagrams. Systems with small numbers of customers, accounts and support staff, and off sale products, run through Tradeup, or integrate the record keeping system into middleware with strategic interfaces; systems with large numbers of customers and on sale products keep their suite but integrate into middleware, or keep the suite and integrate into an aggregation and servicing layer providing single view of customer, operational data store, consolidated reporting and a servicing interface. Each strategy yields a target stack of front end, aggregation and servicing, middleware and record keeping layers](../../assets/ws04-figure-3.svg)

## 9 The decision was to defocus on EAI technology and instead develop the necessary software infrastructure to support reusable Enterprise Business Functions (EBF).

![A project breakdown under a gold Project, Component, Scope banner: Middleware Release 1 branches to three components — EBF Design Framework, J2EE Application Development Framework, and Common services Supporting EBF's — each with an arrow to its scope list, set out below](../../assets/ws04-figure-4.svg)

**EBF Design Framework**

- Development of an EBF design framework.
- Supporting guidelines for the EBF design framework
- The development of the EAI and EBF message standards
- MQSeries licenses / maintenance
- c.\$400k

**J2EE Application Development Framework**

- Assess in-house / group capabilities
- Agree scope of components to be built based on EBF Design Framework
- Determine project requirements for J2EE components
- Design and build of the required J2EE components
- c.\$300k

**Common services Supporting EBF's**

- Implementation of selected Common Services that support EBF's
- Design and build of the supporting infrastructure
- Supporting operational architecture
- c.\$800k

## 10 What is an EBF?

An EBF provides the functionality to perform specific common business operations, and makes
that available to the _enterprise_.

![Two panel diagrams of an Enterprise Business Function in its context. In each, a Local Interface strip sits above an Enterprise Business Function panel flanked by Common Application Services and EAI Services columns, over Database Services. The left panel holds an External Business Module linked to an Internal Business Module; the right holds a highlighted Business Module above a plain one, with a dotted line joining the two panels' modules across the gap](../../assets/ws04-figure-5.svg)

**EBF Framework**

- Definitions
- Guidelines and rules for EBFs
- Evaluation of packages as EBFs
- Usage Contracts
- Patterns for application integration
- Integration technology
- Common Security Architecture

**Benefits**

- Reuse
- Improved time to market
- Promote proven, high quality solutions
- Reduced functional duplication
- Minimise point to point solutions
- Increased platform consistency
- Known performance and behaviour

## 11 Subsequently, MLC then made a number of related decisions, all individually justified and presented to the SAF

- Developed an enterprise-wide logical data model that was consistent with industry standards
  and best practices
- Adopted XML as a format for exchanging messages and data across applications
- Evaluated and made a decision to adopt Microsoft .NET as a framework for desktop-centric
  application integration
- This created a need to provide inter-operability between desktop application components (in
  .NET) and back-end enterprise business functions (in J2EE)
- Which became an opportunity for considering … **Web Services**

## 12 Web Services Defined (circa 2003)

- Consists of three standards
  - Simple Object Access Protocol - how to encode an RPC on the wire including exception
    handling
  - Web Services Description Language - how to describe an API. Similar to IDL in CORBA, COM
  - Universal Description & Discovery Interface - a public web service repository accessible
    using web services.
- Broad industry support driven primarily by IBM & Microsoft
- Uses HTTP as the underlying protocol
- Platform and development tool independent
- Require no addition hardware or software
- Other add-on standards are emerging
  - Security
  - Transaction
  - Coordination

## 13 MLC's justification for adopting Web Services as an application integration mechanism

- MLC looked at the application integration architecture used within the National Australia
  Bank called Global Channel Services or GCS (MQ Series, ROMA, Mercator)
- This solution is difficult to justify where
  - Application Integration is required to desktop machines
  - Application Integration is required to machines outside the corporate firewall
  - Solution cost cannot be justified
- Current MLC systems are using HTTP based application integration in these situations
- Web Services provides a more interoperable standard for these situations
  - Standards based - XML, SOAP, WSDL
  - Vendor independence
  - Platform independence
  - Zero client footprint
  - HTTP transport layer
  - Strong development tool support
  - Significant standards activity adding security, transactions

## 14 MLC was then subsequently revisited the need to deploy EAI due to additional business requirements.

![A programme-status panel. A Solution set against Messages chart plots P2P, build reusable web service and broker software against message volumes of 1-20, 20-60 and 60+, with a callout that the servicing POC has proven P2P and web services back end access and connectivity. Around it sit a message-count spreadsheet and screen mock-ups over Siebel Data, and six text panels — Architecture Guiding Principles, Single View of Customer, What's Changed, Impact on Delivery Risk and Next Steps — joined by red arrows, all set out below](../../assets/ws04-figure-6.svg)

**Architecture Guiding Principles**

- Reuse -> Buy -> Build
- Scaleability
- Reusabilty
- Vanilla
- Performance
- Toward Strategic / Best practice

**Single View of Customer: Validation of Business Reqts**

- Establish customer index & core customer data
- Provide consolidated enquiry desktop for platform call centre teams

**What's Changed**

- Greater clarity on reqts & hence scope
- 11 product systems & 240+ messages in release 1
- Real time requirement to support servicing
- Supports ESM strategy toward a customer centric / servicing model

**Impact on Delivery Risk**

- We have placed + \$ in budget for broker s/w
- 10+ months in project plan (Design to SIT)
- Strong view not to build given # of messages & complexity
- ESM likely to increase message requirement

**Next Steps**

- Endorse Integration Services approach
- Agree to POC / Pilot broker approach to confirm hypothesis
- Agree IBM WBI and TIBCO products as POC / Pilot candidates

_Servicing POC has proven P2P & web services back end access and connectivity_

## 15 MLC initiated a successful Proof of Concept, resulting in SAF endorsement to adopt an Integration Services approach based on TIBCO to meet business requirements.

**Objective**

- Understand delivery risk (vendor, design patterns)
- Use learnings from pilot to form mitigation strategies (development time, effort and \$)
- Confirm our architecture
- Confirm our requirement for Integration Service software for Amazon Foundations and Enhanced
  Offer streams
- Bring Group architecture and GCS along the journey
- Determine best broker software for MLC whilst ensuring our move toward a strategic
  architecture
- Determine indicative effort (time and cost) for development effort
- Understand how we would upskill in and use the tool from both a system administrator and a
  developer point of view
- Validate our hypothesis regards performance / response time of a real time message broker

**Scope**

- There are two (2) key integration requirements to be addressed, viz
  1. Real-time (Request / Reply) integration between servicing applications and back-end
     systems
  2. Near real-time data synchronisation (Data Synch) between systems of record and aggregated
     data stores

The pilot will be predicated upon Web Services integration approach and will demonstrate all
reference architecture capability (eg. Transformation, orchestration, logging etc)

- The pilot will demonstrate connectivity & integration to our key record keeping systems

## 16 MLC's approach in hindsight turned out to be fortuitous, as it enabled MLC to seamlessly transition into the industry trend towards Service Oriented Architectures (SOA).

A Service Oriented Architecture is an application architecture within which key _business
functions_ are implemented as re-useable _services_ with _well-defined, invocable, interfaces_,
which can be called in a defined sequence to form _business processes_.

**MLC's realisation of SOA is through:**

- The EBF Framework
- Enterprise Data Model
- Integration Services and Common Object Model
- Enterprise Security Architecture

**Implementation will be achieved by:**

- Leveraging key vendor relationships & capabilities
- Exposing key back-end functionality and services / assets

## Sources

- **The deck**, `Selling web services to senior management.ppt`, 1.1 MB, sixteen slides,
  created on the 5th of July 2004 and last saved on the 13th of July 2004, revision 14, in
  Microsoft PowerPoint against the MLC_white template. It names no conference and carries no
  organiser's branding; nothing that survives records where it was delivered. Reproduced above.
- [Lessons Learnt from implementing and embedding an enterprise architecture team at National
  Wealth Management](/spotlite/article/btell-2003/), the July 2003 talk whose Strategic Architecture
  Forum slide this deck reuses as its slide 4.
- [The promise and pitfalls of implementing a Services Oriented Architecture](/spotlite/article/ark-2005/),
  the March 2005 talk that presents slide 16's SOA definition as my team's, eight months after
  this deck carried it — and [The Role of Service Oriented Architecture within an Enterprise
  Architecture](/spotlite/article/eac-2005/), its August 2005 successor.
