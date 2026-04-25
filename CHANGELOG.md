# Changelog

All notable changes to this extension will be documented in this file.

## [0.1.1] - 2026-04-25

### Changed
- Renamed extension to `color-picker-everywhere` (the original `universal-color-picker` was already taken on the Marketplace). Display name: "Color Picker Everywhere".
- Set publisher to `MiguelASantiestebanAguiar` for the VS Code Marketplace.
- Removed incorrect `Themes` category.

## [0.1.0] - 2026-04-25

### Added
- Initial release.
- DocumentColorProvider registered for `file` and `untitled` schemes (all languages).
- Detects hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`).
- Detects rgb/rgba functional notation.
- Detects hsl/hsla functional notation.
- Color edits preserve the original notation.
