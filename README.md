# Color Picker Everywhere

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/MiguelASantiestebanAguiar.color-picker-everywhere?label=Marketplace&color=007ACC)](https://marketplace.visualstudio.com/items?itemName=MiguelASantiestebanAguiar.color-picker-everywhere)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/MiguelASantiestebanAguiar.color-picker-everywhere?label=Installs)](https://marketplace.visualstudio.com/items?itemName=MiguelASantiestebanAguiar.color-picker-everywhere)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/MiguelASantiestebanAguiar.color-picker-everywhere?label=Rating)](https://marketplace.visualstudio.com/items?itemName=MiguelASantiestebanAguiar.color-picker-everywhere)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**VS Code's native color picker, in every file.**

Out of the box, VS Code only shows colour swatches in CSS, SCSS, Less and HTML. Open a `theme.yaml`, a JSON design-token file, a Markdown table of brand colours, a shell script — nothing. This extension fixes that with a single regex-based `DocumentColorProvider` registered for all schemes.

![demo](docs/demo.gif)

## Install

```bash
code --install-extension MiguelASantiestebanAguiar.color-picker-everywhere
```

Or open VS Code → Extensions → search **"Color Picker Everywhere"**.

## What you get

- **Clickable swatches** next to every colour literal — in any file.
- **Native picker on click** — same UI you already know from CSS files.
- **Notation-preserving edits** — hex stays hex, `rgb()` stays `rgb()`, `hsl()` stays `hsl()`. The picker doesn't rewrite your format.
- **Zero configuration.** Install, reload, done.

Detected formats:

| Format | Example |
|---|---|
| Hex 3/4/6/8 | `#fff`, `#fff8`, `#ff8800`, `#ff8800cc` |
| `rgb` / `rgba` | `rgb(255, 136, 0)`, `rgba(255, 136, 0, 0.8)` |
| `hsl` / `hsla` | `hsl(28, 100%, 50%)`, `hsla(28, 100%, 50%, 0.8)` |

## Why it exists

I keep a single `theme.yaml` as the source of truth for my whole desktop (Hyprland, Waybar, Rofi, Kitty…). Editing it means staring at strings like `rgba(18,18,22,0.92)` with no visual feedback. CSS-only colour pickers don't help when half your codebase isn't CSS.

This extension is the smallest possible piece of code that closes that gap: ~110 lines of JS, no dependencies, no configuration knobs.

## Compatibility

- VS Code `^1.75.0`
- Plays nicely with [`naumovs.color-highlight`](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) (which only highlights, doesn't add a picker).

## Caveats

- **CSS/SCSS/Less/HTML duplicate swatches**: Microsoft's language servers already provide one in those files. The selector in `extension.js` is configurable if it bothers you.
- **Not yet supported**: named colours (`red`, `blue`), `oklch()`, `lch()`, `color()`. PRs welcome.

## Contributing

Fork → branch → PR. The whole extension is one file: [`extension.js`](extension.js).

## License

[MIT](LICENSE) © Miguel A. Santiesteban Aguiar
