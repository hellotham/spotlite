# Design System: Rosely

## 1. Visual Theme & Atmosphere

Rosely is a warm, serene, and contemporary design system rooted in the "Millennial Pink" aesthetic. It prioritizes a **low-contrast, eye-comfortable ambiance** that induces calmness and serenity. The system is designed to be mindful and reassuring, avoiding high-contrast fatigue while maintaining enough vibrancy to be playful and optimistic. It emphasizes clarity, simplicity, and elegance, creating a "serene beauty" that works well across both digital interfaces and physical design applications.

## 2. Color Palette & Roles

The Rosely palette consists of sixteen core colors divided into four functional sub-palettes, plus an extended ANSI terminal set.

### Greys (Neutrality & Foundation)

Used for backgrounds, text, and structural elements where neutral grounding is needed.

* **Black Beauty (#27272a):** Primary dark background or deep text color.
* **Granite Gray (#615f5f):** Secondary neutral for borders or muted text.
* **Opal Gray (#a49e9e):** Soft neutral for secondary UI elements or placeholder text.
* **Sugar Swizzle (#f4eee8):** Crisp, off-white for light backgrounds or high-contrast dark-mode text.

### Pinks (Gentle Romance & Warmth)

The soul of the system, tempering passion with purity.

* **Morning Glory (#ec809e):** Vibrant highlight or action color.
* **Rose Quartz (#f7caca):** The base color of Rosely; warm, gentle rose tone conveying composure.
* **Barely Pink (#F8D7DD):** Soft background tint or secondary highlight.
* **Heavenly Pink (#f4dede):** Ultra-soft background or subtle text accent.

### Purples (Depth & Harmony)

Used for accents, borders, and alternate backgrounds to complement the pinks.

* **Grapeade (#85677b):** Dark accent for borders or strong typographic emphasis.
* **Radiant Orchid (#b565a7):** Base accent color; a captivating harmony of fuchsia and pink.
* **Lupine (#be9cc1):** Soft purple for secondary buttons or active states.
* **Lavender Fog (#D2C4D6):** Muted lilac for background variations.

### Colourful (Positivity & Precision)

High-positivity colors used for functional highlighting (Success, Error, Info, Warning).

* **Raspberry Sorbet (#d2386c):** Delectable red-pink for errors or critical alerts.
* **Spearmint (#64bfa4):** Cool green for success states or fresh highlights.
* **Aquarius (#3CADD4):** Periwinkle blue for links, information, or primary actions.
* **Meadowlark (#eada4f):** Vibrant sunny yellow for warnings or cheerful accents.

## 3. Typography Rules

* **Primary Font Family:** "Noto Sans", sans-serif. Chosen for its clean, modern, and highly readable character.
* **Serif Font Family:** "Noto Serif", serif. Used for headings and emphasis.
* **Monospace Font Family:** "Noto Sans Mono", monospace. Used for technical data, code snippets, and terminal interfaces.

## 4. Component Styling & Spacing

Rosely embraces a clean, modern aesthetic utilizing **shadcn/ui** and **Tailwind CSS** defaults for structure and spacing, integrated with our color palette.

* **Spacing System:** Follows the default Tailwind CSS spacing scale (e.g., `p-4` for 1rem/16px, `gap-6` for 1.5rem/24px) to maintain a consistent and predictable rhythm.
* **Border Radius:** Components typically feature subtle rounding using `rounded-md` (0.375rem) or `rounded-lg` (0.5rem) to reflect the gentle nature of the Rosely theme, avoiding harsh, sharp corners.
* **Borders:** Use thin, 1px borders colored with `border-border` (mapped to Opal Gray or similar neutral) for subtle separation.
* **Shadows & Elevation:** Drop shadows should be soft and diffused (`shadow-sm` or `shadow-md`), enhancing the low-contrast ambiance without creating overwhelming visual hierarchy.
* **Interactive States:** Hover and focus states should slightly shift the background or border color (e.g., using Morning Glory or Lupine accents) while maintaining the eye-comfortable constraint.
* **Component Architecture:** Build accessible and composable UI blocks using Base UI primitives (via shadcn/ui), styled with Tailwind utility classes that reference Rosely's custom color variables.
