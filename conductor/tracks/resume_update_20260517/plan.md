# Resume Update Implementation Plan

## Objective
Update the `src/content/` collections and `src/pages/index.md` based on the provided resume OCR, aligning dates, roles, and descriptions.

## Key Files & Context
- `src/content/education/` (add Macquarie, SIA; modify USYD; delete UNSW)
- `src/content/work/` (update existing entries, add USYD tutor, set `tfnsw.md` as consulting)
- `src/pages/index.md` (add Profile summary and Papers/Conferences)

## Implementation Steps

### 1. Education Updates
- **Create** `src/content/education/macquarie.md`: Master of Applied Finance, Macquarie University (1994). Add awards (Institute of Bankers Prize, "The Institute Prize").
- **Create** `src/content/education/sia.md`: Graduate Diploma, Securities Institute of Australia (1992).
- **Update** `src/content/education/usyd.md`: Change to Bachelor of Science (1st Class Honours and University Medal), 1988. Add scholarships.
- **Delete** `src/content/education/unsw.md` as requested.

### 2. Work History Updates
- **`hellotham.md`**: Update role to "Principal Consultant and Director", 2016-Present. Mention providing strategic consulting services.
- **`tfnsw.md`**: Keep separate, but set `type: consulting` and `startyear: 2016`. Incorporate the detailed bullet points from the resume (AI/ML dashboards, chatbot PoC, iOS app PoC, multi-channel framework, business plans, etc.).
- **`broadspectrum.md`**: Align roles, dates (2011-2016), and bullet points with the resume (Strategy Consultant, Exec Manager Architecture & Design).
- **`thorogood.md`**: Verify/align 2011 consultant role and bullets.
- **`ing.md`**: Set dates to 2008 and verify bullet points.
- **`nab.md`**: Update dates to 2005-2007. Break out details for Head of Distribution (2005), Head of Retail Banking (2006), and Strategy Consultant (2007).
- **`mlc.md`**: Update dates to 1998-2004 and align bullet points.
- **`hp.md`**: Update dates to 1995-1998. Update description (Boral data centre consolidation, etc.).
- **`ncr.md`**: Update dates to 1992-1995. Update description (Telstra, Rockmans, Franklins, St. George).
- **`sbv.md`**: Update dates to 1990-1992.
- **`optech.md`**: Update dates to 1988-1990.
- **`bain.md`**: Update dates to 1986-1988.
- **Create `usyd-tutor.md`**: Tutor, University of Sydney, 1987.

### 3. Homepage Updates
- **`src/pages/index.md`**: Integrate the "Profile" summary from the resume into the top content.
- **`src/pages/index.md`**: Add a new section for "Papers / Conferences" and list the items from the resume.

## Verification & Testing
- Run `pnpm run build` to ensure the content collections build without errors and all frontmatter is valid according to `content.config.ts`.
- Visually verify changes using `pnpm run dev` if needed.