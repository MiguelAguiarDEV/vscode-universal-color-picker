const vscode = require('vscode');

const HEX = /#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const RGB = /rgba?\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/g;
const HSL = /hsla?\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/g;

function parseHex(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.split('').map(c => c + c).join('');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : 1;
  return new vscode.Color(r, g, b, a);
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  s /= 100;
  l /= 100;
  if (s === 0) return [l, l, l];
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
}

class UniversalColorProvider {
  provideDocumentColors(document) {
    const out = [];
    const text = document.getText();
    const push = (idx, len, color) => {
      const start = document.positionAt(idx);
      const end = document.positionAt(idx + len);
      out.push(new vscode.ColorInformation(new vscode.Range(start, end), color));
    };
    let m;
    HEX.lastIndex = 0;
    while ((m = HEX.exec(text)) !== null) push(m.index, m[0].length, parseHex(m[0]));
    RGB.lastIndex = 0;
    while ((m = RGB.exec(text)) !== null) {
      const r = Math.min(255, parseFloat(m[1])) / 255;
      const g = Math.min(255, parseFloat(m[2])) / 255;
      const b = Math.min(255, parseFloat(m[3])) / 255;
      const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
      push(m.index, m[0].length, new vscode.Color(r, g, b, a));
    }
    HSL.lastIndex = 0;
    while ((m = HSL.exec(text)) !== null) {
      const [r, g, b] = hslToRgb(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));
      const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
      push(m.index, m[0].length, new vscode.Color(r, g, b, a));
    }
    return out;
  }

  provideColorPresentations(color, context) {
    const r = Math.round(color.red * 255);
    const g = Math.round(color.green * 255);
    const b = Math.round(color.blue * 255);
    const a = color.alpha;
    const orig = context.document.getText(context.range);

    if (orig.startsWith('#')) {
      const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      const result = a < 1 ? hex + Math.round(a * 255).toString(16).padStart(2, '0') : hex;
      return [new vscode.ColorPresentation(result)];
    }
    if (orig.startsWith('hsl')) {
      const max = Math.max(color.red, color.green, color.blue);
      const min = Math.min(color.red, color.green, color.blue);
      const l = (max + min) / 2;
      let s = 0;
      let h = 0;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === color.red) h = (color.green - color.blue) / d + (color.green < color.blue ? 6 : 0);
        else if (max === color.green) h = (color.blue - color.red) / d + 2;
        else h = (color.red - color.green) / d + 4;
        h *= 60;
      }
      const hh = Math.round(h);
      const ss = Math.round(s * 100);
      const ll = Math.round(l * 100);
      const txt = a < 1 ? `hsla(${hh}, ${ss}%, ${ll}%, ${a.toFixed(2)})` : `hsl(${hh}, ${ss}%, ${ll}%)`;
      return [new vscode.ColorPresentation(txt)];
    }
    const txt = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})` : `rgb(${r}, ${g}, ${b})`;
    return [new vscode.ColorPresentation(txt)];
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerColorProvider({ scheme: 'file' }, new UniversalColorProvider()),
    vscode.languages.registerColorProvider({ scheme: 'untitled' }, new UniversalColorProvider())
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
