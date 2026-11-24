# Changelog

## 0.2.4

- **Labels and summaries keep their case.** They hold file names, titles and paths too often for the kit to lowercase them; a field's label is still lowercased, and an app writes its own words lowercase in the source.
- **A busy status is hollow under reduced motion,** so it still reads as unsettled when it cannot breathe.

## 0.2.3

- **A sheet clears the home indicator.** On a phone its bottom padding is at least `env(safe-area-inset-bottom)`; `--sheet-padding-bottom` sets it otherwise.
- **kit-check reads Tailwind sizes with a line-height modifier,** such as `text-xl/snug`, which compile to nothing like the bare sizes.
- **The README says the CSP needs `img-src data:`** for the checkbox's tick and the select's chevron.

## 0.2.2

- **A panel ending in a paragraph keeps even padding.** The paragraph's bottom margin had been added to the panel's padding.

## 0.2.1

- **An unchecked checkbox or radio is outlined again.** 0.2.0 drew it with no border, so it could not be seen.

## 0.2.0

- **The web kit.** Plain elements come out in the theme (the bordered button, the square field and toggle, the slider, the dialog, headings and focus), and classes give the rest: the button weights, `field`, `toggle`, `panel`, `notice`, `status`, `meter`, `busy`, `skeleton`, `code`, `rows`, `dense` tables, `disclosure`, `toast` and `sheet`. Taken from koan's web UI and the controls dither, mariastew and slsk-mcp had each written for themselves.
- **Tailwind's palette, radii, shadows, blurs and type sizes are removed.** `rounded-lg`, `shadow-xl`, `text-sm` and `bg-red-500` compile to nothing; use the theme's roles. Black and white stay, for QR codes.
- **`ok`**, a status colour that is the theme's mint in every app, whatever its accent.
- **`kit-check`**, which reports classes outside the look and inline styles, for an app's CI.
- **A storybook** of every control in every state, `mise run storybook`.
- **`tokens.css`**, the tokens alone, for a static site with markup of its own.

## 0.1.0

- **First release.** koan's tokens, type scale and Geist Mono, taken from `site/src/theme.css` in radiosilence/koan, with the `warn` colour slsk-mcp added and a light-mode value for it.
