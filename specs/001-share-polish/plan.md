# Implementation Plan: 001-share-polish

## Technical context
Static site, no build step beyond `tools/package.sh`. Python available through `uv run --with pillow` for image generation. Fonts: `/System/Library/Fonts/Supplemental/Arial Bold.ttf`.

## Approach
1. `tools/make_images.py` (run with `uv run --with pillow python3 tools/make_images.py`): draws a 1200x630 honeycomb on the warm background, a large yellow hexagon with a simplified bee, the name and tagline; also writes a 64x64 favicon (yellow hexagon with stripes). Deterministic, committed outputs.
2. `index.html`: add OG/Twitter meta, theme-color, PNG favicon link, `width`/`height` on the four images, a `<span id="built">` in the footer.
3. `styles.css`: `[id] { scroll-margin-top: 76px }` on sections (header is ~60px).
4. `tools/package.sh`: `sed` the build month into `#built`.

## Constitution check
I (static, no runtime deps): pass, Python is build-time only. II (one theme): the OG image uses the light theme tokens' hex values. III (honest): image text is name + tagline already on the page. V: full browser check before zip.

## Risks
Pillow text rendering of Arial is fine; if the font path is missing the script falls back to Pillow's default and the result is uglier but valid.
