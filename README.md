# @radiosilence/theme

The kōan theme for Tailwind v4: the tokens, the Geist Mono typeface, and the kit of controls radiosilence's server-rendered web UIs (askama and Datastar) are drawn with. It is to the web what `koan-kit` is to GPUI: the look lives here, so an app cannot drift from it. The specification, with the reason for each rule, is koan's [docs/design/koan-theme.md](https://github.com/radiosilence/koan/blob/main/docs/design/koan-theme.md).

## Use

```css
@import "tailwindcss" source(none);
@source "../templates";
@import "@radiosilence/theme";

/* The app's accent, in both schemes, each at least 4.5:1 on --surface. */
:root {
  --brand: #4fd6f0;
}

@media (prefers-color-scheme: light) {
  :root {
    --brand: #066f82;
  }
}
```

Serve `geist-mono.woff2` from this package beside the compiled stylesheet. A static site with markup of its own imports `@radiosilence/theme/tokens.css` for the tokens without the controls.

The package is published to GitHub Packages, so installing it needs a token with `read:packages`.

## What it gives

**Tokens** (`tokens.css`): the colours by role (`bg`, `surface`, `rule`, `hover`, `ink`, `strong`, `muted`, `brand`, `ok`, `warn`, `bad`), the seven type roles (`fine`, `meta`, `control`, `body`, `title-sm`, `title`, `display`, plus `input`, the 16px a field needs so iOS does not zoom into it), and the `busy`, `sweep` and `fade` animations.

Tailwind's own palette, radii, shadows, blurs and type sizes are removed: `rounded-lg`, `shadow-xl`, `text-sm` and `bg-red-500` compile to nothing. What that cannot reach, such as `rounded-full` and arbitrary values, kit-check reports. This is because the look has square corners, no shadows or blur, colours by role and seven type sizes, and a vocabulary that can say only that keeps every app to it.

**Elements** (`kit.css`, base layer): plain markup comes out in the theme. `<button>` is the bordered button; `<input>`, `<select>` and `<textarea>` the square field; a checkbox or radio is the square toggle; `<input type="range">` the hairline slider (in WebKit its done part is drawn from a `--fill` percentage the page's script keeps up to date); `<dialog>` a hairline panel over a dimmed page; `h1` to `h3`, links, `strong`, `small` and `:focus-visible` are set. The app's own words (headings, buttons, labels) are lowercase; a heading showing a person's text adds `normal-case`.

**Classes** (`kit.css`, components layer):

| Class | What it is |
|---|---|
| `primary`, `standard`, `quiet`, `link` | The button weights beside the bordered default. One `primary` a page at most: it is what the page is for |
| `bad` | Destructive, on any weight |
| `button` | A link drawn as a button |
| `icon-button` | A glyph alone, with a 40px target and an `aria-label` |
| `busy` | A control whose request is running, with a spinner after its label; `spinner` stands alone |
| `field` | A `<label>` holding a `<span>` label, the control and a `<small>` hint; `bad` or `warn` on the field or the hint tones it |
| `toggle` | A checkbox's row in a form: label leading, box trailing |
| `panel` | A region told apart by a hairline |
| `notice` | A message about the page: a result, or with `warn` or `bad` a warning or error |
| `status` | A square mark and a word in a tone: `ok`, `warn`, `bad`, `wait`; with `busy` it breathes |
| `meter` | `<progress class="meter">`: a hairline, the done part in the accent or a status tone; indeterminate, a sweep |
| `skeleton` | Content on its way |
| `code` | A value to read or copy |
| `rows` | A list of rows, without rules between them |
| `dense` | `<table class="dense">`: technical data, `num` columns right-aligned |
| `disclosure` | `<details class="disclosure">` with a chevron in place of the browser's marker |
| `toast` | A message over the page; `brief` fades by itself, `bad` is an error |
| `sheet` | `<dialog class="sheet">`: rises from the bottom on a phone, a centred panel elsewhere |

```html
<label class="field">
  <span>api token</span>
  <input type="password" name="token" />
  <small>Stored sealed.</small>
</label>
<button class="primary">connect</button>
<span class="status ok">connected</span>
```

Layout, spacing and anything particular to one app stay in the app's templates as utilities.

## The storybook

`storybook/index.html` shows every control in every state. `mise run storybook` compiles its stylesheet; open the page and switch the system between dark and light.

## kit-check

```sh
kit-check templates src
```

Reports classes outside the look in templates and in code that writes markup (`class`, JSX's `className` and `classList` calls, across lines): rounded corners, shadows, rings, blur, gradients, Tailwind's palette and type sizes, arbitrary colours, and `style=` attributes, which the CSP blocks. Most of these already compile to nothing; kit-check says where they are, and fails CI. A deliberate exception carries `kit: raw` and its reason on the line or the line above. An app runs it from its CSS task or CI:

```sh
node node_modules/@radiosilence/theme/kit-check.mjs templates src
```

## Adding to the kit

A look an app needs and the kit lacks is added here, not in the app, once a second app needs it or it is a control the specification describes. It gets a place in the storybook in each of its states.

## Release

A push to main that changes `version` in `package.json` publishes it, tags it and releases it with its `CHANGELOG.md` section as notes.
