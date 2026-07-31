---
title: 'Distributed Computing and Risk Management: the original manuscript'
description: The longer version of our 1990 Optech paper, with the sections SunTech Journal cut, the libraries described one at a time, and the figures as we drew them.
pubDate: 1990-01-01
---

_This is the article Tim Posney and I wrote, before SunTech Journal edited it for the page.
[The magazine's version is here](/spotlite/article/suntech-1990/): it is shorter, its spelling
was Americanised, and its editor reworked very nearly every sentence. Two sections went
entirely, and the descriptions of the applications and libraries were cut back to their names.
Where something was dropped, this article says so._

_The figures are ours as well, converted from the original PostScript, rather than the
redrawings SunTech's artist made from them. Figure 2 is landscape here, as we drew it, rather
than turned upright to fit a column._

## Introduction

The treasuries of large financial institutions, such as banks, need to constantly control the
risks associated with trading. Effective risk management depends upon accurate and timely
information from all dealing desks.

There are various methods of minimising, or hedging, financial risks, depending on the type and
nature of the asset or commodity being traded. This article discusses the issues and methods of
managing risks associated with trading 'options', and provides an overview of the family of
Optech Option Trading Systems. Optech systems are distributed systems running on Sun
workstations, providing trading facilities with risk analysis and immunisation of option
portfolios.

## What are Options

An option is a contract that gives the buyer the right, but not the obligation, to buy or sell
a fixed amount of an asset at an agreed price (commonly called the 'exercise' or 'strike'
price) for a fixed period of time. This is in contrast with other financial contracts, where
the buyer is obligated to meet the terms of the contract. A _call_ option is an option to buy
and a _put_ option is an option to sell. An asset is anything that is commonly traded, such as
currency, fixed interest securities, company stocks, physical commodities or even other
options. The option writer, or seller, charges a small amount, called the _option premium_, for
the option.

The buyer may _abandon_ the option, i.e., do nothing, losing only the premium. Alternatively,
the buyer may _exercise_ the option and enter into an agreement to buy or sell the asset at the
agreed price.

## Advantages of buying options

An option can be purchased as a form of insurance policy, protecting the purchaser from adverse
price movements. See Figure 1 for an example.

Consider an exporter who will receive A\$100,000 for goods in three months time. The current
exchange rate is 0.80 USD/AUD, which means the exporter expects to receive US\$80,000. If, after
three months, the exchange falls to 0.75, the exporter stands to lose US\$5,000. However, by
purchasing an option to sell A\$100,000 for US\$80,000, he can choose to exercise the option and
still receive US\$80,000 minus the option premium. If, however, the exchange rate is 0.85, the
exporter can abandon the option and make a profit of US\$5,000 minus the option premium. The
expected payoff is given in the graph below.

![Payoff diagram plotting profit from exchange-rate movement against the USD/AUD rate. The unhedged payoff falls away in a straight line through 0.80, while the payoff after purchasing the option follows it down and then flattens out below 0.80, one option premium lower. A key below names the two lines](../../assets/optech-figure-1.svg)

_Figure 1. Example payoff diagram._

By buying an option, the maximum loss that the buyer can suffer from an adverse movement is the
option premium. However, the purchaser can benefit from advantageous movements by abandoning
the option.

Option purchases are also useful for contingent cash flow situations. In the example given in
Figure 1, the exporter could buy the option before the sale of goods is finalised and still be
protected from adverse price movements.

An option purchase is attractive to buyers with poor credit ratings, since they do not require
prior credit approval for the underlying transaction, merely the ability to pay the premium.

Finally, options are attractive as speculative instruments when the price of an asset is
expected to move in a specific direction. They have limited risk and are not generally subject
to margin calls.

## Risks associated with selling options

The option writer gains, at most, the option premium from a sale but risks unlimited loss,
being exposed to the full extent of price movements in the underlying instruments. Large scale
option writing by traders in bank treasuries will create a position with unacceptable risk
unless methods are used to contain or minimise the risk due to the exposure. This is done by
'hedging' the portfolio through trades which are performed solely to minimise risks.

Ad-hoc or manual hedging methods typically involve the use of _spreads_, i.e., the simultaneous
purchase and sale of similar options; or _straddles_, which involve the purchase of equal
numbers of both call and put options of the same type. Spreads seek to use option purchase to
reduce the risk of option sale, and vice versa. Straddles allow the option writer to be
protected from market movement in either direction. However, the effective use of ad-hoc
strategies such as these requires careful judgement on the part of the hedge trader, which can
only be obtained from experience. The use of spreads and straddles will also result in a
reduction in profit from the option sale.

Modern computerised hedging techniques involve the quantitative evaluation of risks, based on
mathematical models of option pricing, together with continuous dynamic trading based upon
monitoring of positions and a means of mathematically determining hedging trades.

## Risk Immunisation

Hedging relies on developing accurate mathematical models for the _fair price_ of option
premiums and hedging instruments. A _hedging instrument_ is a financial contract used to hedge
the sale of an option, which can be as simple as buying or selling a portion of the underlying
asset. The fair price of a financial instrument is the expected value of the instrument if
current market conditions prevail.

If we make certain assumptions about distribution of asset price movements, the fair price of
an option premium is determined by five main factors:

- The current asset price.
- The strike price of the option.
- The time to maturity of the option.
- The interest rate for holding the underlying asset.
- The volatility of the asset price, which is an indication of the variation of asset price
  with time.

These are the only quantifiable influences on the premium. The fair price is a function of
these factors. In practice, non quantifiable factors such as market expectations will also
affect the premium.

The writer is exposed to the risk of changing market conditions, that is, to the risk of any of
the above factors changing from the time the option is sold to the time it is exercised.

From the pricing model, the partial derivative of the fair price with respect to any one of
these factors can be derived giving a measure of the risk due to a change in that factor.

Risk immunisation consists of constructing a series of hedging trades such that the sum of the
risk measures for the hedging trades are equal and opposite to the risk measures of the option.
If the option and the set of hedging trades are traded as a group, the resultant portfolio will
not be affected by market movement. We have _immunised_ the portfolio against market movement,
i.e., the portfolio value does not change appreciably for small movements in market values.

Risk immunisation only occurs for limited periods of time. Large or sudden market movements
will cause the portfolio to lose immunisation and must be 'rebalanced' by constructing new
hedging trades.

Risk management also entails performing sensitivity analyses of how a portfolio will respond to
changes in market conditions and simulations of predicted or historical market movement provide
an indication of the effectiveness of rebalancing.

## The Optech Options Trading Systems

Optech is currently in the process of developing options trading systems with advanced risk
analysis and control facilities. The primary objective is to design a risk management system
that is directly linked to trading floor activities. To achieve this goal, the following
properties have been identified requirements in the trading or risk management system:

- continuous monitoring of market activity via a digital interface to market information
  services.
- on-line, real-time capture of a trade.
- fast, accurate pricing of trades.
- accurate and timely risk analysis and reporting.
- effective security system.
- sophisticated error detection, logging and recovery.
- fault-tolerant operation.

In order to fulfil the above requirements, we have decided upon a portable fault-tolerant
distributed approach. The systems are written entirely in the C and C++ languages, with
portability as a design goal. The software currently runs on Sun workstations under SunOS 4.0.3
but is designed to work in a heterogeneous NFS (Network File System) environment. Distributed
processing is achieved by spreading activity amongst machines in the network. Replication of
critical processes across the network provides fault-tolerant operation.

All database transactions go through a machine running the Sybase SQL database server. Normal
file access is provided by networked file servers.

Two kinds of user interfaces are supported. Front-office trading and risk analysis is performed
on bitmapped workstations using the X11 Window System. Back office trade modification,
confirmation, reporting and maintenance is accessed from a screen oriented interface from
inexpensive character terminals connected to a networked minicomputer or fileserver.

## Advantages of a portable distributed trading system

> [!NOTE]
> This section does not appear in the printed article at all. The case for the architecture
> went; only the architecture survived.

A distributed system offers extensibility without performance degradation. Additional
workstations and file servers can be added to the network to handle additional load. The
bottleneck is network bandwidth, which can be circumvented through the use of network
partitioning, gateways and replicated distributed data storage.

A bitmapped workstation offers a much more user friendly and powerful Graphical User Interface
(GUI) than traditional character terminals.

A heterogeneous network environment frees the financial institution from dependence on a
particular hardware vendor.

A distributed system is inherently fault-tolerant as network hosts can be easily replaced
without affecting the rest of the system.

A workstation network provides more flexibility than a traditional mainframe but gives more
power and security than a PC-based network.

## Features of Optech Trading Systems

### Open architecture, modular design

The system is designed as a collection of building blocks or software modules which are joined
together into applications. Module interfaces are flexible enough that modules can be replaced
or extended without affecting other modules in the system.

### Reliability and Integrity

All failed transactions are rolled back, in order to ensure database consistency. All
transactions are logged to provide a complete audit trail. Automatic data consistency checks
are applied as a guard against data corruption/inconsistency/tampering. The system can
automatically detect hardware/software failures in the network and compensate/readjust.

### Interfaces to data feeds, such as Reuters

Allow continuous monitoring of market activity and movement. Sophisticated data filters are
applied to avoid anomalous data being used. Data can also be manually overridden.

### Other features

On-line trading with deal capture and back office support for trade confirmation and
accounting/auditing.

Real time risk and sensitivity analysis automatically revalue portfolios and recompute risk
measures as the market changes. Rebalancing trades are suggested to the user as an aid to risk
immunisation.

Fast simulation of random, predicted or historical market movements.

Extensive reporting and auditing facilities.

Interfaces to external systems, such as mainframe accounting systems.

## System Architecture

The Optech family of option systems are designed to be distributed across a network, hence each
system does not consist of one monolithic executable but a group of related applications that
work closely together in an integrated environment. Each application is designed to work by
itself or in conjunction with other applications in the system, no matter where they are
physically located on the network. Interoperability between systems is also designed to be as
transparent as possible.

Inter-application communication is performed by the TCP/IP socket mechanism via the X Windows
system for point to point communication, and through the Sybase SQL DataServer or remote
procedure calls for broadcast communication.

The following applications have been developed for the Optech system:

> [!NOTE]
> The magazine ran these as a bulleted list and trimmed each one. What the Pricing and Trading
> Screen runs on, what the Report Daemon is actually for, and what Back Office staff do all day
> are only described here.

### Pricing and Trading Screen (PTS)

This is the biggest and most complex application in the system, and runs on a graphics
workstation utilizing the X Window interface.

It provides a trader with a window allowing on line trading to be performed. A trader can
perform operations on the PTS such as entering option details and accessing live market data
and using it to price options.

The PTS allows a trader to view the risk measures associated with a portfolio, and the effect a
new trade will have on the risk measures. Hedging trades can also be suggested by the system
for new option trades.

The PTS is built using advanced screen design tools, and is customised to the kind of options
being traded. Figure 2 gives a relationship diagram showing how trading activity is centred
around the PTS.

![Figure 2, Pricing and Trading in the Front Office: a horizontal row of stages running Dates, Clients, Portfolios, Live Market Data, Pricing, Trading, Hedging, Rebalancing, Risk Measures, Sensitivity Analysis and Graphs, each with its database or calculator hanging below it. Reuters feeds Live Market Data, the Back Office hangs off the database of trades, and a workstation and clipboard sit above Trading](../../assets/optech-figure-2.svg)

Figure 3 gives examples of trading screens currently under development.

![Figure 3, examples of pricing and trading screens for different instruments. 3(a), the foreign-exchange option trading system: a title bar reading User:fred, Pricing & Trading, Wed 04-Sep-89, an icon rail down the left for Initialise, AutoCalc, Recalc, Add and Delete Instrument, ReBalance, Live, Trade, Risk, Clipboard, Graph and Quit, and panels for pricing models, the trade package, dates, exercise type, volatility, market data, option details, price and a scrolling instrument package](../../assets/optech-figure-3a.svg)

![3(b), the caps, floors and collars trading system: panels for the trade type and premium, the package, zero premium calculation, prices, settlement, expiry dates and spread on volatilities, a scrolling instruments table, and advance, arrear and amortized premiums along the foot](../../assets/optech-figure-3b.svg)

![3(c), the OTC bond option trading system: a title bar reading User:fred, OTC Bond Options, Wed 06-Dec-89, and panels for bond details, option details, the package, volatility, a calculations row showing strike, premium, volatility, delta, rho, gamma, theta and vega, and rates at the foot](../../assets/optech-figure-3c.svg)

### Greek Letters Module (GLM)

The GLM is a daemon that continuously revalues and recalculates the risk measures of all
portfolios in the Portfolio Database in response to changing market data. The GLM is designed
as a transparently distributed application. Multiple instances of the GLM can be started across
machines in the network and behave as one application. The GLM is also fault-tolerant as
different instances can be started and stopped at any time.

### Sensitivity Analysis Module (SAM)

This allows a user to determine exactly how the value of a particular portfolio and associated
risk measures will change should the market move in a particular way. It allows the user to
enter sensitivity analysis parameters and then view the results as a graph, on screen, or as a
report on the printer. The user can alter up to two market parameters independently viewing the
effects on portfolio value and risk measures.

### Simulator (SIM)

This is an application that analyses the effects of rebalancing on portfolio value and risk
measures when random or historical market movements are applied. Simulation results are
effective for analysing the effectiveness of different hedging techniques. The user interface
allows simulation results to be printed as a report or displayed on screen as a graph.

### The Clipboard (CLB)

The Clipboard is designed for passing data between parts of the trading system as well as for
storing data for later retrieval. Different types of data can be passed not only from one
instance of an application to another on one machine, but also across machines of different
architectures within the network. The clipboard window shows current clipboard entries and
allows users to extract or post entries.

### The Communications Module (COM)

This application retrieves relevant market/economic data from information providers such as
Reuters or MicroGnosis. It interfaces to a digital information channel, such as a Reuters RDCDF
unit, and automatically updates the market information database. Page translation algorithms
convert text screens into relevant data according to predefined formats. Screen pages are
archived for future analysis and simulation purposes. Sophisticated error detection and
recovery from hardware failure is provided.

### Report Daemon (RPD)

The Report Daemon is in charge of generating and printing scheduled reports on an automatic or
semi-automatic basis. It is an application that allows reports to be scheduled and printed at
certain times of the day or at certain dates.

### Back Office Support

The Back Office application provides a character terminal oriented interface to Back Office
staff allowing day to day system operations such as trade editing and confirmations, database
maintenance, accounting and management reports to be generated. It is designed to be run on a
minicomputer with terminals attached to it.

## The Optech Libraries

All Optech applications are written using the various modules in the Optech system. Each module
is designed to handle one aspect of the system, and the source code for every module is
encapsulated in an object code library that Optech applications link with.

> [!NOTE]
> The magazine kept the eight names as a bare list and cut every description below it. That the
> Report library emits NROFF/TROFF, or that access rights are hierarchical and transferable, is
> only recorded here.

### Pricing module

This module incorporates the complex mathematical models that define a financial instrument,
allowing it to be priced and its risk measures computed.

### Transaction Processor

Provides an application programming interface to the SQL DataServer. Applications can access
and modify information in the database without resorting to SQL. An audit log of transactions
is also generated.

### Market Event Calendar

Besides being a date function library, this library allows queries into a database containing
information about trading days, holidays and instrument maturity.

### Time Series Database

This library allows access to and addition of historical market data from a database which is
automatically updated by the COM application.

### Live Data Repository

Allows access to and modification of market values stored in the database. Market values may
also be overridden manually by privileged users.

### Security Access Control

This module is in charge of validating user access and allowing the creation and deletion
users. Access rights are organised in a hierarchical fashion allowing rights to be granted and
revoked on a group basis. Rights can also be transferred on an individual basis.

### The Clipboard library

Applications interface to the clipboard via routines in the clipboard library, which allows an
application to post things into and retrieve things from the clipboard.

### The Report library

This library provides report generation tools for applications. Reports are generated as
NROFF/TROFF input files, allowing flexibility of report output generation on a wide variety of
printers.

## Conclusion

Graphical User Interfaces and networked workstation technology is gaining rapid acceptance
within the finance industry as a tool for management of trading floor activities. The volume
and rate of trading and the complexity of risk management demands fast response to market
changes. In a rapidly expanding market, a distributed approach provides the extensibility that
is required. Although designing a distributed systems imposes substantial challenges in
software engineering, it also offers many benefits including true concurrency and
fault-tolerance. The resultant implementation can be made efficient despite the networking
overhead through careful division of labour throughout the network.

The Optech FX (Foreign Exchange) options trading system is presently undergoing alpha testing
and the development of an interest rate system is already underway. The system currently
consists of over 250,000 lines of source code and takes up over 5 Megabytes of storage.

Stripped executables range from a few hundred kilobytes to over one megabyte in size depending
on the complexity of the application. A port of the system to the IBM RT workstation under the
AIX operating system is nearing completion and a port to Digital's DECstations running VMS will
commence soon.

## Acknowledgments

A system as large or as complex as a trading system cannot be developed by one or two persons
and space precludes us from listing all the members of the development team. We would like to
mention Andrew Carroll, Garry De Jager and Michelle Rembel for their invaluable contributions
in the project. We would also like to thank John Cornwall, Ralph McKay, Robert Lee-Johnson and
Jenny Spence for their help in preparing this article.

## Bibliography

- J. O. Grabbe, _International Financial Markets_, Elsevier Science Publishing Co., Inc., New
  York (1986)
- J. C. Cox & M. Rubinstein, _Options Markets_, Prentice-Hall, Inc., Englewood Cliffs, New
  Jersey (1985)
- P. Ritchken, _Options: Theory, Strategy, and Applications_, Scott, Foresman and Co., Glenview,
  Illinois (1987)
- J. R. White & J. A. Kaehler, _How to Hedge Option Positions_, Software Options, Inc. (1984)
- R. McKay, _New Generation Treasury Technologies: The Fundamental Characteristics_, paper
  presented at the Sun Microsystems Banking Conference, London, October 4th, 1989
