---
company: Optech International
role: Systems Analyst
startyear: 1988
endyear: 1989
type: employment
image: ./optech.jpg
description: 'Option pricing and distributed risk management for Tesla, a foreign exchange options trading system built at Optech.'
priority: 3
tags:
  [
    'Software development',
    'Systems analysis',
    'Options pricing',
    'Financial modelling',
    'Risk analysis',
    'Distributed systems'
  ]
---

- Joined in March 1988 as a Systems Analyst, working first on the in-house synthetic option trading and management system, written in a combination of C and Ingres/ABF, a 4GL.
- Became one of the lead architects of **Tesla**, a foreign exchange options trading system built to be marketed and sold to major banks and option traders, and designed around distributed client/server features: concurrency, collaborative processing and fault tolerance.

## Tesla

Responsible for part of the data design, and wrote the functional specifications and detailed design of several major components:

- A custom-built transaction processor that monitored all database access and auditing.
- Security access services.
- Implementation of all option and hedging instrument pricing models.
- A distributed, real time, fault tolerant portfolio position evaluation and re-balancing service that replicates and distributes itself across idle network nodes.
- Graphical display and charting facilities.

Tesla's design and architecture is the subject of [Distributed Computing and Risk Management](/spotlite/article/suntech-1990/), written with Tim Posney — one of the architects of TOPS, a sister product for interest rate over-the-counter options trading — and published in SunTech Journal in 1990. [The longer manuscript we submitted](/spotlite/article/optech-1990/) is here too.
