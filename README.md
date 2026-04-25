# Universal Color Picker

Native VS Code color picker and inline swatches in **every language**.

VS Code's built-in color picker only works in CSS, SCSS, Less and HTML. This extension registers a `DocumentColorProvider` for all file schemes, so you get the same clickable color decorator and color picker in YAML, JSON, Markdown, TOML, plain text, shell scripts, source code — anywhere a color literal appears.

## Features

- Detects and renders clickable color swatches for:
  - Hex: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
  - RGB: `rgb(r, g, b)`, `rgba(r, g, b, a)`
  - HSL: `hsl(h, s%, l%)`, `hsla(h, s%, l%, a)`
- Click a swatch → opens VS Code's native color picker
- Edits replace the value in the **same notation** as the original (hex stays hex, rgb stays rgb, hsl stays hsl)
- Works in any file regardless of language

## Why

Configuration files (`theme.yaml`, design tokens in JSON, color tables in Markdown) often contain color literals, but VS Code's native picker stops at CSS-family languages. This extension fills that gap with a single regex-based provider — no per-language configuration required.

## Usage

Install, reload, open any file with a color literal. The colored square appears next to the value. Click to edit.

## Compatibility

- VS Code `^1.75.0`
- Plays nicely with `naumovs.color-highlight` (background tint) — they don't conflict.

## Caveats

- May produce duplicate swatches in CSS/SCSS/Less/HTML where Microsoft's language servers already provide one. If this bothers you, the file selector is configurable in `extension.js`.
- Named colors (`red`, `blue`) and modern CSS color functions (`oklch()`, `lch()`, `color()`) are not yet supported — PRs welcome.

## License

[MIT](LICENSE) © Miguel Aguiar
