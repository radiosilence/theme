# Changelog

## 0.2.0

- **The web kit.** Plain elements come out in the theme (the bordered button, the square field and toggle, the slider, the dialog, headings and focus), and classes give the rest: the button weights, `field`, `toggle`, `panel`, `notice`, `status`, `meter`, `busy`, `skeleton`, `code`, `rows`, `dense` tables, `disclosure`, `toast` and `sheet`. Taken from koan's web UI and the controls dither, mariastew and slsk-mcp had each written for themselves.
- **Tailwind's palette, radii, shadows, blurs and type sizes are removed.** `rounded-lg`, `shadow-xl`, `text-sm` and `bg-red-500` compile to nothing; use the theme's roles. Black and white stay, for QR codes.
- **`ok`**, a status colour that is the theme's mint in every app, whatever its accent.
- **`kit-check`**, which reports classes outside the look and inline styles, for an app's CI.
- **A storybook** of every control in every state, `mise run storybook`.
- **`tokens.css`**, the tokens alone, for a static site with markup of its own.

## 0.1.0

- **First release.** koan's tokens, type scale and Geist Mono, taken from `site/src/theme.css` in radiosilence/koan, with the `warn` colour slsk-mcp added and a light-mode value for it.
