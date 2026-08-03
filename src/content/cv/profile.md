---
# Parameters only. The words live in the body below, where they can be written as prose.
name: Chris Tham
headline: 'Strategy Consultant | Technology Strategy, Architecture and Business Change'

contact:
  email: chris@christham.net
  phone: '+61 413 008 577'
  location: Sydney, Australia
  linkedin: https://www.linkedin.com/in/christham
  website: https://christham.net/

# How much of each *role* a variant carries is set per role, by the `priority` field in
# src/content/work — not here. These are what is left: the competency cut-off, and the
# heading above the roles the one-pager reduces to a single line.
#
# The one-pager fails the build rather than shrink below a legible size. If it stops
# fitting, lower a role's priority in src/content/work; do not shave words.
onePage:
  minCompetencyLevel: 6
  earlierCareerHeading: Earlier career

full:
  minCompetencyLevel: 5
---

<!--
  The editorial copy for the CV: the words a person writes and reviews. The career facts
  are not here — they come from src/content/work and src/content/education, and
  src/utils/cv.ts assembles the two.

  Written once, used three times: the home page, the one-page résumé and the full CV.
  When this copy lived in more than one place it drifted, and the home page and the PDFs
  ended up naming clients differently.

  The headings below are load-bearing: src/utils/cv.ts reads "Profile", "Career" and
  "Key Achievements" by name, takes each achievement from a "###" heading and the
  paragraph under it, and fails the build loudly if one is missing or empty rather than
  shipping a CV with a hole in it. Inside them, write ordinary markdown. Bold, italics
  and links all survive into the PDFs.
-->

## Profile

Founder of Hello Tham, a boutique strategy consulting company. Available for short to medium term consulting engagements spanning strategic business change, business and operating model design, business process improvement, and technology strategy, architecture and solutions.

## Career

My career has now spanned four decades and I am looking forward to entering the fifth:

- In the first decade I started as an analyst for a fintech, and then a financial institution. I pivoted to be a systems and architecture consultant for two of the biggest computer companies in the world: AT&T/NCR and HP.
- In the second decade I pivoted back to Banking and Finance. I established and managed successful strategy and architecture functions in several institutions including MLC, NAB and ING.
- In the third decade I transitioned to become a strategy consultant and have delivered successful engagements to Transfield Services, Broadspectrum and Transport for NSW.
- In the fourth decade I am working on things that interest and matter to me. I teach at Torrens University, and have continued my consulting career. I have also written a book, AI-dō.

## Key Achievements

### Flexible strategic change agent and thought leader

I have facilitated business and technology strategic change for three decades – from Head of Strategy positions at MLC, NAB and ING to delivering IT strategies, roadmaps and operating models as a consultant to Transfield Services and Transport for NSW (through my consulting company Hello Tham).

### Successful and proven technology strategy and architecture leader

I have built successful architecture practices at organisations from MLC (where I wrote my own job description and built a practice that became a case study at international conferences) to NAB, ING and Broadspectrum. I have provided enterprise architecture advice as a consultant to Transport for NSW and currently at Cochlear.

### Recognised technology innovator and industry expert

I have been involved in new technologies for my entire career, from early beginnings managing one of Australia’s first commercial UNIX systems at Bain & Co, which I connected to ACSnet in 1986 to make it one of the earliest non-academic organisations in the country online, to a patented service-oriented advice platform my team pioneered at MLC, to using a large language model to classify support calls in 2018, long before ChatGPT. Most recently I shaped Cochlear’s AI strategy. I teach Information Systems at Torrens University, and have written AI-dō, a book on using AI effectively.
