# Demo asset

The `demo.gif` referenced from the project README lives here.

## How to record (5-second loop)

```bash
# Linux Wayland — wf-recorder + ffmpeg
wf-recorder -g "$(slurp)" -f /tmp/demo.mp4 &
# do the demo: open theme.yaml, click an rgba(...) swatch, change colour
# Ctrl+C to stop

# Convert to optimised GIF (under 1 MB)
ffmpeg -i /tmp/demo.mp4 -vf "fps=15,scale=720:-1:flags=lanczos,palettegen" /tmp/palette.png
ffmpeg -i /tmp/demo.mp4 -i /tmp/palette.png -lavfi "fps=15,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse" docs/demo.gif
```

Replace this directory with a final `demo.gif` and the README image link resolves automatically.
